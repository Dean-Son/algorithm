/*

동영상의 길이를 나타내는 문자열 video_len, 
기능이 수행되기 직전의 재생위치를 나타내는 문자열 pos, 
오프닝 시작 시각을 나타내는 문자열 op_start, 
오프닝이 끝나는 시각을 나타내는 문자열 op_end

commands : 
"prev"는 10초 전으로 이동하는 명령입니다.
"next"는 10초 후로 이동하는 명령입니다.
 */
function solution(video_len, pos, op_start, op_end, commands) {
  const videoLen = convertStringToTime(video_len);
  const opStart = convertStringToTime(op_start);
  const opEnd = convertStringToTime(op_end);
  const posTime = convertStringToTime(pos);

  function openningPass(nowPos) {
    if (opStart <= nowPos && nowPos <= opEnd) {
      return opEnd;
    }
    return nowPos;
  }

  function convertStringToTime(strTime) {
    const arrTime = strTime.split(":");

    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }

  function convertTimeToString(time) {
    let mm = parseInt(time / 60);
    let ss = time % 60;
    mm = String(mm).padStart(2, 0);
    ss = String(ss).padStart(2, 0);
    return `${mm}:${ss}`;
  }

  let nowPos = openningPass(posTime);

  commands.forEach((element) => {
    if (element == "next") {
      nowPos += 10;
      nowPos = nowPos > videoLen ? videoLen : nowPos;
    } else {
      nowPos -= 10;
      nowPos = nowPos < 0 ? 0 : nowPos;
    }
    nowPos = openningPass(nowPos);
  });

  return convertTimeToString(nowPos > videoLen ? videoLen : nowPos);
}

console.log(solution("34:33", "13:00", "00:55", "02:55", ["next", "prev"]));
