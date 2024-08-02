// ceci doit tourner après que les questions soient loadées !
// à part la boucle  suivante, ce script comporte uniquement des fonctions.

for (let themeId in themes) {
  //initialisation
  statsThemes[themeId] ??= {
    nbQuestionsViewed: 0,
    nbQuestionsSuccessful: 0,
    nbQuestionsFailed: 0,
    nbQuestionsSkipped: 0,
    nbQuizFinished: 0,
    questionsAlreadySeen: 0,
    questionsSuccessfulLastTime: 0,
    questionsSuccessfulLastTwoTimes: 0,
  };
}

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
  state = "Quiz";
  render();
  MathJax.typeset();
  statsQuestions[question.num].views += 1;
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
    statsQuestions[question.num].skipped += 1;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsSkipped += 1;
    user.combo = 0;
    user.nbQuestionsSkipped += 1;
    quiz.nbQuestionsSkipped += 1;
    console.log("question sautée");
    toast("+0pts", "var(--c-warning)");
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

    // toast success
    let congratulationsMessage =
      user.combo + " PT" + (user.combo > 1 ? "S" : "");
    toast(congratulationsMessage, "var(--c-success)");
    //toast Combo:
    if (user.combo > 1)
      toast(user.combo + " D'AFFILÉE !\n", "var(--c-success)");
  } else {
    // FAIL
    question.result = -1;
    statsQuestions[question.num].failed++;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsFailed++;
    user.combo = 0;
    user.nbQuestionsFailed++;
    quiz.nbQuestionsFailed++;
    toast("-1pt", "var(--c-danger)");
  }
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < MIN_QUIZ_RESULT;
  if (isGameover) {
    alert(
      "=========\nGAMEOVER\n=========\n\nTrop de questions ratées ou sautées"
    );
    user.nbQuizGameover++;
    abortQuiz();
    return;
  }

  // ATTRIBUTION DES POINTS A LA QUESTION
  // EN FONCTION DES RESULTATS :
  if (question.result == -1) question.points = -1;
  else question.points = Math.min(MAX_POINTS_QUESTION, user.combo);

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
  else showQuizResults();
}

function showAbortQuizModal() {
  let text =
    "=======================\nDEMANDE DE CONFIRMATION\n=======================\n\nSouhaites-tu vraiment quitter la partie en cours ?\n\n(Attention, les points de la partie en cours de seront pas sauvegardés.)";
  if (confirm(text) == true) {
    user.nbQuizAborted++;
    abortQuiz();
  }
}
function abortQuiz() {
  // appelé lorsque l'utilisateur confirme la fermeture, ou en cas de gameover ?
  // éventuel appel serveur, gestion des stats ? ajout quiz interrompu ?
  gotoTheme(theme.id);
}

function showQuizResults() {
  //appelée par validateResults()
  /* calculer stats etc, récompenses, bonus */
  /* empile les messages, les récompenses etc ?*/

  // gérer avec des toasts ?

  quiz.finalGrade = grade20FromResult(
    quiz.nbQuestionsSuccessful,
    quiz.quizLength
  );
  if (quiz.finalGrade == 20) user.nbQuizPerfect++;

  // remplacer success par result pour tenir compte des erreurs
  user.points += quiz.points;
  statsThemes[theme.id].nbQuizFinished++;
  user.nbQuizFinished++;
  finishedQuizHistory.push(quiz.history);
  saveToLocalStorage();

  state = "End";
  render();
}

function unstack(targetName) {
  /* appelé lorsque le joueur sort de l'écran de fin : il faut afficher tous les messages empilés */
  /* provisoire */
  if (targetName == "Chapters") gotoChapters();
  else if (targetName == "Quiz") startQuiz();
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

function getBooster() {}

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
