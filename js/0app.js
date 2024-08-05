let t0 = performance.timeOrigin + performance.now();

const MIN_QUIZ_RESULT = 2; // attention certains quiz peuvent faire moins de 2 questions ?
const MAX_ERRORS_ALLOWED = 5; // inutilisé, on utilisé la constante précédente
// (le but est d'empecher de cliquer sur 'passer' et que ça compte comme un quiz fini)
const MAX_QUIZ_LENGTH = 10;
const MAX_POINTS_PER_QUESTION = 20; //maximum de pts que l'on peut gagner à chaque question
const BOOST_PROBABILITY = 0.2;
const BOOST_DURATION = 15 * 60 * 1000; // 15 minutes

let happyHourList = [
  [6, 8],
  [12, 14],
  [18, 20],
];

let questions = []; // Pour json. Commenter si questions loadées depuis js.

let questionNumber; // int, question courante
let question; // question courante : object
let oldState = undefined;
let state = "Loading";
// les states ont "Loading", "Home", "Settings", "Statistics", "Chapters", "Theme", "Quiz" et "End"
let sectionLabels = {
  Loading: "DojoMath.fr",
  Home: "DojoMath.fr",
  Profile: "Préférences",
  Statistics: "Progression",
  Highscores: "Highscores",
  Chapters: "Liste des thèmes",
  Theme: "Thème choisi",
  Quiz: "",
  End: "Partie terminée!",
};
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.
let quiz = {}; // quiz courant

let user = {
  firstConnectionTime: t0 /* time in ms */,
  userId: toB64(t0),
  userName: toB64(t0),
  areaCode: "" /* numéro de département, STRING car "AEFE" etc" */,
  countryCode: "FR",
  combo: 0,
  longestCombo: 0,
  points: 0,
  pointsToday: 0 /* peut-être pas à jour, accéder via getter */,
  nbQuestionsViewed: 0,
  nbQuestionsFailed: 0,
  nbQuestionsSkipped: 0,
  nbQuestionsSuccessful: 0,
  nbQuizStarted: 0,
  nbQuizGameover: 0,
  nbQuizAborted: 0,
  nbQuizFinished: 0,
  nbQuizPerfect: 0,
  nbQuizFinishedToday: 0,
  nbQuizPerfectToday: 0,
  lastActiveTime: 0 /* time in ms  */,
  lastStreak: 0,
  longestStreak: 0,
  lastBoostEndTime: 0 /* time in millisec */,
  lastBoostMultiplier: 1,
};
if (window.localStorage.getItem("user") !== null) {
  console.log("user already exists in storage");
  // on écrase :
  user = JSON.parse(window.localStorage.getItem("user"));
  console.log("User updated");
}

let finishedQuizHistory = []; // historique des quiz finis
if (window.localStorage.getItem("finishedQuizHistory") !== null) {
  console.log("Quiz history exists in storage");
  // on écrase :
  finishedQuizHistory = JSON.parse(
    window.localStorage.getItem("finishedQuizHistory")
  );
  console.log("Quiz history updated");
}

// - - - - - - - - - - - - -
// variables qui devront être synchronisées plus tard :

let statsQuestions = [];

let statsThemes = {}; //quest. vues, réussies, ratées, sautées, double-réussies

// - - - - - - - - - -

function saveToLocalStorage() {
  // à mettre ici et pas dans quiz.js
  // En effet : modifications/enregistrement de user dans la page de profil
  console.log("sauvegarde-> localStorage");
  window.localStorage.setItem("statsQuestions", JSON.stringify(statsQuestions));
  window.localStorage.setItem("statsThemes", JSON.stringify(statsThemes));
  window.localStorage.setItem("user", JSON.stringify(user));
}

function getUserStreak() {
  if (isStreakAlive) {
    return user.lastStreak;
  } else return 0;
}

function isStreakAlive() {
  let today = Math.floor(Date.now() / (24 * 3600 * 1000));
  let lastActiveDay = Math.floor(user.lastActiveTime / (24 * 3600 * 1000));
  if (today - lastActiveDay <= 1) return true;
  else return false;
}

