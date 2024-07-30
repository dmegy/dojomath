// entry point

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
  for (let i = 0; i < questions.length; i++) {
    //initialisation
    statsQuestions[i] ??= {
      views: 0,
      fail: 0,
      skipped: 0,
      success: 0,
      lastResult: 0,
      penultimateResult: 0,
    };
  }
});
getScript("data_chapters.js");
getScript("data_themes.js", () => {
  for (let themeId in themes) {
    //initialisation
    statsThemes[themeId] ??= {
      nbQuestionsViewed: 0,
      nbAnswersCorrect: 0,
      nbAnswersIncorrect: 0,
      nbQuizFinished: 0,
    };
  }
});
getScript("js/quiz.js");
