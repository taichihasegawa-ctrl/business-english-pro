'use client';

import { useState } from 'react';
import { UserProfile } from '@/lib/types';

interface ProfileFormProps {
  onComplete: (profile: UserProfile) => void;
}

export default function ProfileForm({ onComplete }: ProfileFormProps) {
  const [jobType, setJobType] = useState<UserProfile['jobType'] | ''>('');
  const [englishUsage, setEnglishUsage] = useState<UserProfile['englishUsage']>([]);
  const [goal, setGoal] = useState<UserProfile['goal'] | ''>('');
  const [currentLevel, setCurrentLevel] = useState<UserProfile['currentLevel'] | ''>('');

  const handleUsageToggle = (usage: UserProfile['englishUsage'][number]) => {
    if (englishUsage.includes(usage)) {
      setEnglishUsage(englishUsage.filter((u) => u !== usage));
    } else {
      setEnglishUsage([...englishUsage, usage]);
    }
  };

  const handleSubmit = () => {
    if (jobType && goal && currentLevel && englishUsage.length > 0) {
      onComplete({
        jobType,
        englishUsage,
        goal,
        currentLevel,
      });
    }
  };

  const isValid = jobType && goal && currentLevel && englishUsage.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full animate-fade-in">
        
        <div className="text-center mb-12">
          <p className="text-label mb-4">ABOUT YOU</p>
          <h2 className="text-heading">あなたについて教えてください</h2>
        </div>

        {/* 職種 */}
        <div className="mb-10">
          <p className="text-label mb-2">01 —</p>
          <p className="text-body mb-4">現在のお仕事</p>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'sales', label: '営業・事業開発' },
              { value: 'engineer', label: 'エンジニア・技術職' },
              { value: 'marketing', label: 'マーケティング・企画' },
              { value: 'management', label: 'マネジメント・管理職' },
              { value: 'other', label: 'その他' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setJobType(option.value as UserProfile['jobType'])}
                className={`option-card ${jobType === option.value ? 'selected' : ''}`}
              >
                <span className="text-small">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 英語を使う場面 */}
        <div className="mb-10">
          <p className="text-label mb-2">02 —</p>
          <p className="text-body mb-2">英語を使う（使いたい）場面</p>
          <p className="text-small mb-4" style={{ color: 'var(--text-muted)' }}>複数選択可</p>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'email', label: 'メール・ドキュメント' },
              { value: 'meeting', label: '会議・ミーティング' },
              { value: 'presentation', label: 'プレゼンテーション' },
              { value: 'negotiation', label: '交渉・折衝' },
              { value: 'interview', label: '英語面接' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleUsageToggle(option.value as UserProfile['englishUsage'][number])}
                className={`option-card ${englishUsage.includes(option.value as any) ? 'selected' : ''}`}
              >
                <span className="text-small">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 目標 */}
        <div className="mb-10">
          <p className="text-label mb-2">03 —</p>
          <p className="text-body mb-4">英語を学ぶ目的</p>
          
          <div className="space-y-3">
            {[
              { value: 'job_change', label: '転職・キャリアチェンジ', desc: '英語力を活かした転職を目指す' },
              { value: 'promotion', label: '昇進・キャリアアップ', desc: '現職でのポジションアップを目指す' },
              { value: 'overseas', label: '海外赴任・駐在', desc: '海外での業務に備える' },
              { value: 'skill_up', label: 'スキルアップ', desc: '業務効率化・自己成長のため' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setGoal(option.value as UserProfile['goal'])}
                className={`option-card w-full ${goal === option.value ? 'selected' : ''}`}
              >
                <span className="text-body block">{option.label}</span>
                <span className="text-small" style={{ color: 'var(--text-muted)' }}>{option.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 現在のレベル */}
        <div className="mb-12">
          <p className="text-label mb-2">04 —</p>
          <p className="text-body mb-4">現在の英語レベル（自己評価）</p>
          
          <div className="space-y-3">
            {[
              { value: 'none', label: 'ほぼ使えない', desc: '簡単な挨拶程度' },
              { value: 'basic', label: '基礎レベル', desc: '簡単なメールや日常会話ができる' },
              { value: 'intermediate', label: '中級レベル', desc: '会議やプレゼンの基本ができる' },
              { value: 'advanced', label: '上級レベル', desc: '複雑な議論や交渉ができる' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setCurrentLevel(option.value as UserProfile['currentLevel'])}
                className={`option-card w-full ${currentLevel === option.value ? 'selected' : ''}`}
              >
                <span className="text-body block">{option.label}</span>
                <span className="text-small" style={{ color: 'var(--text-muted)' }}>{option.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="btn-primary"
          >
            診断を開始する
          </button>
        </div>
      </div>
    </div>
  );
}
