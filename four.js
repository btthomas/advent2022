const { readFile } = require('fs/promises');

// 4
async function init() {
  const input = await readFile('four.txt', 'utf8');
  // const input = await readFile('four.test.txt', 'utf8');
  const data = input.split('\n');
  let countA = 0;
  let countB = 0;

  data.forEach((d) => {
    const [a, b] = d.split(',');
    let [a1, a2] = a.split('-');
    let [b1, b2] = b.split('-');
    a1 = parseInt(a1);
    a2 = parseInt(a2);
    b1 = parseInt(b1);
    b2 = parseInt(b2);

    if (enclosed(a1, a2, b1, b2)) {
      countA++;
    }

    if (overlap(a1, a2, b1, b2)) {
      countB++;
    }
  });

  console.log({ countA, countB });
}

function enclosed(a1, a2, b1, b2) {
  if (a1 <= b1 && a2 >= b2) {
    return true;
  }
  if (b1 <= a1 && b2 >= a2) {
    return true;
  }
  return false;
}

function overlap(a1, a2, b1, b2) {
  // if (a1 == b1 || a1 == b2 || a2 == b1 || a2 == b2) {
  //   return true;
  // }
  if (a1 <= b1) {
    if (a2 >= b1) {
      return true;
    }
  }
  if (b1 <= a1) {
    if (b2 >= a1) {
      return true;
    }
  }
  // if (a2 >= b2) {
  //   if (a1 <= b2) {
  //     return true;
  //   }
  // }
  // if (b2 >= a2) {
  //   if (b1 <= a2) {
  //     return true;
  //   }
  // }
  return false;
}

init();
