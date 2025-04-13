'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';
import { useTranslation } from '@/i18n';
import { languages } from '@/i18n/settings';

// 한국어 로케일 설정
dayjs.locale('ko');

export default function AddPostForm() {
  const router = useRouter();
  const params = useParams();
  const lng = params?.lng as string || 'ko';
  const { t } = useTranslation(lng, 'common');
  
  // 기본 언어 설정
  const [originalLanguage, setOriginalLanguage] = useState<string>('ko');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['ko']);
  
  // 기본 포스트 정보
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['TIL']);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // 다국어 번역 정보
  const [translations, setTranslations] = useState<Record<string, {
    title: string;
    description: string;
    content: string;
    tags: string[];
    isComplete: boolean;
  }>>({});
  
  // 현재 편집 중인 언어
  const [currentLanguage, setCurrentLanguage] = useState<string>('ko');
  
  // UI 상태
  const [isLoading, setIsLoading] = useState(false);
  const [tagSearchText, setTagSearchText] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [isTIL, setIsTIL] = useState(true);
  const newTagInputRef = useRef<HTMLInputElement>(null);
  
  // 로컬 환경인지 확인하고 아닌 경우 홈으로 리다이렉트
  useEffect(() => {
    // 클라이언트 측에서 실행되는 환경 확인
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
    
    if (!isLocal) {
      router.replace('/');
    }
  }, [router]);

  // 태그 목록 가져오기
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get('/api/tags');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('태그를 불러오는 중 오류 발생:', error);
      }
    }
    
    fetchTags();
  }, []);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
      if (tag === 'TIL') setIsTIL(false);
      
      // 모든 언어에 대해 태그 제거
      if (tag === 'TIL') {
        // 원본 데이터 업데이트
        setOriginalData(prev => ({
          ...prev,
          tags: prev.tags.filter(t => t !== 'TIL')
        }));
        
        // 번역 데이터 업데이트
        setTranslations(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(lang => {
            updated[lang] = {
              ...updated[lang],
              tags: updated[lang].tags.filter(t => t !== 'TIL')
            };
          });
          return updated;
        });
      }
    } else {
      setSelectedTags([...selectedTags, tag]);
      if (tag === 'TIL') setIsTIL(true);
      
      // 모든 언어에 대해 태그 추가
      if (tag === 'TIL') {
        // 원본 데이터 업데이트
        setOriginalData(prev => ({
          ...prev,
          tags: prev.tags.includes('TIL') ? prev.tags : [...prev.tags, 'TIL']
        }));
        
        // 번역 데이터 업데이트
        setTranslations(prev => {
          const updated = { ...prev };
          Object.keys(updated).forEach(lang => {
            if (!updated[lang].tags.includes('TIL')) {
              updated[lang] = {
                ...updated[lang],
                tags: [...updated[lang].tags, 'TIL']
              };
            }
          });
          return updated;
        });
      }
    }
  };
  
  const toggleTIL = (checked: boolean) => {
    setIsTIL(checked);
    if (checked) {
      if (!selectedTags.includes('TIL')) {
        setSelectedTags([...selectedTags, 'TIL']);
      }
    } else {
      setSelectedTags(selectedTags.filter(t => t !== 'TIL'));
    }
  };
  
  const handleAddNewTag = () => {
    if (newTagText.trim() && !availableTags.includes(newTagText.trim())) {
      setAvailableTags([...availableTags, newTagText.trim()]);
      setSelectedTags([...selectedTags, newTagText.trim()]);
      setNewTagText('');
      setIsAddingNewTag(false);
    }
  };

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagSearchText.toLowerCase())
  );
  
  const displayedTags = showAllTags ? filteredTags : filteredTags.slice(0, 10);

  useEffect(() => {
    if (isAddingNewTag && newTagInputRef.current) {
      newTagInputRef.current.focus();
    }
  }, [isAddingNewTag]);

  // 원본 언어 데이터 저장 변수
  const [originalData, setOriginalData] = useState({
    title: '',
    description: '',
    content: '',
    tags: ['TIL']
  });
  
  // 언어 변경 함수
  const changeLanguage = (lang: string) => {
    // 현재 언어의 데이터 저장
    if (currentLanguage !== lang) {
      // 현재 데이터 저장
      if (currentLanguage === originalLanguage) {
        // 원본 언어인 경우 원본 데이터 변수에 저장
        setOriginalData({
          title,
          description,
          content,
          tags: [...selectedTags]
        });
      } else {
        // 번역 언어인 경우 translations에 저장
        saveCurrentLanguageData();
      }
      
      // 언어 변경
      setCurrentLanguage(lang);
      
      // 새 언어의 데이터 불러오기
      if (lang === originalLanguage) {
        // 원본 언어일 경우 원본 데이터 사용
        setTitle(originalData.title);
        setDescription(originalData.description);
        setContent(originalData.content);
        // 태그는 변경하지 않음
      } else if (translations[lang]) {
        // 번역이 있는 경우
        setTitle(translations[lang].title);
        setDescription(translations[lang].description);
        setContent(translations[lang].content);
        // 태그는 변경하지 않음
      } else {
        // 번역이 없는 경우 빈 데이터로 초기화
        setTitle('');
        setDescription('');
        setContent('');
        // 태그는 변경하지 않음
      }
    }
  };
  
  // 현재 언어 데이터 저장
  const saveCurrentLanguageData = () => {
    // 현재 언어의 데이터 저장 (원본 언어가 아닌 경우만)
    if (currentLanguage !== originalLanguage) {
      const isComplete = Boolean(title && content); // 필수 필드가 있으면 완료로 표시
      
      setTranslations(prev => ({
        ...prev,
        [currentLanguage]: {
          title,
          description,
          content,
          tags: selectedTags, // 태그는 현재 선택된 태그 사용
          isComplete
        }
      }));
      
      // 사용 가능한 언어 업데이트
      if (!availableLanguages.includes(currentLanguage) && isComplete) {
        setAvailableLanguages([...availableLanguages, currentLanguage]);
      }
    }
  };
  
  // 포스트 저장 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 현재 데이터 저장
    if (currentLanguage === originalLanguage) {
      // 원본 언어인 경우 원본 데이터 업데이트
      setOriginalData({
        title,
        description,
        content,
        tags: [...selectedTags]
      });
    } else {
      // 번역 언어인 경우 translations에 저장
      saveCurrentLanguageData();
    }
    
    // 원본 언어의 데이터 필수 값 확인
    const originalTitle = currentLanguage === originalLanguage ? title : originalData.title;
    const originalContent = currentLanguage === originalLanguage ? content : originalData.content;
    
    if (!originalTitle || !originalContent) {
      alert(t('post.titleAndContentRequired') || '제목과 내용은 필수입니다.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 다국어 정보를 포함한 데이터 구성
      const postData = {
        title: originalData.title,
        description: originalData.description,
        content: originalData.content,
        tags: originalData.tags,
        createdAt: selectedDate.toISOString(),
        originalLanguage,
        availableLanguages,
        translations
      };
      
      await axios.post('/api/add', postData);
      
      alert(t('post.saveSuccess') || '포스트가 성공적으로 저장되었습니다.');
      router.push(`/${lng}`);
    } catch (error) {
      console.error('포스트 저장 중 오류 발생:', error);
      alert(t('post.saveError') || '포스트 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('post.newPost') || '새 글 작성'}</h1>
      
      {/* 언어 선택 탭 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t('post.selectLanguage') || '언어 선택'}
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {languages.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentLanguage === lang
                  ? 'bg-primary-dark text-white'
                  : availableLanguages.includes(lang)
                    ? 'bg-primary-light text-primary-dark'
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              {t(`language.${lang}`)}
              {availableLanguages.includes(lang) && currentLanguage !== lang && (
                <span className="ml-1 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {t('post.originalLanguage') || '원본 언어'}: {t(`language.${originalLanguage}`)}
        </p>
        <p className="text-sm text-gray-600">
          {t('post.currentLanguage') || '현재 편집 언어'}: {t(`language.${currentLanguage}`)}
          {currentLanguage !== originalLanguage && (
            <span className="ml-2 text-primary-dark">
              ({t('post.translating') || '번역 중'})
            </span>
          )}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            {t('post.title') || '제목'}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              required
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{t('menu.til') || 'TIL'}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={isTIL}
                  onChange={(e) => {
                    toggleTIL(e.target.checked);
                    // TIL 상태가 변경되면 모든 언어에 대해 동일하게 적용
                    if (e.target.checked) {
                      // 원본 데이터 업데이트
                      setOriginalData(prev => ({
                        ...prev,
                        tags: prev.tags.includes('TIL') ? prev.tags : [...prev.tags, 'TIL']
                      }));
                      
                      // 번역 데이터 업데이트
                      setTranslations(prev => {
                        const updated = { ...prev };
                        Object.keys(updated).forEach(lang => {
                          if (!updated[lang].tags.includes('TIL')) {
                            updated[lang] = {
                              ...updated[lang],
                              tags: [...updated[lang].tags, 'TIL']
                            };
                          }
                        });
                        return updated;
                      });
                    } else {
                      // 원본 데이터 업데이트
                      setOriginalData(prev => ({
                        ...prev,
                        tags: prev.tags.filter(tag => tag !== 'TIL')
                      }));
                      
                      // 번역 데이터 업데이트
                      setTranslations(prev => {
                        const updated = { ...prev };
                        Object.keys(updated).forEach(lang => {
                          updated[lang] = {
                            ...updated[lang],
                            tags: updated[lang].tags.filter(tag => tag !== 'TIL')
                          };
                        });
                        return updated;
                      });
                    }
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            {t('post.description') || '설명'}
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('post.tags') || '태그'}
          </label>
          
          <div className="flex items-center mb-2 gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t('post.searchTags') || '태그 검색...'}
                value={tagSearchText}
                onChange={(e) => setTagSearchText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md pr-8"
              />
              {tagSearchText && (
                <button 
                  onClick={() => setTagSearchText('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => setIsAddingNewTag(true)}
              className="px-3 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-darker"
            >
              + {t('common.add') || '추가'}
            </button>
          </div>
          
          {isAddingNewTag && (
            <div className="flex items-center mb-3 gap-2">
              <input
                ref={newTagInputRef}
                type="text"
                placeholder={t('post.newTag') || '새 태그 입력...'}
                value={newTagText}
                onChange={(e) => setNewTagText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNewTag())}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddNewTag}
                className="px-3 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-darker"
              >
                {t('common.confirm') || '확인'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingNewTag(false);
                  setNewTagText('');
                }}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                {t('common.cancel') || '취소'}
              </button>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-2">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-dark text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {filteredTags.length > 10 && (
            <button
              type="button"
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-sm text-primary-dark hover:underline mt-1"
            >
              {showAllTags 
                ? (t('post.hideTags') || '태그 숨기기') 
                : `${t('common.showMore') || '더 보기'} (+${filteredTags.length - 10})`}
            </button>
          )}
          
          {selectedTags.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">{t('post.selectedTags') || '선택된 태그'}:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <div key={tag} className="bg-primary-light text-primary-dark px-2 py-1 rounded-md text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="ml-1 text-primary-dark hover:text-primary-darker font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium mb-1">
            {t('post.createdAt') || '작성일'}
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => date && setSelectedDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="시간"
            dateFormat="yyyy-MM-dd HH:mm"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            {t('post.content') || '내용'}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md min-h-[300px]"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-darker disabled:bg-gray-400"
          >
            {isLoading 
              ? (t('post.saving') || '저장 중...') 
              : (t('post.save') || '저장하기')}
          </button>
        </div>
      </form>
    </div>
  );
}
