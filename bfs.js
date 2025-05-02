class Queue {
  constructor() {
    this.store = {};
    this.front = 0;
    this.rear = 0;
  }

  size() {
    if (this.store[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.front + 1;
    }
  }

  push(value) {
    if (this.size() === 0) {
      this.store["0"] = value;
    } else {
      this.rear += 1;
      this.store[this.rear] = value;
    }
  }

  popleft() {
    let temp;
    if (this.front === this.rear) {
      temp = this.store[this.front];
      delete this.store[this.front];
      this.front = 0;
      this.rear = 0;
      return temp;
    } else {
      temp = this.store[this.front];
      delete this.store[this.front];
      this.front += 1;
      return temp;
    }
  }
}

// function BFS(graph, start, visited) {
//   const queue = new Queue();
//   queue.push(start);
//   visited[start] = true;

//   console.log(queue);
//   while (queue.size()) {
//     const v = queue.popleft();
//     console.log(v);

//     for (const node of graph[v]) {
//       console.log("node", node);
//       if (!visited[node]) {
//         queue.push(node);
//         visited[node] = true;
//       }
//     }
//   }

//   console.log(graph);
// }

function BFS(graph, start) {
  let queue = [];
  let visited = {};
  queue.push(start);
  visited[start] = true;

  while (queue.length) {
    const v = queue.shift();
    console.log(v);

    for (const node of graph[v]) {
      // console.log("node", node);
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    }
  }

  // console.log(graph);
}

const graph = [[1, 2, 4], [0, 5], [0, 5], [4], [0, 3], [1, 2]];
const visited = Array(6).fill(false);
BFS(graph, 0, visited);
