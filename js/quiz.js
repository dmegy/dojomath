function shuffleArray(array) {
  // attention !  le tableau est muté sur place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  console.log("initQuiz() sur le thème " + theme.id);

  // construction du quiz
  // Éventuellement, changer méthode pour garantir au moins un V et un F.
  quiz = structuredClone(theme);
  shuffleArray(quiz.questions);
  // on vide la fin pour ne garder au plus que QUIZ_LENGTH questions
  while (quiz.questions.length > MAX_QUIZ_LENGTH) quiz.questions.shift();
  console.log("questions qui vont tomber : " + quiz.questions);

  quiz.quizLength = quiz.questions.length;
  quiz.nbQuestionsFailed = 0;
  quiz.nbQuestionsSuccessful = 0;
  quiz.nbQuestionsSkipped = 0;
  quiz.history = [];
  quiz.result = 0;
  quiz.points = 0;
  //quiz.initialCombo = user.combo;
  quiz.bonus = 0;
  quiz.finalGrade = 0;
  if (!quiz.maxPointsPerQuestion)
    quiz.maxPointsPerQuestion = MAX_POINTS_PER_QUESTION;

  user.nbQuizStarted += 1;
  nextQuestion();
}
// préciser le type des éléments de quiz.history :
// c'est ce qui va être envoyé au serveur :
// tableau d'objets du type 'quizFinishedEvent' :
// {
// questionNumber: int,
// submittedAnswer: true, false ou undefined,
// result:  : 1, 0 ou -1
// }

function nextQuestion() {
  // appelée par startQuiz() ou bien validateAnswer()
  questionNumber = quiz.questions.splice(0, 1)[0];
  // attention on l'enlève d ela liste
  question = structuredClone(questions[questionNumber]);
  question.num = questionNumber; // on rajoute dans l'objet
  question.points = 0;
  render();
  MathJax.typeset();
  statsQuestions[question.num].viewed += 1;
  statsThemes[theme.id].nbQuestionsViewed += 1;
  user.nbQuestionsViewed += 1;
}

function submitAnswer(answer) {
  // étape inutile ?
  // appelé par action utilisateur sur les trois boutons
  question.submittedAnswer = answer;
  validateAnswer();
}

function validateAnswer() {
  //appelée à la fin de  submitAnswer()
  if (question.submittedAnswer === undefined) {
    // SKIPPED
    question.result = 0;
    question.points = 0;
    statsQuestions[question.num].skipped += 1;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsSkipped += 1;
    user.combo = 0;
    user.nbQuestionsSkipped += 1;
    quiz.nbQuestionsSkipped += 1;
    console.log("question sautée");
    toast("Question sautée", "var(--c-warning)");
  } else if (question.submittedAnswer === question.answer) {
    // SUCCESS
    question.result = 1;
    statsQuestions[question.num].successful += 1;
    if (statsQuestions[question.num].successfulLastTime)
      statsQuestions[question.num].successfulLastTwoTimes = true;
    statsQuestions[question.num].successfulLastTime = true;

    statsThemes[theme.id].nbQuestionsSuccessful += 1;
    user.combo += 1;
    user.longestCombo = Math.max(user.combo, user.longestCombo);
    user.nbQuestionsSuccessful += 1;
    quiz.nbQuestionsSuccessful += 1;

    question.points = Math.min(quiz.maxPointsPerQuestion, user.combo);

    // toast success
    let congratulationsMessage = "";
    if (user.combo > 1) {
      congratulationsMessage += user.combo + " D'AFFILÉE !\n";
    }
    congratulationsMessage +=
      "+" + question.points + " pt" + (question.points > 1 ? "s" : "");
    toast(congratulationsMessage, "var(--c-success)");
  } else {
    // FAIL
    question.result = -1;
    questions.points = -1;
    statsQuestions[question.num].failed++;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsFailed++;
    user.combo = 0;
    user.nbQuestionsFailed++;
    quiz.nbQuestionsFailed++;
    toast("-1 pt", "var(--c-danger)");
  }

  console.log("Q" + question.num + ": " + questions[question.num].statement);
  console.log(
    "Submitted answer : " +
      question.submittedAnswer +
      ", Result : " +
      question.result
  );
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < MIN_QUIZ_RESULT; // attention changer en cas de quiz custom ?
  if (isGameover) {
    user.nbQuizGameover++;

    // avant il y avait le toast et on allait au thème.
    //alertGameover();
    //gotoTheme(theme.id);
    gotoGameover();
    return;
  }

  // BONUS COMBO

  question.bonus = Math.max(question.points - 1, 0); // pts gagnés à cause d'un bonus

  quiz.points += question.points;
  quiz.bonus += question.bonus;

  quiz.history.push({
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  });

  // TODO éventuellement Toast ici "100N - ème question réussie !"

  saveToLocalStorage();

  if (quiz.questions.length > 0) nextQuestion();
  else showQuizResults(); // quiz terminé !
}

