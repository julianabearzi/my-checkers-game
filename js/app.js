var checkers = null;
var cell = null; 
var pieceAlreadySelected = null; 
var pieceBrown = null;
var pieceBlack = null;
var player1 = null;
var player2 = null;
var board = [
  [2, null, 2, null, 2, null, 2, null],
  [null, 2, null, 2, null, 2, null, 2],
  [2, null, 2, null, 2, null, 2, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, 1, null, 1, null, 1, null, 1],
  [1, null, 1, null, 1, null, 1, null],
  [null, 1, null, 1, null, 1, null, 1]
];
var turnPlayer = null;
var turn = 2;
var position = null;
var mustAttack = false;
var brownScore = 0;
var blackScore = 0;
var moveDownLeft = null;
var moveDownLeftMult = null;
var moveDownRight = null;
var moveDownRightMult = null;
var moveUpLeft = null;
var moveUpLeftMult = null; 
var moveUpRight = null;
var moveUpRightMult = null;
document.getElementById('save').addEventListener('click', SaveGame);
document.getElementById('load').addEventListener('click', LoadLastGame);
document.getElementById('btn').addEventListener('click', NewGame);
document.getElementById('btn-ok').addEventListener('click', HideMessage);
document.getElementById('btn-player').addEventListener('click', SavePlayers);

function TurnPiece(turn) {
  if (turn == 1) {
    turnPlayer.textContent = player1.value;
    document.getElementById('turn').classList.remove('p2');
    document.getElementById('turn').classList.add('p1'); 
    for(i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', PieceClickHandler, false); 
    }
  }
  else if (turn == 2) {
    turnPlayer.textContent = player2.value;
    document.getElementById('turn').classList.remove('p1');
    document.getElementById('turn').classList.add('p2');
    for(i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', PieceClickHandler, false);
    }
  }
}



function IsOdd(num) { 
  return num % 2;
}

function IsEven(value) {
  if (value%2 == 0) {
    return true;
  } 
  else {
    return false;
  }
}

function RenderBoard() {
  document.getElementById('message-box').className = 'message-box__hidden';
  var boardMatrix = '';
  for (var x = 0; x < board.length; x++) {
    boardMatrix += '<tr id="' + x + '" class="row">'
    for (var y = board[x].length - 1; y >= 0; y--) {
      if((IsOdd(x) && IsOdd(y)) || ((IsEven(x) && IsEven(y)))){
        boardMatrix += '<td id="' + x + y + '" class="cell-dark';
        boardMatrix += '"></td>';
      } 
      else {
        boardMatrix += '<td id="' + x + y + '" class="cell-light';
        boardMatrix += '"></td>';
      }    
    }
    boardMatrix += '</tr>';
  } 
  checkers.innerHTML = boardMatrix;
  TurnPiece(turn);
} 

function BoardInPlay(turnLast, lastBlackScore, lastBrownScore) {
  turn = turnLast;
  blackScore = lastBlackScore;
  brownScore = lastBrownScore;
  document.getElementById('message-box').className = 'message-box__hidden';
  var boardMatrixInPlay = '';
  for (var x = 0; x < board.length; x++) {
    boardMatrixInPlay += '<tr id="' + x + '" class="row">'
    for (var y = board[x].length - 1; y >= 0; y--) {
      if((IsOdd(x) && IsOdd(y)) || ((IsEven(x) && IsEven(y)))){
        boardMatrixInPlay += '<td id="' + x + y + '" class="cell-dark'
      } 
      else {
        boardMatrixInPlay += '<td id="' + x + y + '" class="cell-light'
      }
      if (board[x][y] == 2) {
        boardMatrixInPlay +='"><img src="./img/black.png" class="checkers__piece--black" alt="black"></td>';
      }
      else if (board[x][y] == 1) {
        boardMatrixInPlay += '"><img src="./img/brown.png" class="checkers__piece--brown" alt="brown"></td>';
      }
      else {
        boardMatrixInPlay += '"></td>';
      }         
    }
    boardMatrixInPlay += '</tr>';
  } 
  checkers.innerHTML = boardMatrixInPlay;
  TurnPiece(turnLast);
  UpdatePlayerScore(lastBlackScore, lastBrownScore);
} 

