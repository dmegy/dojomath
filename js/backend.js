const URL_QUIZ_FINISHED = "backend/quiz_finished.php";
const PATH_HIGHSCORES_ALLTIME = "backend/highscores_alltime.html.txt";
const PATH_HIGHSCORES_RECENT = "backend/highscores_recent.html.txt";

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
  getHighscoresAlltime();
  getHighscoresRecent();
}

function getHighscoresAlltime() {
  console.log("Downloading Highscores (alltime)");
  document.getElementById("loadingHighscoresAlltime").classList.add("rotating");
  document.getElementById("loadingHighscoresAlltime").style.opacity = "50%";
  fetch(PATH_HIGHSCORES_ALLTIME + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresAlltime").innerHTML = data;
      document.getElementById("loadingHighscoresAlltime").style.opacity =
        "100%";
      document
        .getElementById("loadingHighscoresAlltime")
        .classList.remove("rotating");

      console.log("Alltime scores : ok");
    });
}

function getHighscoresRecent() {
  console.log("Downloading Highscores (recent)");
  document.getElementById("loadingHighscoresRecent").classList.add("rotating");
  document.getElementById("loadingHighscoresRecent").style.opacity = "50%";
  fetch(PATH_HIGHSCORES_RECENT + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresRecent").innerHTML = data;
      document.getElementById("loadingHighscoresRecent").style.opacity = "100%";
      document
        .getElementById("loadingHighscoresRecent")
        .classList.remove("rotating");

      console.log("Recent score : ok");
    });
}
