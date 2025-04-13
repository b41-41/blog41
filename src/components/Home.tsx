import React from 'react';
import RecentPosts from './RecentPosts';
import RecentTIL from './RecentTIL';
import { getTranslation } from '@/i18n';

interface HomeProps {
  lng: string;
}

const Home = async ({ lng }: HomeProps) => {
  const { t } = await getTranslation(lng, 'common');
  return (
    <div className="border-normal rounded-middle w-full border-primary-dark bg-white p-4 sm:p-6 shadow-sm">
      
      <div className="flex flex-col md:flex-row w-full gap-6 md:gap-8">
        <div className="w-full md:w-1/2">
          <h2 className='text-xl sm:text-2xl font-bold w-full text-gray-800 mb-4 border-b border-gray-200 pb-2'>{t('menu.blog')}</h2>
          <RecentPosts lng={lng} />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className='text-xl sm:text-2xl font-bold w-full text-gray-800 mb-4 border-b border-gray-200 pb-2'>Today I Learned</h2>
          <RecentTIL lng={lng} />
        </div>
      </div>
    </div>
  );
};

export default Home;
