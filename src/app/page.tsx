import FullscreenOverlay from '@/common/FullscreenOverlay';
import Home from '@/components/home';

export default function HomePage() {
  return (
    <main>
      <FullscreenOverlay>
      <Home />
      </FullscreenOverlay>
    </main>
  );
}
