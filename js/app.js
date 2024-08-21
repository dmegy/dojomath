let t0 = performance.timeOrigin + performance.now(); // pour les ID
let lastUpdateCheckTime = Date.now();
const SITE_NAME = "DojoMath";
const MIN_QUIZ_RESULT = 2; // result \in [-10,10] attention certains quiz peuvent faire moins de 2 questions ?
const MAX_QUIZ_LENGTH = 10;
const MAX_POINTS_PER_QUESTION = 5; //maximum de pts que l'on peut gagner à chaque question
const BOOST_PROBABILITY = 0.1; // proba de looter un boost à la fin d'un quiz
const BOOST_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const LOCK_LIMIT = 5; // limite au delà de la quelle on bloque temporairement un thème
const NB_QUESTIONS = 2670; // pour la validation des quiz custom.
const SECRET_REFERRAL_CODE = 42000000000;
const REFERRAL_BONUS = 50; // cadeau si arrivée par parrainage
const QUESTION_SEPARATOR = ","; // pour les custom quiz
const HAPPY_HOUR_LIST = [
  [6, 8],
  [12, 14],
  [18, 20],
]; // pour les points doublés :

// - - - - - FAUSSE CONSTANTES, pouvant être changées par exemple dans la console.
let UPDATE_TIME = 1000 * 3600 * 24; // nb de millisec pour check updates et  essayer de refresh si online
let SHOW_HIDDEN_THEMES = false;
let SHOW_HIDDEN_CHAPTERS = false;

// - - - -
let custom = false; //sera mis à true par le router si c'est un quiz custom. Controle certains affichages custom
let questions = []; // Pour json. Commenter si questions loadées depuis js.
let questionNumber; // int, question courante
let question; // question courante : object
let oldState = undefined;

let user = {
  referrerId: "",
  firstConnectionTime: t0 /* time in ms */,
  userId: toB64(t0),
  userName: toB64(t0),
  instructorAssignedId: "",
  areaCode: "" /* numéro de département, STRING car "AEFE" etc" */,
  countryCode: "",
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
  lastRenderTime: Date.now(),
  lastActiveTime: 0 /* time in ms  */,
  lastStreak: 0,
  longestStreak: 0,
  lastBoostEndTime: 0 /* time in millisec */,
  lastBoostMultiplier: 1,
  lastMessageSendTime: 0,
  lastMessageCheckTime: 0,
};

let receivedMessages = [];

let state = "Loading";
// les states ont "Loading", "Home", "Settings", "Statistics", "Chapters", "Theme", "Quiz" et "End"
let sectionLabels = {
  Loading: SITE_NAME + ".fr",
  Home: SITE_NAME + ".fr",
  Profile: "Profil",
  Statistics: "Progression",
  Highscores: "Highscores",
  Chapters: "Chapitres",
  Theme: "",
  Quiz: "",
  End: "Partie terminée!",
  Gameover: "",
};
let sectionIcons = {
  Loading: SITE_NAME + ".fr",
  Home: "svgPathFasHouse",
  Profile: "svgPathFasUserLarge",
  Statistics: "svgPathFasChartLine",
  Highscores: "svgPathFasTrophy",
  Chapters: "svgPathFasDumbbell",
  Theme: "",
  Quiz: "",
  End: "svgPathFasFlagCheckered",
  Gameover: "",
};
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.
let quiz = {}; // quiz courant

// historique et stats :
let pointsDiffHistory = [];
let finishedQuizzesHistory = [];
let statsQuestions = [];
let statsThemes = {}; //quest. vues, réussies, ratées, sautées, double-réussies

// objets pour les données difficiles à merger à partir du localstorage
let loadedUser = {};
let loadedStatsQuestions = {};
let loadedStatsThemes = {};

// - - - - - - - - - - - - - - - - - - - - - - - -
//  - - - - - - - -  / FIN DECLARATION VARIABLES
// - - - - - - - - - - - - - - - - - - - - - - - -

function resetUser() {
  localStorage.clear();
  window.location.reload();
}

function isUserNew() {
  return Object.keys(loadedUser).length === 0;
}

// - - - - - - - - - - - - - - - - - - -
// - - - - - REFERRAL - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -

function referralCodeToId(s) {
  return toB64(fromB64(s) - SECRET_REFERRAL_CODE);
}

function getReferralCode() {
  return toB64(user.firstConnectionTime + SECRET_REFERRAL_CODE);
}

function getReferralLink() {
  return "https://www.dojomath.fr/?code=" + getReferralCode();
  //
}

function copyReferralLinkToClipBoard() {
  navigator.clipboard.writeText(getReferralLink());
  toast("Lien copié");
}

// - - - - - - - - - - - - - - - - - - -
// - - - - - NAVIGATION - - - - - - - - -
// - - - - - - - - - - - - - - - - - - -

