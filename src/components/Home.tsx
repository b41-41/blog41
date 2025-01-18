import React from 'react';
import RecentPosts from './RecentPosts';

const Home = () => {
  return (
    <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
    <RecentPosts />
    </div>
  );
};

export default Home;
