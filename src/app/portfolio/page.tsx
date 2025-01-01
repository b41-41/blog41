import FullscreenOverlay from '@/common/FullscreenOverlay';
import PortfolioOverlay from '@/app/portfolio/_component/PortfolioOverlay';
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
