import FullscreenOverlay from '@/common/FullscreenOverlay';
import PortfolioOverlay from '@/app/portfolio/_component/PortfolioOverlay';
import React from 'react';
import Portfolio from './_component/Portfolio';

const PortfolioPage = () => {
  return (
    <>
      <FullscreenOverlay>
        <PortfolioOverlay />
      </FullscreenOverlay>
      <Portfolio />
    </>
  );
};

export default PortfolioPage;
