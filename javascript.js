const dialog = document.querySelector(".info");
const startButton = document.querySelector(".submitButton");
const player1Input = document.getElementById('P1');
const player2Input = document.getElementById('P2');
const p1nameDisplay = document.getElementById('p1name');
const p2nameDisplay = document.getElementById('p2name');
const p1scoreDisplay = document.getElementById('p1score');
const p2scoreDisplay = document.getElementById('p2score');
const gameMessage = document.querySelector(".gameMessage");
const resetButton = document.getElementById('resetButton');
const restartButton = document.getElementById('restartButton');

let board;
let currentPlayer;
let player1Name;
let player2Name;
let player1Score = 0;
let player2Score = 0;

const initializeGame = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
  updateGameMessage();
  p1nameDisplay.textContent = player1Name;
  p2nameDisplay.textContent = player2Name;
  p1scoreDisplay.textContent = player1Score;
  p2scoreDisplay.textContent = player2Score;
};

const updateGameMessage = () => {
  if (currentPlayer === 'X') {
    gameMessage.textContent = `It's ${player1Name}'s turn to place X`;
  } else {
    gameMessage.textContent = `It's ${player2Name}'s turn to place O`;
  }
};

const handleCellClick = (event) => {
  const cell = event.target;
  const [_, row, col] = cell.classList[1].split('-');
  if (makeMove(board, parseInt(row), parseInt(col), currentPlayer)) {
    if (checkWinner(board, currentPlayer)) {
      if (currentPlayer === 'X') {
        player1Score++;
        gameMessage.textContent = `${player1Name} wins this round!`;
      } else {
        player2Score++;
        gameMessage.textContent = `${player2Name} wins this round!`;
      }
      updateScores();
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (board.flat().every(cell => cell !== '')) {
      gameMessage.textContent = "It's a Draw!";
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else {
      currentPlayer = swapPlayer(currentPlayer);
      updateGameMessage();
    }
  } else {
    console.log("Invalid move. Try again.");
  }
};

const makeMove = (board, row, col, currentPlayer) => {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    document.querySelector(`.cell-${row}-${col}`).textContent = currentPlayer;
    return true;
  }
  return false;
};

const checkWinner = (board, symbol) => {
  return (
    (board[0][0] === symbol && board[0][1] === symbol && board[0][2] === symbol) ||
    (board[1][0] === symbol && board[1][1] === symbol && board[1][2] === symbol) ||
    (board[2][0] === symbol && board[2][1] === symbol && board[2][2] === symbol) ||
    (board[0][0] === symbol && board[1][0] === symbol && board[2][0] === symbol) ||
    (board[0][1] === symbol && board[1][1] === symbol && board[2][1] === symbol) ||
    (board[0][2] === symbol && board[1][2] === symbol && board[2][2] === symbol) ||
    (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
    (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
  );
};

const swapPlayer = (currentPlayer) => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

const updateScores = () => {
  p1scoreDisplay.textContent = player1Score;
  p2scoreDisplay.textContent = player2Score;
};

const gamePlay = (player1, player2) => {
  player1Name = player1;
  player2Name = player2;
  initializeGame();
};

startButton.addEventListener("click", () => {
  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

  if (player1Name && player2Name) {
    dialog.close();
     dialog.removeAttribute('open');
    gamePlay(player1Name, player2Name);
  } else {
    alert("Please enter both player names.");
  }
});

resetButton.addEventListener("click", () => {
  dialog.showModal();
  player1Input.value = '';
  player2Input.value = '';
  player1Score = 0;
  player2Score = 0;
  p1nameDisplay.textContent = '';
  p2nameDisplay.textContent = '';
  p1scoreDisplay.textContent = '';
  p2scoreDisplay.textContent = '';
  initializeGame();
});

restartButton.addEventListener("click", () => {
  initializeGame();
});

window.addEventListener("load", () => {
  dialog.showModal();
});

/*function gameBoard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      const cellClass = `cell-${i}-${j}`;
      const cell = document.getElementsByClassName(cellClass)[0];
      board[i][j] = cell;
    }
  }
  return board;
}

const gameController = (player1Name, player2Name) => {
  return { player1: player1Name, player2: player2Name };
};

const makeMove = (board, row, col, currentPlayer) => {
  const cell = board[row][col];
  if (cell && cell.textContent === '') {
    cell.textContent = currentPlayer;
    return true;
  }
  return false;
};

const checkWinner = (board, symbol) => {
  const winPatterns = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  return winPatterns.some(pattern => pattern.every(cell => cell.textContent === symbol));
};

const swapPlayer = (currentPlayer) => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

const updateGameMessage = (currentPlayer, player1Name, player2Name) => {
  gameMessage.textContent = currentPlayer === 'X'
    ? `It's ${player1Name}'s turn to place X`
    : `It's ${player2Name}'s turn to place O`;
};

const updateScores = () => {
  document.getElementById('p1score').textContent = player1Score;
  document.getElementById('p2score').textContent = player2Score;
};

const handleCellClick = (event) => {
  const cell = event.target;
  const [_, row, col] = cell.classList[1].split('-');
  if (makeMove(board, parseInt(row), parseInt(col), currentPlayer)) {
    if (checkWinner(board, currentPlayer)) {
      if (currentPlayer === 'X') {
        player1Score++;
        gameMessage.textContent = `${player1Name} wins this round!`;
      } else {
        player2Score++;
        gameMessage.textContent = `${player2Name} wins this round!`;
      }
      updateScores();
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else if (board.flat().every(cell => cell.textContent !== '')) {
      gameMessage.textContent = "It's a Draw!";
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    } else {
      currentPlayer = swapPlayer(currentPlayer);
      updateGameMessage(currentPlayer, player1Name, player2Name);
    }
  } else {
    console.log("Invalid move. Try again.");
  }
};

const dialog = document.querySelector(".info");
const startButton = document.querySelector(".submitButton");
const player1Input = document.getElementById('P1');
const player2Input = document.getElementById('P2');
const gameMessage = document.querySelector('.gameMessage');
let player1Name, player2Name;
let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let board;

window.addEventListener("load", () => {
  dialog.showModal();
});

startButton.addEventListener("click", () => {
  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

  if (player1Name && player2Name) {
    dialog.close();
    startGame();
  } else {
    alert("Please enter both player names.");
  }
});

const startGame = () => {
  board = gameBoard();
  document.getElementById('p1name').textContent = player1Name;
  document.getElementById('p2name').textContent = player2Name;
  updateScores();
  updateGameMessage(currentPlayer, player1Name, player2Name);

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';  // Clear any previous game state
    cell.addEventListener('click', handleCellClick);
  });
};

document.getElementById('resetButton').addEventListener('click', () => {
  player1Score = 0;
  player2Score = 0;
  startGame();
});

document.getElementById('restartButton').addEventListener('click', () => {
  startGame();
});
*/