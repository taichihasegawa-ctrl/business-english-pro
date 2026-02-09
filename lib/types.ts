// Business English Pro - 型定義

export type BusinessLevel = 'entry' | 'intermediate' | 'advanced' | 'executive';

export const businessLevelDescriptions: Record<BusinessLevel, string> = {
  entry: 'Entry Level - Can handle basic emails and simple conversations',
  intermediate: 'Working Level - Can participate in meetings and give basic presentations',
  advanced: 'Professional Level - Can negotiate and handle complex discussions',
  executive: 'Executive Level - Can lead strategic discussions at management level',
};

export interface UserProfile {
  jobType: 'sales' | 'engineer' | 'marketing' | 'management' | 'other';
  englishUsage: ('email' | 'meeting' | 'presentation' | 'negotiation' | 'interview')[];
  goal: 'job_change' | 'promotion' | 'overseas' | 'skill_up';
  currentLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
}

export interface TestAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  skipped?: boolean;
}

export interface SkillScore {
  vocabulary: number;      // Business vocabulary & terminology
  reading: number;         // Reading comprehension
  situationJudgment: number; // Situation judgment
  advancedSkills: number;  // Performance on advanced questions
}

export interface DiagnosisResult {
  profile: UserProfile;
  businessLevel: BusinessLevel;
  overallScore: number;
  skillScores: SkillScore;
  strengths: string[];
  weaknesses: string[];
  interviewReadiness: {
    level: 'not_ready' | 'basic' | 'ready' | 'confident';
    description: string;
    tips: string[];
  };
  recommendations: string[];
  roadmap: {
    phase: number;
    title: string;
    duration: string;
    goals: string[];
  }[];
  recommendedServices: {
    rank: number;
    name: string;
    description: string;
    category: string;
    pricing: string;
    freeTrialInfo?: string;
    whyRecommended: string;
    affiliateLink: string;
  }[];
}
