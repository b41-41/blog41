import React from 'react';
import type { PostType } from '../post.type';
import Tags from '@/components/Tags';
import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import { formatToLocalTime } from '@/utils/dayjs';
import PostContent from './PostContent';
import { getTranslation } from '@/i18n';
import EditButton from './EditButton';

interface PostProps extends PostType {
  //   updatedAt: string;
  //   thumbnail: string;
  //   author: string;
  //   category: string;
  //   views: number;
  //   likes: number;
  //   comments: number;
}

const Post = async ({ 
  title, 
  description, 
  tags, 
  content, 
  createdAt, 
  lng,
  postId,
}: PostProps & { lng: string }) => {
  const { t } = await getTranslation(lng, 'common');
  
  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 py-4 relative">
      <div className="border-normal flex w-full flex-col items-center justify-center gap-4 rounded border-primary-dark bg-white p-4 overflow-hidden relative">
        <h1 className="text-4xl font-bold text-gray-900 break-words w-full text-center">{title}</h1>
        <p className="text-2xl text-gray-800 break-words w-full text-center">{description}</p>
        <p className="text-xl text-gray-700 break-words w-full text-center">{t('post.publishedOn')}: {formatToLocalTime(createdAt, DEFAULT_DATE_FORMAT)}</p>
          <EditButton lng={lng} postId={postId} />
      </div>
      <Tags lng={lng} tags={tags} showAll />
      <div className="w-full relative">
        <PostContent content={content} />
      </div>
    </article>
  );
};

export default Post;
