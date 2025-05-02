function solution(n) {
  let result = 0;
  const board = Array(n).fill(0); // 각 행에 배치된 퀸의 열 위치를 저장할 배열

  function isValid(row, col) {
    // 현재 위치에 퀸을 놓을 수 있는지 확인
    for (let i = 0; i < row; i++) {
      // 같은 열에 있거나, 대각선에 위치한 경우
      if (board[i] === col || Math.abs(board[i] - col) === Math.abs(i - row)) {
        return false;
      }
    }
    return true;
  }

  function placeQueen(row) {
    console.log(board);
    if (row === n) {
      // 모든 퀸을 배치한 경우, 방법 수 증가
      result++;
      console.log("===>", result);
      return;
    }

    for (let col = 0; col < n; col++) {
      let check = isValid(row, col);
      console.log(row, col, check);
      if (check) {
        board[row] = col; // 현재 위치에 퀸을 배치
        placeQueen(row + 1); // 다음 행으로 이동
        board[row] = 0; // 되돌아가면서 퀸 제거
      }
    }
  }

  placeQueen(0); // 0행부터 시작하여 퀸 배치 시도
  return result;
}

console.log(solution(8));
