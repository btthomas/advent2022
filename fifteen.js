const { readFile } = require('fs/promises');
// const SENSORS = {};
// const BEACONS = {};
// const allY = [];
// const allX = [];
const noBeacon = [];
const LOW = 0;
const HIGH = 40000; //

for (let y = LOW; y <= HIGH; y++) {
  noBeacon[y] = [];
}

// 15
async function init() {
  console.time('a');

  // const input = await readFile('fifteen.test.txt', 'utf8');
  const input = await readFile('fifteen.txt', 'utf8');

  input.split('\n').forEach((row) => {
    let [a, b, sx, sy, c, d, e, f, bx, by] = row.split(' ');
    sx = parseNumber(sx);
    sy = parseNumber(sy);
    bx = parseNumber(bx);
    by = parseNumber(by);

    // if (!SENSORS[sy]) {
    //   SENSORS[sy] = {};
    // }
    // SENSORS[sy][sx] = true;

    // if (!BEACONS[by]) {
    //   BEACONS[by] = {};
    // }
    // BEACONS[by][bx] = true;

    // allY.push(by);
    // allY.push(sy);

    // allX.push(bx);
    // allX.push(sx);

    // check y=10
    const dist = manhattan(sx, sy, bx, by);
    // console.log({ sx, sy, bx, by, dist });
    for (let y = sy - dist; y <= sy + dist; y++) {
      if (y < LOW) {
        continue;
      }
      if (y > HIGH) {
        continue;
      }

      const distYto10 = Math.abs(y - sy);
      if (distYto10 <= dist) {
        // fill it in?
        const spread = dist - distYto10;
        for (let x = sx - spread; x <= sx + spread; x++) {
          if (x < LOW) {
            continue;
          }
          if (x > HIGH) {
            continue;
          }
          noBeacon[y][x] = true;
        }
      }
    }
  });

  for (let y = LOW; y <= HIGH; y++) {
    for (let x = LOW; x <= HIGH; x++) {
      if (!noBeacon[y][x]) {
        console.log({ x, y });
      }
    }
  }
  console.timeEnd('a');

  // console.log(noBeacon);
  // if (BEACONS[2000000]) {
  //   Object.keys(BEACONS[2000000]).forEach((xVal) => {
  //     noBeacon.delete(parseInt(xVal));
  //   });
  // }
  // console.log(noBeacon.size);

  // console.log({ SENSORS });
  // console.log({ BEACONS });

  // const sortedX = allX.sort((a, b) => a - b);
  // const lowX = sortedX[0];
  // const highX = sortedX.reverse()[0];

  // const sortedY = allY.sort((a, b) => a - b);
  // const lowY = sortedY[0];
  // const highY = sortedY.reverse()[0];

  // console.log({ lowX, highX, lowY, highY });
}

function parseNumber(s) {
  return parseInt(s.split('=')[1]);
}

function manhattan(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

init();
