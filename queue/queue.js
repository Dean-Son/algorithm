class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(data) {
    this.items.push(data);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  front() {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    return this.items[0];
  }

  size() {
    return this.items.length;
  }
}