// n'est plus utilisée ?
function confirmQuit() {
  let text =
    "=======================\nDEMANDE DE CONFIRMATION\n=======================\n\nSouhaites-tu vraiment quitter la partie en cours ?\n\n(Attention, les points de la partie en cours ne seront pas sauvegardés.)";
  if (confirm(text) == true) {
    abortQuiz();
  }
}

function abortQuiz() {
  user.nbQuizAborted++;
  gotoTheme(theme.id);
}

function showQuizResults() {
  //appelée par validateResults() si la liste de questions est vide
  if (daysSinceLastActive() > 0) {
    //reset daily stats
    user.pointsToday = 0;
    user.nbQuizFinishedToday = 0;
    user.nbQuizPerfectToday = 0;
  }
  // update streak and longestStreak
  // !! AVANT modif lastActiveTime

  if (daysSinceLastActive() == 1 || user.lastStreak == 0) {
    user.lastStreak++;
    notification(
      "🔥STREAK🔥\n Un jour d'affilée de plus !",
      "oklch(70% 90% var(--hue-accent))"
    );
  } else if (daysSinceLastActive() > 1) {
    user.lastStreak = 1;
  }
  user.longestStreak = Math.max(user.longestStreak, user.lastStreak);

  // CALCUL NOTE
  quiz.finalGrade = grade20FromResult(
    quiz.nbQuestionsSuccessful,
    quiz.quizLength
  );
  // SI PERFECT :
  if (quiz.finalGrade == 20) {
    user.nbQuizPerfect++;
    user.nbQuizPerfectToday++;
    // félicitation tous les 10 perfects :
    if (user.nbQuizPerfect % 10 == 0) {
      toast(
        `${user.nbQuizPerfect}ème perfect !`,
        "oklch(70% 100% var(--hue-accent)"
      );
    }
  }

  // BOOST
  console.log("points avant booster : " + quiz.points);
  quiz.points *= getBoost();
  console.log("boost multiplier : " + getBoost());
  console.log("points après booster : " + quiz.points);
  // faire apparaître le boost pendant tout le quiz en haut ?

  // test levelup :
  if (level(user.points + quiz.points) > level(user.points))
    toast(`LEVEL UP !`, "oklch(70% 100% var(--hue-accent)");

  user.points += quiz.points;
  user.pointsToday += quiz.points;
  user.nbQuizFinished++;
  user.nbQuizFinishedToday++;
  statsThemes[theme.id].nbQuizFinished++;

  pointsDiffHistory.push(quiz.points);
  finishedQuizzesHistory.push({
    date: Date.now(),
    themeId: theme.id,
    details: quiz.history,
    pointsEarned: quiz.points,
  });
  // todo :  maintenance pour ne garder l'historique que des 1000 derniers éléments ?
  // pour éviter de saturer la mémoire du storage ?
  // par exemple:
  // while(finishedQuizzesHistory.length>1000) finishedQuizzesHistory.shift();

  // message de félicitations tous les 10 quiz terminés
  if (user.nbQuizFinished % 10 == 0) {
    toast(
      user.nbQuizFinished + " parties terminées, bravo !",
      "oklch(70% 100% var(--hue-accent))"
    );
  }

  // LOCK theme trop utilisé ? et UNLOCK all themes sinon !

  if (haveToLockTheme()) {
    statsThemes[theme.id].isLocked = true;
    theme.isLocked = true;
    console.log("theme locked! Finish a quiz in another theme to unlock");
  } else {
    console.log("unlock all");
    theme.isLocked = false;
    for (themeId in statsThemes) {
      statsThemes[themeId].isLocked = false;
    }
  }

  user.lastActiveTime = Date.now();

  saveToLocalStorage();

  gotoEnd();

  // lors du render, le bouton "rejouer" va être désactivé si le thème est locked

  sendStatistics();
  // console log bilan du quiz
  consoleLogQuizRecap();

  MathJax.typeset(); //pour l'affichage des corrections
}

