const { readFile } = require('fs/promises');

// 5
async function init() {
  const input = await readFile('five.txt', 'utf8');
  // const input = await readFile('five.test.txt', 'utf8');

  const data = input.split('\n');

  const blankI = data.findIndex((d) => !d);

  const board = data.slice(0, blankI - 1).reverse();
  const nBins = (data[blankI - 1].length - 2) / 3;
  const moves = data.slice(blankI + 1);

  const stacks = buildStacks(nBins, board);

  // console.log({ stacks, moves });

  moves.forEach((move) => {
    let [a, num, b, from, c, to] = move.split(' ');
    num = parseInt(num);
    from = parseInt(from) - 1;
    to = parseInt(to) - 1;

    for (let i = 0; i < num; i++) {
      stacks[to].push(stacks[from].pop());
    }
  });

  // console.log({ stacks });
  const message = stacks.reduce((acc, stack) => `${acc}${stack.pop()}`, '');
  console.log(message);
}

function buildStacks(n, board) {
  const stacks = [];
  for (let bin = 0; bin < n; bin++) {
    stacks[bin] = [];
  }

  board.forEach((layer, y) => {
    for (let bin = 0; bin < n; bin++) {
      const x = 4 * bin + 1;
      const letter = layer[x];

      if (letter === ' ') {
        continue;
      }

      stacks[bin].push(letter);
    }
  });

  return stacks;
}

init();
