// ceci doit tourner après que les questions soient loadées !

const QUIZ_LENGTH = 10;
let questionNumber; // int, question courante
let question; // question courante : object

function abortQuiz() {
  // appelé lorsque l'utilisateur confirme la fermeture, ou en cas de gameover ?
  // éventuel appel serveur, gestion des stats ? ajout quiz interrompu ?
  abortQuizModal.close();
  gotoTheme(theme.id);
}

let statsQuestions = new Array(questions.length);
for (let i = 0; i < questions.length; i++) {
  //initialisation
  statsQuestions[i] = {
    views: 0,
    fail: 0,
    pass: 0,
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
  while (quiz.questions.length > QUIZ_LENGTH) quiz.questions.shift();

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

function validateAnswer() {
  // correction en fonction de la valeur de submittedAnswer
  // attention pour la correction : utiliser ===
  /* mise à jour de toutes les stats, puis nextQuestion() */

  // calcul de 'question.resultat', qui vaut -1, 0 ou 1, en lisant la réponse donnée

  if (question.submittedAnswer === undefined) {
    question.resultat = 0;
    console.log("tu as passé la question");
    statsQuestions[question.num].pass += 1;
  } else if (question.submittedAnswer === question.answer) {
    question.resultat = 1;
    console.log("bonne réponse");
    statsQuestions[question.num].success += 1;
  } else {
    question.resultat = -1;
    console.log("mauvaise réponse");
    statsQuestions[question.num].fail += 1;
  }

  /* gestion des combos, éventuellement affichage de messages (combo etc)*/

  /* gestion du game over anticipé */

  /* enregistrement stats*/

  if (quiz.questions.length > 0) nextQuestion();
  else showResults();
}

function showResults() {
  /* calculer stats etc, récompenses, bonus */
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
