import Home from '@/components/Home';
import Tags from '@/components/Tags';

interface HomePageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;

  return (
    <>
      <Tags lng={lng} />
      <Home lng={lng} />
    </>
  );
}
