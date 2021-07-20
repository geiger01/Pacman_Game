'use strict';
const WALL = '⬛';
const FOOD = '°';
const EMPTY = ' ';
const SUPER_FOOD = '🥕';
const BROCOLLI = '🥦';

var gFoodCounter = 0;
var gFoodAmount = [];
var brocolliInterval;

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
function init() {
  reset();
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  brocolliInterval = setInterval(placeRandomBrocolli, 15000);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodAmount.push(board[i][j]); ////push each element so i get all of the elements
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gFoodAmount.pop(board[i][j]); ////takes out each element that is not food so i get length of food
      }
    }
  }
  board[1][1] = board[1][8] = board[8][1] = board[8][8] = SUPER_FOOD;
  return board;
}

function updateScore(diff) {
  gFoodCounter++;
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
  gGame.isOn = false;
  document.querySelector('.game-over h2').innerText = 'Game-Over';
  document.querySelector('.game-over').style.opacity = 1;
  clearInterval(gIntervalGhosts);
  clearInterval(brocolliInterval);
}

function victory() {
  gGame.isOn = false;
  document.querySelector('.game-over h2').innerText = 'You Won!';
  document.querySelector('.game-over').style.opacity = 1;
  clearInterval(gIntervalGhosts);
  clearInterval(brocolliInterval);
}

function reset() {
  GHOST = '👻';
  gFoodCounter = 0;
  document.querySelector('.game-over').style.opacity = 0;
  gGame.score = 0;
  document.querySelector('h2 span').innerText = gGame.score;
  gFoodAmount = [];
}

function getSuper() {
  gPacman.isSuper = true;
  GHOST = '👀';
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = '#ff8800';
    renderCell(gGhosts[i].location, getGhostHTML('#ff8800'));
  }
}

function placeRandomBrocolli() {
  var emptyCells = [];

  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (
        gBoard[i][j] !== FOOD &&
        gBoard[i][j] !== PACMAN &&
        gBoard[i][j] !== SUPER_FOOD &&
        gBoard[i][j] !== GHOST &&
        gBoard[i][j] !== WALL
      ) {
        var possLocation = { i: i, j: j };
        emptyCells.push(possLocation);
      }
    }
  }

  var numOfIdxs = emptyCells.length - 1;
  var randomIdx = Math.floor(Math.random() * numOfIdxs);
  var i = emptyCells[randomIdx].i;
  var j = emptyCells[randomIdx].j;

  gBoard[i][j] = BROCOLLI;
  renderCell(emptyCells[randomIdx], BROCOLLI);
  console.log(emptyCells[randomIdx]);
}
