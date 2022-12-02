const { readFile } = require('fs/promises');

// 2a
async function init() {
  const input = await readFile('two.txt', 'utf8');
  // const input = await readFile('two.test.txt', 'utf8');
  const data = input.split('\n');

  let score = 0;

  data.forEach((d) => {
    const [opp, me] = d.split(' ');

    score += play(opp, me);
    score += value(me);
  });

  console.log(score);
}

function play(opp, me) {
  if (me === 'X') {
    if (opp === 'A') {
      return 3;
    }
    if (opp === 'B') {
      return 0;
    }
    if (opp === 'C') {
      return 6;
    }
  }
  if (me === 'Y') {
    if (opp === 'A') {
      return 6;
    }
    if (opp === 'B') {
      return 3;
    }
    if (opp === 'C') {
      return 0;
    }
  }
  if (me === 'Z') {
    if (opp === 'A') {
      return 0;
    }
    if (opp === 'B') {
      return 6;
    }
    if (opp === 'C') {
      return 3;
    }
  }
}

function value(me) {
  if (me === 'X') {
    return 1;
  }
  if (me === 'Y') {
    return 2;
  }
  if (me === 'Z') {
    return 3;
  }

  throw new Error('bad me', me);
}

init();
