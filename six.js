const { readFile } = require('fs/promises');

// 6
async function init() {
  const input = await readFile('six.txt', 'utf8');
  // const input = await readFile('six.test.txt', 'utf8');

  const n = 14;
  const pairs = genPairs(n);
  const len = scan(input, n, pairs);

  console.log(len + 1);
}

function genPairs(n) {
  const pairs = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs;
}

function scan(input, n, pairs) {
  for (let i = n - 1; i < input.length; i++) {
    let matches = 0;
    pairs.forEach((pair) => {
      if (input[i - pair[0]] === input[i - pair[1]]) {
        matches++;
      }
    });
    if (matches === 0) {
      return i;
    }
  }
}

init();
