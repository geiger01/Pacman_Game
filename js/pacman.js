'use strict';
const PACMAN = '😬';
var PACMAN_IMG = '<img src="img/pacman.png" />';

var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  if (nextCell === BROCOLLI) {
    gFoodCounter--;
    updateScore(10);
  }
  if (nextCell === WALL) return;

  if (nextCell === SUPER_FOOD && !gPacman.isSuper) {
    getSuper();

    setTimeout(function () {
      gPacman.isSuper = false;
      console.log('super end');

      GHOST = '👻';
      if (gGhosts.length === 0) {
        createGhosts(gBoard);
      } else if (gGhosts.length === 1) {
        createGhost(gBoard);
        createGhost(gBoard);
      } else if (gGhosts.length === 2) {
        createGhost(gBoard);
      }
    }, 5000);
  } else if (nextCell === SUPER_FOOD && gPacman.isSuper) {
    return;
  }

  if (nextCell === FOOD) {
    updateScore(1);
    console.log(gFoodCounter);

    if (gFoodCounter === gFoodAmount.length - 5) victory(); //it's -5 to not count the superfood
  } else if (gPacman.isSuper && nextCell === GHOST) {
      
    for (var i = 0; i < gGhosts.length; i++) {
      var crrGhostLocation = gGhosts[i].location;

      if (
        crrGhostLocation.i === nextLocation.i &&
        crrGhostLocation.j === nextLocation.j
      ) {
        gGhosts.splice(i, 1);
        if (gGhosts[i].currCellContent !== FOOD) continue;
        console.log(gBoard[crrGhostLocation.i][crrGhostLocation.j]);
        updateScore(1);
      }
    }

    // renderCell(nextCell, getGhostHTML(gGhosts));
  } else if (nextCell === GHOST) {
    gameOver();
    renderCell(gPacman.location, EMPTY);
    return;
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
