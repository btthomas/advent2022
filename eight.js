const { readFile } = require('fs/promises');
let TREES = [];
let VIS = [];
let SCORE = [];

// 8
async function init() {
  const input = await readFile('eight.txt', 'utf8');
  // const input = await readFile('eight.test.txt', 'utf8');
  const rows = input.split('\n');

  TREES = rows.map((row, i) => {
    VIS[i] = [];
    SCORE[i] = [];
    return row.split('').map((d, j) => {
      VIS[i][j] = false;
      SCORE[i][j] = false;
      return parseInt(d);
    });
  });

  // console.log(TREES);

  // check from left
  for (let i = 0; i < TREES.length; i++) {
    let highest = -1;
    for (let j = 0; j < TREES[i].length; j++) {
      if (TREES[i][j] > highest) {
        VIS[i][j] = true;
        highest = TREES[i][j];
      }
    }
  }

  // check from right
  for (let i = 0; i < TREES.length; i++) {
    let highest = -1;
    for (let j = TREES[i].length - 1; j >= 0; j--) {
      if (TREES[i][j] > highest) {
        VIS[i][j] = true;
        highest = TREES[i][j];
      }
    }
  }

  // check from top
  for (let j = 0; j < TREES[0].length; j++) {
    let highest = -1;
    for (let i = 0; i < TREES.length; i++) {
      if (TREES[i][j] > highest) {
        VIS[i][j] = true;
        highest = TREES[i][j];
      }
    }
  }

  // check from bottom
  for (let j = 0; j < TREES[0].length; j++) {
    let highest = -1;
    for (let i = TREES.length - 1; i >= 0; i--) {
      if (TREES[i][j] > highest) {
        VIS[i][j] = true;
        highest = TREES[i][j];
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < VIS.length; i++) {
    for (let j = 0; j < VIS[i].length; j++) {
      if (VIS[i][j]) {
        sum++;
      }
    }
  }

  // check for best spot
  for (let i = 0; i < TREES.length; i++) {
    for (let j = 0; j < TREES[i].length; j++) {
      const height = TREES[i][j];
      const score = [0, 0, 0, 0];

      // right
      for (let y = j + 1; y < TREES[0].length; y++) {
        score[0]++;
        if (TREES[i][y] >= height) {
          break;
        }
      }
      // left
      for (let y = j - 1; y >= 0; y--) {
        score[1]++;
        if (TREES[i][y] >= height) {
          break;
        }
      }
      // up
      for (let x = i + 1; x < TREES.length; x++) {
        score[2]++;
        if (TREES[x][j] >= height) {
          break;
        }
      }
      // dowm
      for (let x = i - 1; x >= 0; x--) {
        score[3]++;
        if (TREES[x][j] >= height) {
          break;
        }
      }

      SCORE[i][j] = score[0] * score[1] * score[2] * score[3];
    }
  }

  const max = SCORE.reduce((a, row) => {
    r = row.reduce((acc, d) => {
      if (d > acc) {
        return d;
      }
      return acc;
    });
    if (r > a) {
      return r;
    }
    return a;
  }, 0);

  console.log({ max });
  // console.log({ SCORE });
}

init();
