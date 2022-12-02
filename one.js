const { readFile } = require('fs/promises');

// 1a-b
async function init() {
  const input = await readFile('one.txt', 'utf8');
  // const input = await readFile('one.test.txt', 'utf8');
  const data = input.split('\n').map((d) => parseInt(d));

  const elfs = [];
  let i = 0;
  let max = 0;

  data.forEach((d) => {
    if (!elfs[i]) {
      elfs[i] = 0;
    }

    if (isNaN(d)) {
      if (elfs[i] > max) {
        max = elfs[i];
      }
      i++;
      return;
    }

    elfs[i] += d;
  });

  console.log(elfs);
  console.log(max);

  const sorted = elfs.sort((a, b) => a - b).reverse();

  console.log(sorted[0] + sorted[1] + sorted[2]);
}

init();
