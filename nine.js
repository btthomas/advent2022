const { readFile } = require('fs/promises');
const U = 'U';
const D = 'D';
const L = 'L';
const R = 'R';
const TAILS = {};
const ROPE = [];

// 9
async function init() {
  // const input = await readFile('nine.txt', 'utf8');
  const input = await readFile('nine.test.txt', 'utf8');
  const rows = input.split('\n');

  for (let i = 0; i < 10; i++) {
    ROPE[i] = { x: 0, y: 0 };
  }

  rows.forEach((row) => {
    let [dir, len] = row.split(' ');
    len = parseInt(len);

    for (let c = 0; c < len; c++) {
      // move H
      if (dir === U) {
        ROPE[0].y++;
      } else if (dir === D) {
        ROPE[0].y--;
      } else if (dir === R) {
        ROPE[0].x++;
      } else if (dir === L) {
        ROPE[0].x--;
      }

      for (let i = 1; i < 10; i++) {
        if (ROPE[i - 1].x - ROPE[i].x >= 2) {
          ROPE[i].y = ROPE[i - 1].y;
          ROPE[i].x = ROPE[i - 1].x - 1;
        } else if (ROPE[i - 1].x - ROPE[i].x <= -2) {
          ROPE[i].y = ROPE[i - 1].y;
          ROPE[i].x = ROPE[i - 1].x + 1;
        } else if (ROPE[i - 1].y - ROPE[i].y >= 2) {
          ROPE[i].x = ROPE[i - 1].x;
          ROPE[i].y = ROPE[i - 1].y - 1;
        } else if (ROPE[i - 1].y - ROPE[i].y <= -2) {
          ROPE[i].x = ROPE[i - 1].x;
          ROPE[i].y = ROPE[i - 1].y + 1;
        }
      }

      TAILS[`${ROPE[9].x}-${ROPE[9].y}`] = 1;
    }
  });

  console.log(Object.entries(TAILS).length);
}

init();
