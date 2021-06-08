var checkers = null;
var cell, piece, pieceAlreadySelected; 
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
var turn = 0;
var brownScore = 0;
var blackScore = 0;

function TurnPiece() {
    var score = 0;
    if (turn === 1) {
      document.getElementById('turn').classList.add('p1');
    //  score++;
      blackScore.innerHTML = 'Score: ' + score; 
    } else {
      document.getElementById('turn').classList.add('p2');
   //   score++;
      brownScore.innerHTML = 'Score: ' + score;
    }
  }
 
var renderBoard = function () {
    var boardMatrix = '';
    for (var x = 0; x < board.length; x++) {
        boardMatrix += '<tr id="' + x + '" class="row">'
        for (var y = board[x].length - 1; y >= 0; y--) {
            boardMatrix += '<td id="' + x + y + '" class="cell'
           if ((x === 0 &&  y % 2 === 0) || (x === 1 && y % 2 === 1) || (x === 2 && y % 2 === 0)) {
            boardMatrix +='"><img src="./img/black.png" class="checkers__piece--black" alt="black"></td>';
           }
           else if ((x === board.length - 2 && y % 2 === 0) || (x === board.length - 1 && y % 2 === 1) || (x === board.length - 3 && y % 2 === 1) ) {
            boardMatrix += '"><img src="./img/brown.png" class="checkers__piece--brown" alt="brown"></td>';
           }
           else {
            boardMatrix += '"></td>';
           }         
        }
        boardMatrix += '</tr>';
    } 
    checkers.innerHTML = boardMatrix;
    TurnPiece(turn);
    var cells = document.querySelectorAll('td'); 
    for(i=0; i<cells.length; i++) {
      cells[i].addEventListener('click', CellClickHandler, false);
    }
    } 
    
    function CellClickHandler() {
    var pieces = document.querySelectorAll("table, table img"); 
    if(!pieceAlreadySelected && this.firstElementChild) {
    cell = this; 
    piece = this.innerHTML; 
    for(i=0; pieces[i]; i++) {
        pieces[i].classList.add("grab");
    }
    this.querySelector('img').classList.add("painted"); 
    pieceAlreadySelected = true; 
    }
    else if(pieceAlreadySelected){
    cell.innerHTML= ''; 
    this.innerHTML = piece; 
    for(i=0; pieces[i]; i++) {
      pieces[i].classList.remove("grab"); 
    }
    pieceAlreadySelected = false; 
    }
}

var init = function () {
    checkers = document.getElementById('checkers')
    row = document.getElementsByClassName('row');
    brownScore = document.getElementById('player__score');
    blackScore = document.getElementById('player__score--two');
    player1 = document.getElementById('player__name');
    turn = Math.random() > 0.5 ? 1 : 2
    renderBoard();
}

window.onload = init;





