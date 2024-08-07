const URL_QUIZ_FINISHED = "backend/quiz_finished.php";
const URL_HIGHSCORES_ALLTIME = "backend/highscores_alltime.html.txt";
const URL_HIGHSCORES_RECENT = "backend/highscores_recent.html.txt";
const URL_HIGHSCORES_RECENT_GAMES = "backend/highscores_recent_games.html.txt";

function sendStatistics() {
  let requestBody = {
    user: JSON.stringify(user),
    quiz: JSON.stringify(quiz),
  };

  fetch(URL_QUIZ_FINISHED, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log("Points envoyés");
}

window.addEventListener("DOMContentLoaded", () => {
  getHighscores(); // fetch un fichier texte et inneHTML dans le div, qui doit donc exister
});

function getHighscores() {
  getBestPlayers();
  //getRecentPlayers();
  getRecentGames();
}

function getBestPlayers() {
  console.log("Downloading Highscores (alltime)");
  document.getElementById("loadingHighscoresAlltime").style.opacity = "50%";
  fetch(URL_HIGHSCORES_ALLTIME + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresAlltime").innerHTML = data;
      document.getElementById("loadingHighscoresAlltime").style.opacity =
        "100%";

      console.log("Alltime scores : ok");
    });
}

//deprecated
function getRecentPlayers() {
  console.log("Downloading Highscores (recent players)");
  document.getElementById("loadingHighscoresRecent").style.opacity = "50%";
  fetch(URL_HIGHSCORES_RECENT + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresRecent").innerHTML = data;
      document.getElementById("loadingHighscoresRecent").style.opacity = "100%";
      console.log("Recent score : ok");
    });
}

function getRecentGames() {
  console.log("Downloading Recent Games");
  document.getElementById("loadingHighscoresRecentGames").style.opacity = "50%";
  fetch(URL_HIGHSCORES_RECENT_GAMES + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresRecentGames").innerHTML = data;
      document.getElementById("loadingHighscoresRecentGames").style.opacity =
        "100%";
      console.log("Recent score : ok");
    });
}