function removeCircles() {
  document
    .querySelectorAll("svg")
    .forEach((el) => el.classList.remove("circled"));
}

function isUserTrusted() {
  // check rudimentaire :  points == somme des points gagnés
  let sum = pointsDiffHistory.reduce((acc, el) => acc + el, 0);
  return user.points == sum;
}

function adjustPoints() {
  user.points = pointsDiffHistory.reduce((acc, el) => acc + el, 0);
}

// - - - - - - - - - - - - - - - - - - -

function computeAllThemeStats() {
  // inutilisé ?
  console.log("compute all theme stats");
  for (let themeId in statsThemes) {
    computeThemeStats(themeId);
  }
}

function computeThemeStats(themeId) {
  console.log("calcul des stats du thème " + themeId);
  // attention confusion possible
  // cette fonction ne calcule pas, par exemple, toute l'activité sur un thème
  statsThemes[themeId].questionsAlreadySeen = 0;
  statsThemes[themeId].questionsSuccessfulLastTime = 0;
  statsThemes[themeId].questionsSuccessfulLastTwoTimes = 0;
  themes[themeId].questions.forEach((n) => {
    if (statsQuestions[n].viewed > 0)
      statsThemes[themeId].questionsAlreadySeen++;
    if (statsQuestions[n].successfulLastTime)
      statsThemes[themeId].questionsSuccessfulLastTime++;
    if (statsQuestions[n].successfulLastTwoTimes)
      statsThemes[themeId].questionsSuccessfulLastTwoTimes++;
  });

  console.log("thème " + themeId + " : stats calculées");
}

// - - - - - - - - - - - - -
// fonctions de récupération infos (pour affichage)
// - - - - - - - - - - - -

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

