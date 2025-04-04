import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '韓国グルメ予約サービス',
  description: '現地日本人に人気の韓国食堂予約サービス',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        style={{ 
          fontFamily: "'Noto Sans KR', sans-serif",
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {children}
      </body>
    </html>
  );
}