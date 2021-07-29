var savedGamesList = document.getElementById('list');
var loadBtn = document.getElementsByClassName('load-game');
var selectedGame = null;

function LoadGame() {
   var arraySavedGame = JSON.parse(localStorage.getItem('game'));
   arraySavedGame.reverse();
   for (let i = 0; i < arraySavedGame.length; i++) {
      loadBtn[i].addEventListener('click', function () {
         selectedGame = arraySavedGame[i];
         localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
         localStorage.setItem('loadedGame', JSON.stringify(true));
         location.href = 'index.html';
      });
   }
}

function RenderList() {
   var games = JSON.parse(localStorage.getItem('game'));
   games.reverse();
   var element = '';
   try {
      for (var i = 0; i < games.length; i++) {
         element += '<li>';
         element += '<div class="load-container">';
         element += '<div class="element-saved__container">';
         element += '<div>' + games[i].p1 + '</div>';
         element += '<p>VS</p>';
         element += '<div>' + games[i].p2 + '</div>';
         element += '</div>';
         element += '<span class="score">Score: ' + games[i].brownScore + ' - ' + games[i].blackScore + '</span><p class="date">' + games[i].date + '</p>';
         if (games[i].brownScore == 12) {
            element += '<div class="winner"> 🏆 ' + games[i].p1 + ' WINS </div>';
         }
         else if (games[i].blackScore == 12) {
            element += '<div class="winner"> 🏆 ' + games[i].p2 + ' WINS </div>';
         }
         element += '</div>';
         element += '<button class="load-game">Load</button>';
         element += '</li>';
         savedGamesList.innerHTML = element;
      }
   }
   catch (e) {
      element += '<li class="list__empty">';
      element += '</li>';
      savedGamesList.innerHTML = element;
   }
}

window.onload = function () {
   RenderList();
   LoadGame();
}