import type { Metadata } from 'next';
import { languages } from '@/i18n/settings';
import { getTranslation } from '@/i18n';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import WriteButton from '@/common/WriteButton';
import { Suspense } from 'react';
import Loading from '../loading';

export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  const { lng } = params;
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

export default function LngLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <>
      <Header lng={lng} />
      <main className="flex w-full flex-col items-center gap-3 sm:gap-4 overflow-hidden">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer lng={lng} />
      <WriteButton lng={lng} />
    </>
  );
}
