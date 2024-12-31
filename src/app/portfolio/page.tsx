import FullscreenOverlay from '@/common/FullscreenOverlay';
import PortfolioOverlay from '@/components/PortfolioOverlay';
import React from 'react';

const PortfolioPage = () => {
  return (
    <>
      <FullscreenOverlay>
        <PortfolioOverlay />
      </FullscreenOverlay>
      <div>Portfolio</div>
    </>
  );
};

export default PortfolioPage;
