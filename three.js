const { readFile } = require('fs/promises');

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const a = 97;
const z = 122;
const A = 65;
const Z = 90;

// 3
async function init() {
  const input = await readFile('three.txt', 'utf8');
  // const input = await readFile('three.test.txt', 'utf8');
  const data = input.split('\n');

  let score = 0;
  let group = [];

  data.forEach((d, i) => {
    const j = i % 3;
    if (j === 0) {
      group = [];
    }
    group[j] = d;
    if (j === 2) {
      const shared = findShared(group);
      console.log({ shared });
      score += shared;
    }
  });

  console.log({ score });
}

function findShared(group) {
  const all = [];
  group.forEach((g) => {
    [...new Set(g)].forEach((d) => {
      const val = value(d);
      all[val] > 0 ? all[val]++ : (all[val] = 1);
    });
  });
  return all.indexOf(3);
}

function findDupe(pack) {
  const len = pack.length;

  if (len % 2) {
    console.log({ len });
  }

  const left = pack.substring(0, len / 2);
  const right = pack.substring(len / 2);

  if (left.length !== right.length) {
    console.log('DIFFERENT LENGTHS');
    throw new Error();
  }

  // console.log({ left, right });

  const set = new Set(left);
  let char;

  right.split('').forEach((d) => {
    if (set.has(d)) {
      char = d;
    }
  });

  return char;
}

function value(char) {
  const code = char.charCodeAt(0);

  if (code < 95) {
    // uppercase
    return code - 38;
  }

  return code - 96;
}

init();
