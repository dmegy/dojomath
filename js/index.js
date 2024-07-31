// entry point

// TODO : problèmes à résoudre
// désactiver les boutons du haut tant que les scripts ne sont pas chargés.
// Il manque les goto... par exemple

getScript("js/components.js");
getScript("js/svg-paths.js");

getScript("js/app.js");
getScript("data_chapters.js");
getScript("data_themes.js", () => {});
getScript("js/quiz.js");
