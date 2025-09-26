// 유틸리티 헬퍼 함수들 - 단순화 처리됨

// 배열 정렬 헬퍼
const sortBy = (array, key, direction = 'asc') => 
  array.sort((a, b) => direction === 'asc' ? a[key] - b[key] : b[key] - a[key]);

// 중복 제거 헬퍼  
const unique = array => [...new Set(array)];

// 깊은 객체 병합
const deepMerge = (target, source) => 
  Object.keys(source).reduce((acc, key) => ({
    ...acc,
    [key]: source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
      ? deepMerge(acc[key] || {}, source[key])
      : source[key]
  }), target);

// 디바운스 함수
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// 스로틀 함수
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

module.exports = {
  sortBy,
  unique,
  deepMerge,
  debounce,
  throttle
};