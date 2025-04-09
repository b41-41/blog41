'use client';

import React, { useState, useEffect } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // 현재 스크롤 위치
      const currentScroll = window.scrollY;
      // 전체 스크롤 높이 (문서 전체 높이 - 화면 높이)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // 스크롤 진행률 계산 (0 ~ 100%)
      const scrollPercent = scrollHeight > 0 ? (currentScroll / scrollHeight) * 100 : 0;
      
      setScrollProgress(scrollPercent);
    };

    // 초기 로드 시와 스크롤 시 업데이트
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);
    
    // 컴포넌트 마운트 시 초기 상태 설정
    updateScrollProgress();
    
    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[1px] bg-gray-200 z-50">
      <div 
        className="h-[1px] bg-primary-dark transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
