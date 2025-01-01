import React from 'react';
import { PostType } from '../post.type';

interface PostProps extends PostType {
  //   updatedAt: string;
  //   thumbnail: string;
  //   author: string;
  //   category: string;
  //   views: number;
  //   likes: number;
  //   comments: number;
}

const Post = ({ title, description, tags, content }: PostProps) => {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-2xl">{description}</p>
      <p className="text-2xl">{tags.join(', ')}</p>
      <p className="my-4 text-2xl">{content}</p>
    </article>
  );
};

export default Post;
