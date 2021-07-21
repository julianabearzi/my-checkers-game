var checkers = null;
var cell = null; 
var pieceAlreadySelected = null; 
var pieceBrown = null;
var pieceBlack = null;
var board = [
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null]
];
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

function TurnPiece(turn) {
  if (turn == 1) {
    document.getElementById('turn').classList.remove('p2');
    document.getElementById('turn').classList.add('p1'); 
    for(i=0; i<cells.length; i++) {
    cells[i].addEventListener('click', PieceClickHandler, false); 
    }
  }
  else if (turn == 2) {
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
        boardMatrix += '<td id="' + x + y + '" class="cell-dark'
        board[x][y] = null;
      } 
      else {
        boardMatrix += '<td id="' + x + y + '" class="cell-light'
        board[x][y] = null;
      }
      if ((x == 0 &&  y % 2 == 0) || (x == 1 && y % 2 == 1) || (x == 2 && y % 2 == 0)) {
        boardMatrix +='"><img src="./img/black.png" class="checkers__piece--black" alt="black"></td>';
        board[x][y] = 2;
      }
      else if ((x == board.length - 2 && y % 2 == 0) || (x == board.length - 1 && y % 2 == 1) 
      || (x == board.length - 3 && y % 2 == 1) ) {
        boardMatrix += '"><img src="./img/brown.png" class="checkers__piece--brown" alt="brown"></td>';
        board[x][y] = 1;
      }
      else {
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
      document.getElementById('message-box').className = 'message-box__display';
      document.getElementById('message').innerHTML = 'Light brown pieces turn';
      checkers.className = 'stop';
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
        document.getElementById('message-box').className = 'message-box__display';
        document.getElementById('message').innerHTML = 'Black pieces turn';
        checkers.className = 'stop';
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

function UpdatePlayerScore(blackScore, brownScore) {
  document.getElementById('player__score').textContent =  'Score: ' + brownScore; 
  document.getElementById('player__score--two').textContent = 'Score: ' + blackScore; 
}

function CheckWin(){
  if(blackScore == 12){
    document.getElementById('message-box').className = 'message-box__display';
    document.getElementById('message').innerHTML = 'Player 2 wins';
    checkers.className = 'stop';
  }
  else if(brownScore == 12){
    document.getElementById('message-box').className = 'message-box__display';
    document.getElementById('message').innerHTML = 'Player 1 wins';
    checkers.className = 'stop';
  }
}

function HideMessage(){
  document.getElementById('message-box').className = 'message-box__hidden';
  checkers.className = ' ';
  for(i=0; grabbing[i]; i++) {
    grabbing[i].classList.remove('grabbing');
  }
}

function NewGame() {
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
  RenderBoard();
  UpdatePlayerScore(brownScore, blackScore);
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
    board: board,
    blackScore: blackScore,
    brownScore: brownScore
  };
  localStorage.setItem('game', JSON.stringify(savedGame));
  document.getElementById('message-box').className = 'message-box__display';
  document.getElementById('message').innerHTML = 'Game saved';
  checkers.className = 'stop';
}

function LoadLastGame() {
  try {
    var lastGame = JSON.parse(localStorage.getItem('game'));
    turn = lastGame.turn;
    blackScore = lastGame.blackScore;
    brownScore = lastGame.brownScore;
    board = lastGame.board;
    BoardInPlay(turn, blackScore, brownScore);
  }
  catch(e) {
    document.getElementById('message-box').className = 'message-box__display';
    document.getElementById('message').innerHTML = 'Error. Save a game and try again';
    checkers.className = 'stop';
  }
  
}

window.onload = function () {
  checkers = document.getElementById('checkers');
  row = document.getElementsByClassName('row');
  cells = document.getElementsByClassName('cell-dark'); 
  grabbing = document.getElementsByTagName('img');
  RenderBoard();
}


