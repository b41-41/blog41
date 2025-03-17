import { defineConfig } from 'cypress';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export default defineConfig({
  screenshotOnRunFailure: true,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // 이미지 비교 기능 등록
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        
        // 이미지 비교 함수
        compareImages({ actualImage, baselineImage, diffImage }) {
          return new Promise((resolve, reject) => {
            // 기준 이미지 읽기
            const baseline = PNG.sync.read(fs.readFileSync(path.join('public', baselineImage)));
            // 실제 이미지 읽기
            const actual = PNG.sync.read(fs.readFileSync(actualImage));
            
            // 이미지 크기가 다르면 실패
            if (baseline.width !== actual.width || baseline.height !== actual.height) {
              return resolve({
                match: false,
                message: `이미지 크기가 다릅니다. 기준: ${baseline.width}x${baseline.height}, 실제: ${actual.width}x${actual.height}`
              });
            }
            
            // diff 이미지 생성
            const diff = new PNG({ width: baseline.width, height: baseline.height });
            
            // 픽셀 비교
            const numDiffPixels = pixelmatch(
              baseline.data, 
              actual.data, 
              diff.data, 
              baseline.width, 
              baseline.height, 
              { threshold: 0.1 }
            );
            
            // diff 이미지 저장
            fs.writeFileSync(diffImage, PNG.sync.write(diff));
            
            // 결과 반환
            resolve({
              match: numDiffPixels === 0,
              diffPixels: numDiffPixels,
              message: numDiffPixels === 0 ? '이미지가 일치합니다.' : `이미지가 일치하지 않습니다. 다른 픽셀: ${numDiffPixels}개`
            });
          });
        }
      });
      
      return config;
    }
  }
}); 