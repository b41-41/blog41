'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useTranslation } from '@/i18n';
import { formatToLocalTime } from '@/utils/dayjs';
import { languages } from '@/i18n/settings';
import { PostType } from '@/app/[lng]/post/post.type';

interface EditPostFormProps {
  post: PostType;
  lng: string;
}

export default function EditPostForm({ post, lng }: EditPostFormProps) {
  const router = useRouter();
  const { t } = useTranslation(lng, 'common');
  
  // 기본 언어 설정
  const [originalLanguage, setOriginalLanguage] = useState<string>(post.originalLanguage || 'ko');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(post.availableLanguages || ['ko']);
  
  // 기본 포스트 정보
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(post.tags || []);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(post.createdAt || new Date()));
  
  // 원본 데이터 (원본 언어의 데이터)
  const [originalData, setOriginalData] = useState({
    title: post.title || '',
    description: post.description || '',
    content: post.content || '',
    tags: post.tags || []
  });
  
  // 다국어 번역 정보
  const [translations, setTranslations] = useState<Record<string, {
    title: string;
    description: string;
    content: string;
    tags: string[];
    isComplete: boolean;
  }>>(post.translations || {
    ko: {
      title: post.title || '',
      description: post.description || '',
      content: post.content || '',
      tags: post.tags || [],
      isComplete: true
    }
  });
  
  // 현재 편집 중인 언어
  const [currentLanguage, setCurrentLanguage] = useState<string>(lng);
  
  // UI 상태
  const [isLoading, setIsLoading] = useState(false);
  const [tagSearchText, setTagSearchText] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [newTagText, setNewTagText] = useState('');
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [isTIL, setIsTIL] = useState(post.tags?.includes('TIL') || false);
  const newTagInputRef = useRef<HTMLInputElement>(null);
  
  // 로컬 환경인지 확인하고 아닌 경우 홈으로 리다이렉트
  useEffect(() => {
    // 클라이언트 측에서 실행되는 환경 확인
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
    
    if (!isLocal) {
      router.replace(`/${lng}`);
    }
  }, [router, lng]);

  // 초기 데이터 로드
  useEffect(() => {
    // 현재 언어에 맞는 데이터 로드
    if (currentLanguage === originalLanguage) {
      // 원본 언어인 경우
      setTitle(originalData.title);
      setDescription(originalData.description);
      setContent(originalData.content);
      setSelectedTags(originalData.tags);
    } else if (translations[currentLanguage]) {
      // 번역이 있는 경우
      setTitle(translations[currentLanguage].title);
      setDescription(translations[currentLanguage].description);
      setContent(translations[currentLanguage].content);
      setSelectedTags(translations[currentLanguage].tags);
    } else {
      // 번역이 없는 경우 빈 데이터로 초기화
      setTitle('');
      setDescription('');
      setContent('');
      // 태그는 원본 언어와 동일하게 유지
      setSelectedTags(originalData.tags);
    }
  }, [currentLanguage, originalLanguage, originalData, translations]);

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
    } else {
      setSelectedTags([...selectedTags, tag]);
      if (tag === 'TIL') setIsTIL(true);
    }
  };

  const toggleTIL = (checked: boolean) => {
    setIsTIL(checked);
    if (checked && !selectedTags.includes('TIL')) {
      setSelectedTags([...selectedTags, 'TIL']);
    } else if (!checked && selectedTags.includes('TIL')) {
      setSelectedTags(selectedTags.filter(tag => tag !== 'TIL'));
    }
  };

  const handleAddNewTag = () => {
    if (newTagText.trim() && !availableTags.includes(newTagText.trim())) {
      const newTag = newTagText.trim();
      setAvailableTags([...availableTags, newTag]);
      setSelectedTags([...selectedTags, newTag]);
      setNewTagText('');
      setIsAddingNewTag(false);
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
    }
  };

  // 포스트 저장 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 현재 입력 필드의 데이터 검증
    if (!title || !content) {
      alert(t('post.titleAndContentRequired') || '제목과 내용은 필수입니다.');
      return;
    }
    
    // 현재 언어 데이터 저장
    let updatedOriginalData = originalData;
    let updatedTranslations = { ...translations };
    
    // 현재 언어가 원본 언어인 경우
    if (currentLanguage === originalLanguage) {
      // 원본 언어인 경우 원본 데이터 업데이트
      updatedOriginalData = {
        title,
        description,
        content,
        tags: [...selectedTags]
      };
      
      // 원본 언어도 translations에 추가
      updatedTranslations[originalLanguage] = {
        title,
        description,
        content,
        tags: [...selectedTags],
        isComplete: true
      };
    } else {
      // 번역 언어인 경우 translations에 저장
      const isComplete = Boolean(title && content);
      updatedTranslations[currentLanguage] = {
        title,
        description,
        content,
        tags: [...selectedTags],
        isComplete
      };
      
      // 사용 가능한 언어 업데이트
      if (!availableLanguages.includes(currentLanguage) && isComplete) {
        setAvailableLanguages(prev => [...prev, currentLanguage]);
      }
    }
    
    setIsLoading(true);
    
    try {
      // 다국어 정보를 포함한 데이터 구성
      const postData = {
        postId: post.postId,
        title: currentLanguage === originalLanguage ? title : originalData.title,
        description: currentLanguage === originalLanguage ? description : originalData.description,
        content: currentLanguage === originalLanguage ? content : originalData.content,
        tags: currentLanguage === originalLanguage ? selectedTags : originalData.tags,
        createdAt: selectedDate.toISOString(),
        originalLanguage,
        availableLanguages: [...new Set([...availableLanguages, originalLanguage, currentLanguage])],
        translations: updatedTranslations
      };
      
      await axios.put('/api/post/edit', postData);
      
      alert(t('post.saveSuccess') || '포스트가 성공적으로 저장되었습니다.');
      router.push(`/${lng}/post/${post.postId}`);
    } catch (error) {
      console.error('포스트 저장 중 오류 발생:', error);
      alert(t('post.saveError') || '포스트 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 태그 필터링 및 표시
  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagSearchText.toLowerCase())
  );
  
  const displayedTags = showAllTags 
    ? filteredTags 
    : filteredTags.slice(0, 10);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('post.edit') || '포스트 수정'}</h1>
      
      {/* 언어 선택 */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">{t('post.selectLanguage') || '언어 선택'}</h2>
        <div className="flex flex-wrap gap-2">
          {languages.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`px-4 py-2 rounded-md ${
                currentLanguage === lang
                  ? 'bg-primary-dark text-white'
                  : availableLanguages.includes(lang)
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-200 text-gray-800'
              }`}
            >
              {t(`language.${lang}`)}
              {lang === originalLanguage && ` (${t('post.originalLanguage') || '원본 언어'})`}
              {currentLanguage === lang && ` - ${t('post.currentLanguage') || '현재 편집 언어'}`}
            </button>
          ))}
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <p>
            {t('post.originalLanguage') || '원본 언어'}: {t(`language.${originalLanguage}`) || originalLanguage}
          </p>
          <p>
            {t('post.currentLanguage') || '현재 편집 언어'}: {t(`language.${currentLanguage}`) || currentLanguage}
            {currentLanguage !== originalLanguage && ` (${t('post.translating') || '번역 중'})`}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            {t('post.title') || '제목'}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            {t('post.description') || '설명'}
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {t('post.tags') || '태그'}
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="isTIL"
              checked={isTIL}
              onChange={(e) => toggleTIL(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="isTIL" className="text-sm">TIL</label>
          </div>
          
          <div className="mb-2">
            <input
              type="text"
              placeholder={t('post.searchTags') || '태그 검색...'}
              value={tagSearchText}
              onChange={(e) => setTagSearchText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {!isAddingNewTag ? (
            <button
              type="button"
              onClick={() => {
                setIsAddingNewTag(true);
                setTimeout(() => newTagInputRef.current?.focus(), 0);
              }}
              className="mb-2 text-sm text-primary-dark hover:underline"
            >
              + {t('post.newTag') || '새 태그 입력...'}
            </button>
          ) : (
            <div className="flex gap-2 mb-2">
              <input
                ref={newTagInputRef}
                type="text"
                value={newTagText}
                onChange={(e) => setNewTagText(e.target.value)}
                placeholder={t('post.newTag') || '새 태그 입력...'}
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
          <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700">
            {formatToLocalTime(selectedDate.toISOString(), 'YYYY-MM-DD HH:mm')}
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('post.createdAtReadOnly') || '작성일은 변경할 수 없습니다'}</p>
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
