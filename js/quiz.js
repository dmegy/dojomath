// ceci doit tourner après que les questions soient loadées !

const QUIZ_MIN_RESULT = 2; // attention certains quiz peuvent faire moins de 2 questions ?
const QUIZ_MAX_LENGTH = 10;
const QUESTION_MAX_POINTS = 20; //maximum de pts que l'on peut gagner à chaque question

let questionNumber; // int, question courante
let question; // question courante : object

let abortQuizModal = document.getElementById("abortQuizModal");

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

let statsQuestions = new Array(questions.length);
for (let i = 0; i < questions.length; i++) {
  //initialisation
  statsQuestions[i] = {
    views: 0,
    fail: 0,
    skipped: 0,
    success: 0,
  };
}

// ATTENTION : ensuite, écraser avec la valeur provenant du localstorage ?
// Mais il va peut-être manquer des questions, en cas de question ajoutée ?

shuffleArray = function (array) {
  // attention ceci modifie directement le tableau "sur place"
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

function startQuiz() {
  quiz = structuredClone(theme);

  shuffleArray(quiz.questions);

  // on vide la fin pour ne garder au plus que QUIZ_LENGTH questions
  while (quiz.questions.length > QUIZ_MAX_LENGTH) quiz.questions.shift();

  quiz.quizLength = quiz.questions.length;
  quiz.fail = 0;
  quiz.success = 0;
  quiz.skipped = 0;
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
  questionNumber = quiz.questions.splice(0, 1)[0];
  // attention on l'enlève d ela liste
  question = structuredClone(questions[questionNumber]);
  question.num = questionNumber; // on rajoute dans l'objet
  state = "Quiz";

  // uncheck radios

  render();
  MathJax.typeset();
  statsQuestions[question.num].views += 1;
}

function submitAnswer(answer) {
  question.submittedAnswer = answer;

  validateAnswer();
}

function htmlPoints(points) {
  return points + " pt" + (points == 1 ? "" : "s");
}

function validateAnswer() {
  // correction en fonction de la valeur de submittedAnswer
  // attention pour la correction : utiliser ===
  /* mise à jour de toutes les stats, puis nextQuestion() */

  // calcul de 'question.resultat', qui vaut -1, 0 ou 1, en lisant la réponse donnée

  if (question.submittedAnswer === undefined) {
    question.result = 0;
    statsQuestions[question.num].pass += 1;
    user.combo = 0;
    quiz.skipped += 1;
    console.log("question sautée");
  } else if (question.submittedAnswer === question.answer) {
    question.result = 1;
    statsQuestions[question.num].success += 1;
    user.combo += 1;
    quiz.success += 1;
    console.log("question réussie");
  } else {
    question.result = -1;
    statsQuestions[question.num].fail += 1;
    user.combo = 0;
    quiz.fail += 1;
    console.log("question ratée");
  }
  quiz.result += question.result;

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
  else showResults();
}

function grade20FromResult(result, maxResult) {
  let MAX_GRADE = 20; // ou 100
  let posResult = Math.max(0, result);
  let grade = (MAX_GRADE * posResult) / maxResult;
  let roundedGrade = Math.floor(grade);
  return roundedGrade;
}

function showResults() {
  /* calculer stats etc, récompenses, bonus */

  quiz.finalGrade = grade20FromResult(quiz.success, quiz.quizLength);
  // remplacer success par result pour tenir compte des erreurs

  state = "End";
  render();
}

function unstack(targetName) {
  /* appelé lorsque le joueur sort de l'écran de fin : il faut afficher tous les messages empilés */
  /* provisoire */
  if (targetName == "Chapters") gotoChapters();
  else gotoTheme(theme.id);
}

function glyphResult(note) {
  // écran de fin de quiz
  let glyph = "";
  if (note == 20) glyph = "🏆";
  else if (note >= 15) glyph = "🎉";
  else if (note >= 10) glyph = "👍";
  else glyph = "😅";
  return glyph;
}

function getBooster() {}