function OrderPiecesInNewGame () {
  for (var x = 0; x < board.length; x++) {
    for (var y = board[x].length - 1; y >= 0; y--) {
     if ((x == 0 &&  y % 2 == 0) || (x == 1 && y % 2 == 1) || (x == 2 && y % 2 == 0)) {
     board[x][y] = 2;
     }
     else if ((x == board.length - 2 && y % 2 == 0) || (x == board.length - 1 && y % 2 == 1) 
     || (x == board.length - 3 && y % 2 == 1) ) {
      board[x][y] = 1;
     }
     else {
      board[x][y] = null;
     }
   }
  }
}

function checkAttack() {
  for(i=0; i<cells.length; i++) {
    if(cells[i].id == moveUpLeft) {
      moveUpLeft = cells[i]; 
      if(moveUpLeft.innerHTML == '') {
      moveUpLeft.classList.add('move-here');
      moveUpLeft.classList.remove('cell-dark');
      }  
    }
    if(cells[i].id == moveUpRight){
      moveUpRight = cells[i];    
      if(moveUpRight.innerHTML == ''){
      moveUpRight.classList.add('move-here');
      moveUpRight.classList.remove('cell-dark');
      }  
    }
    if(cells[i].id == moveUpLeftMult){
      moveUpLeftMult = cells[i]; 
    }
    if(cells[i].id == moveUpRightMult){
      moveUpRightMult = cells[i]; 
    }
  }

  for(i=0; i<cells.length; i++) {
    if(cells[i].id == moveDownRightMult){
      moveDownRightMult = cells[i]; 
    } 
  }

  for(i=0; i<cells.length; i++) {
    if(cells[i].id == moveDownLeftMult){
      moveDownLeftMult = cells[i]; 
    } 
  }

  for(i=0; i<cells.length; i++) { 
    if(cells[i].id == moveDownLeft){
      moveDownLeft = cells[i]; 
      if(moveDownLeft.innerHTML == ''){
      moveDownLeft.classList.add('move-here');
      moveDownLeft.classList.remove('cell-dark');
      }  
    }  
  }  

  for(i=0; i<cells.length; i++) { 
    if(cells[i].id == moveDownRight){
      moveDownRight = cells[i]; 
     if(moveDownRight.innerHTML == ''){
      moveDownRight.classList.add('move-here');
      moveDownRight.classList.remove('cell-dark');
     }  
    }
  }

  if(turn == 2){
    if((moveDownLeft.innerHTML == pieceBrown) 
    &&(moveDownLeftMult.innerHTML == ''))
    {    
      if(moveDownRight.id != undefined){
        moveDownRight.classList.remove('move-here');
        moveDownRight.classList.add('cell-dark');
      }
      moveDownLeft.classList.remove('move-here');
      moveDownLeft.classList.add('cell-dark');
      moveDownLeftMult.classList.add('move-here');
      moveDownLeftMult.classList.remove('cell-dark');
    }
    if((moveDownRight.innerHTML == pieceBrown)
    &&(moveDownRightMult.innerHTML == ''))
    {
      if(moveDownLeft.id != undefined){
        moveDownLeft.classList.remove('move-here');
        moveDownLeft.classList.add('cell-dark');
      }
      moveDownRight.classList.remove('move-here');
      moveDownRight.classList.add('cell-dark');
      moveDownRightMult.classList.add('move-here');
      moveDownRightMult.classList.remove('cell-dark');
    }
    if(((moveDownLeft.innerHTML == pieceBrown) 
    &&(moveDownLeftMult.innerHTML == ''))
    ||((moveDownRight.innerHTML == pieceBrown)
    &&(moveDownRightMult.innerHTML == ''))) {
      mustAttack = true;
    }
    else {
      mustAttack = false;
    }
  }

  else if(turn == 1){
   if((moveUpLeft.innerHTML == pieceBlack) 
   &&(moveUpLeftMult.innerHTML == ''))
   {    
    if(moveUpRight.id != undefined ){
      moveUpRight.classList.remove('move-here');
      moveUpRight.classList.add('cell-dark');
    } 
    moveUpLeft.classList.remove('move-here');
    moveUpLeft.classList.add('cell-dark');
    moveUpLeftMult.classList.add('move-here');
    moveUpLeftMult.classList.remove('cell-dark');
   }

   if((moveUpRight.innerHTML == pieceBlack)
   &&(moveUpRightMult.innerHTML == ''))
   {
    if(moveUpLeft.id != undefined){
      moveUpLeft.classList.remove('move-here');
      moveUpLeft.classList.add('cell-dark');
    }
    moveUpRight.classList.remove('move-here');
    moveUpRight.classList.add('cell-dark');
    moveUpRightMult.classList.add('move-here');
    moveUpRightMult.classList.remove('cell-dark');
   }
   if((moveUpLeft.innerHTML == pieceBlack 
   && moveUpLeftMult.innerHTML == '')
   ||(moveUpRight.innerHTML == pieceBlack)
   &&(moveUpRightMult.innerHTML == '')) {
     mustAttack = true;
   }
   else {
     mustAttack = false;
   }
  }
}

