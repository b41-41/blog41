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
  showAll?: boolean;
  lng: string;
}

const Tags = async ({ tags, showAll = false, lng }: TagsProps) => {
  const { t } = await getTranslation(lng, 'common');
  const allTags = await getTags();
  const tagsMap = tags || allTags || [];

  return (
    <div className="border-normal rounded-middle flex w-full flex-wrap gap-2 border-primary-dark bg-white p-2">
      {(showAll ? tagsMap : tagsMap.slice(0, 20)).map((tag: string) => (
        <Tag key={tag} text={tag} lng={lng} />
      ))}
      {!showAll && tagsMap.length > 20 && <Tag key="etc." text="..." lng={lng} />}
    </div>
  );
};

export default Tags;
