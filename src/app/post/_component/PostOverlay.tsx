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
    <div className="w-full h-full relative flex items-center justify-center">
      <div  className="z-highest absolute mix-blend-difference text-white font-title p-4">
        <h1 id="title" className="text-6xl font-bold  ">{title}</h1>
      <h2 id="description" className="text-2xl">
        {description}
      </h2>
      </div>
    <ColorfulCanvas
    palette={palette}
    speed={1}
    scale={100}
    resolution={50}
    fadeInTime={150}
    animate={true}
  />
    </div>
  )
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-yellow via-primary-light to-primary-blue p-4 ">
      <h1 id="title" className="text-6xl font-bold text-white font-title">
        {title}
      </h1>
      <h2 id="description" className="text-2xl text-white font-title">
        {description}
      </h2>
    </div>
  );
};

export default PostOverlay;
