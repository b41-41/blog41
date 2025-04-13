'use client';

import { useTranslation } from '@/i18n';
import { languages } from '@/i18n/settings';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  lng: string;
}

const LanguageSwitcher = ({ lng }: LanguageSwitcherProps) => {
  const { t } = useTranslation(lng, 'common');
  const pathname = usePathname();
  
  const getNewPath = (newLng: string) => {
    const pathWithoutLng = pathname.replace(`/${lng}`, '');
    return `/${newLng}${pathWithoutLng || ''}`;
  };
  
  const handleLanguageChange = (newLng: string) => {
    const newPath = getNewPath(newLng);
    window.location.href = newPath;
  };

  return (
    <div className="flex flex-row items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
      <div className="flex flex-row gap-2">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={`rounded px-2 py-1 text-sm ${
              language === lng
                ? 'bg-primary-dark text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`language.${language}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
