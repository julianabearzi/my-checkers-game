var player1 = document.getElementById('p1-name');
var player2 = document.getElementById('p2-name');
var turnPlayer = document.getElementById('turn-player');
var movCounter = null;
var brownScore = 0;
var blackScore = 0;

function SavePlayers() {
    if (player1.value == '' || player2.value == '') {
        document.getElementById('incomplete-fields').className = 'incomplete-fields__display';
    }
    else {
        document.getElementById('player__name').textContent = player1.value;
        document.getElementById('player__name--two').textContent = player2.value;
        turnPlayer.textContent = player2.value;
        turn = 2;
        HideMessage();
        OrderPiecesInNewGame();
        BoardInPlay(turn, blackScore, brownScore);
    }
}

function UpdatePlayerScore(blackScore, brownScore) {
    document.getElementById('player__score').textContent = 'Score: ' + brownScore;
    document.getElementById('player__score--two').textContent = 'Score: ' + blackScore;
}

// Check the pieces of each player and compare the current board with the previous one, to know if there was a piece movement.
// If no piece is captured on the next move, the move counter increases.
// If attacked, the counter is reset.
function CheckForADraw(boardCopy) {
    if (boardCopy != JSON.stringify(board) && brownScore >= 9 && blackScore >= 9) {
        mustAttack ? movCounter = 0 : movCounter++;
    }
    if (movCounter >= 20) {
        document.getElementById('btn-ok').className = 'btn-hidden';
        document.getElementById('btn-draw').className = 'btn-display';
        DisplayMessage('Game over in a draw');
    }
}

function CheckWin() {
    if (blackScore == 12) {
        SaveGame();
        DisplayMessage(document.getElementById('player__name--two').textContent + ' wins');
    }
    else if (brownScore == 12) {
        SaveGame();
        DisplayMessage(document.getElementById('player__name').textContent + ' wins');
    }
}