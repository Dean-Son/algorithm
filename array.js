function solution(arr, query) {
  for (let i = 0; i < query.length; i++) {
    arr = arr.filter((v, index) =>
      i % 2 === 0 ? index <= query[i] : index >= query[i]
    );
  }
  return arr;
}

console.log(solution([0, 1, 2, 3, 4, 5], [4, 1, 2]));