function daysSinceLastActive() {
  let today = Math.floor(Date.now() / (24 * 3600 * 1000));
  let lastActiveDay = Math.floor(user.lastActiveTime / (24 * 3600 * 1000));
  return today - lastActiveDay;
}

function getPointsToday() {
  return daysSinceLastActive() == 0 ? user.pointsToday : 0;
}

function getPerfectsToday() {
  return daysSinceLastActive() == 0 ? user.nbQuizPerfectToday : 0;
}

function getNbFinishedQuizToday() {
  return daysSinceLastActive() == 0 ? user.nbQuizFinishedToday : 0;
}

function removeCircles() {
  document
    .querySelectorAll("svg")
    .forEach((el) => el.classList.remove("circled"));
}

function setState(s) {
  oldState = state;
  state = s;
  window.localStorage.setItem("state", state);
}

function goto(newState) {
  setState(newState);

  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");
  render();
}

//depracated : vérifier si c'est toujours appelé
function gotoChapters() {
  setState("Chapters");
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

  console.log("thème " + themeId + " : stats calculées");
}

function computeAllThemeStats() {
  for (let themeId in statsThemes) {
    console.log("calcul des stats du thèm : " + themeId);
    computeThemeStats(themeId);
  }
}

function gotoTheme(id) {
  removeCircles();
  console.log("appel de gotoTheme avec id " + id);
  computeThemeStats(id);
  setState("Theme");
  theme = structuredClone(themes[id]);
  theme.id = id; // on rajoute l'id sinon il n'est plus là...
  // calculer theme.progress, theme.nbQuestionsSeens, nbQuestionsChecked, theme.nbQuestionsDbChecked
  render();
}

function startQuiz() {
  /* ou gotoQuiz ?*/
  setState("Quiz");
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

function getUserSvgPath(pts) {
  if (user.points > 20000) return "svgPathFasRobot";
  if (user.points > 10000) return "svgPathFasUserAstronaut";
  if (user.points > 5000) return "svgPathFasUserNinja";
  if (user.points > 1000) return "svgPathFasUserGraduate";
  return "svgPathFasUserLarge";
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

  // on rattache les listeners,
  // attention l'élément est crée par un composant et n'existe peut-être pas :
  let userNameInput = document.getElementById("userNameInputId");
  if (userNameInput)
    userNameInput.addEventListener("change", () => {
      user.userName = userNameInput.value;
      saveToLocalStorage();
    });

  let userAreaCodeSelect = document.getElementById("userAreaCodeSelectId");
  if (userAreaCodeSelect)
    userAreaCodeSelect.addEventListener("change", () => {
      user.areaCode = userAreaCodeSelect.value;
      saveToLocalStorage();
    });
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

// - - - - - - - - - - - - - - - - - - -
// - - - - - - O N L O A D   - - - - - -
// - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  // l'appli, les thèmes et chapitres sont loadés.
  // On peut initialiser les stats des thèmes
  // puis synchroniser avec  le storage
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

  /*
  getScript("js/-questions.js", () => {
    console.log("Callback de getScript -questions.js");
    questionsLoaded = true;
    afterQuestionsLoaded();
  });*/

  fetch("questions.json?again=" + Math.random())
    .then((response) => response.json())
    .then((json) => {
      questions = json;
      console.log("Questions loaded from json");
      questionsLoaded = true;
      afterQuestionsLoaded();
    });

  render(); //rendu des points ? Mais il sont pas encore récupérés du storage

  getScript("js/-async-initMathJax.js", () => {
    console.log("Callback de getScript MathJax");
  });
}); // fin du listener sur onLoad

function afterQuestionsLoaded() {
  console.log("Nb de questions téléchargées : " + questions.length);
  // initialisation de statsQuestions par des stats vides
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

function percentage(t) {
  return Math.floor(100 * t);
}
