var pieceBrown = null;
var pieceBlack = null;
var pieceAlreadySelected = null;
var turn = 0;
var position = null;
var mustAttack = false;
var moveDownLeft = null;
var moveDownLeftMult = null;
var moveDownRight = null;
var moveDownRightMult = null;
var moveUpLeft = null;
var moveUpLeftMult = null;
var moveUpRight = null;
var moveUpRightMult = null;
var grabbing = document.getElementsByTagName('img');

function TurnPiece(turn) {
    if (turn == 1) {
        turnPlayer.textContent = document.getElementById('player__name').textContent;
        document.getElementById('turn').className = 'p1';
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', PieceClickHandler, false);
        }
    }
    else if (turn == 2) {
        turnPlayer.textContent = document.getElementById('player__name--two').textContent;
        document.getElementById('turn').className = 'p2';
        for (var i = 0; i < cells.length; i++) {
            cells[i].addEventListener('click', PieceClickHandler, false);
        }
    }
}


function OrderPiecesInNewGame() {
    for (var x = 0; x < board.length; x++) {
        for (var y = board[x].length - 1; y >= 0; y--) {
            if ((x == 0 && y % 2 == 0) || (x == 1 && y % 2 == 1) || (x == 2 && y % 2 == 0)) {
                board[x][y] = 2;
            }
            else if ((x == board.length - 2 && y % 2 == 0) || (x == board.length - 1 && y % 2 == 1)
                || (x == board.length - 3 && y % 2 == 1)) {
                board[x][y] = 1;
            }
            else {
                board[x][y] = null;
            }
        }
    }
}

function checkAttack() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].id == moveUpLeft) {
            moveUpLeft = cells[i];
            if (moveUpLeft.innerHTML == '') {
                moveUpLeft.classList.add('move-here');
                moveUpLeft.classList.remove('cell-dark');
            }
        }
        if (cells[i].id == moveUpRight) {
            moveUpRight = cells[i];
            if (moveUpRight.innerHTML == '') {
                moveUpRight.classList.add('move-here');
                moveUpRight.classList.remove('cell-dark');
            }
        }
        if (cells[i].id == moveUpLeftMult) {
            moveUpLeftMult = cells[i];
        }
        if (cells[i].id == moveUpRightMult) {
            moveUpRightMult = cells[i];
        }
    }

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].id == moveDownRightMult) {
            moveDownRightMult = cells[i];
        }
    }

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].id == moveDownLeftMult) {
            moveDownLeftMult = cells[i];
        }
    }

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].id == moveDownLeft) {
            moveDownLeft = cells[i];
            if (moveDownLeft.innerHTML == '') {
                moveDownLeft.classList.add('move-here');
                moveDownLeft.classList.remove('cell-dark');
            }
        }
    }

    for (var i = 0; i < cells.length; i++) {
        if (cells[i].id == moveDownRight) {
            moveDownRight = cells[i];
            if (moveDownRight.innerHTML == '') {
                moveDownRight.classList.add('move-here');
                moveDownRight.classList.remove('cell-dark');
            }
        }
    }

    if (turn == 2) {
        if (moveDownLeft.id != undefined
            && (board[parseInt(moveDownLeft.id.substring(0, 1))][parseInt(moveDownLeft.id.substring(1, 2))] == 1)
            && (moveDownLeftMult.innerHTML == '')) {
            if (moveDownRight.id != undefined) {
                moveDownRight.classList.remove('move-here');
                moveDownRight.classList.add('cell-dark');
            }
            moveDownLeft.classList.remove('move-here');
            moveDownLeft.classList.add('cell-dark');
            moveDownLeftMult.classList.add('move-here');
            moveDownLeftMult.classList.remove('cell-dark');
        }
        if (moveDownRight.id != undefined
            && (board[parseInt(moveDownRight.id.substring(0, 1))][parseInt(moveDownRight.id.substring(1, 2))] == 1)
            && (moveDownRightMult.innerHTML == '')) {
            if (moveDownLeft.id != undefined) {
                moveDownLeft.classList.remove('move-here');
                moveDownLeft.classList.add('cell-dark');
            }
            moveDownRight.classList.remove('move-here');
            moveDownRight.classList.add('cell-dark');
            moveDownRightMult.classList.add('move-here');
            moveDownRightMult.classList.remove('cell-dark');
        }
        if (moveDownLeft.id != undefined
            && ((board[parseInt(moveDownLeft.id.substring(0, 1))][parseInt(moveDownLeft.id.substring(1, 2))] == 1)
                && (moveDownLeftMult.innerHTML == ''))
            || moveDownRight.id != undefined
            && ((board[parseInt(moveDownRight.id.substring(0, 1))][parseInt(moveDownRight.id.substring(1, 2))] == 1)
                && (moveDownRightMult.innerHTML == ''))) {
            mustAttack = true;
        }
        else {
            mustAttack = false;
        }
    }

    else if (turn == 1) {
        if (moveUpLeft.id != undefined
            && (board[parseInt(moveUpLeft.id.substring(0, 1))][parseInt(moveUpLeft.id.substring(1, 2))] == 2)
            && (moveUpLeftMult.innerHTML == '')) {
            if (moveUpRight.id != undefined) {
                moveUpRight.classList.remove('move-here');
                moveUpRight.classList.add('cell-dark');
            }
            moveUpLeft.classList.remove('move-here');
            moveUpLeft.classList.add('cell-dark');
            moveUpLeftMult.classList.add('move-here');
            moveUpLeftMult.classList.remove('cell-dark');
        }
        if (moveUpRight.id != undefined
            && (board[parseInt(moveUpRight.id.substring(0, 1))][parseInt(moveUpRight.id.substring(1, 2))] == 2)
            && (moveUpRightMult.innerHTML == '')) {
            if (moveUpLeft.id != undefined) {
                moveUpLeft.classList.remove('move-here');
                moveUpLeft.classList.add('cell-dark');
            }
            moveUpRight.classList.remove('move-here');
            moveUpRight.classList.add('cell-dark');
            moveUpRightMult.classList.add('move-here');
            moveUpRightMult.classList.remove('cell-dark');
        }
        if (moveUpLeft.id != undefined
            && (board[parseInt(moveUpLeft.id.substring(0, 1))][parseInt(moveUpLeft.id.substring(1, 2))] == 2
                && moveUpLeftMult.innerHTML == '')
            || moveUpRight.id != undefined
            && (board[parseInt(moveUpRight.id.substring(0, 1))][parseInt(moveUpRight.id.substring(1, 2))] == 2)
            && (moveUpRightMult.innerHTML == '')) {
            mustAttack = true;
        }
        else {
            mustAttack = false;
        }
    }
}

