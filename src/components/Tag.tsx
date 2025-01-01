import React from 'react';

const colors = [
  'bg-primary-blue text-white',
  'bg-primary-orange text-white',
  'bg-primary-green text-white',
  'bg-primary-yellow text-white',
];

const Tag = ({ text }: { text: string }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return <div className={`rounded-large px-3 py-1 text-sm ${randomColor}`}>{text}</div>;
};

export default Tag;
