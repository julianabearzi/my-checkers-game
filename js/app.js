var checkers = null;
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


function TurnPiece() {
    
    if (turn === 1) {
      document.getElementById('turn').classList.add('p1'); 
    } else {
      document.getElementById('turn').classList.add('p2');
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
   
}


var init = function () {
    checkers = document.getElementById('checkers');
    row = document.getElementsByClassName('row');
    blackPieces = document.querySelectorAll('checkers__piece--black');
    brownPieces = document.querySelectorAll('checkers__piece--brown');
    renderBoard(); 
}
window.onload = init;



