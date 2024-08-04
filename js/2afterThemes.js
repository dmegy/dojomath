// ceci doit tourner après que les thèmes soient loadés
// c'est le cas uniquement car le script est inliné après themes.js, à cause de son nom.

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
