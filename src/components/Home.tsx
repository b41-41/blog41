import React from 'react';
import Posts from './Posts';

const Home = () => {
  return (
    <div className="border-normal rounded-middle flex w-full flex-col gap-2 border-primary-dark bg-white p-4">
      <Posts />
    </div>
  );
};

export default Home;
