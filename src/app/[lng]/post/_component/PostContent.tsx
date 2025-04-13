'use client';

import React from 'react';
import Markdown from 'react-markdown';
import CodeBlock from '@/components/CodeBlock';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  return (
    <section className="w-full border-normal rounded border-primary-dark bg-white p-4 overflow-hidden">
      <Markdown 
        className='prose w-full max-w-none p-4 overflow-hidden'
        components={{
          code(props) {
            const {children, className, node} = props;
            
            const isCodeBlock = node?.tagName === 'code' && 
                                node?.position?.start?.line !== node?.position?.end?.line;
            
            if (!isCodeBlock) {
              return <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-900">{children}</code>;
            }
            
            const language = className ? className.replace('language-', '') : 'text';
            return <CodeBlock language={language} value={String(children)} />;
          }
        }}
      >
        {content}
      </Markdown>
    </section>
  );
};

export default PostContent;
