let t0 = performance.timeOrigin + performance.now();

const QUIZ_MIN_RESULT = 2; // attention certains quiz peuvent faire moins de 2 questions ?
const QUIZ_MAX_LENGTH = 10;
const QUESTION_MAX_POINTS = 20; //maximum de pts que l'on peut gagner à chaque question

let questionNumber; // int, question courante
let question; // question courante : object
let state = "Loading";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.
let quiz = {}; // quiz courant

let statsQuestions = [];
for (let i = 0; i < 3000; i++) {
  // attention initialisation avec 3000 il faudrait questions.length mais on ne l'a pas encore
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

let statsThemes = {}; //quest. vues, réussies, ratées, sautées, double-réussies

/* données pour tester l'affihage */
let user = {
  firstConnection: t0,
  userId: toB64(t0),
  userName: toB64(t0),
  avatarURL: "" /* type : dataURL*/,
  depCode: "",
  mathClub: "",
  combo: 0,
  longestCombo: 0,
  points: 0,
  pointsToday: 0,
  nbQuestionsViewed: 0,
  nbQuestionsFailed: 0,
  nbQuestionsSkipped: 0,
  nbQuestionsSuccessful: 0,
  nbQuizStarted: 0,
  nbQuizGameover: 0,
  nbQuizAborted: 0,
  nbQuizFinished: 0,
  nbQuizPerfect: 0,
  lastActive: "" /* date ou stringified date */,
  lastStreak: 0,
  longestStreak: 0,
};

let finishedQuizHistory = []; // histoorique des quiz finis

loadFromLocalStorage();

function getUserStreak() {
  if (user.lastActive == "") return 0;
  let today = Math.floor(new Date().getTime() / (24 * 3600));
  let lastActiveDay = Math.floor(
    new Date(user.lastActive).getTime() / (24 * 3600)
  );
  if (today - lastActiveDay <= 1) return lastStreak;
  else return 0;
}

function updateUserStreak() {
  /* attention */
}

function removeCircles() {
  document
    .querySelectorAll("svg")
    .forEach((el) => el.classList.remove("circled"));
}

function goto(newState) {
  oldState = state;
  state = newState;

  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");
  render();
}

function gotoChapters() {
  state = "Chapters";
  removeCircles();
  render();
}

function computeThemeStats(themeId) {
  // bug sur alreadyseen ?
  // écrit dans statsThemes, à partir des données de statsQuestions
  let th = themes[themeId]; // référence ?
  let questionsAlreadySeen = 0;
  let questionsSuccessfulLastTime = 0;
  let questionsSuccessfulLastTwoTimes = 0;

  for (let i = 0; i < th.questions.length; i++) {
    let questionNumber = th.questions[i];
    if (statsQuestions[questionNumber].viewed > 0) questionsAlreadySeen++;
    if (statsQuestions[questionNumber].successfulLastTime)
      questionsSuccessfulLastTime++;
    if (statsQuestions[questionNumber].successfulLastTwoTimes)
      questionsSuccessfulLastTwoTimes++;
  }
  statsThemes[themeId].questionsAlreadySeen = questionsAlreadySeen;
  statsThemes[themeId].questionsSuccessfulLastTime =
    questionsSuccessfulLastTime;
  statsThemes[themeId].questionsSuccessfulLastTwoTimes =
    questionsSuccessfulLastTwoTimes;
}

function computeAllThemeStats() {
  for (let themeId in statsThemes) {
    computeThemeStats(themeId);
  }
}

function gotoTheme(id) {
  console.log("appel de gotoTheme avec id " + id);
  state = "theme";
  theme = structuredClone(themes[id]);
  theme.id = id; // on rajoute l'id sinon il n'est plus là...
  // calculer theme.progress, theme.nbQuestionsSeens, nbQuestionsChecked, theme.nbQuestionsDbChecked
  render();
}

function startQuiz() {
  /* ou gotoQuiz ?*/
  state = "Quiz";
  render();
}

function level(points) {
  // correspondances points<->niv :
  // 20->niv1, 40->niv2, 80->niv3 etc
  if (points < 20) return 0;
  else return Math.floor(Math.log(points / 10) / Math.log(2));
}

function nextLevelThreshold(points) {
  // on retourne la prochaine (puissance de 2 multiplée par 10)
  return 10 * 2 ** (level(points) + 1);
}

function getHighscores() {
  document.getElementById("highscores").innerHTML = "Chargement...";
  document.getElementById("refreshHighscoresButton").classList.add("fa-spin");
  fetch("static/highscores.html.txt?again=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscores").innerHTML = data;
      document
        .getElementById("refreshHighscoresButton")
        .classList.remove("fa-spin");
    });
}
// transformation nombres en b64

function toB64(x) {
  let digit =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  return x
    .toString(2)
    .split(/(?=(?:.{6})+(?!.))/g)
    .map((v) => digit[parseInt(v, 2)])
    .join("");
}

function fromB64(x) {
  let digit =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  return x.split("").reduce((s, v) => s * 64 + digit.indexOf(v), 0);
}

function saveToLocalStorage() {
  console.log("sauvegarde-> localStorage");
  window.localStorage.setItem("statsQuestions", JSON.stringify(statsQuestions));
  window.localStorage.setItem("statsThemes", JSON.stringify(statsThemes));
  window.localStorage.setItem("user", JSON.stringify(user));
}

function loadFromLocalStorage() {
  console.log("Récupération des données sauvegardées en local");

  if (window.localStorage.getItem("user") !== null) {
    // on écrase :
    user = JSON.parse(window.localStorage.getItem("user"));
  }
  if (window.localStorage.getItem("finishedQuizHistory") !== null) {
    // on écrase :
    finishedQuizHistory = JSON.parse(
      window.localStorage.getItem("finishedQuizHistory")
    );
  }

  if (window.localStorage.getItem("statsQuestions") !== null) {
    let loadedstatsQuestions = JSON.parse(
      window.localStorage.getItem("statsQuestions")
    );
    // ceci contient des valeurs non nulles,
    //mais peut-être moins de clés que statsQuestions si des questions ont été traitées entre-temps.
    for (let i = 0; i < loadedstatsQuestions.length; i++) {
      statsQuestions[i] = loadedstatsQuestions[i]; // on écrase quand il existe une valeur loadée
    }
  }

  if (window.localStorage.getItem("statsThemes") !== null) {
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - Mini-Alpine :-) - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - -

function xShow() {
  // boucle sur les éléments avec x-show et les affiche conditionnellement à l'argument
  let elements = document.querySelectorAll("[x-show]");
  for (let i = 0; i < elements.length; i++) {
    if (eval(elements[i].attributes["x-show"].value)) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
}

function xHtml() {
  // boucle sur les éléments avec x-html  visibles et affiche le contenu
  let elements = document.querySelectorAll("[x-html]");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].offsetParent === null) {
      // seule méthode trouvée pour vérifier la visibilité
      continue;
    }
    let content = eval(elements[i].attributes["x-html"].value);
    elements[i].innerHTML = content;
  }
}

// éventuellement coder le x-for pour le composant de références de thèmes, avec liste de liens à afficher...

function render() {
  xShow();
  xHtml();
}

// - - - - - - - - - - - - - - -
// - - - - ON LOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - -
function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}

window.addEventListener("load", () => {
  state = "Home";
  getScript("js/-initMathJax.js", () => {
    console.log("MathJax config initialisée!");
    questionsLoaded = true;
  });
  getScript("js/-questions.js");

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
