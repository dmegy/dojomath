function shuffleArray(array) {
  // attention !  le tableau est muté sur place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  console.log("startQuiz() sur le thème " + theme.id);

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
  quiz.bonus = 0;
  quiz.finalGrade = 0;

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
  setState("Quiz");
  render();
  MathJax.typeset();
  statsQuestions[question.num].viewed += 1;
  statsThemes[theme.id].nbQuestionsViewed += 1;
  user.nbQuestionsViewed += 1;
}

function submitAnswer(answer) {
  //called by button
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

    question.points = Math.min(MAX_POINTS_QUESTION, user.combo);

    // toast success
    let congratulationsMessage = "";
    if (user.combo > 1) congratulationsMessage += user.combo + " D'AFFILÉE !\n";

    congratulationsMessage +=
      "+" + question.points + " pt" + (question.points > 1 ? "s" : "");
    toast(congratulationsMessage, "var(--c-success)");
    //toast Combo:
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
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < MIN_QUIZ_RESULT;
  if (isGameover) {
    //alert(
    //  "=========\nGAMEOVER\n=========\n\nTrop de questions ratées ou sautées"
    //);

    alertGameover();

    user.nbQuizGameover++;
    gotoTheme(theme.id);
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

  /* gestion des combos, éventuellement affichage de messages (combo etc)*/
  // type "10 d'affilée etc ? mais déjà affiché dans le toast"
  // ou alors : "100ème question réussie"

  saveToLocalStorage();

  if (quiz.questions.length > 0) nextQuestion();
  else showQuizResults(); // quiz terminé !
}

function confirmQuit() {
  //apelée par bouton "quitter"
  let text =
    "=======================\nDEMANDE DE CONFIRMATION\n=======================\n\nSouhaites-tu vraiment quitter la partie en cours ?\n\n(Attention, les points de la partie en cours ne seront pas sauvegardés.)";
  if (confirm(text) == true) {
    user.nbQuizAborted++;

    gotoTheme(theme.id); // ou alors faire une fonction abortQuiz ?
  }
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
        "oklch(70%,100% var(--c-accent)"
      );
    }
  }

  // BOOST
  console.log("points avant booster : " + quiz.points);
  quiz.points *= getBoost();
  console.log("boost multiplier : " + getBoost());
  console.log("points après booster : " + quiz.points);
  // faire apparaître le boost pendant tout le quiz en haut ?

  user.points += quiz.points;
  user.pointsToday += quiz.points;
  user.nbQuizFinished++;
  user.nbQuizFinishedToday++;

  statsThemes[theme.id].nbQuizFinished++;

  finishedQuizHistory.push({
    date: new Date(),
    details: quiz.history,
    pointsEarned: quiz.points,
  });

  // message de félicitations tous les 10 quiz terminés
  if (user.nbQuizFinished % 10 == 0) {
    toast(
      user.nbQuizFinished + " parties terminées, bravo !",
      "oklch(70%,100% var(--c-accent)"
    );
  }

  // - - - - update lastActive - - - -
  user.lastActiveTime = Date.now();

  saveToLocalStorage();

  setState("End");
  render();

  sendStatistics();
}

function giveBoost() {
  if (getBoost() > 1) return; // on ne donne pas de boost s'il y en a déjà un actif

  let thisDate = new Date();
  let thisHour = thisDate.getHours();

  for (let i = 0; i < happyHourList.length; i++) {
    if (happyHourList[i][0] <= thisHour && thisHour < happyHourList[i][1]) {
      user.lastBoostMultiplier = 2;
      user.lastBoostEnd = new Date(
        thisDate.getFullYear(),
        thisDate.getMonth(),
        thisDate.getDate(),
        happyHourList[i][1]
      ).getTime();
      notification(
        "HAPPY HOUR:\nPoints doublés jusqu'à " + happyHourList[i][1] + "h",
        "oklch(70% 100% var(--hue-accent)"
      );
      return;
    }
  }

  if (Math.random() < BOOST_PROBABILITY) {
    user.lastBoostMultiplier = 2;
    user.lastBoostEnd = Date.now() + BOOST_DURATION;
    notification(
      "BOOST\nPoints doublés pendant " +
        BOOST_DURATION / (60 * 1000) +
        " minutes !",
      "oklch(70% 100% var(--hue-accent)"
    );
  }
}

function unstack(targetName) {
  /* appelé lorsque le joueur sort de l'écran de fin : il faut afficher tous les messages empilés */
  /* provisoire */

  giveBoost();

  if (targetName == "Chapters") gotoChapters();
  else if (targetName == "Quiz") startQuiz();
}

function getBoost() {
  if (Date.now() < user.lastBoostEnd) return user.lastBoostMultiplier;
  else return 1;
}

// - - - COMPOSANTS - - - --

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
  if (state != "Quiz" && state != "End") return "";
  let s = "";
  let color = "";
  for (let i = 0; i < quiz.history.length; i++) {
    if (quiz.history[i].result == 1) color = "var(--c-success)";
    if (quiz.history[i].result == 0) color = "var(--c-warning)";
    if (quiz.history[i].result == -1) color = "var(--c-danger)";
    s += `<div style='flex-grow:1; background-color:${color}'>&nbsp;</div>`;
  }
  let nbRemainingAnswers =
    state == "Quiz" ? quiz.questions.length + 1 : quiz.questions.length;
  for (let i = 0; i < nbRemainingAnswers; i++) {
    //rendu après que la question ait été supprimée!
    s += `<div style='flex-grow:1;background-color:var(--c-primary-40-desat)'>&nbsp;</div>`;
  }
  return s;
}

// - - - - - - - - - N O T I F S  /  T O A S T

function toast(message, color) {
  Toastify({
    text: message,
    duration: 800,
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
    duration: 5000,
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

function alertGameover() {
  Toastify({
    text: "GAMEOVER\n\n Trop de questions sautées ou ratées !",
    duration: 5000,
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
