import React from 'react';
import Image from 'next/image';

// 프로젝트 데이터
const projects = [
  {
    id: 1,
    title: '일러스트레이션 프로젝트 1',
    description: '자연 테마의 디지털 일러스트레이션 시리즈',
    imageUrl: '/images/portfolio/project1.jpg',
    tags: ['일러스트레이션', '디지털 아트']
  },
  {
    id: 2,
    title: '브랜딩 프로젝트',
    description: '로컬 카페를 위한 브랜드 아이덴티티 설계',
    imageUrl: '/images/portfolio/project2.jpg',
    tags: ['브랜딩', '로고 디자인']
  },
  {
    id: 3,
    title: '북 커버 디자인',
    description: '판타지 소설 시리즈를 위한 표지 디자인',
    imageUrl: '/images/portfolio/project3.jpg',
    tags: ['출판', '일러스트레이션']
  },
  {
    id: 4,
    title: '패키지 디자인',
    description: '친환경 제품을 위한 지속 가능한 패키지 디자인',
    imageUrl: '/images/portfolio/project4.jpg',
    tags: ['패키징', '지속가능성']
  }
];

// 스킬 데이터
const skills = [
  { name: '디지털 일러스트레이션', level: 95 },
  { name: '브랜드 아이덴티티', level: 90 },
  { name: '타이포그래피', level: 85 },
  { name: '웹 디자인', level: 80 },
  { name: 'UI/UX', level: 75 }
];

const Portfolio = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-6 md:p-10">
      {/* 소개 섹션 */}
      <section className="w-full max-w-6xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">안녕하세요, 저는 크리에이티브 디자이너입니다</h1>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="md:w-1/2">
            <p className="text-lg text-gray-600 mb-4">
              창의적인 솔루션을 통해 브랜드와 제품에 생명을 불어넣는 것이 저의 열정입니다. 
              10년 이상의 경험을 바탕으로 일러스트레이션, 브랜딩, 그리고 디지털 디자인 분야에서 
              다양한 프로젝트를 진행해왔습니다.
            </p>
            <p className="text-lg text-gray-600">
              각 프로젝트에서 저는 고객의 비전을 이해하고 그것을 시각적으로 표현하기 위해 
              노력합니다. 함께 협업하여 당신의 아이디어를 현실로 만들어보세요.
            </p>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">전문 분야</h3>
            {skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-blue rounded-full h-2" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 쇼케이스 섹션 */}
      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">프로젝트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map(project => (
            <div key={project.id} className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 bg-gray-200">
                {/* 실제 이미지가 없으므로 회색 배경으로 대체 */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
                  <span className="text-gray-500">{project.title} 이미지</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="w-full max-w-6xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">함께 일해보세요</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든지 연락주세요.
        </p>
        <a 
          href="/contact" 
          className="inline-block px-8 py-3 bg-primary-blue text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-300"
        >
          연락하기
        </a>
      </section>
    </div>
  );
};

export default Portfolio;
