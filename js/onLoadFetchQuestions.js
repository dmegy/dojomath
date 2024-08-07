// ce fichier sera ignoré par le build de la version embedded
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
      console.log("Questions loaded from json");
      questionsLoaded = true;
      initUpdateStatsQuestions();
    });
}); // fin du listener sur onLoad
