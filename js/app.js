let t0 = performance.timeOrigin + performance.now();

if (window.localStorage.getItem("firstConnectionDate") !== null) {
} else
  window.localStorage.setItem(
    "firstConnectionDate",
    JSON.stringify(new Date())
  );

const QUIZ_MIN_RESULT = 2; // attention certains quiz peuvent faire moins de 2 questions ?
const QUIZ_MAX_LENGTH = 10;
const QUESTION_MAX_POINTS = 20; //maximum de pts que l'on peut gagner à chaque question

let questionNumber; // int, question courante
let question; // question courante : object
let state = "Loading";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.

let statsQuestions = [];
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
  lastStreak: 2,
  longestStreak: 7,
};

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

const removeCircles = () => {
  document
    .querySelectorAll("i")
    .forEach((el) => el.classList.remove("circled"));
};

const goto = (newState) => {
  oldState = state;
  state = newState;

  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");
  render();
};

const gotoChapters = () => {
  state = "Chapters";
  removeCircles();
  render();
};

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

const gotoTheme = (id) => {
  console.log("appel de gotoTheme avec id " + id);
  state = "theme";
  theme = structuredClone(themes[id]);
  theme.id = id; // on rajoute l'id sinon il n'est plus là...
  // calculer theme.progress, theme.nbQuestionsSeens, nbQuestionsChecked, theme.nbQuestionsDbChecked
  render();
};

function startQuiz() {
  /* ou gotoQuiz ?*/
  state = "Quiz";
  render();
}

const level = (points) => {
  // correspondances points<->niv :
  // 20->niv1, 40->niv2, 80->niv3 etc
  if (points < 20) return 0;
  else return Math.floor(Math.log(points / 10) / Math.log(2));
};

const nextLevelThreshold = (points) => {
  // on retourne la prochaine (puissance de 2 multiplée par 10)
  return 10 * 2 ** (level(points) + 1);
};

const xShow = () => {
  // boucle sur les éléments avec x-show et les affiche conditionnellement à l'argument
  let elements = document.querySelectorAll("[x-show]");
  for (let i = 0; i < elements.length; i++) {
    if (eval(elements[i].attributes["x-show"].value)) {
      elements[i].style.display = "";
    } else {
      elements[i].style.display = "none";
    }
  }
};

const xHtml = () => {
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
};

const render = () => {
  xShow();
  xHtml();
  //MathJax.typeset();// bcp trop lent !
};

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
