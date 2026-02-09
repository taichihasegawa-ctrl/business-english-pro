import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Business English Pro | ビジネス英語力診断',
  description: 'ビジネスで通用する英語力を5分で診断。英語面接・会議・メール作成に必要なレベルがわかります。',
  openGraph: {
    title: 'Business English Pro | ビジネス英語力診断',
    description: 'ビジネスで通用する英語力を5分で診断。英語面接・会議・メール作成に必要なレベルがわかります。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
