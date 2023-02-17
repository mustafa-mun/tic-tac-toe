// Player factory function
const player = (haveTurn, name) => {
  const playerScore = 0;
  return { playerScore, haveTurn, name };
};

// Elements module
const elements = (() => {
  const playerOneEditIcon = document.getElementById("player-one-edit");
  const playerTwoEditIcon = document.getElementById("player-two-edit");
  const playerOneInput = document.getElementById("player-one-name-input");
  const playerTwoInput = document.getElementById("player-two-name-input");
  const playerOneNameEl = document.getElementById("player-one-name");
  const playerTwoNameEl = document.getElementById("player-two-name");
  const playerOneCheck = document.getElementById("player-one-check");
  const playerTwoCheck = document.getElementById("player-two-check");
  const playerOne = player(true, playerOneNameEl.textContent);
  const playerTwo = player(false, playerTwoNameEl.textContent);
  const cells = document.getElementsByClassName("cell");
  const winMsg = document.getElementById("win-msg");
  const turnMsg = document.getElementById("turn-msg");
  const restBtn = document.getElementById("restart-btn");

  return {
    playerOneEditIcon,
    playerTwoEditIcon,
    playerOneInput,
    playerTwoInput,
    playerOneCheck,
    playerTwoCheck,
    playerOneNameEl,
    playerTwoNameEl,
    playerOne,
    playerTwo,
    cells,
    winMsg,
    turnMsg,
    restBtn,
  };
})();

// Gameboard module
const game = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const gameOver = false;
  const gameTie = false;

  const switchTurn = (player1, player2) => {
    if (player1.haveTurn) {
      player1.haveTurn = false;
      player2.haveTurn = true;
      elements.turnMsg.textContent = `${elements.playerTwo.name}'s Turn!`;
    } else {
      player1.haveTurn = true;
      player2.haveTurn = false;
      elements.turnMsg.textContent = `${elements.playerOne.name}'s Turn!`;
    }
  };
  return {
    board,
    gameOver,
    gameTie,
    switchTurn,
  };
})();

// Check win module
const checkGame = (() => {
  const checkRow = (array) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][i]) {
        if (array[i][0] === array[i][1] && array[i][1] === array[i][2]) {
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
      // If array is not empty
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

  const checkWin = (msg, player1) => {
    if (game.board.flat().every((item) => item)) {
      // Check for tie game
      msg.textContent = "Tie!";
      game.gameOver = true;
      game.gameTie = true;
      elements.turnMsg.textContent = "";
    }

    if (
      // Check for win conditionals
      checkGame.checkRow(game.board) ||
      checkGame.checkColumn(game.board) ||
      checkGame.checkDiagonal(game.board)
    ) {
      if (!player1.haveTurn) {
        msg.textContent = `${elements.playerOne.name} Wins!`;
        elements.turnMsg.textContent = "";
        if (!game.gameOver || game.gameTie) {
          elements.playerOne.playerScore += 1;
          elements.playerOneNameEl.textContent = `${elements.playerOne.name}: ${elements.playerOne.playerScore}`;
        }
        game.gameOver = true;
      } else {
        msg.textContent = `${elements.playerTwo.name} Wins!`;
        elements.turnMsg.textContent = "";
        if (!game.gameOver || game.gameTie) {
          elements.playerTwo.playerScore += 1;
          elements.playerTwoNameEl.textContent = `${elements.playerTwo.name}: ${elements.playerTwo.playerScore}`;
        }
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

// Display module
const displayController = (() => {
  const displayBoard = () => {
    // Display board items on screen
    for (let i = 0; i < elements.cells.length; i += 1) {
      elements.cells[i].textContent = game.board.flat()[i];
    }
  };

  const displayMark = () => {
    // Display x and o on screen and check for win on every mark
    for (let i = 0; i < elements.cells.length; i += 1) {
      elements.cells[i].addEventListener("click", () => {
        let count = -1;
        for (let index = 0; index < game.board.length; index += 1) {
          for (let j = 0; j < game.board.length; j += 1) {
            count += 1;
            if (count === i) {
              if (elements.playerOne.haveTurn) {
                if (!game.board[index][j] && !game.gameOver) {
                  // If cell is empty and game is not over
                  game.board[index][j] = "🍌";
                  game.switchTurn(elements.playerOne, elements.playerTwo);
                }
              }
              if (elements.playerTwo.haveTurn) {
                if (!game.board[index][j] && !game.gameOver) {
                  // If cell is empty and game is not over
                  game.board[index][j] = "🍉";
                  game.switchTurn(elements.playerOne, elements.playerTwo);
                }
              }
              displayBoard();
            }
          }
        }
        checkGame.checkWin(elements.winMsg, elements.playerOne);
      });
    }
  };

  return {
    displayMark,
    displayBoard,
  };
})();

// Edit names module
const edit = (() => {
  const name = () => {
    const playerOneInputToggle = () => {
      elements.playerOneNameEl.classList.toggle("not-visible");
      elements.playerOneEditIcon.classList.toggle("not-visible");
      elements.playerOneCheck.classList.toggle("visible");
      elements.playerOneInput.classList.toggle("visible");
    };

    const playerTwoInputToggle = () => {
      elements.playerTwoNameEl.classList.toggle("not-visible");
      elements.playerTwoEditIcon.classList.toggle("not-visible");
      elements.playerTwoInput.classList.toggle("visible");
      elements.playerTwoCheck.classList.toggle("visible");
    };

    elements.playerOneEditIcon.addEventListener("click", () => {
      // Edit icon event listener
      playerOneInputToggle();
    });
    elements.playerTwoEditIcon.addEventListener("click", () => {
      playerTwoInputToggle();
    });

    elements.playerOneCheck.addEventListener("click", () => {
      // Check icon event listener
      if (elements.playerOneInput.value) {
        playerOneInputToggle();
        elements.playerOne.name = elements.playerOneInput.value;
        elements.playerOneNameEl.textContent = `${elements.playerOne.name}: ${elements.playerOne.playerScore}`;
      }
    });

    elements.playerTwoCheck.addEventListener("click", () => {
      if (elements.playerTwoInput.value) {
        playerTwoInputToggle();
        elements.playerTwo.name = elements.playerTwoInput.value;
        elements.playerTwoNameEl.textContent = `${elements.playerTwo.name}: ${elements.playerTwo.playerScore}`;
      }
    });
  };

  return {
    name,
  };
})();

// Restart game board module
const restart = (() => {
  const gameBoard = () => {
    const refresh = () => {
      game.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      elements.playerOne.haveTurn = true;
      elements.playerTwo.haveTurn = false;
      elements.winMsg.textContent = "";
      elements.turnMsg.textContent = "";
      game.gameOver = false;
      displayController.displayBoard();
    };
    elements.restBtn.addEventListener("click", () => {
      refresh();
    });
  };
  return {
    gameBoard,
  };
})();

displayController.displayMark();
edit.name();
restart.gameBoard();