function PieceClickHandler(e) { 
  if(turn == 1){
    if(!pieceAlreadySelected && e.currentTarget.firstElementChild) {
      for(i=0; grabbing[i]; i++) {
        grabbing[i].classList.add('grabbing'); 
      }
      document.getElementById('checkers').classList.add('grabbing');
      cell = e.currentTarget; 
      pieceBrown = e.currentTarget.innerHTML;
      moveUpRight =  cell.id-11;
      moveUpLeft = cell.id-9;
      moveUpRightMult = moveUpRight-11;
      moveUpLeftMult = moveUpLeft-9;
      try {
      e.currentTarget.querySelector('.checkers__piece--brown').classList.add('painted');  
      checkAttack();
      pieceAlreadySelected = true; 
      } catch (e) {
      DisplayMessage('Light brown pieces turn');
      }
    }
    else if(pieceAlreadySelected && !mustAttack){ 
      position = e.currentTarget;
      board[(position.id).substring(0,1)][(position.id).substring(1,2)] = 1;
      board[(cell.id).substring(0,1)][(cell.id).substring(1,2)] = null;
      if((position.innerHTML != pieceBlack)
      && (position.innerHTML != pieceBrown)
      && (position.id == (cell.id-9) 
      || position.id == (cell.id-11)) 
      || position == cell) {
        if((moveUpLeft.id%10) <= 7){ 
          moveUpLeft.classList.remove('move-here');
          moveUpLeft.classList.add('cell-dark');
        }
        if((moveUpRight.id%10) <= 7){
          moveUpRight.classList.remove('move-here');
          moveUpRight.classList.add('cell-dark');
        }
        cell.innerHTML= ''; 
        position.innerHTML = pieceBrown; 
        for(i=0; grabbing[i]; i++) {
          grabbing[i].classList.remove('grabbing');
        }
        document.getElementById('checkers').classList.remove('grabbing');
        pieceAlreadySelected = false; 
        if(position != cell) {
        turn = 2;
        TurnPiece(turn);
        }
      }
    }
    else if(pieceAlreadySelected && mustAttack){
      position = e.currentTarget;
      board[(position.id).substring(0,1)][(position.id).substring(1,2)] = 1;
      board[(cell.id).substring(0,1)][(cell.id).substring(1,2)] = null;
      if((moveUpLeftMult.id%10) <= 7){ 
        moveUpLeftMult.classList.remove('move-here');
        moveUpLeftMult.classList.add('cell-dark');
      }
      if((moveUpRightMult.id%10) <= 7){
        moveUpRightMult.classList.remove('move-here');
        moveUpRightMult.classList.add('cell-dark');
      }
      if(position.id == moveUpLeftMult.id && moveUpLeft.innerHTML == pieceBlack && moveUpLeftMult.innerHTML == ''){
        board[(moveUpLeft.id).substring(0,1)][(moveUpLeft.id).substring(1,2)] = null;
        cell.innerHTML= ''; 
        position.innerHTML = pieceBrown; 
        moveUpLeft.innerHTML = '';
        for(i=0; grabbing[i]; i++) {
          grabbing[i].classList.remove('grabbing');
        }
        document.getElementById('checkers').classList.remove('grabbing');
        pieceAlreadySelected = false;
        brownScore++;
        turn = 2;
        TurnPiece(turn);
      }
      else if(position.id == moveUpRightMult.id && moveUpRight.innerHTML == pieceBlack && moveUpRightMult.innerHTML == ''){
        board[(moveUpRight.id).substring(0,1)][(moveUpRight.id).substring(1,2)] = null;
        cell.innerHTML= ''; 
        position.innerHTML = pieceBrown; 
        moveUpRight.innerHTML = '';
        for(i=0; grabbing[i]; i++) {
          grabbing[i].classList.remove('grabbing');
        }
        document.getElementById('checkers').classList.remove('grabbing');
        pieceAlreadySelected = false;
        brownScore++;
        turn = 2;
        TurnPiece(turn);
      }
    }
    UpdatePlayerScore(blackScore, brownScore);
  }
  else if (turn == 2) {
    if(!pieceAlreadySelected && e.currentTarget.firstElementChild) {
      for(i=0; grabbing[i]; i++) {
        grabbing[i].classList.add('grabbing'); 
      } 
      document.getElementById('checkers').classList.add('grabbing');
      cell = e.currentTarget; 
      pieceBlack = e.currentTarget.innerHTML;
      moveDownRight =  -(-cell.id-11);
      moveDownLeft = -(-cell.id-9);
      moveDownLeftMult = moveDownLeft+9;
      moveDownRightMult = moveDownRight+11;
      try {
        e.currentTarget.querySelector('.checkers__piece--black').classList.add('painted');
        checkAttack(); 
        pieceAlreadySelected = true; 
      } catch (e) {
        DisplayMessage('Black pieces turn');
      }   
    }
    else if(pieceAlreadySelected && !mustAttack){
      position = e.currentTarget;
      board[(position.id).substring(0,1)][(position.id).substring(1,2)] = 2;
      board[(cell.id).substring(0,1)][(cell.id).substring(1,2)] = null;
      if((position.innerHTML != pieceBrown)
      && (position.innerHTML != pieceBlack) 
      && (position.id == -(-cell.id-9) 
      || position.id == -(-cell.id-11)) 
      || position == cell){
       if((moveDownLeft.id%10) <= 7){ 
        moveDownLeft.classList.remove('move-here');
        moveDownLeft.classList.add('cell-dark');
       }
       if((moveDownRight.id%10) <= 7){
        moveDownRight.classList.remove('move-here');
        moveDownRight.classList.add('cell-dark');
       }
       cell.innerHTML= ''; 
       position.innerHTML = pieceBlack; 
       for(i=0; grabbing[i]; i++) {
         grabbing[i].classList.remove('grabbing');
       }
       document.getElementById('checkers').classList.remove('grabbing');
       pieceAlreadySelected = false;
       if(position != cell) {
        turn = 1;
        TurnPiece(turn);
       }
      }
    }
    else if(pieceAlreadySelected && mustAttack){
      position = e.currentTarget;
      board[(position.id).substring(0,1)][(position.id).substring(1,2)] = 2;
      board[(cell.id).substring(0,1)][(cell.id).substring(1,2)] = null;
      if((moveDownLeftMult.id%10) <= 7){ 
        moveDownLeftMult.classList.remove('move-here');
        moveDownLeftMult.classList.add('cell-dark');
      }
      if((moveDownRightMult.id%10) <= 7){
        moveDownRightMult.classList.remove('move-here');
        moveDownRightMult.classList.add('cell-dark');
      }
      if(position.id == moveDownLeftMult.id 
        && moveDownLeft.innerHTML == pieceBrown
        && moveDownLeftMult.innerHTML == '') {
        board[(moveDownLeft.id).substring(0,1)][(moveDownLeft.id).substring(1,2)] = null;
        cell.innerHTML= ''; 
        position.innerHTML = pieceBlack; 
        moveDownLeft.innerHTML = '';
        for(i=0; grabbing[i]; i++) {
           grabbing[i].classList.remove('grabbing');
        }
        document.getElementById('checkers').classList.remove('grabbing');
        pieceAlreadySelected = false;
        blackScore++;
        turn = 1;
        TurnPiece(turn);
      }
      else if(position.id == moveDownRightMult.id
      && moveDownRight.innerHTML == pieceBrown
      && moveDownRightMult.innerHTML == '') {
        board[(moveDownRight.id).substring(0,1)][(moveDownRight.id).substring(1,2)] = null;
        cell.innerHTML= ''; 
        position.innerHTML = pieceBlack; 
        moveDownRight.innerHTML = '';
        for(i=0; grabbing[i]; i++) {
          grabbing[i].classList.remove('grabbing');
        } 
        document.getElementById('checkers').classList.remove('grabbing');
        pieceAlreadySelected = false;
        blackScore++;
        turn = 1;
        TurnPiece(turn);
      }
    }
    UpdatePlayerScore(blackScore, brownScore);
  }
    CheckWin();
}

