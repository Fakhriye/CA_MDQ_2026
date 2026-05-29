import './globals.css';

export const metadata = {
  title: 'Mastercard Data Quest | Solution',
  description: 'AI-Powered Hidden Entrepreneur Detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; /* Вот это исправит ошибку */
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-[#F0F4F8] text-[#0A1628]">
        {children}
      </body>
    </html>
  );
}