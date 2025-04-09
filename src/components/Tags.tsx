import React from 'react';
import Tag from './Tag';

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
}

const Tags = async ({ tags, showAll = false }: TagsProps) => {
  const allTags = await getTags();
  const tagsMap = tags || allTags || [];

  return (
    <div className="border-normal rounded-middle flex w-full flex-wrap gap-2 border-primary-dark bg-white p-2">
      {(showAll ? tagsMap : tagsMap.slice(0, 20)).map((tag: string) => (
        <Tag key={tag} text={tag} />
      ))}
      {!showAll && tagsMap.length > 20 && <Tag key="etc." text="..." />}
    </div>
  );
};

export default Tags;
