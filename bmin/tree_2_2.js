/*
트리를 일렬로 표현하는 것을 트리의 직렬화(serialize)라고 합니다. 트리를 직렬화하 는 방법의 하나로 트리를 전위 순회하며 방문하는 노드의 값을 순서대로 출력하는 방법 이 있습니다. 
위 이진 트리를 전위 순회할 때 방문하는 노드의 값을 순서대로 출력하면 (null node를 방문하면 1을 출력합니다) 
[3,5,6,8,1,-1,-1,1,7, -1, -1,-1, 4, -1, 2, 1,-1]이 되며, 이는 위 트리를 전위 순회하여 직렬화한 결과입니다. 
반대로 트리가 직렬화된 결과를 이용해서 원래의 이진 트리를 생성해 내는 것 또한 가능합니다.
자연수와 -1로 이루어진 배열 serialization이 매개변수로 주어질 때 이진 트리를 전위 순회하여 올바르게 직렬화한 결과이면 true를, 그렇지 않으면 false를 반환하는 함수를 완성해 주세요.
제한사항
• 배열의 길이 L : L은 100,000 이하의 자연수
• 배열의 원소 K : K는 -1 또는 100,000 이하의 자연수
• 배열 원소의 값 중 자연수는 각 노드에 적혀있는 숫자를, -은 nul! 노드를 의미합 니다.
l•
• 각 노드에 적힌 숫자는 유일하다고 가정합니다.
• 배열에는 -을 제외한 모든 숫자가 한 번씩만 나타납니다.

serialization
[-1]
[3, 5, 6, 8, -1, -1, -1, 1, 7, -1, -1, -1, 4, -1, 2, -1, -1,]
[1,-1,2, -1, -1, 3, -1, -1]
result
true
true
false
*/
class node {
  constructor(value) {
    this.pre = null;
    this.vale = value;
    this.next = null;
  }
}

class tree {
  contructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {}
}
function isValidSerialization(serialization) {}

// 예시 테스트 케이스
console.log(isValidSerialization([-1])); // true
console.log(
  isValidSerialization([
    3, 5, 6, 8, -1, -1, -1, 1, 7, -1, -1, -1, 4, -1, 2, -1, -1,
  ])
); // true
console.log(isValidSerialization([1, -1, 2, -1, -1, 3, -1, -1])); // false
