const { readFile } = require('fs/promises');

// 2a
async function init() {
  const input = await readFile('two.txt', 'utf8');
  // const input = await readFile('two.test.txt', 'utf8');
  const data = input.split('\n');

  let score = 0;

  data.forEach((d) => {
    // const [opp, me] = d.split(' ');
    // score += play(opp, me);
    // score += value(me);

    const [opp, result] = d.split(' ');
    score += playB(opp, result);
  });

  console.log(score);
}

function playB(opp, result) {
  let score = 0;

  if (result === 'X') {
    // lose
    if (opp === 'A') {
      return 3;
    }
    if (opp === 'B') {
      return 1;
    }
    if (opp === 'C') {
      return 2;
    }
  }
  if (result === 'Y') {
    // tie
    if (opp === 'A') {
      return 4;
    }
    if (opp === 'B') {
      return 5;
    }
    if (opp === 'C') {
      return 6;
    }
  }
  if (result === 'Z') {
    // win
    if (opp === 'A') {
      return 8;
    }
    if (opp === 'B') {
      return 9;
    }
    if (opp === 'C') {
      return 7;
    }
  }
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
