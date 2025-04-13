import React from 'react';
import type { PostType } from '../post.type';
import Tags from '@/components/Tags';
import Markdown from 'react-markdown'
import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import CodeBlock from '@/components/CodeBlock';
import { formatToLocalTime } from '@/utils/dayjs';
import PostContent from './PostContent';

interface PostProps extends PostType {
  //   updatedAt: string;
  //   thumbnail: string;
  //   author: string;
  //   category: string;
  //   views: number;
  //   likes: number;
  //   comments: number;
}

const Post = ({ title, description, tags, content, createdAt, lng }: PostProps & { lng: string }) => {


  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 py-4">
      <div className="border-normal flex w-full flex-col items-center justify-center gap-4 rounded border-primary-dark bg-white p-4 overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-900 break-words w-full text-center">{title}</h1>
        <p className="text-2xl text-gray-800 break-words w-full text-center">{description}</p>
        <p className="text-xl text-gray-700 break-words w-full text-center">작성일 : {formatToLocalTime(createdAt, DEFAULT_DATE_FORMAT)}</p>
      </div>
      <Tags lng={lng} tags={tags} showAll />
      <PostContent content={content} />
    </article>
  );
};

export default Post;
