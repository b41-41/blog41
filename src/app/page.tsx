import FullscreenOverlay from '@/common/FullscreenOverlay';
import Home from '@/components/Home';
import HomeOverlay from '@/components/HomeOverlay';

export default function HomePage() {
  return (
    <>
      <FullscreenOverlay>
        <HomeOverlay />
      </FullscreenOverlay>
    <main>
      <Home />
    </main>
    </>
  );
}
