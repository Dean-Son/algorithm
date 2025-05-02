/*
두 사람이 끝말잇기를 했습니다. 끝말잇기가 어떻게 진행되었는지 기록하기 위해 게임 을 하면서 사용한 모든 단어를 순서대로 공백 없이 이어 붙인 기록 문자열을 칠판에 적 어 두었습니다. 
단, 앞사람이 적은 단어의 맨 끝 글자는 다음 단어의 맨 첫 글자와 겹치 기 때문에 두 번째 단어부터는 첫 글자를 제외한 나머지 부분을 이어서 적었습니다. 
예 를 들어, 첫 번째 단어가 foo이고 두 번째 단어가 odd라면 기록 문자열은 "foodd"가 됩니다. 
두 사람은 끝말잇기를 얼마나 오랫동안 했는지 알아보기 위해 기록 문자열을 최대한 많은 단어로 분리하려고 합니다.
끝말잇기에 사용할 수 있는 단어는 정해져 있으며, 이 단어들은 배열 word_dict 에 중복 없이 들어있습니다. 사용할 수 있는 모든 단어는 길이가 2 이상이며, 사용했던 단 어를 다시 사용할 수도 있습니다.
예를 들어 기록 문자열이 "centerminus"이고 word_dict 가 ["cent", “center",
"term", “terminust, “"rm", “min", “minus", "us"]인 경우, 아래와 같이 세 가지 방법으 로 단어를 분리할 수 있습니다.
1. "cent" + "terminus"
2. "cent" + "term" + "minus"
3. "center" + "rm" + "minus"
부분 문자열 "minus"를 "min"과 "us"로 분리할 수 없음에 주의합니다.
2, 3번 방법으로 단어를 분리했을 때, 3개의 단어로 분리할 수 있으며 이때 단어의 개 수는 최대가 됩니다. 위 예시의 경우에는, 어떤 방법으로도 기록 문자열을 4개 이상의 단어로 분리할 수 없습니다.
기록 문자열 5 , 끝말잇기에서 사용할 수 있는 단어를 담은 문자열 배열
word_dict 가 매개변수로 주어집니다. 기록 문자열을 최대한 많은 단어로 분리했을 때, 분리된 단어의 수를 return 하도록 solution 함수를 완성해주세요.

제한사항
• 2<= 의 길이 <= 10,000
• 5 는 알파벳 소문자로 이루어진 문자열입니다.
• 1<= word_dict 의 길이 <= 1,000
word dict 의 원소는 알파벳 소문자로 이루어진 문자열입니다
• 2 < word_dict 원소의 길이 < 10
word_dict 에는 같은 원소가 중복하여 들어있지 않습니다.
• 문자열 S 전체를 word_dict 의 단어로 분리할 수 있는 경우만 주어집니다.
*/
function solution(record, word_dict) {
  const wordSet = new Set(word_dict); // word_dict을 Set으로 변환하여 빠르게 단어를 확인
  const dp = Array(record.length + 1).fill(-1); // DP 배열 초기화
  dp[0] = 0; // 시작 위치는 0

  // DP 배열을 채워 나갑니다.
  for (let i = 1; i <= record.length; i++) {
    // 2~10 길이의 단어를 탐색
    for (let j = 0; j < i; j++) {
      const word = record.slice(j, i);
      console.log(word, dp, i, j, wordSet.has(word) && dp[j] !== -1);
      if (wordSet.has(word) && dp[j] !== -1) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  console.log(dp);
  return dp[record.length];
}

// 예시 테스트
const record = "centerminus";
const word_dict = [
  "cent",
  "center",
  "term",
  "terminus",
  "rm",
  "min",
  "minus",
  "us",
];
console.log(solution(record, word_dict)); // 3
