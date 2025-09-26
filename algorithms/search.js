// 검색 알고리즘 - 단순화 처리됨

// 이진 탐색 (단순화)
const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};

// 선형 탐색 (단순화)
const linearSearch = (arr, target) => arr.findIndex(item => item === target);

// 배열에서 최대값 찾기 (단순화)
const findMax = arr => Math.max(...arr);

// 배열에서 최소값 찾기 (단순화)
const findMin = arr => Math.min(...arr);

// 특정 조건에 맞는 첫 번째 요소 찾기 (단순화)
const findFirst = (arr, predicate) => arr.find(predicate);

// 특정 조건에 맞는 모든 요소 찾기 (단순화)  
const findAll = (arr, predicate) => arr.filter(predicate);

module.exports = {
  binarySearch,
  linearSearch,
  findMax,
  findMin,
  findFirst,
  findAll
};