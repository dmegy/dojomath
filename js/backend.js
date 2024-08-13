const URL_QUIZ_FINISHED = "backend/quiz_finished.php";
const URL_QUESTION_FINISHED = "backend/question_finished.php";
const URL_HIGHSCORES_ALLTIME = "backend/highscores_alltime.html.txt";
const URL_HIGHSCORES_RECENT = "backend/highscores_recent.html.txt";
const URL_HIGHSCORES_RECENT_GAMES = "backend/highscores_recent_games.html.txt";
const URL_FEEDBACK_QUESTIONS = "backend/feedback_question.php";

function sendStatistics() {
  adjustPoints();

  let requestBody = {
    user: JSON.stringify(user),
    quiz: JSON.stringify(quiz),
  };

  console.log("Envoi des points au serveur");
  fetch(URL_QUIZ_FINISHED, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}

window.addEventListener("load", () => {
  getHighscores(); // fetch un fichier texte et inneHTML dans le div, qui doit donc exister
});

function getHighscores() {
  getBestPlayers();
  //getRecentPlayers();
  getRecentGames();
}

function getBestPlayers() {
  console.log("Downloading Highscores (alltime)");
  document.getElementById("loadingHighscoresAlltime").style.opacity = "20%";
  fetch(URL_HIGHSCORES_ALLTIME + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscoresAlltime").innerHTML = data;
      document.getElementById("loadingHighscoresAlltime").style.opacity =
        "100%";

      console.log("Alltime scores : ok");
    });
}

// deprecated, not used anymore (check!)
function getRecentPlayers() {
  console.log("Downloading Highscores (recent players)");
  document.getElementById("loadingHighscoresRecent").style.opacity = "20%";
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

function sendFeedback(questionNumber, feedbackType) {
  console.log("Send feedback : " + questionNumber + ", " + feedbackType);
  statsQuestions[questionNumber].feedbackSent = true;

  document.getElementById("feedbackDiv" + questionNumber).innerHTML =
    "Feedback envoyé, merci !";

  let requestBody = {
    userId: user.userId,
    userName: user.userName,
    questionNumber: questionNumber,
    feedbackType: feedbackType,
  };

  console.log("Envoi du feedback au serveur");
  fetch(URL_FEEDBACK_QUESTIONS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}

function sendQuestionResult() {
  let requestBody = {
    userId: user.userId,
    userName: user.userName,
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  };

  console.log("Envoi du résultat de la question au serveur");
  fetch(URL_QUESTION_FINISHED, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}
