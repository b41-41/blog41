import React from 'react';
import { PostType } from '../post.type';

interface PostOverlayProps extends PostType {}

const PostOverlay = ({ title, description }: PostOverlayProps) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-yellow via-primary-light to-primary-blue">
      <h1 id="title" className="text-4xl font-bold text-white">
        {title}
      </h1>
      <h2 id="description" className="text-2xl text-white">
        {description}
      </h2>
    </div>
  );
};

export default PostOverlay;
