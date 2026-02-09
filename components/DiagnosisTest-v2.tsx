'use client';

import { useState, useEffect } from 'react';
import { UserProfile, DiagnosisResult, SkillScore, BusinessLevel } from '@/lib/types';
import { selectQuestions, getWritingPrompts, Question } from '@/lib/questions-v2';

interface DiagnosisTestProps {
  profile: UserProfile;
  onComplete: (result: DiagnosisResult) => void;
}

interface Answer {
  questionId: string;
  category: string;
  level: string;
  answer: number;
  isCorrect: boolean;
}

export default function DiagnosisTest({ profile, onComplete }: DiagnosisTestProps) {
  const [questions] = useState(() => selectQuestions());
  const [writingPrompts] = useState(() => getWritingPrompts());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [writingResponses, setWritingResponses] = useState<string[]>(['', '', '']);
  const [currentWritingIndex, setCurrentWritingIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phase, setPhase] = useState<'questions' | 'writing'>('questions');

  const totalQuestions = questions.length;
  const totalWriting = writingPrompts.length;
  const currentQuestion = questions[currentIndex];
  
  const progress = phase === 'questions' 
    ? ((currentIndex + 1) / (totalQuestions + totalWriting)) * 100
    : ((totalQuestions + currentWritingIndex + 1) / (totalQuestions + totalWriting)) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null && currentQuestion) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          category: currentQuestion.category,
          level: currentQuestion.level,
          answer: selectedAnswer,
          isCorrect,
        },
      ]);
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Move to writing phase
      setPhase('writing');
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          category: currentQuestion.category,
          level: currentQuestion.level,
          answer: -1,
          isCorrect: false,
        },
      ]);
    }
    
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      setPhase('writing');
    }
  };

  const handleWritingNext = () => {
    if (currentWritingIndex < totalWriting - 1) {
      setCurrentWritingIndex(currentWritingIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleWritingChange = (text: string) => {
    const newResponses = [...writingResponses];
    newResponses[currentWritingIndex] = text;
    setWritingResponses(newResponses);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Calculate scores by category
    const categoryScores = {
      vocabulary: { correct: 0, total: 0, basicCorrect: 0, advancedCorrect: 0 },
      reading: { correct: 0, total: 0, basicCorrect: 0, advancedCorrect: 0 },
      situation: { correct: 0, total: 0, basicCorrect: 0, advancedCorrect: 0 },
    };

    answers.forEach((answer) => {
      const cat = answer.category as keyof typeof categoryScores;
      if (categoryScores[cat]) {
        categoryScores[cat].total++;
        if (answer.isCorrect) {
          categoryScores[cat].correct++;
          if (answer.level === 'basic') categoryScores[cat].basicCorrect++;
          if (answer.level === 'advanced') categoryScores[cat].advancedCorrect++;
        }
      }
    });

    // Calculate percentage scores
    const skillScores: SkillScore = {
      email: Math.round((categoryScores.vocabulary.correct / Math.max(categoryScores.vocabulary.total, 1)) * 100),
      meeting: Math.round((categoryScores.reading.correct / Math.max(categoryScores.reading.total, 1)) * 100),
      presentation: Math.round((categoryScores.situation.correct / Math.max(categoryScores.situation.total, 1)) * 100),
      negotiation: Math.round(
        ((categoryScores.vocabulary.advancedCorrect + categoryScores.reading.advancedCorrect + categoryScores.situation.advancedCorrect) / 9) * 100
      ),
    };

    // Rename for clarity in results
    const detailedScores = {
      vocabulary: Math.round((categoryScores.vocabulary.correct / Math.max(categoryScores.vocabulary.total, 1)) * 100),
      reading: Math.round((categoryScores.reading.correct / Math.max(categoryScores.reading.total, 1)) * 100),
      situationJudgment: Math.round((categoryScores.situation.correct / Math.max(categoryScores.situation.total, 1)) * 100),
    };

    const overallScore = Math.round(
      (detailedScores.vocabulary + detailedScores.reading + detailedScores.situationJudgment) / 3
    );

    // Determine business level
    let businessLevel: BusinessLevel;
    const advancedScore = (categoryScores.vocabulary.advancedCorrect + categoryScores.reading.advancedCorrect + categoryScores.situation.advancedCorrect) / 9;
    
    if (overallScore >= 85 && advancedScore >= 0.7) {
      businessLevel = 'executive';
    } else if (overallScore >= 70 && advancedScore >= 0.5) {
      businessLevel = 'advanced';
    } else if (overallScore >= 50) {
      businessLevel = 'intermediate';
    } else {
      businessLevel = 'entry';
    }

    // Determine strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (detailedScores.vocabulary >= 70) {
      strengths.push('Business vocabulary and terminology');
    } else {
      weaknesses.push('Business vocabulary');
    }

    if (detailedScores.reading >= 70) {
      strengths.push('Reading and comprehending business documents');
    } else {
      weaknesses.push('Business document comprehension');
    }

    if (detailedScores.situationJudgment >= 70) {
      strengths.push('Professional judgment in business situations');
    } else {
      weaknesses.push('Situational judgment skills');
    }

    // Interview readiness
    const interviewReadiness = getInterviewReadiness(overallScore, detailedScores);

    // Generate roadmap
    const roadmap = generateRoadmap(businessLevel, weaknesses);

    // Generate recommendations
    const recommendations = generateRecommendations(profile, businessLevel, weaknesses, detailedScores);

    // Complete
    onComplete({
      profile,
      businessLevel,
      overallScore,
      skillScores: {
        vocabulary: detailedScores.vocabulary,
        reading: detailedScores.reading,
        situationJudgment: detailedScores.situationJudgment,
        advancedSkills: Math.round(advancedScore * 100),
      },
      strengths: strengths.length > 0 ? strengths : ['Foundational business English skills'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['No major weaknesses identified'],
      interviewReadiness,
      recommendations,
      roadmap,
      recommendedServices: generateServiceRecommendations(profile, businessLevel, weaknesses),
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      vocabulary: 'VOCABULARY',
      reading: 'READING COMPREHENSION',
      situation: 'SITUATION JUDGMENT',
      writing: 'WRITING',
    };
    return labels[category] || category.toUpperCase();
  };

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      basic: 'var(--success)',
      intermediate: 'var(--secondary)',
      advanced: 'var(--accent)',
    };
    return colors[level] || 'var(--text-muted)';
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <p className="text-label mb-4">ANALYZING YOUR RESULTS</p>
          <h2 className="text-heading mb-4">Calculating your business English level</h2>
          <p className="text-small">Please wait...</p>
        </div>
      </div>
    );
  }

  // Writing phase
  if (phase === 'writing') {
    const currentPrompt = writingPrompts[currentWritingIndex];
    
    return (
      <div className="min-h-screen p-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-small">Writing Task {currentWritingIndex + 1} of {totalWriting}</p>
              <p className="text-small">{Math.round(progress)}% complete</p>
            </div>
          </div>

          <div className="animate-fade-in">
            <p className="text-label mb-2">WRITING</p>
            <p className="text-small mb-6" style={{ color: 'var(--accent)' }}>
              {currentPrompt.scenario}
            </p>

            <div 
              className="p-4 mb-6"
              style={{ 
                background: 'var(--white)', 
                border: '1px solid var(--border)',
                borderRadius: '2px'
              }}
            >
              <p className="text-body" style={{ whiteSpace: 'pre-line' }}>
                {currentPrompt.instruction}
              </p>
            </div>

            <textarea
              value={writingResponses[currentWritingIndex]}
              onChange={(e) => handleWritingChange(e.target.value)}
              className="w-full p-4 border text-body"
              style={{ 
                minHeight: '200px', 
                resize: 'vertical',
                background: 'var(--white)',
                borderColor: 'var(--border)',
                borderRadius: '2px',
                fontFamily: 'inherit'
              }}
              placeholder="Write your response here..."
            />

            <div className="flex justify-between items-center mt-4">
              <p className="text-small" style={{ color: 'var(--text-muted)' }}>
                {writingResponses[currentWritingIndex].length} characters
              </p>
              
              <button
                onClick={handleWritingNext}
                className="btn-primary"
              >
                {currentWritingIndex < totalWriting - 1 ? 'Next' : 'View Results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Questions phase
  return (
    <div className="min-h-screen p-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-small">Question {currentIndex + 1} of {totalQuestions}</p>
            <p className="text-small">{Math.round(progress)}% complete</p>
          </div>
        </div>

        <div className="animate-fade-in">
          {/* Category and level */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-label">{getCategoryLabel(currentQuestion.category)}</p>
            <span 
              className="text-xs px-2 py-1"
              style={{ 
                background: `${getLevelBadge(currentQuestion.level)}20`,
                color: getLevelBadge(currentQuestion.level),
                borderRadius: '2px'
              }}
            >
              {currentQuestion.level.toUpperCase()}
            </span>
          </div>

          {/* Context (for reading questions) */}
          {currentQuestion.context && (
            <div 
              className="p-4 mb-6"
              style={{ 
                background: 'var(--white)', 
                border: '1px solid var(--border)',
                borderRadius: '2px'
              }}
            >
              <p className="text-body" style={{ whiteSpace: 'pre-line', fontSize: '0.9rem', lineHeight: '1.7' }}>
                {currentQuestion.context}
              </p>
            </div>
          )}

          {/* Question */}
          <h2 className="text-heading mb-8" style={{ lineHeight: '1.8' }}>
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`option-card w-full ${selectedAnswer === index ? 'selected' : ''}`}
              >
                <div className="flex items-start">
                  <span 
                    className="mr-3 mt-0.5 text-small font-medium"
                    style={{ color: 'var(--text-muted)', minWidth: '20px' }}
                  >
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-body">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button 
              onClick={handleSkip} 
              className="text-small" 
              style={{ color: 'var(--text-muted)' }}
            >
              Skip this question
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary"
            >
              {currentIndex < totalQuestions - 1 ? 'Next' : 'Continue to Writing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getInterviewReadiness(overallScore: number, scores: { vocabulary: number; reading: number; situationJudgment: number }) {
  const avgCommunication = (scores.reading + scores.situationJudgment) / 2;
  
  if (overallScore >= 80 && avgCommunication >= 75) {
    return {
      level: 'confident' as const,
      description: 'You are well-prepared for English business interviews',
      tips: [
        'Practice industry-specific terminology',
        'Prepare STAR-format answers for common questions',
        'Focus on demonstrating your communication confidence',
      ],
    };
  } else if (overallScore >= 60 && avgCommunication >= 55) {
    return {
      level: 'ready' as const,
      description: 'You can handle basic English interviews with some preparation',
      tips: [
        'Prepare and practice self-introduction thoroughly',
        'Study common interview question patterns',
        'Work on speaking pace and clarity',
      ],
    };
  } else if (overallScore >= 40) {
    return {
      level: 'basic' as const,
      description: 'Additional preparation recommended before English interviews',
      tips: [
        'Master your self-introduction first',
        'Learn key business English phrases',
        'Practice with mock interviews',
      ],
    };
  } else {
    return {
      level: 'not_ready' as const,
      description: 'Foundational improvement needed before English interviews',
      tips: [
        'Focus on building core business vocabulary',
        'Practice listening comprehension',
        'Start with basic business conversation practice',
      ],
    };
  }
}

function generateRoadmap(level: BusinessLevel, weaknesses: string[]) {
  const roadmaps: Record<BusinessLevel, any[]> = {
    entry: [
      { phase: 1, title: 'Foundation Building', duration: '1-2 months', goals: ['Master 500 essential business terms', 'Practice daily email writing', 'Learn meeting basics'] },
      { phase: 2, title: 'Practical Application', duration: '2-3 months', goals: ['Handle basic client communications', 'Participate in English meetings', 'Write simple reports'] },
      { phase: 3, title: 'Confidence Building', duration: '2-3 months', goals: ['Lead small meetings', 'Handle phone conversations', 'Prepare for interviews'] },
    ],
    intermediate: [
      { phase: 1, title: 'Skill Strengthening', duration: '1-2 months', goals: weaknesses.map(w => `Improve ${w.toLowerCase()}`) },
      { phase: 2, title: 'Professional Communication', duration: '2-3 months', goals: ['Complex negotiations', 'Presentation skills', 'Cross-cultural communication'] },
      { phase: 3, title: 'Interview Preparation', duration: '1 month', goals: ['Mock interview practice', 'Industry-specific vocabulary', 'Behavioral question preparation'] },
    ],
    advanced: [
      { phase: 1, title: 'Executive Skills', duration: '1-2 months', goals: ['Strategic communication', 'Leadership language', 'High-stakes negotiations'] },
      { phase: 2, title: 'Specialization', duration: '1-2 months', goals: ['Industry expertise', 'Board-level presentations', 'Global team leadership'] },
    ],
    executive: [
      { phase: 1, title: 'Continuous Excellence', duration: 'Ongoing', goals: ['Stay current with business terminology', 'Cross-cultural leadership', 'Executive presence refinement'] },
    ],
  };

  return roadmaps[level];
}

function generateRecommendations(profile: UserProfile, level: BusinessLevel, weaknesses: string[], scores: { vocabulary: number; reading: number; situationJudgment: number }) {
  const recommendations: string[] = [];

  if (scores.vocabulary < 60) {
    recommendations.push('Focus on expanding your business vocabulary through daily practice with business news and industry publications.');
  }

  if (scores.reading < 60) {
    recommendations.push('Improve reading comprehension by practicing with actual business documents, contracts, and professional emails.');
  }

  if (scores.situationJudgment < 60) {
    recommendations.push('Develop situational judgment by studying case studies and practicing role-play scenarios.');
  }

  if (profile.goal === 'job_change') {
    recommendations.push('For job transitions, consider obtaining a recognized certification like TOEIC Business or BEC to validate your skills.');
  }

  if (profile.englishUsage.includes('interview')) {
    recommendations.push('Practice mock interviews with native speakers or AI tools to build confidence for real interview situations.');
  }

  return recommendations.length > 0 ? recommendations : ['Continue practicing to maintain and improve your business English skills.'];
}

function generateServiceRecommendations(profile: UserProfile, level: BusinessLevel, weaknesses: string[]) {
  const services = [];

  services.push({
    rank: 1,
    name: 'スタディサプリ ENGLISH ビジネス英語コース',
    description: 'Comprehensive business English learning app optimized for Japanese learners',
    category: 'app',
    pricing: '月額3,278円〜',
    freeTrialInfo: '7日間無料体験',
    whyRecommended: 'Structured curriculum covering all aspects of business English',
    affiliateLink: 'https://px.a8.net/svt/ejp?a8mat=4AVI3Y+5CB16A+3AQG+TSBEB',
  });

  if (weaknesses.some(w => w.toLowerCase().includes('situation') || w.toLowerCase().includes('judgment'))) {
    services.push({
      rank: 2,
      name: 'Bizmates',
      description: 'Business-focused online English lessons with experienced instructors',
      category: 'online-lesson',
      pricing: '月額13,200円〜',
      freeTrialInfo: '無料体験レッスンあり',
      whyRecommended: 'Practice real business scenarios with professional trainers',
      affiliateLink: 'https://www.bizmates.jp/',
    });
  }

  if (profile.englishUsage.includes('interview')) {
    services.push({
      rank: services.length + 1,
      name: 'Interview Practice Tool',
      description: 'AI-powered mock interviews for job seekers',
      category: 'tool',
      pricing: '無料',
      freeTrialInfo: '',
      whyRecommended: 'Practice interview scenarios to build confidence',
      affiliateLink: '/interview-tool',
    });
  }

  return services;
}
