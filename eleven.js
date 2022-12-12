// test
// const MONKEYS = [
//   {
//     count: 0,
//     items: [79, 98],
//     operation: (x) => (19 * x) % 96577,
//     test: (x) => {
//       if (x % 23 === 0) {
//         return 2;
//       } else {
//         return 3;
//       }
//     },
//   },
//   {
//     count: 0,
//     items: [54, 65, 75, 74],
//     operation: (x) => (x + 6) % 96577,
//     test: (x) => {
//       if (x % 19 === 0) {
//         return 2;
//       } else {
//         return 0;
//       }
//     },
//   },
//   {
//     count: 0,
//     items: [79, 60, 97],
//     operation: (x) => (x * x) % 96577,
//     test: (x) => {
//       if (x % 13 === 0) {
//         return 1;
//       } else {
//         return 3;
//       }
//     },
//   },
//   {
//     count: 0,
//     items: [74],
//     operation: (x) => (x + 3) % 96577,
//     test: (x) => {
//       if (x % 17 === 0) {
//         return 0;
//       } else {
//         return 1;
//       }
//     },
//   },
// ];

// input
const MONKEYS = [
  {
    count: 0,
    items: [66, 79],
    operation: (x) => (x * 11) % 9699690,
    test: (x) => {
      if (x % 7 === 0) {
        return 6;
      } else {
        return 7;
      }
    },
  },
  {
    count: 0,
    items: [84, 94, 94, 81, 98, 75],
    operation: (x) => (x * 17) % 9699690,
    test: (x) => {
      if (x % 13 === 0) {
        return 5;
      } else {
        return 2;
      }
    },
  },
  {
    count: 0,
    items: [85, 79, 59, 64, 79, 95, 67],
    operation: (x) => (x + 8) % 9699690,
    test: (x) => {
      if (x % 5 === 0) {
        return 4;
      } else {
        return 5;
      }
    },
  },
  {
    count: 0,
    items: [70],
    operation: (x) => (x + 3) % 9699690,
    test: (x) => {
      if (x % 19 === 0) {
        return 6;
      } else {
        return 0;
      }
    },
  },
  {
    count: 0,
    items: [57, 69, 78, 78],
    operation: (x) => (x + 4) % 9699690,
    test: (x) => {
      if (x % 2 === 0) {
        return 0;
      } else {
        return 3;
      }
    },
  },
  {
    count: 0,
    items: [65, 92, 60, 74, 72],
    operation: (x) => (x + 7) % 9699690,
    test: (x) => {
      if (x % 11 === 0) {
        return 3;
      } else {
        return 4;
      }
    },
  },
  {
    count: 0,
    items: [77, 91, 91],
    operation: (x) => (x * x) % 9699690,
    test: (x) => {
      if (x % 17 === 0) {
        return 1;
      } else {
        return 7;
      }
    },
  },
  {
    count: 0,
    items: [76, 58, 57, 55, 67, 77, 54, 99],
    operation: (x) => (x + 6) % 9699690,
    test: (x) => {
      if (x % 3 === 0) {
        return 2;
      } else {
        return 1;
      }
    },
  },
];

for (let turn = 0; turn < 10000; turn++) {
  if (turn % 1000 === 0) {
    console.log(MONKEYS.map((x) => x.count));
  }
  MONKEYS.forEach((monkey) => {
    while (monkey.items.length) {
      let value = monkey.items.shift();
      value = monkey.operation(value);
      const toMonkey = monkey.test(value);
      MONKEYS[toMonkey].items.push(value);
      monkey.count++;

      // console.log({ value, toMonkey });
    }
  });
}

console.log(MONKEYS.map((x) => x.count));
