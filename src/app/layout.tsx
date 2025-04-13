import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Suspense } from 'react';
import Loading from './loading';

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
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
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
      <body className="flex flex-col items-center bg-yellow-100 overflow-x-hidden">
        <div id="container" className="w-full max-w-[1000px] px-3 sm:px-4 md:px-6 overflow-hidden">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}
