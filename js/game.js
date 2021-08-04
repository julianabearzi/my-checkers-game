var savedGames = [];
var selectedGame = null;
var loadedGame = null;
var arrayLastGame = null;

document.getElementById('load').addEventListener('click', LoadLastGame);
document.getElementById('btn').addEventListener('click', NewGame);
document.getElementById('btn-ok').addEventListener('click', HideMessage);
document.getElementById('btn-player').addEventListener('click', SavePlayers);
document.getElementById('btn-draw').addEventListener('click', HideMessageGameOverInADraw);
document.getElementById('save').addEventListener('click', function () {
  SaveGame();
  if (turn != 0) {
    DisplayMessage('Game saved');
  }
});

function DisplayMessage(message) {
  document.getElementById('message-box').className = 'message-box__display';
  document.getElementById('container-btn').className = 'stop';
  document.getElementById('message').innerHTML = message;
  checkers.className = 'stop';
}

function HideMessage() {
  document.getElementById('message-box').className = 'message-box__hidden';
  document.getElementById('player1').className = 'player-input';
  document.getElementById('player2').className = 'player-input';
  document.getElementById('incomplete-fields').className = 'incomplete-fields__hidden';
  document.getElementById('container-btn').className = 'btn-container';
  document.getElementById('btn-player').className = 'btn-hidden';
  document.getElementById('btn-ok').className = 'btn-display';
  for (var i = 0; grabbing[i]; i++) {
    grabbing[i].classList.remove('grabbing');
  }
  blackScore == 12 || brownScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
  savedGames = JSON.parse(localStorage.getItem('game')) || [];
}

function HideMessageGameOverInADraw() {
  document.getElementById('message-box').className = 'message-box__hidden';
  document.getElementById('container-btn').className = 'btn-container';
  movCounter = 0;
}

function NewGame() {
  document.getElementById('player1').className = 'player-input__display';
  document.getElementById('player2').className = 'player-input__display';
  document.getElementById('btn-player').className = 'btn-display';
  document.getElementById('btn-ok').className = 'btn-hidden';
  document.getElementById('btn-draw').className = 'btn-hidden';
  document.getElementById('player__name').textContent = 'Player 1';
  document.getElementById('player__name--two').textContent = 'Player 2';
  document.getElementById('turn').className = ' ';
  checkers.className = ' ';
  pieceAlreadySelected = false;
  mustAttack = false;
  brownScore = 0;
  blackScore = 0;
  moveDownLeft = null;
  moveDownLeftMult = null;
  moveDownRight = null;
  moveDownRightMult = null;
  moveUpLeft = null;
  moveUpLeftMult = null;
  moveUpRight = null;
  moveUpRightMult = null;
  player1.value = null;
  player2.value = null;
  movCounter = null;
  turnPlayer.textContent = '';
  selectedGame = null;
  RenderBoard();
  UpdatePlayerScore(brownScore, blackScore);
  DisplayMessage('Enter player names');
}

// function PostData() {
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//    method: 'POST',
//    body: JSON.stringify({
//      player: turn,
//      cellId: position.id
//    }),
//    headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//    },
//   }).then(function (response) {
//     return  response.json();
//   }).then(function (json) {
//      //console.log(json);
//   }).catch(function (error) {
//     console.log(error);
//   })
// }

function SaveGame() {
  var date = new Date();
  if (turn == 0) {
    DisplayMessage('Start a new game and try again');
  }
  else {
    savedGames.push({
      turn: turn,
      p1: player1.value,
      p2: player2.value,
      board: board,
      blackScore: blackScore,
      brownScore: brownScore,
      date: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
    });
    localStorage.setItem('game', JSON.stringify(savedGames));
  }
}

//Gets the object in the last position of the array of saved games
function LoadLastGame() {
  try {
    arrayLastGame = JSON.parse(localStorage.getItem('game'));
    var lastGame = arrayLastGame[arrayLastGame.length - 1];
    turn = lastGame.turn;
    blackScore = lastGame.blackScore;
    brownScore = lastGame.brownScore;
    board = lastGame.board;
    document.getElementById('player__name').textContent = lastGame.p1;
    document.getElementById('player__name--two').textContent = lastGame.p2;
    player1.value = lastGame.p1;
    player2.value = lastGame.p2;
    BoardInPlay(turn, blackScore, brownScore);
    turn == 1 ? turnPlayer.textContent = lastGame.p1 : turnPlayer.textContent = lastGame.p2;
    document.getElementById('btn-ok').className = 'btn-display';
    document.getElementById('btn-draw').className = 'btn-hidden';
    blackScore == 12 || brownScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
    pieceAlreadySelected = null;
  }
  catch (e) {
    DisplayMessage('Error. Save a game and try again');
  }
}

//Gets the previously selected item on the saved games page, which is inserted into selectedGame and load game 
function LoadSelectedGame() {
  selectedGame = JSON.parse(localStorage.getItem('selectedGame'));
  turn = selectedGame.turn;
  blackScore = selectedGame.blackScore;
  brownScore = selectedGame.brownScore;
  board = selectedGame.board;
  player1.value = selectedGame.p1;
  player2.value = selectedGame.p2;
  document.getElementById('player__name').textContent = selectedGame.p1;
  document.getElementById('player__name--two').textContent = selectedGame.p2;
  BoardInPlay(turn, blackScore, brownScore);
  turn == 1 ? turnPlayer.textContent = selectedGame.p1 : turnPlayer.textContent = selectedGame.p2;
  document.getElementById('btn-ok').className = 'btn-display';
  document.getElementById('btn-draw').className = 'btn-hidden';
  blackScore == 12 || brownScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
}

window.onload = function () {
  savedGames = JSON.parse(localStorage.getItem('game')) || [];
  loadedGame = JSON.parse(localStorage.getItem('loadedGame'));
  if (loadedGame) {
    LoadSelectedGame();
    localStorage.setItem('loadedGame', JSON.stringify(false));
  }
  else {
    RenderBoard();
  }
}


