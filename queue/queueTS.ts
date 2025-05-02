class QueueTS<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(data: T): void {
    this.items.push(data);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length == 0;
  }

  front(): T | undefined {
    if (this.isEmpty()) {
      throw Error("Queue is empty");
    }
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}
