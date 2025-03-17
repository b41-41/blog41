// 타입 확장
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * 화면의 특정 요소를 스크린샷으로 캡처합니다.
       * @example cy.captureElement('.my-element', 'element-name')
       */
      captureElement(selector: string, name: string): Chainable<void>;
      
      /**
       * 페이지 전체를 스크린샷으로 캡처합니다.
       * @example cy.capturePage('page-name')
       */
      capturePage(name: string): Chainable<void>;
    }
  }
}

// 요소 캡처 명령
Cypress.Commands.add('captureElement', (selector, name) => {
  cy.get(selector).screenshot(name, {
    capture: 'viewport',
    overwrite: true
  });
});

// 페이지 캡처 명령
Cypress.Commands.add('capturePage', (name) => {
  cy.screenshot(name, {
    capture: 'viewport',
    overwrite: true
  });
});

export {}; 