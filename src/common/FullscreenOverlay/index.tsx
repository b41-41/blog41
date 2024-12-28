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
      className={`fixed w-screen h-screen z-highest top-0 left-0`}
      onClick={handleClickOutside}
      style={{position: 'fixed'}}
    >
      {children}
    </main>
  )
}

export default FullscreenOverlay