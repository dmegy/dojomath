const QUIZ_LENGTH = 10;
let questionNumber; // int, question courante
let question; // question courante : object

const shuffleArray = (array) => {
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
  render();
  MathJax.typeset();
}

function validateAnswer() {
  /* appelée lorsqu'on clique sur valider*/
  /* correction, mise à jour de toutes les stats, puis nextQuestion() */

  /* gestion des combos, éventuellement affichage de messages (combo etc)*/

  /* gestion du game over anticipé */

  if (quiz.questions.length > 0) nextQuestion();
  else showResults();
}

function showResults() {
  /* calculer stats etc, récompenses, bonus */
  state = "End";
  render();
}

function unstack(targetName) {
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
