/*
  dp top_down
  피보나치
 */

function fibo(num) {
  const dp = new Array(num).fill(0);

  function fiboCount(num) {
    if (num == 1 || num == 2) {
      return (dp[num] = 1);
    }

    //배열에 저장된 값이 있을 시 저장된 값 반환
    console.log(num, dp[num]);
    if (dp[num] != 0) {
      return dp[num];
    }

    return (dp[num] = fiboCount(num - 1) + fiboCount(num - 2));
  }

  fiboCount(num - 1);
  return dp;
}

console.log(fibo(10));
