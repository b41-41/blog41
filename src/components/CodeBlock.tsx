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
    <pre data-language={language || 'text'} className="relative">
      <button
        onClick={handleCopy}
        className="copy-button"
      >
        {copied ? 'copied!' : 'copy'}
      </button>
      <code>{value}</code>
    </pre>
  );
};

export default CodeBlock; 