import React from 'react';

const Portfolio = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-100 flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto relative">
        {/* 왼쪽 세로 라인 */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-green-400"></div>
        
        {/* 헤더 섹션 */}
        <div className="pt-24 pb-16 px-8 relative">
          {/* 새싹 아이콘 */}
          <div className="absolute left-1/2 -translate-x-1/2 top-20">
            <div className="relative w-32 h-16">
              <div className="w-16 h-12 border-t-2 border-l-2 border-r-2 rounded-t-full border-green-400 absolute top-0 left-0 transform -translate-x-1/4"></div>
              <div className="w-16 h-12 border-t-2 border-l-2 border-r-2 rounded-t-full border-green-400 absolute top-0 right-0 transform translate-x-1/4"></div>
            </div>
          </div>
          
          {/* 타이틀 */}
          <div className="text-center mt-16">
            <h2 className="text-green-400 text-4xl font-light tracking-wide mb-2">"새싹새싹"</h2>
            <div className="mt-8 space-y-1">
              <p className="text-3xl font-medium text-gray-800">성장해 나아가는</p>
              <div className="flex items-center justify-center space-x-1">
                <h1 className="text-4xl font-bold text-gray-800">웹 디자이너</h1>
                <span className="text-green-400 text-4xl font-medium">김새싹</span>
                <span className="text-3xl font-medium text-gray-800">입니다.</span>
              </div>
            </div>
            
            <div className="mt-6 text-gray-600">
              <p className="text-lg uppercase tracking-wide">WEB DESIGNER</p>
              <p className="text-lg tracking-wide">PORTFOLIO 2022</p>
            </div>
          </div>
        </div>
        
        {/* 가로 구분선 */}
        <div className="w-full h-0.5 bg-green-400 relative">
          <div className="absolute right-0 h-full w-0.5 bg-green-400"></div>
        </div>
        
        {/* 푸터 섹션 */}
        <div className="flex items-center justify-end h-44 relative">
          <div className="absolute right-8 bottom-16 text-right">
            <p className="text-gray-300 text-lg">Beyond <span className="text-green-400 font-medium">web</span></p>
            <p className="text-gray-300 text-lg">to <span className="text-green-400 font-medium">Brand Designer.</span></p>
          </div>
        </div>
        
        {/* 이동 버튼 */}
        <div className="absolute left-8 bottom-12 border border-green-400 text-green-400 px-6 py-2 rounded-sm hover:bg-green-50 transition-colors">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm">더 알아보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
