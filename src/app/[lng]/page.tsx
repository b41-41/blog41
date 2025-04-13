import Home from '@/components/Home';
import Tags from '@/components/Tags';

interface HomePageProps {
  params: {
    lng: string;
  };
}

export default async function HomePage({ params: { lng } }: HomePageProps) {

  return (
    <>
      <Tags lng={lng} />
      <Home lng={lng} />
    </>
  );
}
