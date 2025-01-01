import React from 'react';
import { PostType } from '../post.type';
import Tags from '@/components/Tags';

interface PostProps extends PostType {
  //   updatedAt: string;
  //   thumbnail: string;
  //   author: string;
  //   category: string;
  //   views: number;
  //   likes: number;
  //   comments: number;
}

const Post = ({ title, description, tags, content, createdAt }: PostProps) => {
  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 py-4">
      <div className="border-normal flex w-full flex-col items-center justify-center gap-4 rounded border-primary-dark bg-white p-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-2xl">{description}</p>
        <p className="text-secondary-dark text-2xl">created at: {createdAt}</p>
      </div>
      <Tags tags={tags} />
      <p className="border-normal rounded border-primary-dark bg-white p-4 text-2xl">{content}</p>
    </article>
  );
};

export default Post;
