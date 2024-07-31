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