function PieceClickHandler(e) {
    console.log(board);
    var boardCopy = JSON.stringify(board);
    if (turn == 1) {
        if (!pieceAlreadySelected && e.currentTarget.firstElementChild) {
            for (var i = 0; grabbing[i]; i++) {
                grabbing[i].classList.add('grabbing');
            }
            document.getElementById('checkers').classList.add('grabbing');
            cell = e.currentTarget;
            pieceBrown = e.currentTarget.innerHTML;
            moveUpRight = cell.id - 11;
            moveUpLeft = cell.id - 9;
            moveUpRightMult = moveUpRight - 11;
            moveUpLeftMult = moveUpLeft - 9;
            try {
                e.currentTarget.querySelector('.checkers__piece--brown').classList.add('painted');
                checkAttack();
                pieceAlreadySelected = true;
            } catch (e) {
                DisplayMessage('Light brown pieces turn');
            }
        }
        else if (pieceAlreadySelected && !mustAttack) {
            position = e.currentTarget;
            if ((position.innerHTML != pieceBlack)
                && (position.innerHTML != pieceBrown)
                && (position.id == (cell.id - 9)
                    || position.id == (cell.id - 11))
                || position == cell) {
                if ((moveUpLeft.id % 10) <= 7) {
                    moveUpLeft.classList.remove('move-here');
                    moveUpLeft.classList.add('cell-dark');
                }
                if ((moveUpRight.id % 10) <= 7) {
                    moveUpRight.classList.remove('move-here');
                    moveUpRight.classList.add('cell-dark');
                }
                cell.innerHTML = '';
                position.innerHTML = pieceBrown;
                for (var i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                if (position != cell) {
                    board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 1;
                    board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                    turn = 2;
                    TurnPiece(turn);
                }
            }
        }
        else if (pieceAlreadySelected && mustAttack) {
            position = e.currentTarget;
            if ((moveUpLeftMult.id % 10) <= 7) {
                moveUpLeftMult.classList.remove('move-here');
                moveUpLeftMult.classList.add('cell-dark');
            }
            if ((moveUpRightMult.id % 10) <= 7) {
                moveUpRightMult.classList.remove('move-here');
                moveUpRightMult.classList.add('cell-dark');
            }
            if (position.id == moveUpLeftMult.id && board[parseInt(moveUpLeft.id.substring(0, 1))][parseInt(moveUpLeft.id.substring(1, 2))] == 2 && moveUpLeftMult.innerHTML == '') {
                board[(moveUpLeft.id).substring(0, 1)][(moveUpLeft.id).substring(1, 2)] = null;
                board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 1;
                board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                cell.innerHTML = '';
                position.innerHTML = pieceBrown;
                moveUpLeft.innerHTML = '';
                for (i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                brownScore++;
                brownScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
                turn = 2;
                TurnPiece(turn);
            }
            else if (position.id == moveUpRightMult.id && board[parseInt(moveUpRight.id.substring(0, 1))][parseInt(moveUpRight.id.substring(1, 2))] == 2 && moveUpRightMult.innerHTML == '') {
                board[(moveUpRight.id).substring(0, 1)][(moveUpRight.id).substring(1, 2)] = null;
                board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 1;
                board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                cell.innerHTML = '';
                position.innerHTML = pieceBrown;
                moveUpRight.innerHTML = '';
                for (i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                brownScore++;
                brownScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
                turn = 2;
                TurnPiece(turn);
            }
        }
        UpdatePlayerScore(blackScore, brownScore);
    }
    else if (turn == 2) {
        if (!pieceAlreadySelected && e.currentTarget.firstElementChild) {
            for (var i = 0; grabbing[i]; i++) {
                grabbing[i].classList.add('grabbing');
            }
            document.getElementById('checkers').classList.add('grabbing');
            cell = e.currentTarget;
            pieceBlack = e.currentTarget.innerHTML;
            moveDownRight = -(-cell.id - 11);
            moveDownLeft = -(-cell.id - 9);
            moveDownLeftMult = moveDownLeft + 9;
            moveDownRightMult = moveDownRight + 11;
            try {
                e.currentTarget.querySelector('.checkers__piece--black').classList.add('painted');
                checkAttack();
                pieceAlreadySelected = true;
            } catch (e) {
                DisplayMessage('Black pieces turn');
            }
        }
        else if (pieceAlreadySelected && !mustAttack) {
            position = e.currentTarget;
            if ((position.innerHTML != pieceBrown)
                && (position.innerHTML != pieceBlack)
                && (position.id == -(-cell.id - 9)
                    || position.id == -(-cell.id - 11))
                || position == cell) {
                if ((moveDownLeft.id % 10) <= 7) {
                    moveDownLeft.classList.remove('move-here');
                    moveDownLeft.classList.add('cell-dark');
                }
                if ((moveDownRight.id % 10) <= 7) {
                    moveDownRight.classList.remove('move-here');
                    moveDownRight.classList.add('cell-dark');
                }
                cell.innerHTML = '';
                position.innerHTML = pieceBlack;
                for (var i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                if (position != cell) {
                    board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 2;
                    board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                    turn = 1;
                    TurnPiece(turn);
                }
            }
        }
        else if (pieceAlreadySelected && mustAttack) {
            position = e.currentTarget;
            if ((moveDownLeftMult.id % 10) <= 7) {
                moveDownLeftMult.classList.remove('move-here');
                moveDownLeftMult.classList.add('cell-dark');
            }
            if ((moveDownRightMult.id % 10) <= 7) {
                moveDownRightMult.classList.remove('move-here');
                moveDownRightMult.classList.add('cell-dark');
            }
            if (position.id == moveDownLeftMult.id
                && board[parseInt(moveDownLeft.id.substring(0, 1))][parseInt(moveDownLeft.id.substring(1, 2))] == 1
                && moveDownLeftMult.innerHTML == '') {
                board[(moveDownLeft.id).substring(0, 1)][(moveDownLeft.id).substring(1, 2)] = null;
                board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 2;
                board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                cell.innerHTML = '';
                position.innerHTML = pieceBlack;
                moveDownLeft.innerHTML = '';
                for (var i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                blackScore++;
                blackScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
                turn = 1;
                TurnPiece(turn);
            }
            else if (position.id == moveDownRightMult.id
                && board[parseInt(moveDownRight.id.substring(0, 1))][parseInt(moveDownRight.id.substring(1, 2))] == 1
                && moveDownRightMult.innerHTML == '') {
                board[(moveDownRight.id).substring(0, 1)][(moveDownRight.id).substring(1, 2)] = null;
                board[(position.id).substring(0, 1)][(position.id).substring(1, 2)] = 2;
                board[(cell.id).substring(0, 1)][(cell.id).substring(1, 2)] = null;
                cell.innerHTML = '';
                position.innerHTML = pieceBlack;
                moveDownRight.innerHTML = '';
                for (var i = 0; grabbing[i]; i++) {
                    grabbing[i].classList.remove('grabbing');
                }
                document.getElementById('checkers').classList.remove('grabbing');
                pieceAlreadySelected = false;
                blackScore++;
                blackScore == 12 ? checkers.className = 'stop' : checkers.className = ' ';
                turn = 1;
                TurnPiece(turn);
            }
        }
        UpdatePlayerScore(blackScore, brownScore);
    }
    CheckWin();
    CheckForADraw(boardCopy);
}