// ce fichier sera ignoré par le build de la version embedded
// ceci peut être remplacé par un script src=questions.js par exemple, (en async)
// ou par le fait d'inliner le contenu de questions.js
// - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  fetch("questions.json?again=" + Math.random(), {
    headers: {
      "Accept-Encoding": "gzip",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      questions = json;
      console.log("Questions loaded from json : " + json.length);
      questionsLoaded = true;

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
    });
});
