import React from 'react';
import Tag from './Tag';
import { getTranslation } from '@/i18n';

async function getTags() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
      cache: 'force-cache' 
    });

    return response.json();
  } catch (error) {
    throw new Error('태그를 가져오는데 실패했습니다', { cause: error });
  }
}

interface TagsProps {
  tags?: string[];
  lng: string;
}

const Tags = async ({ tags, lng }: TagsProps) => {
  const { t } = await getTranslation(lng, 'common');
  const allTags = await getTags();
  const tagsMap = tags || allTags || [];

  return (
    <div className="border-normal rounded-middle w-full border-primary-dark bg-white p-2 overflow-hidden whitespace-nowrap">
      <div className="inline-flex gap-2 animate-slide pause-on-hover">
        {tagsMap.map((tag: string) => (
          <Tag key={tag} text={tag} lng={lng} />
        ))}
        {tagsMap.length > 0 && tagsMap.map((tag: string) => (
          <Tag key={`dup-${tag}`} text={tag} lng={lng} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
