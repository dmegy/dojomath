// ceci doit tourner après que les questions soient loadées !

function shuffleArray(array) {
  // attention !  le tableau est muté sur place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  quiz = structuredClone(theme);

  shuffleArray(quiz.questions);

  // on vide la fin pour ne garder au plus que QUIZ_LENGTH questions
  while (quiz.questions.length > QUIZ_MAX_LENGTH) quiz.questions.shift();

  quiz.quizLength = quiz.questions.length;
  quiz.nbQuestionsFailed = 0;
  quiz.nbQuestionsSuccessful = 0;
  quiz.nbQuestionsSkipped = 0;
  quiz.history = [];
  quiz.result = 0;
  quiz.points = 0;
  quiz.bonus = 0;
  quiz.finalGrade = 0;
  /* tableau d'objets de la forme :
    {questionNumber:num,submittedAnswer:true;result:-1}
    */

  nextQuestion();
}

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
  } else if (question.submittedAnswer === question.answer) {
    // SUCCESS
    question.result = 1;
    statsQuestions[question.num].successful += 1;
    if (statsQuestions[question.num].successfulLastTime)
      statsQuestions[question.num].successfulLastTwoTimes = true;
    statsQuestions[question.num].successfulLastTime = true;

    statsThemes[theme.id].nbQuestionsSuccessful += 1;
    user.combo += 1;
    user.nbQuestionsSuccessful += 1;
    quiz.nbQuestionsSuccessful += 1;
    console.log("question réussie");
  } else {
    // FAIL
    question.result = -1;
    statsQuestions[question.num].failed += 1;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsFailed += 1;
    user.combo = 0;
    user.nbQuestionsFailed += 1;
    quiz.nbQuestionsFailed += 1;
    console.log("question ratée");
  }
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  console.log("question.result : " + question.result);

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < QUIZ_MIN_RESULT;
  if (isGameover) {
    alert("GAMEOVER :\nTrop de questions ratées ou sautées");
    abortQuiz();
    return;
  }

  // ATTRIBUTION DES POINTS A LA QUESTION
  // EN FONCTION DES RESULTATS :
  if (question.result == -1) question.points = -1;
  else question.points = Math.min(QUESTION_MAX_POINTS, user.combo);

  question.bonus = Math.max(question.points - 1, 0); // pts gagnés à cause d'un bonus

  quiz.points += question.points;
  quiz.bonus += question.bonus;

  quiz.history.push({
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  });

  /* gestion des combos, éventuellement affichage de messages (combo etc)*/

  /* gestion du game over anticipé */

  /* enregistrement stats*/

  if (quiz.questions.length > 0) nextQuestion();
  else showQuizResults();
}

function showQuizResults() {
  //appelée par validateResults()
  /* calculer stats etc, récompenses, bonus */
  /* empile les messages, les récompenses etc ?*/

  quiz.finalGrade = grade20FromResult(
    quiz.nbQuestionsSuccessful,
    quiz.quizLength
  );
  // remplacer success par result pour tenir compte des erreurs
  user.points += quiz.points;
  statsThemes[theme.id].nbQuizFinished += 1;
  state = "End";
  render();
}

function unstack(targetName) {
  /* appelé lorsque le joueur sort de l'écran de fin : il faut afficher tous les messages empilés */
  /* provisoire */
  if (targetName == "Chapters") gotoChapters();
  else gotoTheme(theme.id);
}

// - - - COMPOSANTS - - - --

function glyphResult(note) {
  // écran de fin de quiz
  let glyph = "";
  if (note == 20) glyph = "🏆";
  else if (note >= 15) glyph = "🎉";
  else if (note >= 10) glyph = "👍";
  else glyph = "😅";
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

function showAbortQuizModal() {
  let text =
    "DEMANDE DE CONFIRMATION :\n\nSouhaites-tu vraiment interrompre le Quiz ?\n\n(Attention, aucun point ne sera sauvegardé.)";
  if (confirm(text) == true) {
    abortQuiz();
  }
}
function abortQuiz() {
  // appelé lorsque l'utilisateur confirme la fermeture, ou en cas de gameover ?
  // éventuel appel serveur, gestion des stats ? ajout quiz interrompu ?

  gotoTheme(theme.id);
}
