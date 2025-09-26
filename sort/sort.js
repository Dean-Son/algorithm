const items = [
  { name: "Edward", value: 21 },
  { name: "Sharpe", value: 37 },
  { name: "And", value: 45 },
  { name: "The", value: -12 },
  { name: "Magnetic", value: 13 },
  { name: "Zeros", value: 37 },
];

// value 기준으로 정렬 (간단한 화살표 함수 사용)
items.sort((a, b) => a.value - b.value);

console.log(items);
