var checkers = document.getElementById('checkers');
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
var row = document.getElementsByClassName('row');
var cells = document.getElementsByClassName('cell-dark');
var cell = null;

function IsOdd(num) {
    return num % 2;
}

function IsEven(value) {
    if (value % 2 == 0) {
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
            if ((IsOdd(x) && IsOdd(y)) || ((IsEven(x) && IsEven(y)))) {
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
            if ((IsOdd(x) && IsOdd(y)) || ((IsEven(x) && IsEven(y)))) {
                boardMatrixInPlay += '<td id="' + x + y + '" class="cell-dark'
            }
            else {
                boardMatrixInPlay += '<td id="' + x + y + '" class="cell-light'
            }
            if (board[x][y] == 2) {
                boardMatrixInPlay += '"><img src="./img/black.png" class="checkers__piece--black" alt="black"></td>';
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
