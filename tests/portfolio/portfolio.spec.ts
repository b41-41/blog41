import { test, expect } from '@playwright/test';

test.describe('포트폴리오 페이지', () => {
  test('페이지가 올바르게 로드되는지 확인', async ({ page }) => {
    // 포트폴리오 페이지로 이동
    await page.goto('http://localhost:3000/portfolio');
    
    // 페이지 제목 확인
    await expect(page.locator('section h1')).toContainText('안녕하세요, 저는 크리에이티브 디자이너입니다');
  });

  test('소개 섹션이 올바르게 표시되는지 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio');
    
    // 소개 텍스트 확인
    const introText = page.locator('section > div > div.md\\:w-1\\/2 > p').first();
    await expect(introText).toContainText('창의적인 솔루션을 통해 브랜드와 제품에 생명을 불어넣는 것이');
    
    // 스킬 섹션 확인
    await expect(page.locator('section div.bg-gray-100 h3')).toContainText('전문 분야');
    
    // 스킬 아이템들 확인
    const skillItems = page.locator('section div.bg-gray-100 div.mb-4');
    await expect(skillItems).toHaveCount(5);
  });

  test('프로젝트 섹션이 올바르게 표시되는지 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio');
    
    // 프로젝트 섹션 제목 확인
    const projectHeading = page.locator('section h2').filter({ hasText: '프로젝트' });
    await expect(projectHeading).toBeVisible();
    
    // 프로젝트 개수 확인
    const projectItems = page.locator('section:nth-child(2) .grid > div');
    await expect(projectItems).toHaveCount(4);
    
    // 첫 번째 프로젝트 정보 확인
    await expect(projectItems.first().locator('h3')).toContainText('일러스트레이션 프로젝트 1');
    await expect(projectItems.first().locator('p')).toContainText('자연 테마의 디지털 일러스트레이션 시리즈');
    
    // 태그 확인
    const firstProjectTags = projectItems.first().locator('span.px-3');
    await expect(firstProjectTags).toHaveCount(2);
    await expect(firstProjectTags.first()).toContainText('일러스트레이션');
  });

  test('연락처 섹션이 올바르게 표시되는지 확인', async ({ page }) => {
    await page.goto('http://localhost:3000/portfolio');
    
    // 연락처 섹션 제목 확인
    const contactHeading = page.locator('section h2').filter({ hasText: '함께 일해보세요' });
    await expect(contactHeading).toBeVisible();
    
    // 연락처 버튼 확인
    const contactButton = page.locator('section:nth-child(3) a').filter({ hasText: '연락하기' });
    await expect(contactButton).toBeVisible();
    await expect(contactButton).toHaveAttribute('href', '/contact');
  });
}); 