/*
1부터 6까지 숫자가 적힌 주사위가 네 개 있습니다. 네 주사위를 굴렸을 때 나온 숫자에 따라 다음과 같은 점수를 얻습니다.

네 주사위에서 나온 숫자가 모두 p로 같다면 1111 × p점을 얻습니다.
세 주사위에서 나온 숫자가 p로 같고 나머지 다른 주사위에서 나온 숫자가 q(p ≠ q)라면 (10 × p + q)2 점을 얻습니다.
주사위가 두 개씩 같은 값이 나오고, 나온 숫자를 각각 p, q(p ≠ q)라고 한다면 (p + q) × |p - q|점을 얻습니다.
어느 두 주사위에서 나온 숫자가 p로 같고 나머지 두 주사위에서 나온 숫자가 각각 p와 다른 q, r(q ≠ r)이라면 q × r점을 얻습니다.
네 주사위에 적힌 숫자가 모두 다르다면 나온 숫자 중 가장 작은 숫자 만큼의 점수를 얻습니다.
네 주사위를 굴렸을 때 나온 숫자가 정수 매개변수 a, b, c, d로 주어질 때, 얻는 점수를 return 하는 solution 함수를 작성해 주세요.

a, b, c, d는 1 이상 6 이하의 정수입니다.

a==b==c==d -> 1111 * a
a==b==c!=d -> (10 * a + d)
a==b c==d -> (a+c) * |a-c|
a==b c, d -> c * d
a,b,c,d -> min()

 */

function solution(a, b, c, d) {
  const arrNum = [a, b, c, d];
  const result = {};
  arrNum.map((x) => {
    result[x] = (result[x] || 0) + 1;
  });

  let resultKeys = Object.keys(result);

  if (resultKeys.length == 1) {
    return resultKeys[0] * 1111;
  } else if (resultKeys.length == 4) {
    return Math.min(...arrNum);
  } else if (resultKeys.length == 3) {
    let num = 1;
    resultKeys.map((e) => {
      num = num * (result[e] > 1 ? 1 : e);
    });
    return num;
  } else if (resultKeys.length == 2) {
    let num1 =
      result[resultKeys[0]] >= result[resultKeys[1]]
        ? resultKeys[0]
        : resultKeys[1];
    let num2 =
      result[resultKeys[0]] < result[resultKeys[1]]
        ? resultKeys[0]
        : resultKeys[1];
    let mode = result[resultKeys[0]] == 2 ? 0 : 1;

    if (mode == 1) {
      return Math.pow(Number(10 * num1) + Number(num2), 2);
    } else {
      return (Number(num1) + Number(num2)) * Math.abs(num1 - num2);
    }
  }
  return;
}

console.log(solution(6, 4, 2, 5));
