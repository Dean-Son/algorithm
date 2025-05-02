class StackTS<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(data: T): void {
    this.items.push(data);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      throw Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }
}

const stackTS = new StackTS();
// console.log(`stack pop : ${stack.pop()}`);
console.log(`stack push : ${stackTS.push(1)}`);
console.log(`stack pop : ${stackTS.pop()}`);
console.log(`stack push : ${stackTS.push(1)}`);
console.log(`stack push : ${stackTS.push(2)}`);
console.log(`stack size : ${stackTS.size()}`);
console.log(`stack isEmpty : ${stackTS.isEmpty()}`);
console.log(`stack peek : ${stackTS.peek()}`);