function haveToLockTheme() {
  if (finishedQuizzesHistory.length < LOCK_LIMIT) return false;

  // on prend les 10 dernières entrées ( ou tout si moins de 10 entrées)
  let recentHistory = finishedQuizzesHistory.slice(
    finishedQuizzesHistory.length - LOCK_LIMIT
  );

  for (let i = 0; i < LOCK_LIMIT; i++) {
    if (recentHistory[i].themeId != theme.id) return false;
  }
  return true;
}

function giveBoost() {
  if (getBoost() > 1) return; // on ne donne pas de boost s'il y en a déjà un actif

  let thisDate = new Date();
  let thisHour = thisDate.getHours();

  for (let i = 0; i < HAPPY_HOUR_LIST.length; i++) {
    if (HAPPY_HOUR_LIST[i][0] <= thisHour && thisHour < HAPPY_HOUR_LIST[i][1]) {
      user.lastBoostMultiplier = 2;
      user.lastBoostEnd = new Date(
        thisDate.getFullYear(),
        thisDate.getMonth(),
        thisDate.getDate(),
        HAPPY_HOUR_LIST[i][1]
      ).getTime();
      notification(
        "HAPPY HOUR :\nPoints doublés jusqu'à " + HAPPY_HOUR_LIST[i][1] + "h",
        "oklch(70% 100% var(--hue-accent)"
      );
      return;
    }
  }

  if (Math.random() < BOOST_PROBABILITY) {
    user.lastBoostMultiplier = 2;
    user.lastBoostEnd = Date.now() + BOOST_DURATION_MS;
    notification(
      "BOOST !\nPoints doublés pendant " +
        BOOST_DURATION_MS / (60 * 1000) +
        " minutes !",
      "oklch(70% 100% var(--hue-accent)"
    );
  }
}

function unstack(targetName) {
  // appelé en sortie d'écran de fin

  window.setTimeout(getHighscores, 1000); // php est en train d'écrire les fichiers texte

  giveBoost();

  if (targetName == "Chapters") goto("Chapters");
  else if (targetName == "Quiz") gotoQuiz();
}

function getBoost() {
  if (Date.now() < user.lastBoostEnd) return user.lastBoostMultiplier;
  else return 1;
}

// - - - - - - - - - - - - - - - - - -
// - - - C O M P O S A N T S - - - - -
// - - - - - - - - - - - - - - - - - -

function glyphResult(note) {
  // écran de fin de quiz
  let glyph = "";
  if (note == 20) glyph = "🏆";
  else if (note >= 16) glyph = "🎉";
  else if (note >= 10) glyph = "👍";
  else if (note >= 8) glyph = "😓";
  else glyph = "😣";
  return glyph;
}
function grade20FromResult(result, maxResult) {
  let MAX_GRADE = 20; // ou 100
  let posResult = Math.max(0, result);
  let grade = (MAX_GRADE * posResult) / maxResult;
  let roundedGrade = Math.floor(grade);
  return roundedGrade;
}