function getNbFinishedQuizzesToday() {
  return daysSinceLastActive() == 0 ? user.nbQuizFinishedToday : 0;
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

function percentage(t) {
  // input : 1<= t <=1, output : integer 0<=p<=100
  if (t < 0 || t > 1) throw new Error();
  return Math.floor(100 * t);
}

function getUserSvgPath(pts) {
  if (user.points > 20000) return "svgPathFasRobot";
  if (user.points > 10000) return "svgPathFasUserAstronaut";
  if (user.points > 5000) return "svgPathFasUserNinja";
  if (user.points > 1000) return "svgPathFasUserGraduate";
  return "svgPathFasUserLarge";
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - Mini-Alpine :-) & RENDER - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - -

function xShow() {
  // boucle sur les éléments avec argument 'x-show'
  // et les affiche conditionnellement à la valeur évaluée de l'argument
  document.querySelectorAll("[x-show]").forEach((element) => {
    if (eval(element.attributes["x-show"].value)) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}

function xHtml() {
  document.querySelectorAll("[x-html]").forEach((element) => {
    if (element.offsetParent === null) {
      // seule méthode trouvée pour vérifier la visibilité
      return;
    }
    let content = eval(element.attributes["x-html"].value);
    element.innerHTML = content;
  });
}

// éventuellement coder le x-for pour le composant de références de thèmes, avec liste de liens à afficher...

function render() {
  // pas que render... updates etc...
  checkForUpdates(); // virer, gérer avec events
  adjustPoints(); // vérification rudimentaire des points et correction systématique
  xShow();
  xHtml();
  user.lastRenderTime = Date.now();
  window.dispatchEvent(new Event("render"));
}

// - - - - - - - -- BASE 64 - - - - - - - -

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

function isB64(string) {
  if (string.length == 0) return false;

  let digit =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
  for (let i = 0; i < string.length; i++) {
    if (!digit.includes(string[i])) return false;
  }
  return true;
}

// - - - - - -  STORAGE - - - - - - - -

function saveToLocalStorage() {
  adjustPoints();
  // à mettre dans app.js et pas dans quiz.js
  // En effet : modifications/enregistrement de user dans la page de profil
  try {
    window.localStorage.setItem(
      "statsQuestions",
      JSON.stringify(statsQuestions)
    );
    window.localStorage.setItem("statsThemes", JSON.stringify(statsThemes));
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem(
      "receivedMessages",
      JSON.stringify(receivedMessages)
    );
    window.localStorage.setItem(
      "pointsDiffHistory",
      JSON.stringify(pointsDiffHistory)
    );
    window.localStorage.setItem(
      "finishedQuizzesHistory",
      JSON.stringify(finishedQuizzesHistory)
    );
  } catch (e) {
    console.log("localStorage disabled : could not save data");
  }
}

function loadDataFromStorage() {
  // on va loader :
  // user, receivedMessages, finishedQuizHistory, pointsDiffHistory, statsThemes,statsQuestions
  // cette fonction va être executée juste après la définition des fonctions, avant les event onLoad etc.
  try {
    if (window.localStorage.getItem("user") !== null) {
      console.log("user already exists in storage");
      // on écrase, à partir de ce qu'il y a dans le storage, attention.
      loadedUser = JSON.parse(window.localStorage.getItem("user"));
      for (let key in loadedUser) {
        user[key] = loadedUser[key];
      }
      console.log("User updated");
    }

    // messages
    if (window.localStorage.getItem("receivedMessages") !== null) {
      receivedMessages = JSON.parse(
        window.localStorage.getItem("receivedMessages")
      );
    }

    if (window.localStorage.getItem("finishedQuizzesHistory") !== null) {
      console.log("Quiz history exists in storage");
      // on écrase :
      finishedQuizzesHistory = JSON.parse(
        window.localStorage.getItem("finishedQuizzesHistory")
      );
      console.log("Quiz history updated");
    }

    if (window.localStorage.getItem("pointsDiffHistory") !== null) {
      console.log("Points history exists in storage");
      // on écrase :
      pointsDiffHistory = JSON.parse(
        window.localStorage.getItem("pointsDiffHistory")
      );
      console.log("Points history updated");
    }

    if (user.points > 0 && pointsDiffHistory.length == 0) {
      // initialisation en cas de nouvelle version de l'appli
      pointsDiffHistory.push(user.points);
    }

    if (window.localStorage.getItem("statsThemes") !== null) {
      loadedStatsThemes = JSON.parse(
        window.localStorage.getItem("statsThemes")
      );
      console.log(
        Object.keys(loadedStatsThemes).length +
          " themes have data in storage. Loaded in temporary object."
      );
    }
    // la synchronisation aura lieu plus tard, une fois que les thèmes seront chargés.

    // UPDATE STATS QUESTIONS attention les questions ne sont pas encore chargées ?
    if (window.localStorage.getItem("statsQuestions") !== null) {
      loadedStatsQuestions = JSON.parse(
        window.localStorage.getItem("statsQuestions")
      );
      console.log(
        loadedStatsQuestions.length +
          " questions have data in storage. Loaded in temporary object."
      );
    }
  } catch (e) {
    alert(
      "Il semble que les cookies soient désactivés.\n Ce site a besoin des cookies pour fonctionner correctement, pour stocker temporairement les résultats aux questions, les points gagnés etc.\n Sans cookies, toutes les données sont perdues à chaque rechargement de la page ou perte de connexion."
    );
    console.log("Localstorage disabled : could not load user data.");
  }
}

function processCode() {
  if (!isUserNew()) return; // joueur déjà existant car loadé du storage

  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  if (!urlParams.has("code")) return;

  let code = urlParams.get("code");
  if (!isB64(code)) return;

  let x = fromB64(code);
  if (
    x < new Date("2024-07-01").getTime() ||
    x > new Date("2030-01-01").getTime()
  )
    return;
  user.referrerId = toB64(x - SECRET_REFERRAL_CODE);
  userPoints = REFERRAL_BONUS;
  pointsDiffHistory.push(REFERRAL_BONUS);
  saveToLocalStorage();
  // bug bizarre notifs ne disparaissent pas si on les affiche trop vite après le démarrage
  window.setTimeout(
    notification,
    3000,
    "Cadeau de parrainage !\nTu gagnes " +
      REFERRAL_BONUS +
      " points.\n Ton parrain ou ta marraine en gagnera autant\n après ta première partie."
  );
}

function toast(message, color) {
  Toastify({
    text: message,
    duration: 1000,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "2rem",
      background: color,
      "text-align": "center",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function notification(message, color) {
  if (!message) return;
  if (!color) color = "oklch(70% 90% var(--hue-accent))";
  var toast = Toastify({
    text: message,
    duration: 4500,
    destination: "",
    newWindow: true,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      "border-radius": "2rem",
      background: color,
      "text-align": "center",
    },
    onClick: function () {
      toast.hideToast();
    },
  });
  toast.showToast();
}

// - - - - -  FIN FONCTIONS - - - - - -

// - - - - - execution :

loadDataFromStorage();

processCode(); // *après loadFromStorage* : codes promos ou referrer

window.addEventListener("render", () => {
  // on rattache les listeners sur les champs ,
  // attention l'élément est crée par un composant et n'existe peut-être pas :
  let userNameInput = document.getElementById("userNameInputId");
  if (userNameInput)
    userNameInput.addEventListener("change", () => {
      user.userName = userNameInput.value;
      saveToLocalStorage();
      notification("Pseudo sauvegardé.");
    });

  let userAreaCodeSelect = document.getElementById("userAreaCodeSelectId");
  if (userAreaCodeSelect)
    userAreaCodeSelect.addEventListener("change", () => {
      user.areaCode = userAreaCodeSelect.value;
      saveToLocalStorage();
      notification("Département sauvegardé.");
    });
});
