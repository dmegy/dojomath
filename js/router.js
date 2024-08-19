function goto(newState) {
  //sauf End, Quiz et Theme ?
  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");

  history.pushState({}, "", "?section=" + newState);
  setState(newState);
  render();
}

function gotoTheme(id) {
  // deprecated maintenant il y a un écran de gameover
  //if (!isThemeIdValid(id)) {
  //  // on est arrivé ici par un gameover de custom quiz, ou après avoir terminé un custom quiz en cliquant
  //  goto("Chapters");
  //  return;
  //}
  removeCircles();
  console.log("appel de gotoTheme avec id " + id);
  history.pushState({}, "", "?section=Theme&id=" + id);
  initTheme(id); // initialisation de 'theme',  statsThemes, calcul stats etc
  setState("Theme");
  render();
}

function initTheme(id) {
  initUpdateStatsThemes(id);
  computeThemeStats(id);
  theme = structuredClone(themes[id]);
  theme.id = id; // on rajoute l'id sinon il n'est plus là...
}

function initCustomTheme(id, questions) {
  // id : string, questions : array(int)
  theme = {
    id: id,
    title: "Thème personnalisé",
    info: "",
    questions: questions,
  };
  statsThemes[id] = {};
}

function gotoQuiz() {
  // theme doit être initialisé.
  history.pushState({}, "", "?section=Quiz&id=" + theme.id);
  setState("Quiz");
  startQuiz(); // va construire le quiz, appeler nextQUestion qui va appeler  render
}

function gotoEnd() {
  history.pushState({}, "", "?section=End");
  setState("End");
  render();
}

function gotoGameover() {
  history.pushState({}, "", "?section=Gameover");
  setState("Gameover");
  render();
}

function isThemeIdValid(id) {
  return id in themes;
}

function isQuestionArrayValid(arr) {
  // vérifie si le tableau est composé de nombres
  // les éléments de l'array ont été transformés en nombres auparavant

  // retourne false si des éléments sont NaN
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) return false;
    if (arr[i] < 1 || arr[i] > NB_QUESTIONS) return false;
  }
  console.log("valid array : " + arr);
  return true;
}

function processURL() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let s = urlParams.get("section");
  let id = urlParams.get("id"); // themeId, ou alors "1278+23+6+19+209+11"
  if (
    s == "Home" ||
    s == "Profile" ||
    s == "Statistics" ||
    s == "Highscores" ||
    s == "Chapters"
  ) {
    // genre de goto mais sans le history push...
    removeCircles();
    document.getElementById("navButton" + s).classList.add("circled");
    setState(s);
    render();
  } else if (s == "Theme") {
    if (!isThemeIdValid(id)) {
      // invalid theme: goto Chapters
      console.log("wrong theme request : " + id + ", goto Chapters");
      goto("Chapters"); // inclus pushstate
    } else {
      initTheme(id);
      setState("Theme");
      render();
    }
  } else if (s == "Quiz" && isThemeIdValid(id)) {
    initTheme(id);
    setState("Quiz");
    startQuiz(); // va appeler nextQUestion qui va appeler  render
  } else if (s == "Quiz" && id != null) {
    let arrayFromId = id.split(QUESTION_SEPARATOR).map((e) => Number(e));
    if (isQuestionArrayValid(arrayFromId)) {
      // - - - - - ! CUSTOM QUIZ ! - - - - - -
      custom = true;
      initCustomTheme(id, arrayFromId);
      setState("Quiz");
      startQuiz();
    } else {
      console.log(id + " : Bad Id. Goto Home");
      goto("Home");
    }
  } else if (state == "Loading") {
    state = "Home";
    render(); // pour afficher les points en haut. Pas de push state sinon on bloque l'utilisateur sur la page !
  } else {
    console.log("No Id. Goto Home");
    goto("Home");
  }
}

function checkForUpdates() {
  let timeSinceUpdateCheck = Date.now() - lastUpdateCheckTime;
  if (timeSinceUpdateCheck < UPDATE_TIME) return;

  if (state !== "Chapters") return;

  if (!window.navigator.onLine) {
    console.log("Cannot check for updates : offline");
    return;
  }

  lastUpdateCheckTime = Date.now();
  location.reload();
}

window.addEventListener("popstate", (event) => {
  if (state == "Quiz") {
    // on va interrompre le quiz.
    user.nbQuizAborted++;
    // éventuellement remplacer par un preventdefault, puis un confirmQuit ou équivalent ?
  }
  processURL();
});

function setState(s) {
  window.dispatchEvent(
    new CustomEvent("stateChange", { detail: { oldState: state, newState: s } })
  );
  oldState = state;
  state = s;
}
