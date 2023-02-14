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

const cells = document.getElementsByClassName("cell");

function checkRow(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][i]) {
      if (array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
        // Check rows
        return true;
      }
    }
  }
  return false;
}

function checkColumn(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][i]) {
      for (let j = 0; j < array.length; j += 1) {
        if (
          array[j][i] === array[j + 1][i] &&
          array[j + 1][i] === array[j + 2][i]
        ) {
          return true;
        }
        break;
      }
    }
  }
  return false;
}

function checkDiagonal(array) {
  if (array[1][1]) {
    if (
      (array[0][0] === array[1][1] && array[1][1] === array[2][2]) ||
      (array[0][2] === array[1][1] && array[1][1] === array[2][0])
    ) {
      return true;
    }
    return false;
  }
}

// Factory function
const player = (name, haveTurn) => {
  const playerScore = 0;
  return { playerScore, haveTurn, name };
};

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

// Module
const displayController = (() => {
  const playerOne = player("name1", true);
  const playerTwo = player("name2", false);

  const displayBoard = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].textContent = gameBoard.board.flat()[i];
    }
  };

  const switchTurn = () => {
    if (playerOne.haveTurn) {
      playerOne.haveTurn = false;
      playerTwo.haveTurn = true;
    } else {
      playerOne.haveTurn = true;
      playerTwo.haveTurn = false;
    }
  };

  const displayMark = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener("click", () => {
        let count = -1;
        for (let index = 0; index < gameBoard.board.length; index += 1) {
          for (let j = 0; j < gameBoard.board.length; j += 1) {
            count += 1;
            if (count === i) {
              if (playerOne.haveTurn) {
                if (!gameBoard.board[index][j]) {
                  gameBoard.board[index][j] = "X";
                  switchTurn();
                }
              } else {
                if (!gameBoard.board[index][j]) {
                  gameBoard.board[index][j] = "O";
                  switchTurn();
                }
              }

              if (
                checkRow(gameBoard.board) ||
                checkColumn(gameBoard.board) ||
                checkDiagonal(gameBoard.board)
              ) {
                if (playerTwo.haveTurn) console.log("player one wins");
                else {
                  console.log("player two wins");
                }
              }
              displayBoard();
            }
          }
        }
      });
    }
  };

  return {
    displayBoard,
    displayMark,
  };
})();

displayController.displayBoard();
displayController.displayMark();
