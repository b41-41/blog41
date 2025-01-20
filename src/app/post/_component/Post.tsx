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
      <div className="border-normal flex w-full flex-col items-center justify-center gap-4 rounded border-primary-dark bg-white p-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-2xl">{description}</p>
        <p className="text-secondary-dark text-2xl">created at: {dayjs(createdAt).format(DEFAULT_DATE_FORMAT)}</p>
      </div>
      <Tags tags={tags} />
      <section className="w-full border-normal rounded border-primary-dark bg-white p-4">
        <Markdown 
          className='prose w-full max-w-none'
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
