function gotoTheme(id) {
  removeCircles();
  console.log("appel de gotoTheme avec id " + id);
  history.pushState({}, "", "?section=Theme&t=" + id);
  initTheme(id); // initialisation de 'theme',  statsThemes, calcul stats etc
  setState("Theme");
  render();
}

function initTheme(id) {
  console.log("from init theme : " + id);
  initUpdateStatsThemes(id);
  computeThemeStats(id);
  theme = structuredClone(themes[id]);
  theme.id = id; // on rajoute l'id sinon il n'est plus là...
}

function gotoEnd() {
  history.pushState({}, "", "?section=End");
  setState("End");
  render();
}

function goto(newState) {
  //sauf End, Quiz et Theme ?
  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");

  history.pushState({}, "", "?section=" + newState);
  setState(newState);
  render();
}

function gotoQuiz() {
  /* ou gotoQuiz ?*/
  history.pushState({}, "", "?section=Quiz&t=" + theme.id);
  setState("Quiz");
  startQuiz(); // va appeler nextQUestion qui va appeler  render
}

function processURL() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let s = urlParams.get("section");
  let t = urlParams.get("t"); // themeId
  let isThemeValid = t in themes;
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
    if (!isThemeValid) {
      // invalid theme: goto Chapters
      console.log("wrong theme request : " + t + ", goto Chapters");
      goto("Chapters"); // inclus pushstate
    } else {
      initTheme(t);
      setState("Theme");
      render();
    }
  } else if (s == "Quiz" && isThemeValid) {
    initTheme(t);
    setState("Quiz");
    startQuiz(); // va appeler nextQUestion qui va appeler  render
  } else {
    goto("Home");
  }
}

window.addEventListener("popstate", (event) => {
  console.log("popstate");
  processURL();
});

function setState(s) {
  oldState = state;
  state = s;
}
