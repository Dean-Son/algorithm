# Algorithm Study Repository

알고리즘과 자료구조를 학습하기 위한 JavaScript/TypeScript 구현 모음입니다.

## 📁 프로젝트 구조

### 🧮 핵심 알고리즘
- `fibonacci.js` - 피보나치 수열 구현
- `bfs.js` - 너비 우선 탐색 (Breadth-First Search)
- `dfs.js` - 깊이 우선 탐색 (Depth-First Search)
- `array.js`, `array2.js` - 배열 처리 알고리즘
- `snowflake.js/.ts` - 스노우플레이크 ID 생성 알고리즘

### 📊 자료구조 구현
- `LinkedList/` - 연결 리스트 구현 (단일, 이중 연결 리스트)
- `queue/` - 큐 자료구조 (JavaScript, TypeScript)
- `stack/` - 스택 자료구조 (JavaScript, TypeScript)
- `sort/` - 정렬 알고리즘 구현

### 🎯 문제 해결
- `bmin/` - 알고리즘 문제 솔루션 모음
- `play.js` - 알고리즘 실험 및 테스트
- `dice.js` - 주사위 시뮬레이션
- `square.js` - 수학적 계산

### 🎨 시각화
- `treejs/` - Three.js를 이용한 3D 시각화 웹 애플리케이션
- `webgl.html` - WebGL 기초 예제
- `webgl2.html` - WebGL 고급 예제

## 🚀 실행 방법

### JavaScript 파일 실행
```bash
node fibonacci.js
node bfs.js
node array.js
```

### Three.js 시각화 서버
```bash
cd treejs
npm install
npm start      # 프로덕션 서버 (포트 5001)
npm run dev    # 개발 서버 (nodemon 사용)
```

시각화 페이지 접근:
- 메인 페이지: `http://localhost:5001/`
- 대체 페이지: `http://localhost:5001/treejs2`

## 📚 학습 내용

### 그래프 알고리즘
- **BFS (너비 우선 탐색)**: 인접 리스트를 이용한 구현
- **DFS (깊이 우선 탐색)**: 재귀와 스택을 이용한 구현

### 동적 계획법
- **피보나치 수열**: Bottom-up 방식 구현

### 자료구조
- **큐**: O(1) 연산을 위한 객체 기반 구현
- **스택**: 배열 기반 구현
- **연결 리스트**: 단일/이중 연결 리스트 구현

### 시각화 기술
- **Three.js**: 3D 그래픽 렌더링
- **WebGL**: 로우레벨 그래픽 프로그래밍
- **Express**: 정적 파일 서빙 및 라우팅

## 🛠️ 개발 환경

- **언어**: JavaScript, TypeScript
- **런타임**: Node.js
- **웹 프레임워크**: Express.js
- **3D 라이브러리**: Three.js
- **그래픽 API**: WebGL

## 📝 특징

- 교육 목적의 명확한 구현
- 콘솔 출력을 통한 디버깅
- JavaScript와 TypeScript 혼합 사용
- 한국어 주석으로 이해도 향상

## 🎯 학습 목표

이 저장소는 다음과 같은 컴퓨터 과학 개념들을 실습하고 이해하기 위해 만들어졌습니다:

- 기본 자료구조의 구현과 활용
- 그래프 탐색 알고리즘의 원리
- 동적 계획법의 적용
- 웹 기반 시각화 기술
- 알고리즘의 시간/공간 복잡도 분석