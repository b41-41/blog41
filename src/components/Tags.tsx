import React from 'react';
import Tag from './Tag';

async function getTags() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
    cache: 'force-cache' 
    // cache: 'no-store' 
  });

  if (!response.ok) {
    throw new Error('태그를 가져오는데 실패했습니다');
  }

  return response.json();
}

const Tags = async ({ tags }: { tags?: string[] }) => {
  const allTags = await getTags();
  const tagsMap = tags || allTags || [];

  return (
    <div className="border-normal rounded-middle flex w-full flex-wrap gap-2 border-primary-dark bg-white p-2">
      {tagsMap.map((tag: string) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
};

export default Tags;
