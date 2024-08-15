// - - - - - - - - - - - - - - - - - - - - - - -
// - - - - LISTENER ONLOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  console.log("- - - -   P A G E   L O A D   - - - - - -");
  //GETSCRIPT MATHJAX : si on le met en async dans le body il commence trop tôt ?
  getScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js", () => {
    testMathJax();
  });
  // ou alors  charger en async mais ça repousse le temps officiel de load
  initUpdateStatsThemes(); // a besoin que les thèmes soient loadés avant !

  initUpdateStatsQuestions(); /// idem, a besoin des questions, mais c'est inliné

  processURL(); // contient setState adéquat et render()
}); // fin du listener sur onLoad

function initUpdateStatsThemes() {
  // initialisation statsThemes (doit tourner *après* chargement thèmes. actuellement dans onLoad)
  // ceci pourrait être géré simplement en s'assurant que le code est inliné après app.js et themes.js ...
  // auparavant, c'était garanti avec des prefixes de noms de fichiers...pas génial
  for (let themeId in themes) {
    statsThemes[themeId] = {
      isLocked: false,
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
  // synchro statsThemes avec loaded object from storage

  for (themeId in statsThemes) {
    if (!(themeId in loadedStatsThemes)) continue;

    for (prop in statsThemes[themeId]) {
      if (loadedStatsThemes[themeId][prop] !== undefined)
        statsThemes[themeId][prop] = loadedStatsThemes[themeId][prop];
    }
    console.log("statsThemes initialized and updated");
  }
}

function initUpdateStatsQuestions() {
  // initialisation une fois qu'on sait combien il y a de questions.
  for (let i = 0; i < questions.length; i++) {
    statsQuestions[i] = {
      viewed: 0,
      failed: 0,
      skipped: 0,
      successful: 0,
      lastResult: 0,
      penultimateResult: 0,
      successfulLastTime: false,
      successfulLastTwoTimes: false,
      feedbackSent: false,
    };
  }

  //update from storage :

  for (let i = 0; i < loadedStatsQuestions.length; i++) {
    // sparse array attention. Les entrées manquantes sont null
    if (loadedStatsQuestions[i] === null) continue;

    for (key in statsQuestions[i]) {
      if (loadedStatsQuestions[i][key] !== undefined)
        statsQuestions[i][key] = loadedStatsQuestions[i][key]; // on écrase quand il existe une valeur dans le storage
    }
  }

  console.log("Question statistics initialized and updated");
}

function getScript(scriptUrl, callback) {
  console.log("hello from loadScript");
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}
