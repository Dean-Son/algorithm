function check(queen, row) {
  for (let i = 0; i < row; i += 1) {
    if (
      queen[i] === queen[row] ||
      Math.abs(row - i) === Math.abs(queen[i] - queen[row])
    ) {
      return false;
    }
  }
  return true;
}

function search(queen, row) {
  const n = queen.length;
  let count = 0;

  if (n === row) {
    return 1;
  }

  for (let col = 0; col < n; col += 1) {
    // 유효한 위치인지 검사해서 맞다면
    queen[row] = col;
    if (check(queen, row)) {
      count += search(queen, row + 1);
    }
    // 다음 행으로
    // 아니라면 다음 열로
  }
  return count;
}

function solution(n) {
  return search(
    Array.from({ length: n }, () => 0),
    0
  );
}
console.log(solution(8));
