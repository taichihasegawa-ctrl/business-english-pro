'use client';

import { useState } from 'react';
import { DiagnosisResult, UserProfile, businessLevelDescriptions } from '@/lib/types';

interface JobMatchResult {
  matchLevel: 'high' | 'medium' | 'low' | 'not_ready';
  matchDescription: string;
  matchingPoints: string[];
  gapPoints: string[];
  advice: string;
  estimatedToeicRange: string;
  requiredToeicEstimate: string;
}

interface ResultsPageProps {
  results: DiagnosisResult;
  profile: UserProfile;
  onRestart: () => void;
}

export default function ResultsPage({ results, profile, onRestart }: ResultsPageProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showJobMatch, setShowJobMatch] = useState(false);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleJobMatchAnalysis = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          userProfile: {
            businessLevel: results.businessLevel,
            overallScore: results.overallScore,
            skillScores: results.skillScores,
            strengths: results.strengths,
            weaknesses: results.weaknesses,
            interviewReadiness: results.interviewReadiness,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        setJobMatchResult(data.result);
      }
    } catch (error) {
      console.error('Job match error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMatchLevelStyle = (level: string) => {
    const styles = {
      high: { color: '#2d6a4f', bg: 'rgba(45, 106, 79, 0.1)', label: '◎ 応募推奨' },
      medium: { color: '#3d5a80', bg: 'rgba(61, 90, 128, 0.1)', label: '○ 応募可能' },
      low: { color: '#c9a227', bg: 'rgba(201, 162, 39, 0.1)', label: '△ 要準備' },
      not_ready: { color: '#9d4e4e', bg: 'rgba(157, 78, 78, 0.1)', label: '✗ 準備不足' },
    };
    return styles[level as keyof typeof styles] || styles.medium;
  };

  const interviewReadinessColors = {
    confident: '#2d6a4f',
    ready: '#3d5a80',
    basic: '#c9a227',
    not_ready: '#9d4e4e',
  };

  // TOEICスコア目安
  const getToeicEstimate = (level: string, score: number) => {
    if (level === 'executive' || score >= 85) return 'TOEIC 860〜990点 相当';
    if (level === 'advanced' || score >= 70) return 'TOEIC 730〜860点 相当';
    if (level === 'intermediate' || score >= 50) return 'TOEIC 550〜730点 相当';
    return 'TOEIC 400〜550点 相当';
  };

  // レベル名を日本語に
  const getLevelNameJa = (level: string) => {
    const names: Record<string, string> = {
      entry: 'Entry',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      executive: 'Executive',
    };
    return names[level] || level;
  };

  // レベル説明を日本語に
  const getLevelDescriptionJa = (level: string) => {
    const descriptions: Record<string, string> = {
      entry: '基礎レベル - 定型的なビジネスメールや簡単な会話ができる',
      intermediate: '実務レベル - 会議参加やプレゼンの基本ができる',
      advanced: '即戦力レベル - 交渉や複雑な議論ができる',
      executive: 'エグゼクティブレベル - 経営レベルの議論や戦略的コミュニケーションができる',
    };
    return descriptions[level] || '';
  };

  return (
    <div className="min-h-screen p-6 py-16">
      <div className="max-w-2xl mx-auto">
        
        {/* ヘッダー */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-label mb-4">YOUR BUSINESS ENGLISH LEVEL</p>
          <h1 className="text-display mb-2" style={{ textTransform: 'capitalize' }}>
            {getLevelNameJa(results.businessLevel)}
          </h1>
          <p className="text-small mb-4" style={{ color: 'var(--text-muted)' }}>
            {getToeicEstimate(results.businessLevel, results.overallScore)}
          </p>
          <div className="accent-line-center"></div>
          <p className="text-body">
            {getLevelDescriptionJa(results.businessLevel)}
          </p>
        </div>

        {/* スキル別スコア */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-label mb-8">スキル別スコア</p>
          
          <div className="space-y-6">
            {[
              { key: 'vocabulary', label: 'ビジネス語彙・用語', score: results.skillScores.vocabulary },
              { key: 'reading', label: '読解力', score: results.skillScores.reading },
              { key: 'situationJudgment', label: '状況判断力', score: results.skillScores.situationJudgment },
              { key: 'advancedSkills', label: '上級スキル', score: results.skillScores.advancedSkills },
            ].map((skill) => (
              <div key={skill.key}>
                <div className="flex justify-between mb-2">
                  <span className="text-small">{skill.label}</span>
                  <span className="text-small">{skill.score}</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{ width: `${skill.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <div className="flex justify-between">
              <span className="text-small">総合スコア</span>
              <span className="text-body font-medium">{results.overallScore} / 100</span>
            </div>
          </div>
        </div>

        <div className="separator"></div>

        {/* 英語面接準備度 - 重要セクション */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-label mb-6">英語面接の準備度</p>
          
          <div 
            className="p-6 mb-6"
            style={{ 
              background: 'var(--white)', 
              border: `2px solid ${interviewReadinessColors[results.interviewReadiness.level]}`,
              borderRadius: '2px'
            }}
          >
            <p 
              className="text-label mb-2" 
              style={{ color: interviewReadinessColors[results.interviewReadiness.level] }}
            >
              {results.interviewReadiness.level === 'confident' && '✓ 面接準備OK'}
              {results.interviewReadiness.level === 'ready' && '○ 基本的に対応可能'}
              {results.interviewReadiness.level === 'basic' && '△ 準備が必要'}
              {results.interviewReadiness.level === 'not_ready' && '✗ 基礎力強化が必要'}
            </p>
            <p className="text-body mb-4">
              {results.interviewReadiness.level === 'confident' && '英語面接に自信を持って臨めるレベルです'}
              {results.interviewReadiness.level === 'ready' && '基本的な英語面接に対応できるレベルです'}
              {results.interviewReadiness.level === 'basic' && '英語面接には追加の準備が必要です'}
              {results.interviewReadiness.level === 'not_ready' && '英語面接の前に基礎力の強化が必要です'}
            </p>
            
            <ul className="space-y-2">
              {results.interviewReadiness.level === 'confident' && (
                <>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>業界特有の専門用語を確認しておきましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>STAR法を使った回答の準備をしましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>想定質問への回答を英語で練習しておきましょう</span></li>
                </>
              )}
              {results.interviewReadiness.level === 'ready' && (
                <>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>自己紹介・志望動機の英語版を準備しましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>よくある質問への回答パターンを練習しましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>面接特有の表現を学んでおきましょう</span></li>
                </>
              )}
              {results.interviewReadiness.level === 'basic' && (
                <>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>まずは自己紹介を英語で完璧にできるようにしましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>基本的なビジネス英語フレーズを覚えましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>英語でのQ&A練習を重ねましょう</span></li>
                </>
              )}
              {results.interviewReadiness.level === 'not_ready' && (
                <>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>ビジネス英語の基礎から学習を始めましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>簡単なフレーズから確実に使えるようにしましょう</span></li>
                  <li className="text-small flex items-start"><span style={{ color: 'var(--accent)' }} className="mr-2">→</span><span>日本語面接の内容を英語に翻訳する練習から始めましょう</span></li>
                </>
              )}
            </ul>
          </div>

          {/* 面接ツールへの導線 */}
          {profile.englishUsage.includes('interview') && (
            <div 
              className="p-6 text-center"
              style={{ 
                background: 'rgba(201, 162, 39, 0.08)', 
                border: '1px solid var(--accent)',
                borderRadius: '2px'
              }}
            >
              <p className="text-body mb-2">英語面接の実践練習をしませんか？</p>
              <p className="text-small mb-4" style={{ color: 'var(--text-muted)' }}>
                AI面接官との模擬面接で本番に備えましょう
              </p>
              <a 
                href="https://and-and-and.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta inline-block"
              >
                面接対策ツールを試す
              </a>
            </div>
          )}
        </div>

        <div className="separator"></div>

        {/* 求人マッチング機能 */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.25s' }}>
          <p className="text-label mb-6">JOB MATCH CHECK</p>
          
          {!showJobMatch ? (
            <div 
              className="p-6 text-center"
              style={{ 
                background: 'var(--white)', 
                border: '1px solid var(--border)',
                borderRadius: '2px'
              }}
            >
              <p className="text-body mb-2">気になる求人と英語力を照合</p>
              <p className="text-small mb-4" style={{ color: 'var(--text-muted)' }}>
                求人情報を貼り付けて、あなたの英語力で応募可能か判定します
              </p>
              <button 
                onClick={() => setShowJobMatch(true)}
                className="btn-secondary"
              >
                求人をチェックする
              </button>
            </div>
          ) : (
            <div 
              className="p-6"
              style={{ 
                background: 'var(--white)', 
                border: '1px solid var(--border)',
                borderRadius: '2px'
              }}
            >
              <p className="text-body mb-4">求人の採用情報・応募要件を貼り付けてください</p>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-4 border text-body"
                style={{ 
                  minHeight: '150px', 
                  resize: 'vertical',
                  background: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '2px'
                }}
                placeholder={`例：
【応募資格】
・ビジネスレベルの英語力（TOEIC 800点以上目安）
・英語での会議参加経験
・海外クライアントとの折衝経験

【歓迎スキル】
・英語でのプレゼンテーション経験
・海外勤務経験`}
              />

              <div className="flex justify-between items-center mt-4">
                <button 
                  onClick={() => {
                    setShowJobMatch(false);
                    setJobDescription('');
                    setJobMatchResult(null);
                  }}
                  className="text-small"
                  style={{ color: 'var(--text-muted)' }}
                >
                  閉じる
                </button>
                
                <button
                  onClick={handleJobMatchAnalysis}
                  disabled={!jobDescription.trim() || isAnalyzing}
                  className="btn-cta"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  {isAnalyzing ? '分析中...' : '判定する'}
                </button>
              </div>

              {/* 判定結果 */}
              {jobMatchResult && (
                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div 
                    className="p-4 mb-4"
                    style={{ 
                      background: getMatchLevelStyle(jobMatchResult.matchLevel).bg,
                      borderRadius: '2px'
                    }}
                  >
                    <p 
                      className="text-heading mb-2"
                      style={{ color: getMatchLevelStyle(jobMatchResult.matchLevel).color }}
                    >
                      {getMatchLevelStyle(jobMatchResult.matchLevel).label}
                    </p>
                    <p className="text-body">{jobMatchResult.matchDescription}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-small mb-2" style={{ color: 'var(--text-muted)' }}>
                        あなたの推定レベル
                      </p>
                      <p className="text-body font-medium">{jobMatchResult.estimatedToeicRange}</p>
                    </div>
                    <div>
                      <p className="text-small mb-2" style={{ color: 'var(--text-muted)' }}>
                        求人の推定要件
                      </p>
                      <p className="text-body font-medium">{jobMatchResult.requiredToeicEstimate}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-label mb-2">マッチしている点</p>
                    <ul className="space-y-1">
                      {jobMatchResult.matchingPoints.map((point, i) => (
                        <li key={i} className="text-small flex items-start">
                          <span style={{ color: 'var(--success)' }} className="mr-2">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <p className="text-label mb-2">補強が必要な点</p>
                    <ul className="space-y-1">
                      {jobMatchResult.gapPoints.map((point, i) => (
                        <li key={i} className="text-small flex items-start">
                          <span style={{ color: 'var(--accent)' }} className="mr-2">→</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div 
                    className="p-4"
                    style={{ 
                      background: 'var(--background)',
                      borderRadius: '2px'
                    }}
                  >
                    <p className="text-label mb-2">アドバイス</p>
                    <p className="text-body">{jobMatchResult.advice}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="separator"></div>

        {/* 強み */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-label mb-6">あなたの強み</p>
          <ul className="space-y-3">
            {results.strengths.map((strength, index) => (
              <li key={index} className="text-body flex items-start">
                <span style={{ color: 'var(--success)' }} className="mr-3 mt-1">—</span>
                <span>{strengthToJapanese(strength)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 改善ポイント */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-label mb-6">改善ポイント</p>
          <ul className="space-y-3">
            {results.weaknesses.map((weakness, index) => (
              <li key={index} className="text-body flex items-start">
                <span style={{ color: 'var(--accent)' }} className="mr-3 mt-1">—</span>
                <span>{weaknessToJapanese(weakness)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="separator"></div>

        {/* 推奨サービス */}
        {results.recommendedServices && results.recommendedServices.length > 0 && (
          <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-label mb-8">おすすめサービス</p>

            {results.recommendedServices.map((service, index) => (
              <div 
                key={service.rank} 
                className={index === 0 ? 'service-card-featured mb-4' : 'service-card mb-4'}
              >
                {index === 0 && (
                  <p className="text-label mb-2" style={{ color: 'var(--accent)' }}>
                    最適マッチ
                  </p>
                )}
                <h3 className="text-heading mb-2">{service.name}</h3>
                <p className="text-body mb-3">{service.description}</p>
                <p className="text-small mb-4">{service.whyRecommended}</p>
                
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <span className="text-body">{service.pricing}</span>
                    {service.freeTrialInfo && (
                      <span className="text-small ml-3" style={{ color: 'var(--success)' }}>
                        {service.freeTrialInfo}
                      </span>
                    )}
                  </div>
                  <a
                    href={service.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={index === 0 ? 'btn-cta' : 'btn-secondary'}
                    style={index === 0 ? {} : { padding: '0.75rem 1.5rem' }}
                  >
                    {service.category === 'tool' ? '無料で試す' : '詳細を見る'}
                  </a>
                </div>
              </div>
            ))}

            <p className="text-small mt-6 text-center" style={{ color: 'var(--text-muted)' }}>
              ※本ページにはアフィリエイトリンクが含まれます
            </p>
          </div>
        )}

        <div className="separator"></div>

        {/* ロードマップ */}
        {results.roadmap && results.roadmap.length > 0 && (
          <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-label mb-8">学習ロードマップ</p>
            
            <div className="space-y-8">
              {results.roadmap.map((phase, index) => (
                <div key={index} className="relative pl-6 border-l" style={{ borderColor: 'var(--border)' }}>
                  <div 
                    className="absolute left-[-4px] top-0 w-2 h-2 rounded-full"
                    style={{ background: 'var(--secondary)' }}
                  ></div>
                  
                  <p className="text-label mb-2">フェーズ {phase.phase}</p>
                  <h3 className="text-body font-medium mb-2">{phase.title}</h3>
                  <p className="text-small mb-4">{phase.duration}</p>
                  
                  <ul className="space-y-2">
                    {phase.goals.map((goal, i) => (
                      <li key={i} className="text-small flex items-start">
                        <span style={{ color: 'var(--secondary)' }} className="mr-2">·</span>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* アドバイス */}
        {results.recommendations && results.recommendations.length > 0 && (
          <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-label mb-6">あなたへのアドバイス</p>
            
            <ul className="space-y-4">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="text-body flex items-start">
                  <span className="text-label mr-4 mt-1">{String(index + 1).padStart(2, '0')}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center no-print mt-16">
          <button onClick={handleDownloadPDF} className="btn-secondary">
            結果を保存
          </button>
          <button onClick={onRestart} className="btn-secondary">
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}

// 英語の強みを日本語に変換
function strengthToJapanese(strength: string): string {
  const translations: Record<string, string> = {
    'Business vocabulary and terminology': 'ビジネス語彙・用語の理解',
    'Reading and comprehending business documents': 'ビジネス文書の読解力',
    'Professional judgment in business situations': 'ビジネス状況での適切な判断力',
    'Foundational business English skills': 'ビジネス英語の基礎力',
  };
  return translations[strength] || strength;
}

// 英語の弱みを日本語に変換
function weaknessToJapanese(weakness: string): string {
  const translations: Record<string, string> = {
    'Business vocabulary': 'ビジネス語彙の強化が必要',
    'Business document comprehension': 'ビジネス文書の読解力向上が必要',
    'Situational judgment skills': '状況判断力の向上が必要',
    'No major weaknesses identified': '大きな弱点は見られません',
  };
  return translations[weakness] || weakness;
}
