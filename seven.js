const { readFile } = require('fs/promises');
const MAX = 40000000;
let NODES = [];

// 7
async function init() {
  const input = await readFile('seven.txt', 'utf8');
  // const input = await readFile('seven.test.txt', 'utf8');
  const chunks = input.split('$');

  // console.log({ chunks });

  const tree = {
    name: '/',
    parent: null,
    children: {},
  };

  let current = tree;

  chunks.forEach((chunk) => {
    const data = chunk.split('\n');
    // console.log({ data });

    if (data[0] === ' ls') {
      // list stuff for current node
      for (let i = 1; i < data.length; i++) {
        const d = data[i];
        if (d === '') {
          continue;
        }
        const [left, right] = d.split(' ');

        if (left === 'dir') {
          current.children[right] = {
            name: right,
            parent: current,
            children: {},
          };
        } else {
          current.children[right] = {
            name: right,
            size: left,
          };
        }
      }
    } else if (data[0] === ' cd ..') {
      // move up
      current = current.parent;
    } else {
      // move down
      const down = data[0].split(' ')[2];

      current = current.children[down];
    }
  });

  const total = calcSizes(tree);
  // console.log(NODES);
  // console.log(NODES.length);

  const atLeast = total - MAX;
  console.log(total, atLeast);

  const sorted = NODES.filter((n) => {
    return n.size >= atLeast;
  }).sort((a, b) => {
    return a.size - b.size;
  });

  console.log(sorted[0].size);

  printTree(tree);
}

function calcSizes(tree) {
  if (tree.size) {
    return parseInt(tree.size);
  }

  let size = 0;

  for (const key in tree.children) {
    size += calcSizes(tree.children[key]);
  }

  NODES.push(tree);

  tree.size = size;
  return size;
}

function printTree(tree, depth = 0) {
  const indentLen = depth * 2;
  let indent = '';
  for (i = 0; i < indentLen; i++) {
    indent += ' ';
  }

  console.log(`${indent}- ${tree.name}, ${tree.size}`);

  for (const key in tree.children) {
    printTree(tree.children[key], depth + 1);
  }
}

init();
