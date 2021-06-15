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
var turn = 2;
var position;
var brownScore = 0;
var blackScore = 0;

function TurnPiece() {
   // var score = 0;
    var cells = document.getElementsByClassName('cell'); 
    if (turn == 1) {
      document.getElementById('turn').classList.remove('p2');
      document.getElementById('turn').classList.add('p1'); 
      for(i=0; i<cells.length; i++) {
        cells[i].addEventListener('click', PieceClickHandler, false);
      }
    // score++;
    //blackScore.innerHTML = 'Score: ' + score; 
    } else if (turn == 2) {
     
      document.getElementById('turn').classList.remove('p1');
      document.getElementById('turn').classList.add('p2');
      for(i=0; i<cells.length; i++) {
        cells[i].addEventListener('click', PieceClickHandler, false);
      }
      // score++;
      //brownScore.innerHTML = 'Score: ' + score;
    }
  }

 
  

var renderBoard = function () {
  document.getElementById('message-box').className = 'message-box__hidden';
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
    
    function PieceClickHandler() { 
      if(turn==1){
       if(!pieceAlreadySelected && this.firstElementChild) {
    cell = this; 
    pieceBrown = this.innerHTML; 
   
    try {
      this.querySelector('.checkers__piece--brown').classList.add("painted");  
      pieceAlreadySelected = true; 
    } catch (e) {
      document.getElementById('message-box').className = 'message-box__display';
      document.getElementById('message').innerHTML = 'Light brown pieces turn';
      checkers.className = 'stop';
    }
    }
    else if(pieceAlreadySelected){
    position = this;
    cell.innerHTML= ''; 
    this.innerHTML = pieceBrown; 
    pieceAlreadySelected = false; 
    if(position != cell){
      turn = 2;
      TurnPiece(turn);
      }
     }
    }
    else if (turn==2) {
      if(!pieceAlreadySelected && this.firstElementChild) {
        cell = this; 
        pieceBlack = this.innerHTML; 
        try {
          this.querySelector('.checkers__piece--black').classList.add("painted"); 
          pieceAlreadySelected = true; 
        } catch (e) {
          document.getElementById('message-box').className = 'message-box__display';
          document.getElementById('message').innerHTML = 'Black pieces turn';
          checkers.className = 'stop';
        }
        }
        else if(pieceAlreadySelected){
        position = this;
        cell.innerHTML= ''; 
        this.innerHTML = pieceBlack; 
        pieceAlreadySelected = false; 
        if(position != cell){
        turn = 1;
        TurnPiece(turn);
        }
        }
    }
  }

  var btnOK = document.getElementById('btn-ok');
  btnOK.addEventListener('click', function (){
    document.getElementById('message-box').className = 'message-box__hidden';
    checkers.className = ' ';
  });

  btn.addEventListener('click', function (){
    turn = 2;
    checkers.className = ' ';
    renderBoard();
  });
  
 var init = function () {
    checkers = document.getElementById('checkers')
    row = document.getElementsByClassName('row');
    btn = document.getElementById('btn');
    renderBoard();
}

window.onload = init;





