import React from 'react';
import RecentPosts from './RecentPosts';
import RecentTIL from './RecentTIL';

const Home = () => {
  return (
    <div className="border-normal rounded-middle w-full border-primary-dark bg-white p-4 sm:p-6 shadow-sm">
      
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8">
        <div className="w-full md:w-1/2">
          <h2 className='text-xl sm:text-2xl font-bold w-full text-gray-800 mb-4 border-b border-gray-200 pb-2'>Blog Posts</h2>
          <RecentPosts />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className='text-xl sm:text-2xl font-bold w-full text-gray-800 mb-4 border-b border-gray-200 pb-2'>Today I Learned</h2>
          <RecentTIL />
        </div>
      </div>
    </div>
  );
};

export default Home;
