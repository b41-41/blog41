'use client';
import React, { useState } from 'react';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <pre data-language={language || 'text'} className="relative bg-gray-100 p-4 rounded-md border border-gray-300 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute bottom-2 right-2 text-gray-700 hover:text-gray-900 text-xs bg-white px-2 py-1 rounded"
      >
        {copied ? 'copied!' : 'copy'}
      </button>
      <code className="text-gray-900 block">{value}</code>
    </pre>
  );
};

export default CodeBlock; 