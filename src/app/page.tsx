import FullscreenOverlay from '@/common/FullscreenOverlay';
import Home from '@/components/Home';
import HomeOverlay from '@/components/HomeOverlay';
import Tags from '@/components/Tags';

export default async function HomePage() {

  return (
    <>
      <FullscreenOverlay>
        <HomeOverlay />
      </FullscreenOverlay>
      <Tags />
      <Home />
    </>
  );
}
