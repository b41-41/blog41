import React from 'react';
import { PostType } from '../post.type';
import ColorfulCanvas from '@/common/ColorfulCanvas';

interface PostOverlayProps extends PostType {}

const palette = [
  [
    [255, 129, 0],
    [255, 0, 114]
  ],
  [
    [0, 159, 255],
    [151, 0, 255]
  ]
];

const PostOverlay = ({ title, description }: PostOverlayProps) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <ColorfulCanvas
        palette={palette}
        speed={1}
        scale={100}
        resolution={50}
        fadeInTime={150}
        animate={true}
      />
      
      <div className="z-highest absolute inset-0 mix-blend-difference text-white font-title p-4 overflow-auto flex flex-col items-center justify-center">
        <div className="max-w-full max-h-full px-4 py-6 sm:py-8 md:py-10 text-center">
          <h1 id="title" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold break-words mb-6">
            {title}
          </h1>
          <h2 id="description" className="text-2xl sm:text-3xl md:text-4xl break-words">
            {description}
          </h2>
        </div>
      </div>
    </div>
  )
};

export default PostOverlay;
