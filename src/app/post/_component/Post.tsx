import React from 'react';
import { PostType } from '../post.type';
import Tags from '@/components/Tags';
import Markdown from 'react-markdown'
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from '@/common/constants';
import CodeBlock from '@/components/CodeBlock';

interface PostProps extends PostType {
  //   updatedAt: string;
  //   thumbnail: string;
  //   author: string;
  //   category: string;
  //   views: number;
  //   likes: number;
  //   comments: number;
}

const Post = ({ title, description, tags, content, createdAt }: PostProps) => {

  return (
    <article className="flex w-full flex-col items-center justify-center gap-4 py-4">
      <div className="border-normal flex w-full flex-col items-center justify-center gap-4 rounded border-primary-dark bg-white p-4 overflow-hidden">
        <h1 className="text-4xl font-bold text-gray-900 break-words w-full text-center">{title}</h1>
        <p className="text-2xl text-gray-800 break-words w-full text-center">{description}</p>
        <p className="text-xl text-gray-700 break-words w-full text-center">작성일 : {dayjs(createdAt).format(DEFAULT_DATE_FORMAT)}</p>
      </div>
      <Tags tags={tags} showAll />
      <section className="w-full border-normal rounded border-primary-dark bg-white p-4 overflow-hidden">
        <Markdown 
          className='prose w-full max-w-none p-4 overflow-hidden'
          components={{
            code(props) {
              const {children, className, node} = props;
              if (!node.properties.className) {
                return <code>{children}</code>
              }
              const language = className ? className.replace('language-', '') : '';
              return <CodeBlock language={language} value={String(children)} />;
            }
          }}
        >
          {content}
        </Markdown>
      </section>
    </article>
  );
};

export default Post;
