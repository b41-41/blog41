'use client';
import React, { useState, useEffect, useRef } from 'react';

interface FullscreenOverlayProps {
  children: React.ReactNode;
}

const FullscreenOverlay = ({ children }: FullscreenOverlayProps) => {
  const [isShow, setIsShow] = useState(true);
  const isThrottlingRef = useRef(false);
  const throttlingTimerRef = useRef<number | null>(null);
  
  const handleClose = () => {
    if (isThrottlingRef.current) return; // 이미 스로틀링 중이면 동작 무시
    
    setIsShow(false);
    
    isThrottlingRef.current = true;
    
    const blocker = document.createElement('div');
    blocker.id = 'event-blocker';
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100vw';
    blocker.style.height = '100vh';
    blocker.style.zIndex = '999999';
    document.body.appendChild(blocker);
    
    
    throttlingTimerRef.current = window.setTimeout(() => {
      isThrottlingRef.current = false;
      const eventBlocker = document.getElementById('event-blocker');
      if (eventBlocker && document.body.contains(eventBlocker)) {
        document.body.removeChild(eventBlocker);
      }
    }, 800);
  };

  useEffect(() => {
    // ESC, Enter 키로 오버레이 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        handleClose();
      }
    };

    // 휠 동작으로 오버레이 닫기
    const handleWheel = () => {
      handleClose();
    };
    
    // 메뉴 누르는 상황 차단
    const preventMenuNavigation = (e: MouseEvent | TouchEvent) => {
      if (isThrottlingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      return true;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('click', preventMenuNavigation, true);
    window.addEventListener('touchstart', preventMenuNavigation, { capture: true, passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', preventMenuNavigation, true);
      window.removeEventListener('touchstart', preventMenuNavigation, true);
      
      if (throttlingTimerRef.current !== null) {
        clearTimeout(throttlingTimerRef.current);
      }
      
      const eventBlocker = document.getElementById('event-blocker');
      if (eventBlocker && document.body.contains(eventBlocker)) {
        document.body.removeChild(eventBlocker);
      }
    };
  }, []);
  
  return isShow ? (
    <main
      className="fixed left-0 top-0 z-highest h-screen w-screen"
      onClick={handleClose}
      onTouchStart={(e) => {
        e.preventDefault(); 
        handleClose();
      }}
      style={{ position: 'fixed' }}
    >
      {children}
    </main>
  ) : null;
};

export default FullscreenOverlay;
