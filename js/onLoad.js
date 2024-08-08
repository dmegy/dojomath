// - - - - - - - - - - - - - - - - - - - - - - -
// - - - - LISTENER ONLOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  initUpdateStatsThemes(); // a besoin que les thèmes soient loadés avant !

  setState("Home"); // todo : sauvegarder state dans le storage pour les refreshs ?

  render(); //rendu des points ? Mais il sont pas encore récupérés du storage

  //  GETSCRIPT MATHJAX : si on le met en async dans le body il commence trop tôt ?
  getScript("js/-async-initMathJax.js", () => {
    console.log("Callback de getScript MathJax");
  });
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

function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}
