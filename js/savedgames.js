var savedGamesList = document.getElementById('list');
var loadBtn =  document.getElementsByClassName('load-game');
var scoreBtn = document.getElementById('order-score');
var dateBtn = document.getElementById('order-date');
var selectedGame = null;

scoreBtn.addEventListener('click', GamesSortedByScore);
dateBtn.addEventListener('click', GamesSortedByDate);

function LoadGame(arraySavedGame) {
   if(arraySavedGame) {
      for (var i = 0; i < arraySavedGame.length; i++) {
         loadBtn[i].addEventListener('click', function (e) {
            i = JSON.parse(e.target.id);
            selectedGame = arraySavedGame[i];
            localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
            localStorage.setItem('loadedGame', JSON.stringify(true));
            location.href = 'index.html';
         });
      }
   }
}

function OrderByScore (score, so, arrScore) {
   if (so != -1 && so != 1) so = 1;
   arrScore.sort(function (a, b) {
     return (a[score] - b[score]) * so;
   });
}

function OrderByScores (scoreBlack, scoreBrown, so, arrScore) {
   if (so != -1 && so != 1) so = 1;
   arrScore.sort(function (a, b) {
   return (a[scoreBrown] - b[scoreBlack]) * so;
   });
}

function GamesSortedByScore() {
   var arrayScore = JSON.parse(localStorage.getItem('game'));
   OrderByScore('blackScore', -1, arrayScore);
   OrderByScores('blackScore', 'brownScore', -1, arrayScore);
   RenderList(arrayScore);
   LoadGame(arrayScore);
}

function GamesSortedByDate() {
   var arrayGames = JSON.parse(localStorage.getItem('game'));
   if (arrayGames) {
      arrayGames.reverse();
   }
   RenderList(arrayGames);
   LoadGame(arrayGames);
}

function RenderList(arrayList) {
   var element = '';
   try {
      for (var i = 0; i < arrayList.length; i++) {
         element += '<li>';
         element += '<div class="load-container">';
         element += '<div class="element-saved__container">';
         element += '<div>' + arrayList[i].p1 + '</div>';
         element += '<p>VS</p>';
         element += '<div>' + arrayList[i].p2 + '</div>';
         element += '</div>';
         element += '<span class="score">Score: ' + arrayList[i].brownScore + ' - ' + arrayList[i].blackScore + '</span><p class="date">' + arrayList[i].date + '</p>';
         if (arrayList[i].brownScore == 12) {
            element += '<div class="winner"> 🏆 ' + arrayList[i].p1 + ' WINS </div>';
         }
         else if (arrayList[i].blackScore == 12) {
            element += '<div class="winner"> 🏆 ' + arrayList[i].p2 + ' WINS </div>';
         }
         element += '</div>';
         element += '<button id="'+i+'" class="load-game">Load</button>';
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
   GamesSortedByDate();
}