function SavePlayers() {
  if (player1.value == '' || player2.value == '') {
    document.getElementById('incomplete-fields').className = 'incomplete-fields__display';
  }
  else {
   document.getElementById('player__name').textContent =  player1.value; 
   document.getElementById('player__name--two').textContent =  player2.value; 
   turnPlayer.textContent = player2.value;
   HideMessage();
   OrderPiecesInNewGame();
   BoardInPlay(turn, blackScore, brownScore);
  }
}

function UpdatePlayerScore(blackScore, brownScore) {
  document.getElementById('player__score').textContent =  'Score: ' + brownScore; 
  document.getElementById('player__score--two').textContent = 'Score: ' + blackScore; 
}

function CheckWin() {
  if(blackScore == 12){
    var p2Name = document.getElementById('player__name--two').textContent;
    DisplayMessage(p2Name+ ' wins');
  }
  else if(brownScore == 12){
    var p1Name = document.getElementById('player__name').textContent;
    DisplayMessage(p1Name + ' wins');
  }
}

function DisplayMessage (message) {
  document.getElementById('message-box').className = 'message-box__display';
  checkers.className = 'stop';
  document.getElementById('container-btn').className = 'stop';
  document.getElementById('message').innerHTML = message;
}

function HideMessage() {
  document.getElementById('message-box').className = 'message-box__hidden';
  document.getElementById('player1').className = 'player-input';
  document.getElementById('player2').className = 'player-input';
  document.getElementById('incomplete-fields').className = 'incomplete-fields__hidden';
  checkers.className = ' ';
  document.getElementById('container-btn').className = 'btn-container';
  document.getElementById('btn-player').className = 'btn-hidden';
  document.getElementById('btn-ok').className = 'btn-display';
  for(i=0; grabbing[i]; i++) {
    grabbing[i].classList.remove('grabbing');
  }
}

