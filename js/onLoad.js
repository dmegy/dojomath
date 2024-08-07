// - - - - - - - - - - - - - - - - - - - - - - -
// - - - - LISTENER ONLOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  initUpdateStatsThemes(); // a besoin que les thèmes soient loadés avant !

  setState("Home"); // todo : sauvegarder state dans le storage pour les refreshs ?

  render(); //rendu des points ? Mais il sont pas encore récupérés du storage

  // 4. GETSCRIPT MATHJAX : si on le met en async dans le body il commence trop tôt ?
  getScript("js/-async-initMathJax.js", () => {
    console.log("Callback de getScript MathJax");
  });
}); // fin du listener sur onLoad

function initUpdateStatsThemes() {
  // initialisation statsThemes (doit tourner *après* chargement thèmes. actuellement dans onLoad)
  for (let themeId in themes) {
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
  // synchro statsThemes avec storage
  if (window.localStorage.getItem("statsThemes") !== null) {
    loadedStatsThemes = JSON.parse(window.localStorage.getItem("statsThemes"));
    console.log("statsThemes : data exists in storage. Loaded.");

    for (themeId in themes) {
      statsThemes[themeId] = {};
      if (themeId in loadedStatsThemes) {
        statsThemes[themeId] = loadedStatsThemes[themeId];
      }
    }

    console.log("statsThemes updated");
  }
}

function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}
