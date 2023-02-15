// Factory function
const player = (name, haveTurn) => {
  const playerScore = 0;
  return { playerScore, haveTurn, name };
};

// Module
const game = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const gameOver = false;

  const switchTurn = (player1, player2) => {
    if (player1.haveTurn) {
      player1.haveTurn = false;
      player2.haveTurn = true;
    } else {
      player1.haveTurn = true;
      player2.haveTurn = false;
    }
  };
  return {
    board,
    gameOver,
    switchTurn,
  };
})();

// Module
const checkMatch = (() => {
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
    if (array[1][1]) { // If array is not empty
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

  const checkWin = (msg, player1, player2) => {
    if (game.board.flat().every((item) => item)) {
      msg.textContent = "Tie!";
      game.gameOver = true;
    }

    if (
      checkMatch.checkRow(game.board) ||
      checkMatch.checkColumn(game.board) ||
      checkMatch.checkDiagonal(game.board)
    ) {
      if (!player1.haveTurn) {
        msg.textContent = `${player1.name} Wins!`;
        game.gameOver = true;
      } else {
        msg.textContent = `${player2.name} Wins!`;
        game.gameOver = true;
      }
    }
  };

  return {
    checkRow,
    checkColumn,
    checkDiagonal,
    checkWin,
  };
})();

// Module
const displayController = (() => {
  const personOne = prompt("What is player one's name ? ")
  const personTwo = prompt("What is player two's name? ")
  const playerOne = player(personOne, true);
  const playerTwo = player(personTwo, false);
  const cells = document.getElementsByClassName("cell");
  const winMsg = document.getElementById("win-msg");

  const displayBoard = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].textContent = game.board.flat()[i];
    }
  };

  const displayMark = () => {
    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener("click", () => {
        let count = -1;
        for (let index = 0; index < game.board.length; index += 1) {
          for (let j = 0; j < game.board.length; j += 1) {
            count += 1;
            if (count === i) {
              if (playerOne.haveTurn) {
                if (!game.board[index][j] && !game.gameOver) {
                  // If cell is empty and game is not over
                  game.board[index][j] = "X";
                  game.switchTurn(playerOne, playerTwo);
                }
              }
              if (playerTwo.haveTurn) {
                if (!game.board[index][j] && !game.gameOver) {
                  // If cell is empty and game is not over
                  game.board[index][j] = "O";
                  game.switchTurn(playerOne, playerTwo);
                }
              }
              displayBoard();
            }
          }
        }
        checkMatch.checkWin(winMsg, playerOne, playerTwo);
      });
    }
  };

  return {
    displayMark,
  };
})();

displayController.displayMark();