function NewGame() {
  document.getElementById('player1').className = 'player-input__display';
  document.getElementById('player2').className = 'player-input__display';
  document.getElementById('btn-player').className = 'btn-display';
  document.getElementById('btn-ok').className = 'btn-hidden';
  document.getElementById('player__name').textContent =  'Player 1'; 
  document.getElementById('player__name--two').textContent =  'Player 2'; 
  turn = 2;
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
  turnPlayer.textContent = '';
  RenderBoard();
  UpdatePlayerScore(brownScore, blackScore);
  DisplayMessage('Enter player names');
}

function PostData() {
  fetch('https://jsonplaceholder.typicode.com/posts', {
   method: 'POST',
   body: JSON.stringify({
     player: turn,
     cellId: position.id
   }),
   headers: {
    'Content-type': 'application/json; charset=UTF-8',
   },
  }).then(function (response) {
    return  response.json();
  }).then(function (json) {
     //console.log(json);
  }).catch(function (error) {
    console.log(error);
  })
}

function SaveGame() {
  var savedGame = {
    turn: turn,
    p1: player1.value,
    p2: player2.value,
    board: board,
    blackScore: blackScore,
    brownScore: brownScore
  };
  localStorage.setItem('game', JSON.stringify(savedGame));
  DisplayMessage('Game saved');
}

function LoadLastGame() {
  try {
    var lastGame = JSON.parse(localStorage.getItem('game'));
    turn = lastGame.turn;
    blackScore = lastGame.blackScore;
    brownScore = lastGame.brownScore;
    board = lastGame.board;
    document.getElementById('player__name').textContent =  lastGame.p1; 
    document.getElementById('player__name--two').textContent =  lastGame.p2; 
    BoardInPlay(turn, blackScore, brownScore);
    turn == 1 ? turnPlayer.textContent = lastGame.p1 : turnPlayer.textContent = lastGame.p2;
  }
  catch(e) {
    DisplayMessage('Error. Save a game and try again');
  }
}

window.onload = function () {
  checkers = document.getElementById('checkers');
  row = document.getElementsByClassName('row');
  cells = document.getElementsByClassName('cell-dark'); 
  grabbing = document.getElementsByTagName('img');
  player1 = document.getElementById('p1-name');
  player2 = document.getElementById('p2-name');
  turnPlayer = document.getElementById('turn-player');
  RenderBoard();
}


