import type { Metadata } from 'next';
import './globals.css';
import Header from '@/common/Header';
import Footer from '@/common/Footer';

export const metadata: Metadata = {
  title: 'Blog 41',
  description: 'Blog 41 by b41',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <div id="container" className="w-full max-w-[1000px] px-4">
          <Header />
          <main className="flex w-full flex-col items-center gap-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
