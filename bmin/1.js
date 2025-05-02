/*
문제 설명
앞뒤를 뒤집어도 똑같은 문자를 palindrome (팰린드롬)이라고 합니다. 예를 들어
12321은 팰린드롬이며, 21453은 팰린드롬이 아닙니다.
자연수 n이 매개변수로 주어질 때, no 팰린드롬이면 true를, 아니면 false를 반환하도 록 함수 solution 을 완성하세요.
제한사항
• n은 231 - 1 보다 작거나 같은 자연수입니다.
입출력 예
n
12321
21453
result
true
false
입출력 에 설명
입출력 예#
12321을 뒤집으면 12321이 되어 팰린드롬입니다.
입출력 예 #2
21453을 뒤집으면 35412가 되어 펄린드롬이 아닙니다.

 */

function isPalindrome(number) {
  // 숫자를 문자열로 변환
  const str = number.toString();
  // 문자열을 뒤집었을 때 원래 문자열과 같은지 확인
  return str === str.split("").reverse().join("");
}
