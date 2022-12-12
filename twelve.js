const { readFile } = require('fs/promises');
const GRID = [];
const BEST = [];
const ALL_BEST = [];
let endX, endY;

// 12
async function init() {
  const input = (await readFile('twelve.txt', 'utf8')).split('\n');
  // const input = (await readFile('twelve.test.txt', 'utf8')).split('\n');

  let x, y;

  input.forEach((row, i) => {
    GRID[i] = [];

    row.split('').forEach((d, j) => {
      GRID[i][j] = d;
      if (d === 'S') {
        y = i;
        x = j;
        GRID[i][j] = 'a';
      } else if (d === 'E') {
        endX = j;
        endY = i;
        GRID[i][j] = 'z';
      }
    });
  });

  // console.log(GRID.join('\n'));

  GRID.forEach((row, i) => {
    row.forEach((d, j) => {
      if (d === 'a') {
        x = j;
        y = i;

        // reset the BEST
        GRID.forEach((row, i) => {
          BEST[i] = [];
        });

        findNext({ x, y }, 0);

        if (BEST[endY][endX]) {
          ALL_BEST.push(BEST[endY][endX]);
        }
      }
    });
  });

  console.log(ALL_BEST.sort());
}

function findNext({ x, y }, count) {
  if (x === endX && y === endY) {
    // at the finish line
    if (!BEST[y][x] || count < BEST[y][x]) {
      BEST[y][x] = count;
    }
  } else if (!BEST[y][x] || count < BEST[y][x]) {
    // still looking
    BEST[y][x] = count;
    const charCode = GRID[y][x].charCodeAt(0);
    let nextCharCode;

    // check right
    if (x + 1 < GRID[0].length) {
      nextCharCode = GRID[y][x + 1].charCodeAt(0);
      if (nextCharCode - charCode <= 1) {
        findNext({ x: x + 1, y }, count + 1);
      }
    }
    // check down
    if (y + 1 < GRID.length) {
      nextCharCode = GRID[y + 1][x].charCodeAt(0);
      if (nextCharCode - charCode <= 1) {
        findNext({ x, y: y + 1 }, count + 1);
      }
    }
    // check up
    if (y - 1 >= 0) {
      nextCharCode = GRID[y - 1][x].charCodeAt(0);
      if (nextCharCode - charCode <= 1) {
        findNext({ x, y: y - 1 }, count + 1);
      }
    }
    // check left
    if (x - 1 >= 0) {
      nextCharCode = GRID[y][x - 1].charCodeAt(0);
      if (nextCharCode - charCode <= 1) {
        findNext({ x: x - 1, y }, count + 1);
      }
    }
  }
  // not the best :)
}

init();
