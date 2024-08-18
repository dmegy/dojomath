const URL_POST_FINISHED_QUIZ = "backend/post_finished_quiz.php";
const URL_PATCH_QUESTION = "backend/patch_question.php";
const URL_LIST_BEST_PLAYERS = "backend/list_best_players.html";
const URL_LIST_RECENT_PLAYERS = "backend/list_recent_players.html";
const URL_LIST_RECENT_GAMES = "backend/list_recent_games.html";
const URL_POST_QUESTION_FEEDBACK = "backend/post_question_feedback.php";
const URL_GET_AND_RESET_BONUS = "backend/get_and_reset_bonus.php";

function sendStatistics() {
  adjustPoints();

  let requestBody = {
    user: JSON.stringify(user),
    quiz: JSON.stringify(quiz),
  };

  fetch(URL_POST_FINISHED_QUIZ, {
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
  getRecentPlayers();
  getRecentGames();
}

function getBestPlayers() {
  if (!window.navigator.onLine) {
    console.log("getBestPlayers : navigator offline");
    return;
  }
  console.log("Downloading Best Players (alltime)");
  document.getElementById("loadingListBestPlayers").style.opacity = "20%";
  fetch(URL_LIST_BEST_PLAYERS + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listBestPlayers").innerHTML = data;
      document.getElementById("loadingListBestPlayers").style.opacity = "100%";

      console.log("Best players  : ok");
    })
    .catch((e) => {
      console.log("Error while fetching best players : " + e);
    });
}

// deprecated, not used anymore (check!)
function getRecentPlayers() {
  if (!window.navigator.onLine) {
    console.log("getRecentPlayers : navigator offline");
    return;
  }
  console.log("Fetching Recent Players");
  document.getElementById("loadingListRecentPlayers").style.opacity = "20%";
  fetch(URL_LIST_RECENT_PLAYERS + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listRecentPlayers").innerHTML = data;
      document.getElementById("loadingListRecentPlayers").style.opacity =
        "100%";
      console.log("Recent players : ok");
    })
    .catch((e) => {
      console.log("Error while fetching recent players : " + e);
    });
}

function getRecentGames() {
  console.log("Fetching Recent Games");
  document.getElementById("loadingListRecentGames").style.opacity = "50%";
  fetch(URL_LIST_RECENT_GAMES + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listRecentGames").innerHTML = data;
      document.getElementById("loadingListRecentGames").style.opacity = "100%";
      console.log("Recent score : ok");
    })
    .catch((e) => {
      console.log("Error while fetching recent games : " + e);
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
  fetch(URL_POST_QUESTION_FEEDBACK, {
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
  fetch(URL_PATCH_QUESTION, {
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

function getAndResetBonus() {
  if (!window.navigator.onLine) return;

  let requestBody = {
    user: JSON.stringify(user),
  };

  fetch(URL_GET_AND_RESET_BONUS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((responseObj) => {
      if (responseObj.status != "success") {
        console.log(
          "Réponse du serveur : Erreur. Message : " + responseObj.message
        );
        return;
      }

      let bonusAmount = Number(responseObj.bonusAmount);
      let bonusMessage = responseObj.bonusMessage;

      if (bonusAmount == 0 || bonusAmount === NaN) {
        return;
      }

      // END GUARD

      pointsDiffHistory.push(bonusAmount);
      user.points += bonusAmount;
      saveToLocalStorage();
      render();
      let notifText = `${bonusMessage}\n+${bonusAmount} pts !`;
      notification(notifText, "oklch(70% 90% var(--hue-accent))");
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("stateChange", (e) => {
  let s = e.detail.newState;
  if (s == "Home" || s == "Highscores" || s == "Statistics" || s == "Profile") {
    getAndResetBonus();
  }
});
