// Factory function
const player = (haveTurn, name) => {
  const playerScore = 0;
  return { playerScore, haveTurn, name };
};

// Module
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
    switchTurn,
  };
})();

// Module
const checkGame = (() => {
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
      msg.textContent = "Tie!";
      game.gameOver = true;
      elements.turnMsg.textContent = "";
    }

    if (
      checkGame.checkRow(game.board) ||
      checkGame.checkColumn(game.board) ||
      checkGame.checkDiagonal(game.board)
    ) {
      if (!player1.haveTurn) {
        msg.textContent = `${elements.playerOne.name} Wins!`;
        game.gameOver = true;
        elements.turnMsg.textContent = "";
      } else {
        msg.textContent = `${elements.playerTwo.name} Wins!`;
        game.gameOver = true;
        elements.turnMsg.textContent = "";
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
  const displayBoard = () => {
    for (let i = 0; i < elements.cells.length; i += 1) {
      elements.cells[i].textContent = game.board.flat()[i];
    }
  };

  const displayMark = () => {
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

// Module (THIS SECTION NEEDS REFACTOR)
const edit = (() => {

  const defaultInput = () => {
    elements.playerOneEditIcon.style.display = "block"
    elements.playerOneCheck.style.display = "none"
    elements.playerOneNameEl.style.display = "block"
    elements.playerOneInput.style.display = "none"
    elements.playerOneNameEl.textContent = "Player One"
    elements.playerOne.name = elements.playerOneNameEl.textContent

    elements.playerTwoEditIcon.style.display = "block"
    elements.playerTwoCheck.style.display = "none"
    elements.playerTwoNameEl.style.display = "block"
    elements.playerTwoInput.style.display = "none"
    elements.playerTwoNameEl.textContent = "Player Two"
    elements.playerTwo.name = elements.playerTwoNameEl.textContent
  }

  const name = () => {
    elements.playerOneEditIcon.addEventListener("click", () => {
      elements.playerOneNameEl.classList.toggle("not-visible");
      elements.playerOneEditIcon.classList.toggle("not-visible");
      elements.playerOneCheck.classList.toggle("vis");
      elements.playerOneInput.classList.toggle("vis");
      
    });
    elements.playerTwoEditIcon.addEventListener("click", () => {
      elements.playerTwoNameEl.classList.toggle("not-visible");
      elements.playerTwoEditIcon.classList.toggle("not-visible");
      elements.playerTwoInput.classList.toggle("vis");
      elements.playerTwoCheck.classList.toggle("vis");
    });

    elements.playerOneCheck.addEventListener("click", () => {
      if (elements.playerOneInput.value) {
        elements.playerOneNameEl.classList.toggle("not-visible");
        elements.playerOneEditIcon.classList.toggle("not-visible");
        elements.playerOneCheck.classList.toggle("vis");
        elements.playerOneInput.classList.toggle("vis");
        elements.playerOne.name = elements.playerOneInput.value;
        elements.playerOneNameEl.textContent = elements.playerOne.name;
      }
    });

    elements.playerTwoCheck.addEventListener("click", () => {
      if (elements.playerTwoInput.value) {
        elements.playerTwoNameEl.classList.toggle("not-visible");
        elements.playerTwoEditIcon.classList.toggle("not-visible");
        elements.playerTwoInput.classList.toggle("vis");
        elements.playerTwoCheck.classList.toggle("vis");
        elements.playerTwo.name = elements.playerTwoInput.value;
        elements.playerTwoNameEl.textContent = elements.playerTwo.name;
      }
    });
  };

  return {
    name,
    defaultInput
  };
})();

// Module
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
      edit.defaultInput()
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
