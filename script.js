// // Factory function
// const person = (name, surname) => {
//   const getName = () => console.log(`Your name is ${name}`);
//   const getFullName = () => console.log(`Your fullname is ${name} ${surname}`);
//   return { getName, getFullName };
// };
// const jack = person("jack", "london");

// // Module
// const calculator = (() => {
//   const add = (a, b) => a + b;
//   const sub = (a, b) => a - b;
//   const mul = (a, b) => a * b;
//   const div = (a, b) => a / b;
//   return {
//     add,
//     sub,
//     mul,
//     div,
//   };
// })();

function checkRow(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
      // Check rows
      return true;
    }
  }
  return false;
}

function checkColumn(array) {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length; j += 1) {
      if (
        array[j][i] === array[j + 1][i] &&
        array[j + 1][i] === array[j + 2][i]
      ) {
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal(array) {
  if (
    (array[0][0] === array[1][1] && array[1][1] === array[2][2]) ||
    (array[0][2] === array[1][1] && array[1][1] === array[2][0])
  ) {
    return true;
  }
  return false;
}


// Module
const gameBoard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  return {
    board,
  };
})();

console.log(checkColumn(gameBoard.board));

// Factory function
const player = (name) => {
  const playerScore = 0;
  return { playerScore, name };
};
