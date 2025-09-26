// 배열 연산 알고리즘 - 단순화 처리됨

// 배열 회전 (왼쪽으로 k번)
const rotateLeft = (arr, k) => [...arr.slice(k), ...arr.slice(0, k)];

// 배열 회전 (오른쪽으로 k번)  
const rotateRight = (arr, k) => rotateLeft(arr, arr.length - (k % arr.length));

// 배열 뒤집기
const reverse = arr => [...arr].reverse();

// 배열 평탄화
const flatten = arr => arr.flat(Infinity);

// 배열 청크 분할
const chunk = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

// 배열 차집합
const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

// 배열 교집합
const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x));

// 배열 합집합
const union = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

// 배열 요소 빈도수 계산
const frequency = arr => 
  arr.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {});

module.exports = {
  rotateLeft,
  rotateRight,
  reverse,
  flatten,
  chunk,
  difference,
  intersection,
  union,
  frequency
};