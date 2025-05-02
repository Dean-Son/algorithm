/*
  dp bottom-up
  피보나치
 */

function fibo(num) {
  const dp = new Array(num);

  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i < num; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }

  return dp;
}

console.log(fibo(10));
