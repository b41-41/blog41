'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import axios from 'axios';

// 한국어 로케일 설정
dayjs.locale('ko');

export default function AddPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['TIL']);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
    } else {
      setSelectedTags([...selectedTags, tag]);
      if (tag === 'TIL') setIsTIL(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      alert('제목과 내용은 필수입니다.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('/api/add', {
        title,
        description,
        content,
        tags: selectedTags,
        createdAt: selectedDate.toISOString()
      });
      
      alert('포스트가 성공적으로 저장되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('포스트 저장 중 오류 발생:', error);
      alert('포스트 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 className="text-3xl font-bold mb-6 text-center">새 글 작성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            제목
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
              <span className="text-sm font-medium">TIL</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={isTIL}
                  onChange={(e) => toggleTIL(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-dark rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            설명
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
            태그
          </label>
          
          <div className="flex items-center mb-2 gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="태그 검색..."
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
              + 추가
            </button>
          </div>
          
          {isAddingNewTag && (
            <div className="flex items-center mb-3 gap-2">
              <input
                ref={newTagInputRef}
                type="text"
                placeholder="새 태그 입력..."
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
                확인
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingNewTag(false);
                  setNewTagText('');
                }}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                취소
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
              {showAllTags ? '태그 숨기기' : `더 보기 (+${filteredTags.length - 10})`}
            </button>
          )}
          
          {selectedTags.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-1">선택된 태그:</p>
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
            작성일
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => date && setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            내용
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
            {isLoading ? '저장 중...' : '저장하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
