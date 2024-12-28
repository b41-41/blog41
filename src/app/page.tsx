import FullscreenOverlay from '@/common/FullscreenOverlay';
import Home from '@/components/home';
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
