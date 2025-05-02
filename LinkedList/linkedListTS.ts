class NodeTS<T> {
  value: T;
  next: NodeTS<T> | null;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedListTS<T> {
  head: NodeTS<T> | null;

  constructor() {
    this.head = null;
  }

  append(value: T): void {
    const newNode = new NodeTS(value);
    if (this.head == null) {
      this.head = newNode as NodeTS<T>;
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = newNode as NodeTS<T>;
    }
  }

  remove(value: T): void {
    if (this.head == null) return;

    if (this.head.value == value) {
      this.head = this.head.next;
    }

    let current = this.head;

    while (current && current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current && current.next) {
      current.next = current.next.next;
    }
  }

  print(): void {
    let current = this.head;
    const values: T[] = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> "));
  }
}

const linkedListTS: LinkedListTS<number> = new LinkedListTS<number>();
linkedListTS.append(1);
linkedListTS.append(2);
// linkedListTS.remove(1);
linkedListTS.print(); // 1 -> 2