function htmlQuizProgress() {
  // affiche une succession de div dont les couleurs correspondent aux résultats des questions en cours, ou des dic de couleur neutre pour les questions restantes.
  if (state != "Quiz" && state != "End") return ""; // évite l'imbrication dans un x-show
  let s = ""; // sortie
  let color = "";

  quiz.history.forEach((obj) => {
    if (obj.result == 1) color = "var(--c-success)";
    if (obj.result == 0) color = "var(--c-warning)";
    if (obj.result == -1) color = "var(--c-danger)";
    s += `<div style='flex-grow:1; background-color:${color}'>&nbsp;</div>`;
  });

  // Explication :  en mode Quiz, le rendu est fait une fois la question en cours supprimée
  // En mode "End", il ne faut pas ajouter le "+1" sinon on obtient 11.
  let nbRemainingAnswers =
    state == "Quiz" ? quiz.questions.length + 1 : quiz.questions.length;
  for (let i = 0; i < nbRemainingAnswers; i++) {
    s += `<div style='flex-grow:1;background-color:var(--c-primary-40-desat)'>&nbsp;</div>`;
  }
  return s;
}

function htmlSolutions() {
  // affiche les solutions du quiz en cours, qui vient d'être fini.
  let s = "<div style='opacity:70%;' open><p>Correction:</p>";

  quiz.history.forEach((e) => {
    s += htmlSolutionElement(e);
  });
  s += "</div>";
  return s;
}

function htmlSolutionElement({ questionNumber, submittedAnswer, result }) {
  let color, message;
  if (result == 1) {
    message = "✔ Question réussie";
    color = "oklch(30% 30% var(--hue-success))";
  }
  if (result == 0) {
    message = "⚠ Question sautée";
    color = "oklch(30% 30% var(--hue-warning))";
  }
  if (result == -1) {
    message = "✖ Question ratée";
    color = "oklch(30% 30% var(--hue-danger))";
  }
  let answerDiv = "";
  if (submittedAnswer === true)
    answerDiv = "<div>(Réponse donnée : Vrai)</div>";
  if (submittedAnswer === false)
    answerDiv = "<div>(Réponse donnée : Faux)</div>";

  let s = `
    <div style='color:white;margin-bottom:1rem;padding:1.5rem;width:100%;border-radius:2rem;background-color:${color}'>
      <div style='font-weight:900;margin-bottom:1rem;display:flex;justify-content:space-between'>
        <div>${message}</div>
        <div>Q${questionNumber}</div>
      </div>
    <div style="margin-bottom:1rem">${questions[questionNumber].statement}</div>
    ${answerDiv}
    ${htmlCommentElement(questionNumber)}
    ${htmlFeedbackElement(questionNumber)}
  </div>`;
  return s;
}

function htmlCommentElement(questionNumber) {
  if (!questions[questionNumber].comment) return "";
  return `<details open>
    <summary style="font-weight:900;font-size:1rem">Commentaires/explications</summary>
    ${questions[questionNumber].comment}
    </details>`;
}

function htmlFeedbackElement(questionNumber) {
  if (statsQuestions[questionNumber].feedbackSent)
    return "<p>Feedback envoyé, merci !</p>";

  return `<details>
    <summary style="font-weight:900;font-size:1rem">Réagir à cette question</summary>
    <div style="display:flex;justify-content:space-between" id="feedbackDiv${questionNumber}">
      <div class="btn btn-feedback" 
        onclick="sendFeedback(${questionNumber},'like')">
        ❤️ 
      </div>
      <div  class="btn btn-feedback"  
        onclick="sendFeedback(${questionNumber},'reportProblem')">
        ⁉️ Signaler un problème
      </div>
    </div>
  </details>`;
}

// - - - - - - - - - N O T I F S  /  T O A S T / A F F I C H A G E
// - - - - - - - - - - - - - - - - - - - - - - -

function consoleLogQuizRecap() {
  console.log(`Total Points gagnés : +${quiz.points}pts`);
  // ici on pourrait faire un recap plus détaillé dans la console si on veut
}

function toast(message, color) {
  Toastify({
    text: message,
    duration: 1000,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "2rem",
      background: color,
      "text-align": "center",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function notification(message, color) {
  Toastify({
    text: message,
    duration: 4000,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "2rem",
      background: color,
      "text-align": "center",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

// deprecated, écran gameover à la place
function alertGameover() {
  Toastify({
    text: "GAMEOVER\n\n Trop de questions sautées ou ratées !",
    duration: 4500,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "2rem",
      background: "var(--c-danger)",
      "text-align": "center",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}
