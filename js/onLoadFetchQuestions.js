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
    });
});
