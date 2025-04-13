import React from 'react';
import Link from 'next/link';

const colors = [
  'bg-primary-blue text-white',
  'bg-primary-orange text-white',
  'bg-primary-green text-white',
  'bg-primary-yellow text-white',
];

interface TagProps {
  text: string;
  lng: string;
}

const Tag = ({ text, lng }: TagProps) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Link href={`/${lng}/tag/${encodeURIComponent(text)}`}>
      <div className={`rounded-large px-3 py-1 text-sm ${randomColor} cursor-pointer`}>{text}</div>
    </Link>
  );
};

export default Tag;
