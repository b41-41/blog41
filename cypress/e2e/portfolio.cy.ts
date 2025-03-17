describe('포트폴리오 페이지 테스트', () => {
  beforeEach(() => {
    // 뷰포트 설정 (PC 화면에 맞게)
    cy.viewport(1280, 800);
    // 포트폴리오 페이지 방문
    cy.visit('/portfolio');
    // 페이지 로딩 대기
    cy.wait(500);
    
    // 오버레이가 있을 경우 클릭하여 제거
    cy.get('body').click();
    
    // 오버레이가 사라질 때까지 대기
    cy.wait(300);
  });

  it('포트폴리오 페이지가 디자인대로 표시되는지 확인', () => {
    // 전체 페이지 스크린샷 캡처
    cy.screenshot('portfolio-page-actual', { capture: 'viewport' });
    
    // 이미지 비교 작업
    cy.task('compareImages', {
      baselineImage: '스크린샷 2025-03-17 10.43.17.png',
      actualImage: 'cypress/screenshots/portfolio.cy.ts/portfolio-page-actual.png',
      diffImage: 'cypress/screenshots/portfolio.cy.ts/portfolio-page-diff.png'
    }).then((result: any) => {
      // 비교 결과 로깅
      cy.task('log', `이미지 비교 결과: ${result.message}`);
      
      // 이미지가 일치하는지 확인
      expect(result.match).to.be.true;
    });
  });

  it('웹 디자이너 텍스트가 존재하는지 확인', () => {
    // 텍스트 검증
    cy.contains('WEB DESIGNER').should('be.visible');
    cy.contains('PORTFOLIO 2022').should('be.visible');
  });

  it('새싹새싹 타이틀이 존재하는지 확인', () => {
    // 타이틀 검증
    cy.contains('"새싹새싹"').should('be.visible');
  });

  it('더 알아보기 버튼이 존재하는지 확인', () => {
    // 버튼 검증
    cy.contains('더 알아보기').should('be.visible');
  });
}); 