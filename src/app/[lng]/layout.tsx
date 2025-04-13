import type { Metadata } from 'next';
import { languages } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import WriteButton from '@/common/WriteButton';
import { Suspense } from 'react';
import Loading from '../loading';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await getTranslation(lng, 'common');

  return {
    title: 'Blog 41',
    description: 'Blog 41 by b41',
    icons: {
      icon: '/favicon.ico',
    }
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LngLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <>
      <Header lng={lng} />
      <main className="flex w-full flex-col items-center gap-3 sm:gap-4 overflow-hidden">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <WriteButton lng={lng} />
    </>
  );
}
