'use client';

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full animate-fade-in">
        
        {/* メインコンテンツ */}
        <div className="text-center mb-12">
          {/* ラベル */}
          <p className="text-label mb-6">
            BUSINESS ENGLISH ASSESSMENT
          </p>
          
          {/* タイトル */}
          <h1 className="text-display mb-4">
            Business English Pro
          </h1>
          
          {/* アクセントライン */}
          <div className="accent-line-center"></div>
          
          {/* メインベネフィット */}
          <p className="text-body text-lg max-w-md mx-auto mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.9' }}>
            ビジネスで<strong style={{ color: 'var(--primary)' }}>通用する英語力</strong>を<br />
            <strong style={{ color: 'var(--primary)' }}>5分</strong>で診断します
          </p>

          <p className="text-small max-w-sm mx-auto">
            英語面接・会議・メール作成<br />
            あなたのレベルと改善点がわかります
          </p>

          {/* 信頼バッジ */}
          <div className="flex justify-center gap-4 mt-6">
            <span className="badge">✓ 登録不要</span>
            <span className="badge">✓ 完全無料</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <button 
            onClick={onStart} 
            className="btn-cta"
          >
            無料で診断する
          </button>
          
          <p className="text-small mt-4" style={{ color: 'var(--text-muted)' }}>
            約5分で完了 · 途中でやめてもOK
          </p>
        </div>

        {/* 区切り線 */}
        <div style={{ 
          width: '40px', 
          height: '1px', 
          background: 'var(--border)', 
          margin: '0 auto 2rem' 
        }}></div>

        {/* こんな方におすすめ */}
        <div className="mb-8">
          <p className="text-small text-center mb-6" style={{ color: 'var(--text-muted)' }}>
            こんな方におすすめ
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <span className="text-label mt-0.5" style={{ color: 'var(--accent)' }}>→</span>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>
                転職で英語力をアピールしたい
              </p>
            </div>
            
            <div className="flex items-start space-x-4">
              <span className="text-label mt-0.5" style={{ color: 'var(--accent)' }}>→</span>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>
                英語面接の準備を始めたい
              </p>
            </div>
            
            <div className="flex items-start space-x-4">
              <span className="text-label mt-0.5" style={{ color: 'var(--accent)' }}>→</span>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>
                グローバルな環境で働きたい
              </p>
            </div>
            
            <div className="flex items-start space-x-4">
              <span className="text-label mt-0.5" style={{ color: 'var(--accent)' }}>→</span>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>
                ビジネス英語の弱点を把握したい
              </p>
            </div>
          </div>
        </div>

        {/* 下部CTA */}
        <div className="text-center pt-4">
          <button 
            onClick={onStart} 
            className="btn-primary"
          >
            診断をはじめる
          </button>
        </div>
      </div>
    </div>
  );
}
