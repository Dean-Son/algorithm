function solution(num_list) {
  let even = 0; //짝수
  let odd = 0; // 홀수
  num_list.forEach((element, index) => {
    if (index % 2 == 0) {
      even += element;
    } else {
      odd += element;
    }
  });

  return Math.max(even, odd);
}

console.log(solution([-1, 2, 5, 6, 3]));
