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
  let gameOver = false;
  return {
    board,
    gameOver,
  };
})();

// Module
const checkWin = (() => {
  const checkRow = (array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][i]) {
        if (array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
          // Check rows
          return true;
        }
      }
    }
    return false;
  };

  const checkColumn = (array) => {
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
  };

  const checkDiagonal = (array) => {
    if (array[1][1]) {
      if (
        (array[0][0] === array[1][1] && array[1][1] === array[2][2]) ||
        (array[0][2] === array[1][1] && array[1][1] === array[2][0])
      ) {
        return true;
      }
      return false;
    }
    return "";
  };

  return {
    checkRow,
    checkColumn,
    checkDiagonal,
  };
})();

// Module
const displayController = (() => {
  const playerOne = player("name1", true);
  const playerTwo = player("name2", false);
  const cells = document.getElementsByClassName("cell");
  const winMsg = document.getElementById("win-msg");

  const switchTurn = () => {
    if (playerOne.haveTurn) {
      playerOne.haveTurn = false;
      playerTwo.haveTurn = true;
    } else {
      playerOne.haveTurn = true;
      playerTwo.haveTurn = false;
    }
  };

  const displayBoard = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].textContent = gameBoard.board.flat()[i];
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
                if (!gameBoard.board[index][j] && !gameBoard.gameOver) {
                  // If cell is empty and game is not over
                  gameBoard.board[index][j] = "X";
                  switchTurn();
                }
              }
              if (playerTwo.haveTurn) {
                if (!gameBoard.board[index][j] && !gameBoard.gameOver) {
                  // If cell is empty and game is not over
                  gameBoard.board[index][j] = "O";
                  switchTurn();
                }
              }

              if (
                checkWin.checkRow(gameBoard.board) ||
                checkWin.checkColumn(gameBoard.board) ||
                checkWin.checkDiagonal(gameBoard.board)
              ) {
                if (!playerOne.haveTurn) {
                  winMsg.textContent = `${playerOne.name} Wins!`;
                  gameBoard.gameOver = true;
                } else {
                  winMsg.textContent = `${playerTwo.name} Wins!`;
                  gameBoard.gameOver = true;
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

displayController.displayMark();
