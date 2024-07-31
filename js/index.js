// entry point

// TODO : problèmes à résoudre
// désactiver les boutons du haut tant que les scripts ne sont pas chargés.
// Il manque les goto... par exemple

function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}

getScript("js/components.js");
getScript("js/svg-paths.js");
getScript("js/app.js");
getScript("data_questions.js", () => {
  window.statsQuestions ??= [];
  for (let i = 0; i < questions.length; i++) {
    //initialisation
    statsQuestions[i] ??= {
      viewed: 0,
      failed: 0,
      skipped: 0,
      successful: 0,
      lastResult: 0,
      penultimateResult: 0,
      successfulLastTime: false,
      successfulLastTwoTimes: false,
    };
  }
});
getScript("data_chapters.js");
getScript("data_themes.js", () => {
  window.statsThemes ??= {};
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
});
getScript("js/quiz.js");

//getScript("js/avatar.js");
getScript("js/localStorage.js");

window.addEventListener("load", () => {
  state = "Home";
  getScript("js/initMathJax.js", () => {
    console.log("MathJax config initialisée!");
    questionsLoaded = true;
  });

  render(); //rendu des points
  getHighscores();
});

/*
fetch("questions.json?again=" + Math.random())
  .then((response) => response.json())
  .then((json) => {
    questions = json;
    console.log(questions[3]);
  });
*/
