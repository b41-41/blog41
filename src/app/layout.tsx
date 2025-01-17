import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/common/Header';
import Footer from '@/common/Footer';

export const metadata: Metadata = {
  title: 'Blog 41',
  description: 'Blog 41 by b41',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0MPKHKXG2G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0MPKHKXG2G');
          `}
        </Script>
      </head>
      <body className="flex flex-col items-center bg-yellow-100">
        <div id="container" className="w-full max-w-[1000px] px-4">
          <Header />
          <main className="flex w-full flex-col items-center gap-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
