// - - - - - - - - - - - - - - - - - - - - - - - 
// - - - - LISTENER ONLOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - - - - - - - - - -




window.addEventListener("load", () => {
  // ATTENTION les thèmes+chapitres sont loadés, les questions non.
  // 1. initialisation statsThemes en fonction du ombre de thèmes présents
  // 2. update de statsThèmes avec le localstorage
  // 3. fetch des questions avec callback
  // 4. getScript Mathjax


  // 1. initialisation statsThemes (doit tourner après chargement thèmes)
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

  // 2. synchro statsThemes avec storage
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

  // passage du state de Loading à Home :
  // mais en fait il faudrait détecter le state sauvegardé dans le storage et loader ce state-là, sauf si c'est Quiz ou End ?
  // Ou même theme, car theme va être undefined, ou alors il faut aussi le sauvegarder
  setState("Home");

  // 3. FETCH QUESTIONS
  fetch("questions.json?again=" + Math.random())
    .then((response) => response.json())
    .then((json) => {
      questions = json;
      console.log("Questions loaded from json");
      questionsLoaded = true;
      initUpdateQuestionsStats();
    });

  render(); //rendu des points ? Mais il sont pas encore récupérés du storage

  // 4. GETSCRIPT MATHJAX : si on le met en async dans le body il commence trop tôt ?
  getScript("js/-async-initMathJax.js", () => {
    console.log("Callback de getScript MathJax");
  });
}); // fin du listener sur onLoad





function initUpdateQuestionsStats() {//callback du fetch des questions
  console.log("Nb de questions téléchargées : " + questions.length);
  // 1. initialisation de statsQuestions par des stats vides
  // pour chaque question officielle venant d'être chargée
  for (let i = 0; i < questions.length; i++) {
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

  // 2. update from storage
  if (window.localStorage.getItem("statsQuestions") !== null) {
    let loadedStatsQuestions = JSON.parse(
      window.localStorage.getItem("statsQuestions")
    );
    console.log(
      "Questions possédant des données dans le storage : " +
        loadedStatsQuestions.length
    );
    // ceci contient des valeurs non nulles,
    //mais peut-être moins de clés que statsQuestions si des questions ont été traitées entre-temps.
    for (let i = 0; i < loadedStatsQuestions.length; i++) {
      statsQuestions[i] = loadedStatsQuestions[i]; // on écrase quand il existe une valeur loadée
    }
  }
}

function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}