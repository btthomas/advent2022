const { readFile } = require('fs/promises');
const NOOP = 'noop';
const HIT = '#';
const MISS = '.';

// 7
async function init() {
  const input = await readFile('ten.txt', 'utf8');
  // const input = await readFile('ten.test.txt', 'utf8');

  const instructions = input.split('\n');

  let x = 1;
  let t = 0;
  const history = [];
  const screen = [];

  instructions.forEach((code) => {
    if (code === NOOP) {
      history[t] = x;
      t++;
    } else {
      let [_, v] = code.split(' ');
      v = parseInt(v);
      history[t] = x;
      history[t + 1] = x;
      x += v;
      t += 2;
    }
  });

  history[t] = x;

  let sum = 0;
  sum += 20 * history[19];
  sum += 60 * history[59];
  sum += 100 * history[99];
  sum += 140 * history[139];
  sum += 180 * history[179];
  sum += 220 * history[219];
  console.log({ sum });
  console.log(history.length);

  for (let i = 0; i < 240; i++) {
    const value = history[i];

    if (i % 40 === value - 1 || i % 40 === value || i % 40 === value + 1) {
      screen[i] = HIT;
    } else {
      screen[i] = MISS;
    }
  }

  printScreen(screen);
}

function printScreen(screen) {
  console.log(screen.slice(0, 40).join(''));
  console.log(screen.slice(40, 80).join(''));
  console.log(screen.slice(80, 120).join(''));
  console.log(screen.slice(120, 160).join(''));
  console.log(screen.slice(160, 200).join(''));
  console.log(screen.slice(200, 240).join(''));
}

init();
