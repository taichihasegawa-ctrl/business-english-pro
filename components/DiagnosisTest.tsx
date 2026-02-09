'use client';

import { useState } from 'react';
import { UserProfile, DiagnosisResult, SkillScore, BusinessLevel } from '@/lib/types';
import { selectRandomQuestions, selectRandomWritingPrompt, Question } from '@/lib/questions';

interface DiagnosisTestProps {
  profile: UserProfile;
  onComplete: (result: DiagnosisResult) => void;
}

interface Answer {
  questionId: string;
  answer: number;
  isCorrect: boolean;
}

export default function DiagnosisTest({ profile, onComplete }: DiagnosisTestProps) {
  const [questions] = useState(() => selectRandomQuestions());
  const [writingPrompt] = useState(() => selectRandomWritingPrompt());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [writingResponse, setWritingResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length + 1; // +1 for writing
  const isWritingQuestion = currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (!isWritingQuestion && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          answer: selectedAnswer,
          isCorrect,
        },
      ]);
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    if (!isWritingQuestion) {
      setAnswers([
        ...answers,
        {
          questionId: currentQuestion.id,
          answer: -1,
          isCorrect: false,
        },
      ]);
    }
    
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // スコア計算
    const categoryScores: Record<string, { correct: number; total: number }> = {
      email: { correct: 0, total: 0 },
      meeting: { correct: 0, total: 0 },
      presentation: { correct: 0, total: 0 },
      negotiation: { correct: 0, total: 0 },
    };

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        categoryScores[question.category].total++;
        if (answer.isCorrect) {
          categoryScores[question.category].correct++;
        }
      }
    });

    const skillScores: SkillScore = {
      email: Math.round((categoryScores.email.correct / Math.max(categoryScores.email.total, 1)) * 100),
      meeting: Math.round((categoryScores.meeting.correct / Math.max(categoryScores.meeting.total, 1)) * 100),
      presentation: Math.round((categoryScores.presentation.correct / Math.max(categoryScores.presentation.total, 1)) * 100),
      negotiation: Math.round((categoryScores.negotiation.correct / Math.max(categoryScores.negotiation.total, 1)) * 100),
    };

    const overallScore = Math.round(
      (skillScores.email + skillScores.meeting + skillScores.presentation + skillScores.negotiation) / 4
    );

    // ビジネスレベル判定
    let businessLevel: BusinessLevel;
    if (overallScore >= 85) businessLevel = 'executive';
    else if (overallScore >= 70) businessLevel = 'advanced';
    else if (overallScore >= 50) businessLevel = 'intermediate';
    else businessLevel = 'entry';

    // 強み・弱みの判定
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    if (skillScores.email >= 70) strengths.push('ビジネスメール作成');
    else weaknesses.push('ビジネスメール');

    if (skillScores.meeting >= 70) strengths.push('会議でのコミュニケーション');
    else weaknesses.push('ミーティング英語');

    if (skillScores.presentation >= 70) strengths.push('プレゼンテーション');
    else weaknesses.push('プレゼン英語');

    if (skillScores.negotiation >= 70) strengths.push('交渉・折衝');
    else weaknesses.push('交渉英語');

    // 面接準備度の判定
    const interviewReadiness = getInterviewReadiness(overallScore, skillScores);

    // ロードマップ生成
    const roadmap = generateRoadmap(businessLevel, weaknesses);

    // 結果を返す
    onComplete({
      profile,
      businessLevel,
      overallScore,
      skillScores,
      strengths: strengths.length > 0 ? strengths : ['基礎的なビジネス英語力があります'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['大きな弱点は見られません'],
      interviewReadiness,
      recommendations: generateRecommendations(profile, businessLevel, weaknesses),
      roadmap,
      recommendedServices: generateServiceRecommendations(profile, businessLevel, weaknesses),
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      email: 'BUSINESS EMAIL',
      meeting: 'MEETING',
      presentation: 'PRESENTATION',
      negotiation: 'NEGOTIATION',
    };
    return labels[category] || category.toUpperCase();
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center animate-fade-in">
          <p className="text-label mb-4">ANALYZING</p>
          <h2 className="text-heading mb-4">結果を分析しています</h2>
          <p className="text-small">少々お待ちください...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 py-12">
      <div className="max-w-2xl mx-auto">
        
        {/* 進捗バー */}
        <div className="mb-8">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-small mt-2 text-right">
            {currentIndex + 1} / {totalQuestions}
          </p>
        </div>

        {!isWritingQuestion ? (
          // 選択式問題
          <div className="animate-fade-in">
            <p className="text-label mb-6">{getCategoryLabel(currentQuestion.category)}</p>
            
            {currentQuestion.context && (
              <p className="text-small mb-4 p-4" style={{ 
                background: 'var(--white)', 
                border: '1px solid var(--border)',
                borderRadius: '2px'
              }}>
                状況: {currentQuestion.context}
              </p>
            )}

            <h2 className="text-heading mb-8" style={{ lineHeight: '1.8' }}>
              {currentQuestion.question}
            </h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`option-card w-full ${selectedAnswer === index ? 'selected' : ''}`}
                >
                  <span className="text-body">{option}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleSkip} className="text-small" style={{ color: 'var(--text-muted)' }}>
                この質問をスキップ
              </button>
              
              <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="btn-primary"
              >
                次へ
              </button>
            </div>
          </div>
        ) : (
          // ライティング問題
          <div className="animate-fade-in">
            <p className="text-label mb-6">WRITING</p>
            
            <h2 className="text-heading mb-4">ビジネスライティング</h2>
            
            <p className="text-body mb-6">
              {writingPrompt.prompt}
            </p>

            <textarea
              value={writingResponse}
              onChange={(e) => setWritingResponse(e.target.value)}
              className="w-full p-4 border border-[var(--border)] rounded-sm text-body"
              style={{ 
                minHeight: '150px', 
                resize: 'vertical',
                background: 'var(--white)'
              }}
              placeholder="Write your response here..."
            />

            <p className="text-small mt-2 mb-8" style={{ color: 'var(--text-muted)' }}>
              {writingResponse.length} 文字
            </p>

            <div className="flex justify-between items-center">
              <button onClick={handleSkip} className="text-small" style={{ color: 'var(--text-muted)' }}>
                スキップして結果を見る
              </button>
              
              <button onClick={handleSubmit} className="btn-primary">
                診断結果を見る
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ヘルパー関数
function getInterviewReadiness(overallScore: number, skillScores: SkillScore) {
  const avgCommunication = (skillScores.meeting + skillScores.presentation) / 2;
  
  if (overallScore >= 80 && avgCommunication >= 75) {
    return {
      level: 'confident' as const,
      description: '英語面接に自信を持って臨めるレベルです',
      tips: [
        '業界特有の専門用語を確認しておきましょう',
        'STAR法を使った回答の準備をしましょう',
        '想定質問への回答を英語で練習しておきましょう',
      ],
    };
  } else if (overallScore >= 60 && avgCommunication >= 55) {
    return {
      level: 'ready' as const,
      description: '基本的な英語面接に対応できるレベルです',
      tips: [
        '自己紹介・志望動機の英語版を準備しましょう',
        'よくある質問への回答パターンを練習しましょう',
        '面接特有の表現を学んでおきましょう',
      ],
    };
  } else if (overallScore >= 40) {
    return {
      level: 'basic' as const,
      description: '英語面接には追加の準備が必要です',
      tips: [
        'まずは自己紹介を英語で完璧にできるようにしましょう',
        '基本的なビジネス英語フレーズを覚えましょう',
        '英語でのQ&A練習を重ねましょう',
      ],
    };
  } else {
    return {
      level: 'not_ready' as const,
      description: '英語面接の前に基礎力の強化が必要です',
      tips: [
        'ビジネス英語の基礎から学習を始めましょう',
        '簡単なフレーズから確実に使えるようにしましょう',
        '日本語面接の内容を英語に翻訳する練習から始めましょう',
      ],
    };
  }
}

function generateRoadmap(level: BusinessLevel, weaknesses: string[]) {
  const roadmaps: Record<BusinessLevel, any[]> = {
    entry: [
      { phase: 1, title: '基礎固め', duration: '1-2ヶ月', goals: ['ビジネス定型表現の習得', '基本的なメール作成', '簡単な会話練習'] },
      { phase: 2, title: '実践準備', duration: '2-3ヶ月', goals: ['実践的なメール作成', 'ミーティング参加の練習', '基礎プレゼン'] },
      { phase: 3, title: '実践力強化', duration: '3-4ヶ月', goals: ['実務での英語使用', '面接準備', '継続的な改善'] },
    ],
    intermediate: [
      { phase: 1, title: '弱点克服', duration: '1-2ヶ月', goals: weaknesses.map(w => `${w}の強化`) },
      { phase: 2, title: '実践力向上', duration: '2-3ヶ月', goals: ['複雑な議論への参加', 'プレゼンスキル向上', '交渉力強化'] },
      { phase: 3, title: '面接準備', duration: '1ヶ月', goals: ['英語面接対策', '模擬面接練習', '業界用語の習得'] },
    ],
    advanced: [
      { phase: 1, title: 'エグゼクティブスキル', duration: '1-2ヶ月', goals: ['高度な交渉術', 'リーダーシップ表現', '戦略的コミュニケーション'] },
      { phase: 2, title: '専門性強化', duration: '1-2ヶ月', goals: ['業界特化の表現', '経営レベルの議論', 'グローバル視点'] },
    ],
    executive: [
      { phase: 1, title: '継続的改善', duration: '継続', goals: ['最新ビジネス用語のキャッチアップ', 'クロスカルチャー対応', 'エグゼクティブ・プレゼンス'] },
    ],
  };

  return roadmaps[level];
}

function generateRecommendations(profile: UserProfile, level: BusinessLevel, weaknesses: string[]) {
  const recommendations: string[] = [];

  if (profile.goal === 'job_change') {
    recommendations.push('転職活動では、英語力を具体的な数字（TOEIC等）でアピールすることが重要です');
  }

  if (weaknesses.includes('ミーティング英語') || weaknesses.includes('プレゼン英語')) {
    recommendations.push('オンライン英会話でスピーキング練習を増やすことをお勧めします');
  }

  if (weaknesses.includes('ビジネスメール')) {
    recommendations.push('実践的なビジネスメールテンプレートを学ぶことで効率的にスキルアップできます');
  }

  if (profile.englishUsage.includes('interview')) {
    recommendations.push('英語面接対策ツールで実践的な練習をすることをお勧めします');
  }

  return recommendations;
}

function generateServiceRecommendations(profile: UserProfile, level: BusinessLevel, weaknesses: string[]) {
  const services = [];

  // ビジネス英語学習サービス
  services.push({
    rank: 1,
    name: 'スタディサプリ ENGLISH ビジネス英語コース',
    description: '日本人向けに最適化されたビジネス英語学習アプリ',
    category: 'app',
    pricing: '月額3,278円〜',
    freeTrialInfo: '7日間無料体験',
    whyRecommended: 'ビジネスシーン別のレッスンで効率的に学習できます',
    affiliateLink: 'https://px.a8.net/svt/ejp?a8mat=4AVI3Y+5CB16A+3AQG+TSBEB',
  });

  // 英会話サービス（スピーキングが弱い場合）
  if (weaknesses.includes('ミーティング英語') || weaknesses.includes('プレゼン英語')) {
    services.push({
      rank: 2,
      name: 'Bizmates',
      description: 'ビジネス特化型オンライン英会話',
      category: 'online-lesson',
      pricing: '月額13,200円〜',
      freeTrialInfo: '無料体験レッスンあり',
      whyRecommended: 'ビジネス経験のある講師とのマンツーマンで実践力が身につきます',
      affiliateLink: 'https://www.bizmates.jp/',
    });
  }

  // 面接対策（面接を選択した場合）
  if (profile.englishUsage.includes('interview')) {
    services.push({
      rank: services.length + 1,
      name: '英語面接対策ツール',
      description: 'AI面接官との実践的な面接練習',
      category: 'tool',
      pricing: '無料',
      freeTrialInfo: '',
      whyRecommended: '実際の面接を想定した練習ができます',
      affiliateLink: '/interview-tool', // 面接ツールへのリンク
    });
  }

  return services;
}
