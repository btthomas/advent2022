const { readFile } = require('fs/promises');
const YES = 'YES';
const NO = 'NO';
const CONTINUE = 'CONTINUE';

const TWO = JSON.stringify([[2]]);
const SIX = JSON.stringify([[6]]);

// 13
async function init() {
  const input = await readFile('thirteen.txt', 'utf8');
  // const input = await readFile('thirteen.test.txt', 'utf8');

  const allPairs = [];
  const pairs = input.split('\n\n').map((pair) => {
    const [left, right] = pair.split('\n');

    allPairs.push(JSON.parse(left));
    allPairs.push(JSON.parse(right));

    return {
      left: JSON.parse(left),
      right: JSON.parse(right),
    };
  });

  allPairs.push([[2]]);
  allPairs.push([[6]]);

  const CORRECT = [];

  pairs.forEach((pair, i) => {
    let { left, right } = pair;

    if (compare(left, right) === YES) {
      CORRECT.push(i + 1);
    }
  });

  const sum = CORRECT.reduce((acc, d) => acc + d, 0);
  console.log({ '13a': sum });

  const sortedPairs = allPairs.sort((a, b) => {
    const c = compare(a, b);
    if (c === YES) {
      return -1;
    } else if (c === NO) {
      return 1;
    }
    return 0;
  });

  const twoI = sortedPairs.findIndex((d) => {
    return JSON.stringify(d) === TWO;
  });
  const sixI = sortedPairs.findIndex((d) => {
    return JSON.stringify(d) === SIX;
  });

  // console.log({ 2: twoI + 1, 6: sixI + 1 });
  console.log({ '13b': (twoI + 1) * (sixI + 1) });
}

function compare(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return YES;
    } else if (left > right) {
      return NO;
    } else {
      return CONTINUE;
    }
  } else if (typeof left === 'object' && typeof right === 'object') {
    let i = 0;
    while (true) {
      const ll = left[i];
      const rr = right[i];

      if (exists(rr) && !exists(ll)) {
        return YES;
      } else if (exists(ll) && !exists(rr)) {
        return NO;
      } else if (!exists(ll) && !exists(rr)) {
        return CONTINUE;
      }

      const c = compare(ll, rr);
      if (c === YES) {
        return YES;
      } else if (c === NO) {
        return NO;
      }

      i++;
    }
  } else if (typeof left === 'object') {
    return compare(left, [right]);
  } else {
    return compare([left], right);
  }
}

function exists(d) {
  return !!(d || d === 0);
}
init();

/*
[[1],[2,3,4]]
[[1],4]










*/
