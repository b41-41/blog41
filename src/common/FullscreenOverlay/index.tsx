'use client'
import React, { useState } from 'react'

interface FullscreenOverlayProps {
	children: React.ReactNode;
}

const FullscreenOverlay = ({children}: FullscreenOverlayProps) => {
	const [isShow, setIsShow] = useState(true);	

  const handleClickOutside = (e: React.MouseEvent) => {
      setIsShow(false);
  };

  if(!isShow) return null;

  return (
    <main 
      className={`w-full h-full z-highest`}
      onClick={handleClickOutside}
    >
      {children}
    </main>
  )
}

export default FullscreenOverlay