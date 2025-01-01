import React from 'react';
import Tag from './Tag';

const DUMMY_TAGS = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

const Tags = () => {
  return (
    <div className="border-normal rounded-middle flex w-full flex-wrap gap-2 border-primary-dark p-2">
      {DUMMY_TAGS.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
};

export default Tags;
