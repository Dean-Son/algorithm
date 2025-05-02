/**
 22는 9의 나머지는 (0) 입니다.
22를 9로 나누면 실제 나머지는 4가 나오기 때문에 위의 문장은 틀렸습니다. 하지만 22를 9 번 반복해서 적어서 222222222222222222를 만든다면 9로 나눴을 때의 나머지가 0이 되 고 정답이 됩니다.
이처럼 n이 K로 나누어떨어지도록 반복해서 적어야 하는 n의 개수 중 최솟값을 반환하는 solution 함수를 완성하세요. 만약 아무리 이어붙여도 나누어떨어지지 않을 때는 -1을 반환 해주면 됩니다.
제한사항
• n : 10억 이하의 자연수
• k : 10만 이하의 자연수


 */

function solution(n, k) {
  let remainder = 0; // 현재까지의 나머지
  const remainders = new Set(); // 무한 루프를 방지하기 위해 나머지를 기록
  const num = Math.pow(10, n.toString().length);
  let count = 0; // 반복 횟수

  // console.log(num);
  while (true) {
    // 최대 k번 반복
    // 새로운 나머지를 계산 (이전 나머지 * 10 + n) % k
    console.log(remainder);
    remainder = (remainder * num + n) % k;
    count++;

    // 나누어떨어지면 정답으로 count 반환
    if (remainder === 0) {
      return count;
    }

    // 동일한 나머지가 다시 나타나면 무한 반복이므로 -1 반환
    if (remainders.has(remainder)) {
      return -1;
    }
    // 현재 나머지를 기록
    remainders.add(remainder);
  }
}

// 예시 실행
console.log(solution(22, 9)); // 3번 반복하면 252525 % 15 = 0
