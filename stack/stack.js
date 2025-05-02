class Stack {
  constructor() {
    this.items = [];
  }

  push(data) {
    this.items.push(data);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();
// console.log(`stack pop : ${stack.pop()}`);
console.log(`stack push : ${stack.push(1)}`);
console.log(`stack pop : ${stack.pop()}`);
console.log(`stack push : ${stack.push(1)}`);
console.log(`stack push : ${stack.push(2)}`);
console.log(`stack size : ${stack.size()}`);
console.log(`stack isEmpty : ${stack.isEmpty()}`);
console.log(`stack peek : ${stack.peek()}`);
