// 개별 언어별 번역 타입
export type TranslationType = {
  title: string;
  description: string;
  content: string;
  tags: string[];
  isComplete: boolean;
};

// 업데이트 시간 관리를 위한 타입
export type UpdatedAtType = {
  [key: string]: string | Date;
};

// 다국어 지원 포스트 타입
export type PostType = {
  postId: string;
  title: string;           // 원본 언어(기본적으로 한국어)의 제목
  order: number;
  description: string;     // 원본 언어의 설명
  tags: string[];         // 원본 언어의 태그
  content: string;        // 원본 언어의 내용
  createdAt: string;      // 최초 작성 시간
  
  // 다국어 관련 필드
  originalLanguage?: string;                  // 원본 언어 (기본값: 'ko')
  availableLanguages?: string[];              // 사용 가능한 언어 목록
  translations?: Record<string, TranslationType>; // 각 언어별 번역 데이터
  updatedAt?: UpdatedAtType;                  // 각 언어별 업데이트 시간
};
