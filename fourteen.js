const { readFile } = require('fs/promises');

const GRID = {};
const R = '#';
const S = 'o';
let AllX = [];
let AllY = [];
let lastY;

// 14
async function init() {
  const input = await readFile('fourteen.txt', 'utf8');
  // const input = await readFile('fourteen.test.txt', 'utf8');

  input.split('\n').forEach((line) => {
    const points = line.split(' -> ');

    let [x, y] = parse(points[0]);
    let xx, yy;

    AllX.push(x);
    AllY.push(y);

    for (let i = 1; i < points.length; i++) {
      [xx, yy] = parse(points[i]);
      AllX.push(xx);
      AllY.push(yy);

      if (x === xx) {
        // iterate on y
        if (yy > y) {
          for (let j = y; j <= yy; j++) {
            if (!GRID[j]) {
              GRID[j] = {};
            }
            GRID[j][x] = R;
          }
        } else {
          for (let j = yy; j <= y; j++) {
            if (!GRID[j]) {
              GRID[j] = {};
            }
            GRID[j][x] = R;
          }
        }
      } else {
        if (!GRID[y]) {
          GRID[y] = {};
        }
        // iterate on x
        if (xx > x) {
          for (let j = x; j <= xx; j++) {
            GRID[y][j] = R;
          }
        } else {
          for (let j = xx; j <= x; j++) {
            GRID[y][j] = R;
          }
        }
      }
      x = xx;
      y = yy;
    }
  });

  let sorted = AllY.sort((a, b) => a - b);
  lastY = sorted.reverse()[0] + 2;

  GRID[lastY] = {};
  for (let x = 0; x < 1000; x++) {
    GRID[lastY][x] = R;
  }

  for (let i = 0; i < lastY; i++) {
    if (!GRID[i]) {
      GRID[i] = {};
    }
  }
  printGrid();

  let sand = 0;

  let working = true;

  while (working) {
    let x = 500;
    let y = 0;

    while (y < lastY) {
      // check down
      if (!GRID[y + 1][x]) {
        y++;
      } else if (!GRID[y + 1][x - 1]) {
        // check downleft
        y++;
        x--;
      } else if (!GRID[y + 1][x + 1]) {
        // check downright
        y++;
        x++;
      } else {
        // STUCK!
        GRID[y][x] = S;
        if (y === 0 && x === 500) {
          working = false;
        }
        break;
      }
    }

    if (y === lastY) {
      break;
    }

    sand++;
    // printGrid();

    // readlineSync.keyInPause(sand);
  }

  printGrid();

  console.log({ '14b': sand });
}

function printGrid() {
  const lowX = 0;
  const highX = 1000;

  console.log({ lastY, lowX, highX });
  let count = 0;

  for (let y = 0; y <= lastY; y++) {
    const row = [];
    for (let x = lowX; x <= highX; x++) {
      if (GRID[y][x]) {
        if (GRID[y][x] === S) {
          count++;
        }
        row.push(GRID[y][x]);
      } else {
        row.push('.');
      }
    }
    // console.log(row.join(''));
  }
  console.log(count);
}

function parse(s) {
  const [x, y] = s.split(',');
  return [parseInt(x), parseInt(y)];
}

init();
