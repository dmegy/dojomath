let t0 = performance.timeOrigin + performance.now();
console.log("Bienvenue ! ");

const MIN_QUIZ_RESULT = 1; // attention certains quiz peuvent faire moins de 2 questions ?
const MAX_ERRORS_ALLOWED = 5; // inutilisé, on utilisé la constante précédente
// (le but est d'empecher de cliquer sur 'passer' et que ça compte comme un quiz fini)
const MAX_QUIZ_LENGTH = 10;
const MAX_POINTS_QUESTION = 20; //maximum de pts que l'on peut gagner à chaque question
const BOOST_PROBABILITY = 0.2;

let questionNumber; // int, question courante
let question; // question courante : object
let state = "Loading";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.
let quiz = {}; // quiz courant

let user = {
  firstConnection: t0,
  userId: toB64(t0),
  userName: toB64(t0),
  areaCode: "54" /* numéro de département */,
  countryCode: "FR",
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
  lastActive: 0 /* time in ms  */,
  lastStreak: 0,
  longestStreak: 0,
  lastBoostEnd: 0 /* date in millisec */,
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
  let today = Math.floor(new Date().getTime() / (24 * 3600));
  let lastActiveDay = Math.floor(
    new Date(user.lastActive).getTime() / (24 * 3600)
  );
  if (today - lastActiveDay <= 1) return true;
  else return false;
}

function updateUserStreakAndLastActive() {
  /* appelée lorsqu'un quiz est fini */
  // ceci doit être fait avant d'updater user.lastActive bien sûr
  let today = Math.floor(new Date().getTime() / (24 * 3600));
  let lastActiveDay = Math.floor(
    new Date(user.lastActive).getTime() / (24 * 3600)
  );
  let delta = today - lastActiveDay;
  if (delta == 1 || user.lastStreak == 0) {
    user.lastStreak++;
    notification(
      "🔥STREAK🔥\n Un jour d'affilée de plus !",
      "oklch(70% 90% var(--hue-accent))"
    );
  } else if (delta > 1) {
    user.lastStreak = 1;
  }
  user.lastActive = Date.now();
  user.longestStreak = Math.max(user.longestStreak, user.lastStreak);
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
  state = "Theme";
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
  document.getElementById("refreshHighscoresButton").classList.add("rotating");
  fetch("static/highscores.html.txt?again=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("highscores").innerHTML = data;
      document
        .getElementById("refreshHighscoresButton")
        .classList.remove("rotating");
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

window.addEventListener("DOMContentLoaded", () => {
  getHighscores(); // fetch un fichier texte et inneHTML dans le div, qui doit donc exister
});

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
  // passage du state de Loading à Home
  state = "Home";
  getScript("js/-initMathJax.js", () => {
    console.log("Callback de getScript -initMathjax.js");
  });
  getScript("js/-questions.js", () => {
    console.log("callback de getScript -questions.js");
    questionsLoaded = true;
    afterQuestionsLoaded();
  });
  render(); //rendu des points ? Mais il sont pas encore récupérés du storage
});

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

/*
fetch("questions.json?again=" + Math.random())
  .then((response) => response.json())
  .then((json) => {
    questions = json;
    console.log(questions[3]);
  });
*/
