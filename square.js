function solution(v) {
  let ret = [];

  let x = [];
  let xAll = [];

  let y = [];
  let yAll = [];

  v.map((e) => {
    if (xAll.includes(e[0])) {
      if (x.includes(e[0])) {
        x = x.filter((xe) => xe != e[0]);
      } else {
        x.push(e[0]);
      }
    } else {
      xAll.push(e[0]);
      x.push(e[0]);
    }

    if (yAll.includes(e[1])) {
      if (y.includes(e[1])) {
        y = y.filter((ye) => ye != e[1]);
      } else {
        y.push(e[1]);
      }
    } else {
      yAll.push(e[1]);
      y.push(e[1]);
    }
  });
  return [x[0], y[0]];
}

console.log(
  solution([
    [1, 1],
    [2, 2],
    [1, 2],
  ])
);
