const URL_QUIZ_FINISHED = "backend/quiz_finished.php";
const URL_QUESTION_FINISHED = "backend/question_finished.php";
const URL_LIST_BEST_PLAYERS = "backend/list_best_players.html";
const URL_LIST_RECENT_PLAYERS = "backend/list_recent_players.html";
const URL_LIST_RECENT_GAMES = "backend/list_recent_games.html";
const URL_FEEDBACK_QUESTIONS = "backend/feedback_question.php";
const URL_GET_GIFT = "backend/get_gift.php";

function sendStatistics() {
  adjustPoints();

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

function getGift() {
  if (!window.navigator.onLine) return;

  let requestBody = {
    user: JSON.stringify(user),
  };

  fetch(URL_GET_GIFT, {
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

      let giftAmount = Number(responseObj.giftAmount);
      let giftMessage = responseObj.giftMessage;

      if (giftAmount == 0 || giftAmount === NaN) {
        return;
      }

      // END GUARD

      pointsDiffHistory.push(giftAmount);
      user.points += giftAmount;
      saveToLocalStorage();
      render();
      let notifText = `${giftMessage}\n+${giftAmount} pts !`;
      notification(notifText, "oklch(70% 90% var(--hue-accent))");
    })
    .catch((error) => {
      console.log(error);
    });
}
