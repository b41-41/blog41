'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface FullscreenOverlayProps {
  children: React.ReactNode;
}

const FullscreenOverlay = ({ children }: FullscreenOverlayProps) => {
  const [isShow, setIsShow] = useState(true);

  const handleClickOutside = (e: React.MouseEvent) => {
    setIsShow(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsShow(false);
      }
    };

    const handleWheel = () => {
      setIsShow(false);
    };

    const handleTouch = () => {
      setIsShow(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel); 
      window.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  if (!isShow) return null;

  return (
    <main
      className={`fixed left-0 top-0 z-highest h-screen w-screen`}
      onClick={handleClickOutside}
      style={{ position: 'fixed' }}
    >
      {/* <div className="absolute left-10 top-10 h-[20vh] w-[20vw] p-4">
        <div className="h-full w-full">
          <Image src="/logo.png" alt="blog41" width={200} height={200} className="object-contain" />
        </div>
      </div> */}
      {children}
    </main>
  );
};

export default FullscreenOverlay;
