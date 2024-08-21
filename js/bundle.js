 
/**
 * Minified by jsDelivr using Terser v5.14.1.
 * Original file: /npm/toastify-js@1.12.0/src/toastify.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
!function(t,o){"object"==typeof module&&module.exports?module.exports=o():t.Toastify=o()}(this,(function(t){var o=function(t){return new o.lib.init(t)};function i(t,o){return o.offset[t]?isNaN(o.offset[t])?o.offset[t]:o.offset[t]+"px":"0px"}function s(t,o){return!(!t||"string"!=typeof o)&&!!(t.className&&t.className.trim().split(/\s+/gi).indexOf(o)>-1)}return o.defaults={oldestFirst:!0,text:"Toastify is awesome!",node:void 0,duration:3e3,selector:void 0,callback:function(){},destination:void 0,newWindow:!1,close:!1,gravity:"toastify-top",positionLeft:!1,position:"",backgroundColor:"",avatar:"",className:"",stopOnFocus:!0,onClick:function(){},offset:{x:0,y:0},escapeMarkup:!0,ariaLive:"polite",style:{background:""}},o.lib=o.prototype={toastify:"1.12.0",constructor:o,init:function(t){return t||(t={}),this.options={},this.toastElement=null,this.options.text=t.text||o.defaults.text,this.options.node=t.node||o.defaults.node,this.options.duration=0===t.duration?0:t.duration||o.defaults.duration,this.options.selector=t.selector||o.defaults.selector,this.options.callback=t.callback||o.defaults.callback,this.options.destination=t.destination||o.defaults.destination,this.options.newWindow=t.newWindow||o.defaults.newWindow,this.options.close=t.close||o.defaults.close,this.options.gravity="bottom"===t.gravity?"toastify-bottom":o.defaults.gravity,this.options.positionLeft=t.positionLeft||o.defaults.positionLeft,this.options.position=t.position||o.defaults.position,this.options.backgroundColor=t.backgroundColor||o.defaults.backgroundColor,this.options.avatar=t.avatar||o.defaults.avatar,this.options.className=t.className||o.defaults.className,this.options.stopOnFocus=void 0===t.stopOnFocus?o.defaults.stopOnFocus:t.stopOnFocus,this.options.onClick=t.onClick||o.defaults.onClick,this.options.offset=t.offset||o.defaults.offset,this.options.escapeMarkup=void 0!==t.escapeMarkup?t.escapeMarkup:o.defaults.escapeMarkup,this.options.ariaLive=t.ariaLive||o.defaults.ariaLive,this.options.style=t.style||o.defaults.style,t.backgroundColor&&(this.options.style.background=t.backgroundColor),this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");for(var o in t.className="toastify on "+this.options.className,this.options.position?t.className+=" toastify-"+this.options.position:!0===this.options.positionLeft?(t.className+=" toastify-left",console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.")):t.className+=" toastify-right",t.className+=" "+this.options.gravity,this.options.backgroundColor&&console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'),this.options.style)t.style[o]=this.options.style[o];if(this.options.ariaLive&&t.setAttribute("aria-live",this.options.ariaLive),this.options.node&&this.options.node.nodeType===Node.ELEMENT_NODE)t.appendChild(this.options.node);else if(this.options.escapeMarkup?t.innerText=this.options.text:t.innerHTML=this.options.text,""!==this.options.avatar){var s=document.createElement("img");s.src=this.options.avatar,s.className="toastify-avatar","left"==this.options.position||!0===this.options.positionLeft?t.appendChild(s):t.insertAdjacentElement("afterbegin",s)}if(!0===this.options.close){var e=document.createElement("button");e.type="button",e.setAttribute("aria-label","Close"),e.className="toast-close",e.innerHTML="&#10006;",e.addEventListener("click",function(t){t.stopPropagation(),this.removeElement(this.toastElement),window.clearTimeout(this.toastElement.timeOutValue)}.bind(this));var n=window.innerWidth>0?window.innerWidth:screen.width;("left"==this.options.position||!0===this.options.positionLeft)&&n>360?t.insertAdjacentElement("afterbegin",e):t.appendChild(e)}if(this.options.stopOnFocus&&this.options.duration>0){var a=this;t.addEventListener("mouseover",(function(o){window.clearTimeout(t.timeOutValue)})),t.addEventListener("mouseleave",(function(){t.timeOutValue=window.setTimeout((function(){a.removeElement(t)}),a.options.duration)}))}if(void 0!==this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),!0===this.options.newWindow?window.open(this.options.destination,"_blank"):window.location=this.options.destination}.bind(this)),"function"==typeof this.options.onClick&&void 0===this.options.destination&&t.addEventListener("click",function(t){t.stopPropagation(),this.options.onClick()}.bind(this)),"object"==typeof this.options.offset){var l=i("x",this.options),r=i("y",this.options),p="left"==this.options.position?l:"-"+l,d="toastify-top"==this.options.gravity?r:"-"+r;t.style.transform="translate("+p+","+d+")"}return t},showToast:function(){var t;if(this.toastElement=this.buildToast(),!(t="string"==typeof this.options.selector?document.getElementById(this.options.selector):this.options.selector instanceof HTMLElement||"undefined"!=typeof ShadowRoot&&this.options.selector instanceof ShadowRoot?this.options.selector:document.body))throw"Root element is not defined";var i=o.defaults.oldestFirst?t.firstChild:t.lastChild;return t.insertBefore(this.toastElement,i),o.reposition(),this.options.duration>0&&(this.toastElement.timeOutValue=window.setTimeout(function(){this.removeElement(this.toastElement)}.bind(this),this.options.duration)),this},hideToast:function(){this.toastElement.timeOutValue&&clearTimeout(this.toastElement.timeOutValue),this.removeElement(this.toastElement)},removeElement:function(t){t.className=t.className.replace(" on",""),window.setTimeout(function(){this.options.node&&this.options.node.parentNode&&this.options.node.parentNode.removeChild(this.options.node),t.parentNode&&t.parentNode.removeChild(t),this.options.callback.call(t),o.reposition()}.bind(this),400)}},o.reposition=function(){for(var t,o={top:15,bottom:15},i={top:15,bottom:15},e={top:15,bottom:15},n=document.getElementsByClassName("toastify"),a=0;a<n.length;a++){t=!0===s(n[a],"toastify-top")?"toastify-top":"toastify-bottom";var l=n[a].offsetHeight;t=t.substr(9,t.length-1);(window.innerWidth>0?window.innerWidth:screen.width)<=360?(n[a].style[t]=e[t]+"px",e[t]+=l+15):!0===s(n[a],"toastify-left")?(n[a].style[t]=o[t]+"px",o[t]+=l+15):(n[a].style[t]=i[t]+"px",i[t]+=l+15)}return this},o.lib.init.prototype=o.lib,o}));
//# sourceMappingURL=/sm/e1ebbfe1bf0b0061f0726ebc83434e1c2f8308e6354c415fd05ecccdaad47617.map
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

const URL_POST_FINISHED_QUIZ = "backend/post_finished_quiz.php";
const URL_PATCH_QUESTION = "backend/patch_question.php";
const URL_LIST_BEST_PLAYERS = "backend/list_best_players.html";
const URL_LIST_RECENT_PLAYERS = "backend/list_recent_players.html";
const URL_LIST_RECENT_GAMES = "backend/list_recent_games.html";
const URL_POST_QUESTION_FEEDBACK = "backend/post_question_feedback.php";
const URL_GET_AND_RESET_BONUS = "backend/get_and_reset_bonus.php";

function postFinishedQuiz() {
  adjustPoints();

  let requestBody = {
    user: JSON.stringify(user),
    quiz: JSON.stringify(quiz),
  };

  fetch(URL_POST_FINISHED_QUIZ, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}

window.addEventListener("load", () => {
  getHighscores(); // fetch un fichier texte et inneHTML dans le div, qui doit donc exister
});

function getHighscores() {
  getBestPlayers();
  getRecentPlayers();
  getRecentGames();
}

function getBestPlayers() {
  if (!window.navigator.onLine) {
    console.log("getBestPlayers : navigator offline");
    return;
  }
  console.log("Downloading Best Players (alltime)");
  document.getElementById("loadingListBestPlayers").style.opacity = "20%";
  fetch(URL_LIST_BEST_PLAYERS + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listBestPlayers").innerHTML = data;
      document.getElementById("loadingListBestPlayers").style.opacity = "100%";

      console.log("Best players  : ok");
    })
    .catch((e) => {
      console.log("Error while fetching best players : " + e);
    });
}

// deprecated, not used anymore (check!)
function getRecentPlayers() {
  if (!window.navigator.onLine) {
    console.log("getRecentPlayers : navigator offline");
    return;
  }
  console.log("Fetching Recent Players");
  document.getElementById("loadingListRecentPlayers").style.opacity = "20%";
  fetch(URL_LIST_RECENT_PLAYERS + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listRecentPlayers").innerHTML = data;
      document.getElementById("loadingListRecentPlayers").style.opacity =
        "100%";
      console.log("Recent players : ok");
    })
    .catch((e) => {
      console.log("Error while fetching recent players : " + e);
    });
}

function getRecentGames() {
  console.log("Fetching Recent Games");
  document.getElementById("loadingListRecentGames").style.opacity = "50%";
  fetch(URL_LIST_RECENT_GAMES + "?unique=" + Math.random())
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("listRecentGames").innerHTML = data;
      document.getElementById("loadingListRecentGames").style.opacity = "100%";
      console.log("Recent score : ok");
    })
    .catch((e) => {
      console.log("Error while fetching recent games : " + e);
    });
}

function sendFeedback(questionNumber, feedbackType) {
  console.log("Send feedback : " + questionNumber + ", " + feedbackType);
  statsQuestions[questionNumber].feedbackSent = true;

  document.getElementById("feedbackDiv" + questionNumber).innerHTML =
    "Feedback envoyé, merci !";

  let requestBody = {
    userId: user.userId,
    userName: user.userName,
    questionNumber: questionNumber,
    feedbackType: feedbackType,
  };

  console.log("Envoi du feedback au serveur");
  fetch(URL_POST_QUESTION_FEEDBACK, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}

function sendQuestionResult() {
  let requestBody = {
    userId: user.userId,
    userName: user.userName,
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  };

  console.log("Envoi du résultat de la question au serveur");
  fetch(URL_PATCH_QUESTION, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).catch((error) => {
    console.log(error);
  });
}

function getAndResetBonus() {
  if (!window.navigator.onLine) return;

  let requestBody = {
    user: JSON.stringify(user),
  };

  fetch(URL_GET_AND_RESET_BONUS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((responseObj) => {
      if (responseObj.status != "success") return;

      let bonusAmount = Number(responseObj.bonusAmount);
      let bonusMessage = responseObj.bonusMessage;

      if (bonusAmount == 0 || bonusAmount === NaN) {
        return;
      }

      // END GUARD

      pointsDiffHistory.push(bonusAmount);
      user.points += bonusAmount;
      saveToLocalStorage();
      render();
      // après le render sinon problème de notif :
      let notifText = `${bonusMessage}\n+${bonusAmount} pts !`;
      notification(notifText, "oklch(70% 90% var(--hue-accent))");
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("stateChange", (e) => {
  let s = e.detail.newState;
  if (s == "Home" || s == "Highscores" || s == "Statistics" || s == "Profile") {
    getAndResetBonus();
  }
});

// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - C H A P I T R E S - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -

let chapters = [
  {
    name: "Histoire des maths",
    themes: [
      { label: "Éléments", id: "elements_euclide" },
      { label: "Antiquité", id: "comparaisons_antiquite" },
      { label: "Pré-XVII<sup>e</sup>", id: "comparaisons_pre_XVIIe" },
      { label: "XVII<sup>e</sup>/XVIII<sup>e</sup>", id: "comparaisons_XVIIe_XVIIIe" },
      { label: "Sophie Germain", id: "sophie_germain" },
    ],
  },
  {
    name: "Calcul mental",
    themes: [
      { label: "Additions", id: "additions_2chiffres" },
      { label: "Tables", id: "tables1" },
      { label: "Multiplications d'additions", id: "tables_parentheses1" },
      { label: "Additions de multiplications", id: "additions_tables" },
      { label: "Mult. à 2 chiffres", id: "multiplication1" },
      { label: "Tables et logique", id: "tables_logique1" },
    ],
  },
  {
    name: "Géométrie",
    themes: [
      { label: "Quadrilatères", id: "quadrilateres" },
      { label: "Symétries", id: "symetries" },
    ],
  },
  {
    name: "Trigonométrie",
    themes: [
      { label: "Cosinus", id: "valeurs_cosinus" },
      { label: "Comparaisons de cos", id: "comparaisons_cosinus" },
    ],
  },
  {
    name: "Combinatoire",
    themes: [
      { label: "Permutations", id: "permutations1" },
      { label: "...avec conditions", id: "permutations_conditions" },
      { label: "Anagrammes", id: "anagrammes1" },
      { label: "Plus d'anagrammes", id: "anagrammes2" },
    ],
  },
  {
    name: "Calcul littéral",
    themes: [
      { label: "Fractions", id: "fractions1" },
      { label: "Un symbole", id: "calcul_litt1" },
      { label: "Deux symboles", id: "calcul_litt2" },
      { label: "Factorisat°", id: "facto1" },
      { label: "Plus calculatoire", id: "calcul_litt3" },
      { label: "Discriminants", id: "discriminants1" },
    ],
  },
  {
    name: "Racine carrée",
    themes: [
      { label: "Simplifications", id: "sqrt1" },
      { label: "Avec produits", id: "sqrt2" },
      { label: "Avec quotients", id: "sqrt3" },
    ],
  },
  {
    name: "Introduction aux fonctions",
    themes: [{ label: "Fonctions affines", id: "fonctions_affines" }],
  },
  {
    name: "Domaines de définition",
    themes: [
      { label: "Divisions", id: "domaines_zero" },
      { label: "Racines carrées", id: "domaines_sqrt" },
      { label: "Logarithmes", id: "domaines_log" },
      { label: "Rédaction", id: "domaines_red" },
    ],
  },
  {
    name: "Suites arithmétiques",
    themes: [
      { label: "Généralités", id: "suites_arithmetiques" },
      { label: "Variations", id: "suites_arithmetiques_variations" },
      { label: "Sommes", id: "sommes_arithmetiques" },
    ],
  },
  {
    name: "Analyse",
    themes: [
      { label: "Analyse 1", id: "analyse1" },
      { label: "Dérivées 1", id: "derivees1" },
      { label: "Dérivées 2", id: "derivees2" },
      { label: "Valeur absolue", id: "abs1" },
      { label: "Équations 1", id: "equations1" },
      { label: "Équations 2", id: "inegalites1" },
      { label: "Recap", id: "recap1" },
    ],
  },
  {
    name: "Nombres complexes",
    themes: [
      { label: "Multiplications", id: "complexes_mult" },
      { label: "Arguments classiques", id: "complexes_arg" },
      { label: "Module", id: "complexes_mod" },
      { label: "Géométrie", id: "complexes_geo" },
      { label: "𝕌 et 𝕌<sub>n</sub>", id: "complexes_mod1" },
    ],
  },
  {
    name: "Trigonométrie",
    themes: [
      { label: "Valeurs classiques", id: "trigo_valeurs" },
      { label: "Formules", id: "trigo_formules1" },
      { label: "Tangente", id: "trigo_tan" },
      { label: "Congruences", id: "trigo_congruences" },
    ],
  },
  {
    name: "Géométrie plane",
    themes: [
      { label: "Isométries, 1", id: "isometries_planes1" },
      { label: "Rotations", id: "rotations_planes1" },
      { label: "Systèmes 2x2", id: "systemes1" },
      { label: "Droites", id: "droites1" },
    ],
  },
  {
    name: "Logique, quantificateurs",
    themes: [
      { label: "Implication", id: "implication" },
      { label: "∃ ∀", id: "quantificateurs1" },
      { label: "Prédicats", id: "predicats" },
    ],
  },
  {
    name: "Relations binaires",
    themes: [
      { label: "Relations d'équivalence", id: "relations_equiv" },
      { label: "Relations d'ordre", id: "relations_ordre" },
    ],
  },
  {
    name: "Arithmétique",
    themes: [
      { label: "Arithmétique 1", id: "arithmetique1" },
      { label: "Arithmétique de ℤ", id: "arithmetique_Z" },
    ],
  },
  {
    name: "Algèbre linéaire",
    themes: [
      { label: "Espaces vectoriels", id: "ev1" },
      { label: "Applications linéaires", id: "app_lin1" },
      { label: "Matrices", id: "matrices1" },
      { label: "Dimension finie", id: "dim_finie" },
    ],
  },
  {
    name: "Suites et séries",
    themes: [
      { label: "Analyse asymptotique", id: "analyse_asymptotique1" },
      { label: "Suites et limites", id: "suites1" },
      { label: "Séries (pratique)", id: "series1" },
      { label: "Séries (théorie)", id: "series_theorie" },
    ],
  },
  {
    name: "Continuité et dérivabilité",
    themes: [
      { label: "Continuité", id: "continuite1" },
      { label: "Dérivabilité", id: "derivabilite1" },
    ],
  },
  {
    isHidden: true,
    name: "Probabilités",
    themes: [
      {
        isHidden: true,
        label: "Esp. probabilisés finis",
        id: "espaces_probabilises_finis",
      },
      { label: "Var. aléatoires finies", id: "variables_aleatoires_finies" },
    ],
  },
  {
    name: "Algèbre",
    themes: [
      { label: "Groupes", id: "groupes" },
      { label: "...agissant sur des ensembles", id: "groupes_operant" },
      { label: "...abéliens finis", id: "groupes_ab_finis" },
      { label: "...simples", id: "groupes_simples" },
      { label: "Gpe symétrique", id: "groupes_symetriques" },
      { label: "Signature", id: "signature" },
      { label: "Anneaux", id: "anneaux" },
      { label: "...intègres", id: "anneaux_integres" },
      { label: "...factoriels", id: "anneaux_factoriels" },
      { label: "...principaux", id: "anneaux_principaux" },
      { label: "...euclidiens", id: "anneaux_euclidiens" },
      { label: "Corps", id: "corps" },
    ],
  },
  {
    name: "Analyse complexe",
    themes: [
      { label: "Holomorphie", id: "holomorphie" },
      { label: "∂ et ∂̅", id: "wirtinger" },
      { label: "𝒪(U)", id: "anneau_holomorphes" },
      { label: "Harmonicité", id: "fct_harmoniques" },
    ],
  },
];

// pour l'écran des thèmes et chapitres :

function htmlChapters() {
  let s = "";
  for (let i = 0; i < chapters.length; i++) {
    if (chapters[i].isHidden && !SHOW_HIDDEN_CHAPTERS) continue;

    s += `<details open>
			<summary>${chapters[i].name}</summary>
			<div id='chapter_${i}'>`;
    for (let j = 0; j < chapters[i].themes.length; j++) {
      if (chapters[i]["themes"][j].isHidden && !SHOW_HIDDEN_THEMES) continue;
      s += htmlButtonTheme(i, j);
    }
    s += `</div></details>`;
  }
  return s;
}
function htmlButtonTheme(i, j) {
  let label = chapters[i]["themes"][j].label;
  let id = chapters[i]["themes"][j].id;

  computeThemeStats(id);

  return `
		<div style="
                background-color: var(--c-secondary-40);
                text-align: center;" 
			class="btn btn-small ${statsThemes[id].isLocked ? "btn-disabled" : ""}" 
			id="boutonTheme_${i}_${j}" 
			onclick="gotoTheme('${id}')">
			<div style="
            opacity:50%;
		        background:var(--c-secondary-70);
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: ${Math.ceil((100 * statsThemes[id].questionsSuccessfulLastTime) / themes[id].questions.length)}%;">
            </div>
      <div style="
            opacity:20%;
		        background:white;
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: ${Math.ceil((100 * statsThemes[id].questionsSuccessfulLastTwoTimes) / themes[id].questions.length)}%;">
            </div>
			<div style="position:relative;">${label}</div>
		</div>
	`;
}

function htmlThemeReferences() {
  // composant car boucle for dedans...
  let s = "";
  let list = theme.links; // le thème courant : passer en paramètre ?
  if (list == undefined) return s;
  s += "Si besoin, ressources externes:<ul>";
  for (let i = 0; i < list.length; i++) {
    s += `<li><a target="_blank" href="${list[i].URL}">${list[i].title}</a></li>`;
  }
  s += "</ul>";
  return s;
}

// pour l'écran des stats utilisateur : barres de progression etc

function htmlProfile() {
  return "";
}

function htmlProgress(a, b) {
  // retourne un div html avec une barre de progression
  if (a > b) a = b; // on tronque
  let p = 0;
  if (b != 0) p = a / b;
  return `<div class='progress-bar-container'>
				<div style='width:${100 * p}% ;' class='progress-bar'></div>
			</div>`;
}

function htmlMultipleProgress(numbers, colorsCSSvarnames) {
  // input : deux tableaux de même taille
  //retourne une barre de stats de type cumulative avec les valeurs et couleurs fournies
  if (numbers.length != colorsCSSvarnames.length) throw Error;
  let sum = numbers.reduce((partialSum, k) => partialSum + k, 0);
  let percentages = numbers.map((x) => {
    return 0;
  }); // initialisation d'un tableau de même longueur et rempli de zéros.
  if (sum != 0)
    percentages = numbers.map((x) => {
      return (100 * x) / sum;
    });
  let s = "<div class='progress-bar-container'>";
  for (let i = 0; i < numbers.length; i++) {
    s += `<div style='width:${percentages[i]}%;background-color:var(${colorsCSSvarnames[i]})'></div>`;
  }
  s += "</div>";
  return s;
}

function htmlCheckbox(bool) {
  if (bool) {
    return "✔";
    //return `<svg class="svg-icon" viewBox="0 0 512 512">${svgPathFasCheck}</svg>`;
  } else {
    return `•`;
  }
}

function htmlNumAdj(n, adj) {
  // l'adjectif doit être déjà conjugué en genre
  // exemple : htmlNombreAdj(3,"vérolée") retourne "3 vérolées"
  return n + " " + adj + (n == 1 || n == -1 ? "" : "s"); // pour zéro on met au plurieu ?
}

function htmlPoints(points) {
  return points + " pt" + (points == 1 || points == -1 ? "" : "s");
}

function htmlGetUserLevel() {
  return "Niv. " + level(user.points);
}

function htmlInputUsername() {
  let s = `
      <input 
        style="display:inline"
        type="text"
        id="userNameInputId"
        name="userNameInputName"
        size="10"
        maxlength="10"
        value="${user.userName}" />`;

  return s;
}

function htmlSelectAreaCode() {
  let s = `<select name="userAreaCodeSelectName" id="userAreaCodeSelectId">`;
  let choices = []; // construction du tableau contenant tous les choix
  choices.push("Aucun");
  for (let i = 1; i <= 95; i++) choices.push(("0" + i).slice(-2));
  for (let i = 971; i <= 978; i++) choices.push(i);
  for (let i = 986; i <= 988; i++) choices.push(i);
  choices.push("AEFE");
  choices.push("Autre");
  // construction du SELECT
  for (let i = 0; i < choices.length; i++) {
    s += `		<option value="${choices[i]}" ${user.areaCode == choices[i] ? "selected" : ""}>${choices[i]}</option>`;
  }
  s += "</select>";
  return s;
}

function htmlShare(msg) {
  let message = encodeURIComponent(msg);
  return `<a
                href="javascript:(()=>{var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); var u = isMobile ? 'whatsapp://send?text=${message}' : 'https://wa.me/?text=${message}' ; window.open(u);})();"
                >Whatsapp</a
              > | 
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.dojomath.fr%2F&t=${message}"
                >Facebook</a
              > | 
              <a
                href="javascript:(()=>{window.open('https://twitter.com/intent/tweet?text=${message}&url=https%3A%2F%2Fwww.dojomath.fr%2F');})();"
                >𝕏</a
              > | 
              <a
                href="mailto:?subject=DojoMath.fr&body=${message}"
                >Email</a
              > | 
              <a
                href="sms:?&body=${message}"
                >SMS</a
              >`;
}

MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    macros: {
      N: "{\\mathbb{N}}",
      Z: "{\\mathbb{Z}}",
      Q: "{\\mathbb{Q}}",
      R: "{\\mathbb{R}}",
      C: "{\\mathbb{C}}",
      U: "{\\mathbb{U}}",
      P: "{\\mathbb{P}}",
      llbracket: "{[\\![}",
      rrbracket: "{]\\!]}",
      tr: "{\\mathrm{tr}}",
      rg: "{\\mathrm{rg}}",
      im: "{\\mathrm{im}}",
      id: "{\\mathrm{id}}",
      Mat: "{\\mathrm{Mat}}",
    },
    svg: {
      fontCache: "global",
    },
  },
};

function testMathJax() {
  let s = "<div id='testMathJax'>";
  s += "$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k}a^{k}b^{n-k}$.";
  s += `$(2+3)\\times \\left(4^{123456789}\\right)^7 = \\left(\\frac{\\sqrt 2+\\sqrt{2^2}}{\\pi}\\right)$`;
  s += `$\\N \\Z \\Q \\R \\C \\U$`;
  s += "$\\frac{\\partial f}{\\partial \\overline z}$";
  s += "</div>";
  document.body.innerHTML += s;
  /* composé automatiquement normalement, MathJax watch le contenu*/
}

const URL_GET_MESSAGES = "https://www.dojomath.fr/backend/get_messages.php";
const URL_POST_MESSAGE = "https://www.dojomath.fr/backend/post_message.php";

function editMessage(recipientId, recipientName) {
  if (user.points < 100) {
    notification(
      "Pour envoyer un message, tu dois avoir plus de 100 points !",
      "var(--c-danger)"
    );
    return;
  }
  if (!window.navigator.onLine) {
    notification("Tu sembles être hors-ligne.", "var(--c-danger)");
    return;
  }
  let promptMessage = `Envoi de message\n============\nDestinataire: ${recipientName}\n\nLongueur maximale du message:\nun seul émoji (ou 2 lettres)!`;
  let content = prompt(promptMessage, "👏");
  if (!content) return;
  if (content.length > 2) {
    notification(
      "Message trop long.\nLongueur maximale : un seul émoji ou deux lettres.",
      "var(--c-danger)"
    );
    return;
  }
  sendMessage(recipientId, content);
}

function sendMessage(recipientId, content) {
  if (user.points < 100) {
    console.log("Pour envoyer des messages, il faut avoir au moins 100 points");
    return;
  }
  if (content.length > 2 || recipientId.length > 16) {
    // normalement déjà filtré par editMessage
    console.log("Message invalide");
    return;
  }
  if (Date.now() - user.lastMessageSendTime < 1000) {
    console.log("Maximum un envoi de message par seconde");
    return;
  }

  // paramètres en argument ? ou variable globale messageDraft ?
  let requestBody = {
    sender: JSON.stringify(user),
    recipientId: recipientId,
    content: content,
  };

  notification("Envoi du message...", "oklch(70% 90% var(--hue-accent))");
  fetch(URL_POST_MESSAGE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((obj) => {
      if (obj.status == "success")
        notification("Message envoyé !", "oklch(70% 90% var(--hue-accent))");
      else
        notification(
          "Erreur lors du traitement des données.",
          "var(--c-danger)"
        );
    })
    .catch((error) => {
      notification("Erreur d'envoi", "var(--c-danger)");
    });
}

function getMessages() {
  if (!window.navigator.onLine) {
    console.log("Navigateur hors-ligne.");
    return;
  }
  if (Date.now() - user.lastMessageCheckTime < 3000) {
    console.log("Maximum un check de message par 3 secondes");
    return;
  }

  // paramètres en argument ? ou variable globale messageDraft ?
  let requestBody = {
    user: JSON.stringify(user),
  };

  fetch(URL_GET_MESSAGES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((responseObj) => {
      if (responseObj.status != "success") {
        console.log(
          "Réponse du serveur : Erreur. Message : " + responseObj.message
        );
        return;
      }

      if (responseObj.messages.length == 0) {
        console.log("Pas de messages");
        return;
      }

      if (
        receivedMessages.length != 0 &&
        receivedMessages[0].date === responseObj.messages[0].date
      ) {
        console.log("Pas de nouveaux messages");
        return;
      }
      // END GUARD

      receivedMessages = responseObj.messages;
      saveToLocalStorage();
      // on relance pas nu render(), on fait juste ceci :
      document.getElementById("messages").innerHTML = htmlMessages();
      let notifText =
        state == "Profile"
          ? "Nouveau(x) message(s) !"
          : "Tu as de nouveaux messages!\n Tu peux les lire dans ta page de profil.";
      notification(notifText, "oklch(70% 90% var(--hue-accent))");
    })
    .catch((error) => {
      console.log(error);
    });
}

function refreshMessages() {
  getMessages();
}

function htmlMessages() {
  if (receivedMessages.length == 0) {
    return `Pas encore de messages.<br>
     Les personnes venant de terminer une partie sont contactables par tout le monde.<br>
     Tu peux engager une conversation de cette façon.<br>
     Ensuite, toute personne qui reçoit un message peut y répondre.<br>
     Attention la taille des messages est limitée à un seul émoji !`;
  }
  let s = "";
  for (let i = 0; i < receivedMessages.length; i++) {
    s += `<div style="display:flex;justify-content:space-between;align-items:center;margin:.2rem 0">
      <div>${receivedMessages[i].senderName} dit : ${receivedMessages[i].content}</div>
      <div class="btn btn-small btn-primary" onclick="editMessage('${receivedMessages[i].senderId}','${receivedMessages[i].senderName}')">Répondre</div>
      </div>`;
  }
  return s;
}

window.addEventListener("stateChange", (e) => {
  let s = e.detail.newState;
  if (s == "Home" || s == "Highscores" || s == "Statistics" || s == "Profile") {
    getMessages();
  }
});

// attribution de booster si le joueur fait un rendu alors qu'il était inactif depuis longtemps

// todo : varier le type et la valeur du booster accordé

let TIME_WELCOME_BACK = 1000 * 3600 * 24; // pour donner un booster de bienvenue après 1 jour d'inactivité

function welcomeBackBoost() {
  if (Date.now() - user.lastRenderTime < TIME_WELCOME_BACK) {
    console.log(
      "dernier render il y a " +
        Math.round(Date.now() - user.lastRenderTime) / 1000 +
        "s"
    );
    return; // activité récente détectée
  }
  // else :
  console.log(
    "temps d'inactivité en secondes : " +
      Math.round(Date.now() - user.lastRenderTime) / 1000
  );
  user.lastBoostMultiplier = 2;
  user.lastBoostEnd = Date.now() + BOOST_DURATION_MS;
  notification(
    "TE REVOILA !\nPoints doublés pendant " +
      BOOST_DURATION_MS / (60 * 1000) +
      " minutes !",
    "oklch(70% 100% var(--hue-accent))"
  );
}

window.addEventListener("stateChange", (e) => {
  // on écoute stateChange et non render, car on vérifie avec lastRenderTime
  window.setTimeout(welcomeBackBoost, 1000);
  //timeout car sinon le render détruit les listeners et la notif ne disparaît plus.
});

function getBoost() {
  if (Date.now() < user.lastBoostEnd) return user.lastBoostMultiplier;
  else return 1;
}

function giveBoost() {
  // appelée après la fin d'un quiz, au moment de revenir ("afterEnd")
  // move to event
  if (getBoost() > 1) return; // on ne donne pas de boost s'il y en a déjà un actif

  if (Math.random() < BOOST_PROBABILITY) return; // probas de boost

  let thisDate = new Date();
  let thisHour = thisDate.getHours();

  // si on est dans une happy hour on donne le bonus et return
  for (let i = 0; i < HAPPY_HOUR_LIST.length; i++) {
    if (HAPPY_HOUR_LIST[i][0] <= thisHour && thisHour < HAPPY_HOUR_LIST[i][1]) {
      user.lastBoostMultiplier = 2;
      user.lastBoostEnd = new Date(
        thisDate.getFullYear(),
        thisDate.getMonth(),
        thisDate.getDate(),
        HAPPY_HOUR_LIST[i][1]
      ).getTime();
      notification(
        "HAPPY HOUR :\nPoints doublés jusqu'à " + HAPPY_HOUR_LIST[i][1] + "h",
        "oklch(70% 100% var(--hue-accent)"
      );
      return;
    }
  }

  // si pas happy hour, bonus court.

  user.lastBoostMultiplier = 2;
  user.lastBoostEnd = Date.now() + BOOST_DURATION_MS;
  notification(
    "BOOST !\nPoints doublés pendant " +
      BOOST_DURATION_MS / (60 * 1000) +
      " minutes !",
    "oklch(70% 100% var(--hue-accent)"
  );
}

window.addEventListener("afterEnd", () => {
  giveBoost();
});

// - - - - - - - - - - - - - - - - - - - - - - -
// - - - - LISTENER ONLOAD and getScript, Mathjax etc
// - - - - - - - - - - - - - - - - - - - - - - -

window.addEventListener("load", () => {
  console.log("- - - -   P A G E   L O A D   - - - - - -");
  //GETSCRIPT MATHJAX : si on le met en async dans le body il commence trop tôt ?
  getScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js", () => {
    testMathJax();
  });
  // ou alors  charger en async mais ça repousse le temps officiel de load
  initUpdateStatsThemes(); // a besoin que les thèmes soient loadés avant !

  initUpdateStatsQuestions(); /// idem, a besoin des questions, mais c'est inliné

  processURL(); // contient setState adéquat et render()
  if (isUserNew()) {
    //notification("Bienvenue!");
  }
  saveToLocalStorage(); // tout de suite. Après le check newUser.
}); // fin du listener sur onLoad

function initUpdateStatsThemes() {
  // initialisation statsThemes (doit tourner *après* chargement thèmes. actuellement dans onLoad)
  // ceci pourrait être géré simplement en s'assurant que le code est inliné après app.js et themes.js ...
  // auparavant, c'était garanti avec des prefixes de noms de fichiers...pas génial
  for (let themeId in themes) {
    statsThemes[themeId] = {
      isLocked: false,
      nbQuestionsViewed: 0,
      nbQuestionsSuccessful: 0,
      nbQuestionsFailed: 0,
      nbQuestionsSkipped: 0,
      nbQuizFinished: 0,
      questionsAlreadySeen: 0,
      questionsSuccessfulLastTime: 0,
      questionsSuccessfulLastTwoTimes: 0,
    };
  }
  // synchro statsThemes avec loaded object from storage

  for (themeId in statsThemes) {
    if (!(themeId in loadedStatsThemes)) continue;

    for (prop in statsThemes[themeId]) {
      if (loadedStatsThemes[themeId][prop] !== undefined)
        statsThemes[themeId][prop] = loadedStatsThemes[themeId][prop];
    }
  }

  console.log("statsThemes initialized and updated");
}

function initUpdateStatsQuestions() {
  // initialisation une fois qu'on sait combien il y a de questions.
  for (let i = 0; i < questions.length; i++) {
    statsQuestions[i] = {
      viewed: 0,
      failed: 0,
      skipped: 0,
      successful: 0,
      lastResult: 0,
      penultimateResult: 0,
      successfulLastTime: false,
      successfulLastTwoTimes: false,
      feedbackSent: false,
    };
  }

  //update from storage :

  for (let i = 0; i < loadedStatsQuestions.length; i++) {
    // sparse array attention. Les entrées manquantes sont null
    if (loadedStatsQuestions[i] === null) continue;

    for (key in statsQuestions[i]) {
      if (loadedStatsQuestions[i][key] !== undefined)
        statsQuestions[i][key] = loadedStatsQuestions[i][key]; // on écrase quand il existe une valeur dans le storage
    }
  }

  console.log("Question statistics initialized and updated");
}

function getScript(scriptUrl, callback) {
  console.log("Loading script " + scriptUrl);
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.defer = true;
  script.onload = callback;
  document.body.appendChild(script);
}

questions=[{"statement": "Tautologie.","answer":true},{"statement": "$|1-\\pi|>2$.","answer":true},
{"statement": "$|5-3\\sqrt 2|>1$.","answer":false},
{"statement": "$\\sqrt{x^2}=|x|$.","answer":true},
{"statement": "$|x+3|<2$ est équivalent à $1 < x < 5$.","answer":false},
{"statement": "$|x+1|<2$ est équivalent à $-1 < x < 1$.","answer":false},
{"statement": "$|x-2|<3$ est équivalent à $-1 < x < 5$.","answer":true},
{"statement": "Si $|x-1|<1$, alors $|x|<2$.","answer":true},
{"statement": "Si $|x|<2$, alors $|x-1|<1$.","answer":false},
{"statement": "Si $|x+3|\\leq 1$ et $|x+1|\\leq 1$, alors $x=-2$.","answer":true},
{"statement": "Si $|x-5|\\leq 3$ et $|x|\\leq 3$, alors $2\\leq x \\leq 3$.","answer":true},
{"statement": "Si $|x-2|< 1$ et $|x|<1$, alors $x=1$.","answer":false,"comment": "Inégalités strictes."},
{"statement": "Si $|x-2|\\leq 3$ ou $|x|\\leq 3$, alors $-3\\leq x \\leq 5$.","answer":true},
{"statement": "Si $|x-3|\\leq 1$ ou $|x-7|\\leq 1$, alors $|x-5|\\leq 3$.","answer":true},
{"statement": "«$|x-3|\\leq 1$ ou $|x-7|\\leq 1$» équivaut à «$|x-5|\\leq 3$».","answer":false},
{"statement": "Si $x^2+2x\\leq 0$, alors $|x+1|\\leq 1$.","answer":true},
{"statement": "Si $x^2-6x+8\\leq 0$, alors $|x-3|\\leq 1$.","answer":true},
{"statement": "Si $|x+2|\\leq 1$, alors $|x|\\leq 3$","answer":true},
{"statement": "Si $|x-1|\\leq 3$, alors $|x|\\leq 2$","answer":false},
{"statement": "Si $|x-1|>1$, alors $|2x-1|>1$.","answer":true},
{"statement": "Si $|x+1|>1$, alors $|x+2|>1$.","answer":false},
{"statement": "La somme d'une fonction paire et d'une fonction impaire est impaire.","answer":false},
{"statement": "Le produit d'une fonction paire et d'une fonction impaire est impair.","answer":true},
{"statement": "Le produit de deux fonctions impaires est impair.","answer":false},
{"statement": "La somme de deux fonctions paires est paire.","answer":true},
{"statement": "La somme de deux fonctions périodiques est périodique.","answer":false},
{"statement": "La somme de deux fonctions $2\\pi$-périodiques est $2\\pi$-périodique.","answer":true},
{"statement": "Une fonction dérivable est continue.","answer":true},
{"statement": "Il existe des fonctions à la fois croissantes et décroissantes.","answer":true},
{"statement": "Une fonction continue est dérivable.","answer":false},
{"statement": "Une fonction dérivable à dérivée positive est croissante.","answer":false,"comment": "Contre-exemple : $f : \\mathbb R^* \\to \\mathbb R^*,\\: x\\mapsto -1/x$ a une dérivée positive et n'est pas croissante car $f(-1)>f(1)$."},
{"statement": "Une fonction dérivable  sur $\\mathbb R$ à dérivée positive est croissante.","answer":true},
{"statement": "Une fonction croissante est à dérivée positive.","answer":false,"comment": "Une fonction croissante n'est même pas forcément dérivable."},
{"statement": "Une fonction croissante est continue.","answer":false},
{"statement": "Si $f$ est dérivable, alors $f'$ est continue.","answer":false,"comment": "Contre-exemple classique : $x\\mapsto x^2\\cos(1/x).$"},
{"answer": false, "statement": "Une fonction $f : E\\to F$ est injective ssi tout élément de $F$ possède au moins un antécédent."},
{"answer": false, "statement": "Une fonction $f : E\\to F$ est injective ssi tout élément de $F$ possède exactement un antécédent."},
{"answer": true, "statement": "Une fonction $f : E\\to F$ est injective ssi tout élément de $F$ possède au plus un antécédent."},
{"answer": true, "statement": "Une fonction $f : E\\to F$ est surjective ssi $f(E)=F$."},
{"answer": true, "statement": "Si une fonction $f : E\\to F$ est bijective, elle est surjective."},
{"answer": false, "statement": "Si une fonction $f : E\\to F$ est injective, elle est bijective."},
{"answer": true, "statement": "Une fonction $f : E\\to F$ est surjective ssi pour tout $y\\in F$, $f^{-1}(\\{y\\})$ est non vide."},
{"answer": true, "statement": "Soit $A$, $B$ deux parties de $E$. L'affirmation \"$\\forall x\\in E,\\ x\\in A\\  \\Rightarrow \\  x\\in B$\" entra\u00eene $A\\subset B$."},
{"answer": true, "statement": "$\\forall A,B,C\\in\\mathcal{P}(E),\\ A\\cap(B\\cup C)=(A\\cap B)\\cup (A\\cap C).$ "}, 
{"answer": true, "statement": "$\\forall A,B\\in\\mathcal{P}(E),\\ (A\\cap B)^{\\complement}=A^{\\complement}\\cup B^{\\complement}.$ "},  
{"answer": true, "statement": "$\\forall B\\in\\mathcal{P}(F),\\ f^{-1}(B)^{\\complement}=f^{-1}(B^{\\complement})$."}, 
{"answer": false, "statement": "$\\forall A\\in\\mathcal{P}(E),\\ f(A)^{\\complement}=f(A^{\\complement})$."}, 
{"answer": false, "statement": "$\\forall A,A'\\in\\mathcal{P}(E),\\ f(A)\\cap f(A')=f(A\\cap A')$."}, 
{"answer": false, "statement": "Soit $f:E\\to F$. Alors $\\forall A\\in\\mathcal{P}(F),\\ \\exists X\\subset f^{-1}(A),\\ f(X)=A$."}, 
{"answer": true, "statement": "$\\forall B\\in\\mathcal{P}(F),\\ f(f^{-1}(B))\\subset B$."}, 
{"answer": true, "statement": "$\\forall A,  B\\in\\mathcal{P}(E),\\ A\\subset B \\implies f(A)\\subset f(B)$."}, 
{"answer": false, "statement": "$\\forall A, B\\in \\mathcal{P}(E),\\ A\\neq B \\implies f(A)\\neq f(B)$."}, 
{"answer": true, "statement": "$f:E\\to F$ est surjective si, et seulement si, tout élément de $F$ admet un antécédent par $f$."}, 
{"answer": true, "statement": "$f:\\mathbb{R}\\to \\mathbb{R}$ est surjective si, et seulement si, toute droite horizontale coupe la courbe repr\u00e9sentative de $f$."}, 
{"answer": true, "statement": "Si $f:E\\to F$ est injective, alors $f:E\\to f(E)$ est bijective."}, 
{"answer": false, "statement": "$f:\\left\\{\\begin{array}{ccc}\\mathbb{N} & \\to & \\mathbb{N} \\\\n & \\mapsto & 2n\\end{array}\\right.$ est surjective."}, 
{"answer": true, "statement": "$f:\\left\\{\\begin{array}{ccc}\\mathbb{N} & \\to & \\mathbb{N} \\\\n & \\mapsto & 2n\\end{array}\\right.$ est injective."}, 
{"answer": true, "statement": "$f:\\left\\{\\begin{array}{ccc}2\\mathbb{N} & \\to & \\mathbb{N} \\\\n & \\mapsto & n/2\\end{array}\\right.$ est surjective."}, 
{"answer": false, "statement": "Si $f:E\\to F$ est surjective, alors $f^{-1}(f(A))=A$ pour tout $A\\in\\mathcal{P}(E)$."}, 
{"answer": true, "statement": "Si $f:E\\to F$ est injective, alors $f^{-1}(f(A))=A$ pour tout $A\\in\\mathcal{P}(E)$."}, 
{"answer": false, "statement": "Une application $f:E\\to E$ est bijective si, et seulement si, elle est injective."}, 
{"answer": false, "statement": "Si une application $f:\\mathbb{N}\\to \\mathbb{N}$ est surjective, alors elle est injective."},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une base de $E$. Si la famille $f(B)$ est une base, alors $f$ est injective.","answer": true},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une base de $E$. Alors la famille $f(B)$ est une base ssi $f$ est injective.","answer": false},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une base de $E$. Alors $f$ est injective ssi la famille $f(B)$ est libre.","answer": true},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une famille libre de $E$. Si la famille $f(B)$ est libre, alors $f$ est injective.","answer": false},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une famille libre de $E$. Si  $f$ est injective, alors la famille $f(B)$ est  libre.","answer": true},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une base de $E$. Alors la famille $f(B)$ est une base ssi $f$ est surjective.","answer": false},
{"statement": "Soit $f : E \\to F$ linéaire et $B$  une base de $E$. Si la famille $f(B)$ est génératrice, alors $f$ est surjective.","answer": true},
{"statement": "L'image d'un sous-ev par une application linéaire est un sous-ev.","answer": true},
{"statement": "L'image réciproque d'un sous-ev par une application linéaire est un sous-ev.","answer": true},
{"statement": "La composée de deux applications linéaires est une application linéaire.","answer": true},
{"statement": "L'application identité d'un ev est un endomorphisme.","answer": true},
{"statement": "Une application constante entre espaces vectoriels est linéaire.","answer": false, "comment": "C'est vrai uniquement pour l'application nulle."},
{"statement": "L'application nulle entre deux ev est linéaire.","answer": true},
{"statement": "Une application linéaire est inversible ssi son déterminant est non nul.","answer": false, "comment": "Le déterminant d'une application linéaire n'est pas bien défini."},
{"statement": "Une application linéaire entre deux ev est inversible ssi elle admet une réciproque.","answer": true},
{"statement": "Si application linéaire entre deux ev est inversible, son inverse est une application linéaire.","answer": true},
{"statement": "Si deux applications entre deux ev sont réciproques l'une de l'autre, alors l'une est linéaire ssi l'autre l'est également.","answer": true},
{"statement": "Si $p\\in \\mathcal{L}(E)$ et si $p \\circ p = p$, alors $p$ est inversible.","answer": false},
{"statement": "Si $p\\in \\mathcal{L}(E)$ et si $p \\circ p = p$, alors $p$ n'est pas inversible.","answer": false},
{"statement": "Si $p\\in \\mathcal{L}(E)$ et si $E=Ker(p)\\oplus Im(p)$, alors $p\\circ p=p$.", "answer": false},
{"statement": "Si $p\\in \\mathcal{L}(E)$ et si $p\\circ p=p$, alors $E=Ker(p)\\oplus Im(p)$.", "answer": true},
{"statement": "Si $f : E \\to F$ est linéaire, alors $dim(F)=rg(f)+dim(Ker(f))$.","answer": false},
{"statement": "Si $f : E \\to F$ est linéaire et $dim(E)<\\infty$, alors $dim(E)=dim(Im(f))+dim(Ker(f))$.","answer": true},
{"statement": "Soient $f$ et $g$ deux applications linéaires de $E$ dans $F$. On a $Im(f+g)=Im(f)+Im(g)$.", "answer": false, "comment": "Prendre par exemple $g=-f$."},
{"statement": "Soient $f$ et $g$ deux applications linéaires de $E$ dans $F$. On a $Ker(f+g)=Ker(f)+Ker(g)$.","answer":false, "comment": "Prendre par exemple $f=0$."},
{"statement": "Si $F$ et $G$ sont des sous-ev de $E$ et $u \\in \\mathcal L(E)$, alors $u(F+G)=u(F)+u(G)$.","answer":true},
{"statement": "La somme de deux automorphismes de $E$ est un automorphisme.","answer": false, "comment": "Penser à $Id$ et à $-Id$."},
{"statement": "La somme de deux endomorphismes de $E$ est un endomorphisme de $E$.","answer": true},
{"statement": "La somme de deux isomorphismes de $E$ sur $F$ est un isomorphisme de $E$ sur $F$.","answer": false},
{"statement": "La composée de deux automorphismes de $E$ est un automorphisme de $E$.","answer": true},
{"statement": "Si la composée de deux endomorphismes de $E$ est bijective, alors chaque endomorphisme est un automorphisme.","answer": false, "comment": "En dimension finie c'est vrai."},
{"statement": "$1$ est un nombre premier.","answer": false},
{"statement": "Tout nombre est divisible par $1$.","answer": true},
{"statement": "Tout nombre est divisible par lui-même.","answer": true},
{"statement": "Il existe quatre nombres premiers inférieurs à $10$.","answer": true},
{"statement": "Il existe quatre nombres premiers compris entre $10$ et $20$.","answer": true},
{"statement": "Il existe quatre nombres premiers compris entre $20$ et $30$.","answer": false},
{"statement": "Il existe trois nombres premiers compris entre $20$ et $30$.","answer": false},
{"statement": "$12$ et $8$ ont une infinité de diviseurs communs.","answer": false},
{"statement": "$16$ et $18$ ont une infinité de multiples communs.","answer": true},
{"statement": "$12$ possède six diviseurs.","answer": true},
{"statement": "$30$ possède huit diviseurs.","answer": true},
{"statement": "$26$ possède deux diviseurs.","answer": false},
{"statement": "$24$ possède huit diviseurs.","answer": true},
{"statement": "$12$ possède quatre diviseurs.","answer": false},
{"statement": "$57$ est premier.","answer": false},
{"statement": "$43$ est premier.","answer": true},
{"statement": "$51$ est premier.","answer": false},
{"statement": "$9991$ est premier.","answer": false,"comment": "$9991=100^2-3^2$."},
{"statement": "$121$ est premier.","answer": false,"comment": "$121=11^2$."},
{"statement": "$132$ est divisible par trois.","answer": true},
{"statement": "Le pgcd de $48$ et $60$ est $6$.","answer": false,"comment": "C'est $12$."},
{"statement": "Le pgcd de $40$ et $36$ est $4$.","answer": true},
{"statement": "$30$ possède trois facteurs premiers.","answer": true},
{"statement": "$60$ possède quatre facteurs premiers.","answer": false},
{"answer": true, "statement": "$8\\times 7 = 56$ et $6\\times 9 = 54$."},
{"answer": true, "statement": "$8\\times 7 = 56$ ou $6\\times 9 = 54$."},
{"answer": true, "statement": "$7\\times 8 = 56$ et $9\\times 7 = 63$."},
{"answer": true, "statement": "$7\\times 8 = 56$ et $9\\times 7 = 63$."},
{"answer": false, "statement": "$8\\times 7 = 56$ et $9\\times 6 = 53$."},
{"answer": true, "statement": "$8\\times 7 = 56$ ou $9\\times 6 = 53$."},
{"answer": false, "statement": "$6\\times 8 = 56$ et $9\\times 8 = 72$."},
{"answer": false, "statement": "$9\\times 5 = 40$ et $8\\times 6 = 48$."},
{"answer": false, "statement": "$8\\times 9 = 73$ et $9\\times 9 = 81$."},
{"answer": true, "statement": "$8\\times 9 = 73$ ou $9\\times 9 = 81$."},
{"answer": true, "statement": "$6\\times 7 = 42$ ou $9\\times 5 = 40$."},
{"answer": true, "statement": "$7\\times 7 = 49$ ou $5\\times 5 = 35$."},
{"answer": false, "statement": "$8\\times 8 = 64$ et $9\\times 6 = 48$."},
{"answer": false, "statement": "$6\\times 8 = 56$ et $9\\times 9 = 81$."},
{"answer": false, "statement": "$9\\times 6 = 73$ et $8\\times 3 = 24$."},
{"answer": true, "statement": "$8\\times 5 = 40$ ou $6\\times 7 = 42$."},
{"answer": true,"statement": "$(1 + i)(1 + i)=2i$"},
{"answer": false,"statement": "$(1 + i)(1 - i)=-2$","comment": "Le produit vaut $2$"},
{"answer": false,"statement": "$(1 + i)(2 + i)=-1 + 3i$","comment": "Le produit vaut $1 + 3i$"},
{"answer": true,"statement": "$(1 + i)(1 + 2i)=-1 + 3i$"},
{"answer": false,"statement": "$(1 + i)(1 - 2i)=-3 - i$","comment": "Le produit vaut $3 - i$"},
{"answer": false,"statement": "$(1 + i)(3 + i)=2 - 4i$","comment": "Le produit vaut $2 + 4i$"},
{"answer": false,"statement": "$(1 + i)(3 - 2i)=5 - i$","comment": "Le produit vaut $5 + i$"},
{"answer": false,"statement": "$(1 + i)(1 + 3i)=2 + 4i$","comment": "Le produit vaut $-2 + 4i$"},
{"answer": true,"statement": "$(1 - i)(1 - i)=-2i$"},
{"answer": false,"statement": "$(1 - i)(2 + i)=-3 - i$","comment": "Le produit vaut $3 - i$"},
{"answer": false,"statement": "$(1 - i)(1 + 2i)=-3 + i$","comment": "Le produit vaut $3 + i$"},
{"answer": false,"statement": "$(1 - i)(1 - 2i)=1 - 3i$","comment": "Le produit vaut $-1 - 3i$"},
{"answer": false,"statement": "$(1 - i)(3 + i)=-4 - 2i$","comment": "Le produit vaut $4 - 2i$"},
{"answer": true,"statement": "$(1 - i)(3 - 2i)=1 - 5i$"},
{"answer": false,"statement": "$(1 - i)(1 + 3i)=-4 + 2i$","comment": "Le produit vaut $4 + 2i$"},
{"answer": false,"statement": "$(2 + i)(2 + i)=-3 + 4i$","comment": "Le produit vaut $3 + 4i$"},
{"answer": false,"statement": "$(2 + i)(1 + 2i)=-5i$","comment": "Le produit vaut $5i$"},
{"answer": false,"statement": "$(2 + i)(1 - 2i)=-4 - 3i$","comment": "Le produit vaut $4 - 3i$"},
{"answer": false,"statement": "$(2 + i)(3 + i)=-5 + 5i$","comment": "Le produit vaut $5 + 5i$"},
{"answer": true,"statement": "$(2 + i)(3 - 2i)=8 - i$"},
{"answer": false,"statement": "$(2 + i)(1 + 3i)=-1 - 7i$","comment": "Le produit vaut $-1 + 7i$"},
{"answer": true,"statement": "$(1 + 2i)(1 + 2i)=-3 + 4i$"},
{"answer": true,"statement": "$(1 + 2i)(1 - 2i)=5$"},
{"answer": false,"statement": "$(1 + 2i)(3 + i)=1 - 7i$","comment": "Le produit vaut $1 + 7i$"},
{"answer": true,"statement": "$(1 + 2i)(3 - 2i)=7 + 4i$"},
{"answer": true,"statement": "$(1 + 2i)(1 + 3i)=-5 + 5i$"},
{"answer": false,"statement": "$(1 - 2i)(1 - 2i)=-3 + 4i$","comment": "Le produit vaut $-3 - 4i$"},
{"answer": true,"statement": "$(1 - 2i)(3 + i)=5 - 5i$"},
{"answer": true,"statement": "$(1 - 2i)(3 - 2i)=-1 - 8i$"},
{"answer": false,"statement": "$(1 - 2i)(1 + 3i)=-7 + i$","comment": "Le produit vaut $7 + i$"},
{"answer": false,"statement": "$(3 + i)(3 + i)=8 - 6i$","comment": "Le produit vaut $8 + 6i$"},
{"answer": true,"statement": "$(3 + i)(3 - 2i)=11 - 3i$"},
{"answer": true,"statement": "$(3 + i)(1 + 3i)=10i$"},
{"answer": false,"statement": "$(3 - 2i)(3 - 2i)=5 + 12i$","comment": "Le produit vaut $5 - 12i$"},
{"answer": false,"statement": "$(3 - 2i)(1 + 3i)=-9 + 7i$","comment": "Le produit vaut $9 + 7i$"},
{"answer": true,"statement": "$(1 + 3i)(1 + 3i)=-8 + 6i$"},
{"answer": true,"statement": "Un argument de $-\\sqrt{3}+3i$ est $2\\pi/3$."},
{"answer": true,"statement": "Un argument de $3-i\\sqrt{3}$ est $-\\pi/6$."},
{"answer": true,"statement": "Un argument de $\\sqrt 2 + i \\sqrt 6$ est $\\pi/3$."},
{"answer": true,"statement": "Un argument de $-\\sqrt 3+i$ est $5\\pi/6$."},
{"answer": true,"statement": "Un argument de $-1-i\\sqrt 3$ est $-2\\pi/3$."},
{"answer": true,"statement": "Un argument de $\\sqrt{3}+i$ est $\\pi/6$."},
{"answer": false,"statement": "Un argument de $3+i\\sqrt{3}$ est $\\pi/3$."},
{"answer": false,"statement": "Un argument de $-1-i\\sqrt{3}$ est $5\\pi/6$."},
{"answer": false,"statement": "Un argument de $-\\sqrt 3-i$ est $-2\\pi/3$."},
{"answer": false,"statement": "Un argument de $-3+i\\sqrt 3$ est $2\\pi/3$"},
{"answer": true,"statement": "Un argument de $\\dfrac{1}{2}+i\\dfrac{\\sqrt 3}{2}$ est $7\\pi/3$."},
{"answer": true,"statement": "Un argument de $-\\dfrac{1}{2}+i\\dfrac{\\sqrt 3}{2}$ est $-4\\pi/3$."},
{"answer": false,"statement": "Un argument de $-\\dfrac{\\sqrt 3}{2}+\\dfrac{i}{2}$ est $7\\pi/6$."},
{"answer": false,"statement": "Un argument de $-\\dfrac{1}{2}-i\\dfrac{\\sqrt 3}{2}$ est $2\\pi/3$."},
{"answer": true,"statement": "Un argument de $1-i$ est $7\\pi/4$."},
{"answer": true,"statement": "Un argument de $-1+i$ est $-5\\pi/4$."},
{"answer": false,"statement": "Un argument de $1+i$ est $5\\pi/4$."},
{"answer": true,"statement": "Un argument de $2i$ est $10\\pi/4$."},
{"answer": false,"statement": "Un argument de $-3i$ est $9\\pi/2$."},
{"answer": true, "statement": "$|zw|= |z|\\,|w|$."},
{"answer": true, "statement": "$\\overline{zw}= \\overline z \\, \\overline w$."},
{"answer": true, "statement": "$\\overline{z+w}= \\overline z + \\overline w$."},
{"answer": true, "statement": "$Re(z+w)= Re(z)+Re(w)$."},
{"answer": false, "statement": "$Re(zw)= Re(z)Re(w)$."},
{"answer": false, "statement": "$Im(zw)= Im(z)Im(w)$."},
{"answer": true, "statement": "$Re(z)= \\dfrac{z+\\overline z}{2}$."},
{"answer": false, "statement": "$Im(z)= \\dfrac{z-\\overline z}{2}$."},
{"answer": true, "statement": "$|z+w|\\leq |z|+|w|$."},
{"answer": false, "statement": "$|z+w|< |z|+|w|$."},
{"answer": false, "statement": "$|z+w|=|z|+|w|$."},
{"answer": false, "statement": "$|z+w|\\geq |z|+|w|$."},
{"answer": true, "statement": "$Re(z)\\leq |z|$."},
{"answer": true, "statement": "$|Re(z)|=|z| \\iff z\\in \\mathbb R$."},
{"answer": true, "statement": "$Re(z)=|z| \\iff z\\in \\mathbb R_{+}$."},
{"answer": true, "statement": "$|Re(z)|\\leq |z|$.","comment": "Dans un triangle rectangle, l'hypoténuse est supérieure aux côtés."},
{"answer": true, "statement": "$|Re(z\\overline w)|\\leq |zw|$.","comment": "Aussi appelée inégalité de Cauchy-Schwarz."},
{"answer": true, "statement": "$|z+w|= |z|+|w| \\iff z\\overline{w} \\in \\mathbb R_{+}$."},
{"answer": true, "statement": "$|z+w|= |z|+|w| \\iff (w=0$ ou $\\exists \\lambda \\in \\mathbb R_{+}, z=\\lambda w)$."},
{"answer": true, "statement": "$|z+w|^2= |z|^2+2Re(z\\overline w)+|w|^2$."},
{"answer": false, "statement": "$|z+w|^2= |z|^2+2|zw|+|w|^2$."},
{"answer": false, "statement": "$|z+w|^2= |z|^2+2|z\\overline w|+|w|^2$."},
{"answer": false, "statement": "$|z+w|^2= |z|^2+2Re(zw)+|w|^2$."},
{"statement": "L'équation $2z=\\overline z$ a une unique solution.","answer":true},
{"statement": "Les points d'affixe $-3-2i$, $-1-i$ et $3+i$ sont alignés.","answer":true},
{"statement": "Le triangle dont les sommets ont pour affixes $i$, $3$ et $4+3i$ est isocèle.","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=3$ forment un cercle","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=|z|$ forment une droite","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=|2z|$ forment un cercle","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=Re(z)+1$ forment une parabole","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=Im(z)+1$ forment une parabole","answer":true},
{"statement": "L'ensemble des solutions de l'équation $z=-\\overline z$ est une droite.","answer":true},
{"statement": "Les solutions complexes de l'équation $|z-1|=Re(z)$ forment une parabole","answer":true},
{"statement": "Si $\\dfrac{c-a}{b-a} \\in \\mathbb{R}$, alors $A$, $B$ et $C$ sont alignés","answer":true},
{"statement": "Si $\\dfrac{c-a}{b-a} \\in i\\mathbb{R}$, alors $ABC$ est rectangle en $A$","answer":true},
{"statement": "Si $\\dfrac{c-a}{b-a} =i$, alors $ABC$ est un triangle indirect","answer":false},
{"statement": "Si $\\dfrac{c-a}{b-a} =i$, alors $ABC$ est isocèle","answer":true},
{"statement": "Si $ABC$ est isocèle, $\\left|\\dfrac{c-a}{b-a}\\right|=1$.","answer":false},
{"statement": "Si $ABC$ est isocèle en $A$, alors $\\dfrac{c-a}{b-a} =i$,","answer":false},
{"statement": "Si $a+c=b+d$, alors $ABCD$ est un parallélogramme","answer":true},
{"statement": "$a+c=b+d$ si et seulement si $ABCD$ est un parallélogramme","answer":true},
{"statement": "Si $ABCD$ est un carré, alors $\\dfrac{d-b}{c-a} =i$.","answer":false},
{"statement": "Si $ABCD$ est un carré direct, alors $\\dfrac{d-b}{c-a} =i$.","answer":true},
{"statement": "Si $ABCD$ est un carré, alors $\\dfrac{d-b}{c-a} \\in\\{i,-i\\}$.","answer":true},
{"statement": "Si $\\dfrac{d-b}{c-a} =i$, alors $ABCD$ est un carré","answer":false},
{"statement": "Si $ABCD$ est un losange, alors $\\dfrac{d-b}{c-a}$ est imaginaire pur.","answer":true},
{"statement": "Si $ABCD$ est un losange, alors $\\left|\\dfrac{d-b}{c-a}\\right|=1$.","answer":false},
{"statement": "Si $\\dfrac{d-b}{c-a}$ est imaginaire pur, alors $ABCD$ est un losange.","answer":false},
{"statement": "Si $ABCD$ est un rectangle, alors $\\left|\\dfrac{d-b}{c-a}\\right|=1$.","answer":true},
{"statement": "Si $ABCD$ est un rectangle, alors $a-b=c-d$.","answer":false},
{"statement": "Si $\\dfrac{c-a}{b-a} =1+i$, alors $ABC$ est rectangle.","answer":true},
{"statement": "Si $\\dfrac{c-a}{b-a} =1+i$, alors $ABC$ est isocèle.","answer":true},
{"statement": "La dérivée de $x\\mapsto -1/x$ est $x\\mapsto 1/x^2$.","answer":true},
{"statement": "La dérivée de $x\\mapsto 1/x^2$ est $x\\mapsto -2/x^3$.","answer":true},
{"statement": "$x\\mapsto -3/x^4$ est la dérivée de $x\\mapsto 1/x^3$.","answer":true},
{"statement": "$x\\mapsto 2/x^3$ est la dérivée seconde de $x\\mapsto 1/x$.","answer":true},                                                                                                                                                                                                                                                                                                                                                                                                  
{"statement": "La dérivée seconde de $x\\mapsto 1/x$ est $x\\mapsto 3/x^3$.","answer":false},
{"statement": "La dérivée de $x\\mapsto x\\sqrt{x}$ est $x\\mapsto \\dfrac{1}{2\\sqrt{x}}$.","answer":false},
{"statement": "La dérivée de $x\\mapsto \\cos(x)$ est $x\\mapsto -\\sin(x)$.","answer":true},
{"statement": "$x\\mapsto \\sin(x)$ est la dérivée de $x\\mapsto \\cos(x)$.","answer":false},
{"statement": "La dérivée seconde de $x\\mapsto \\sin(x)$ est $x\\mapsto -\\sin(x)$.","answer":true},
{"statement": "$(f\\times g)' = f'\\times g + f\\times g'$.","answer":true},
{"statement": "$(f\\times g)' = f'\\times g - f\\times g'$.","answer":false},
{"statement": "$(f / g)' = \\dfrac{f'\\times g - f\\times g'}{g^2}$.","answer":true},
{"statement": "$(f / g)' = \\dfrac{g\\times f' - g'\\times f}{g^2}$.","answer":true},
{"statement": "$(f / g)' = \\dfrac{f'\\times g + f\\times g'}{g^2}$.","answer":false},
{"statement": "$(f / g)' = \\dfrac{f\\times g' - f'\\times g}{g^2}$.","answer":false},
{"statement": "$(g / f)' = \\dfrac{g'\\times f - g\\times f'}{f^2}$.","answer":true},
{"statement": "Si $n \\in \\mathbb N^*$, la dérivée de $x\\mapsto 1/x^n$ est $x\\mapsto -n/x^{n+1}$.","answer":true},
{"statement": "Si $n \\in \\mathbb N$, la dérivée de $x\\mapsto 1/x^n$ est $x\\mapsto -n/x^{n+1}$.","answer":false},
{"statement": "Si $n \\in \\mathbb Z^*$, la dérivée de $x\\mapsto 1/x^n$ est $x\\mapsto -n/x^{n+1}$.","answer":true},
{"statement": "Si $n \\in \\mathbb N$, la dérivée de $x\\mapsto 1/x^n$ est $x\\mapsto n/x^{n+1}$.","answer":false},
{"statement": "Si $n \\in \\mathbb Z$, la dérivée de $x\\mapsto 1/x^n$ est $x\\mapsto n/x^{n-1}$.","answer":false},
{"statement": "Si $n \\in \\mathbb Z^*$, la dérivée de $x\\mapsto x^n$ est $x\\mapsto nx^{n-1}$.","answer":true},
{"statement": "Si $n \\in \\mathbb Z$, la dérivée de $x\\mapsto x^n$ est $x\\mapsto nx^{n-1}$.","answer":false},
{"statement": "Si $n \\in \\mathbb Z$, la dérivée de $x\\mapsto x^n$ est $x\\mapsto nx^{n+1}$.","answer":false},
{"statement": "Si $n \\in \\mathbb N^*$, la dérivée de $x\\mapsto x^n$ est $x\\mapsto nx^{n-1}$.","answer":true},
{"statement": "$(\\sqrt f)' = \\dfrac{f'}{2 \\sqrt f}$.","answer":true},
{"statement": "Si $n \\in \\mathbb N$, la dérivée de $f^n$ est $f' f^{n-1}$.","answer":false,"comment": "Faux pour $n=0$"},
{"statement": "La dérivée de $x\\mapsto x\\ln(x)-x$ est $x\\mapsto \\ln(x)$.","answer":true},
{"statement": "Une primitive de $x\\mapsto 1/x$ est $x\\mapsto \\ln|x|$.","answer":true},
{"statement": "$x\\mapsto -1/x^2$ est une primitive de $x\\mapsto 2/x^3$.","answer":true},
{"statement": "Une primitive de $x\\mapsto -1/x^3$ est $x\\mapsto 1/2x^2$.","answer":true},
{"statement": "Une primitive de $x\\mapsto 1/x^3$ est $x\\mapsto -2/x^2$.","answer":false},
{"statement": "$x\\mapsto 2/x^2$ est une primitive de $x\\mapsto 1/x^3$.","answer":false},
{"statement": "La dérivée seconde de $x\\mapsto \\ln(x)$ est $x\\mapsto -1/x^2$.","answer":true},
{"statement": "$x\\mapsto \\sin(x)$ est une primitive de $x\\mapsto \\cos(x)$.","answer":true},
{"statement": "Une primitive de $x\\mapsto \\sin(x)$ est $x\\mapsto -\\cos(x)$.","answer":true},
{"statement": "Une primitive de $x\\mapsto \\cos(x)$ est $x\\mapsto -\\sin(x)$.","answer":false},
{"statement": "$(g \\circ f)' = (g' \\circ f )\\times f'$.","answer":true},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R^*_+$ est dérivable, $\\sqrt f$ est dérivable.","answer":true},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R_+$ est dérivable, $\\sqrt f$ est dérivable.","answer":false,"comment": "Prendre $x\\mapsto x^2$."},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R_+^*$ est dérivable, la dérivée de $\\ln f$ est $\\dfrac{f'}{f}$.","answer":true},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R^*$ est dérivable, une primitive de $\\dfrac{f'}{f}$ est $\\ln |f|$.","answer":true},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R^*$ est dérivable, une primitive de $\\dfrac{f'}{f}$ est $\\ln f$.","answer":false,"comment": "Attention au logarithme."},
{"statement": "Si $f : \\mathbb R \\to \\mathbb R^*_+$ est dérivable, une primitive de $\\dfrac{f'}{f}$ est $\\ln f$.","answer":true},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{x-1}{x+1}$ est $\\mathbb R \\setminus \\{-1\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x-1}{x+1}$ est $\\mathbb R \\setminus \\{0\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x}{x^2+1}$ est $\\mathbb R \\setminus \\{0\\}$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{2x-1}{(x+1)(x-2)}$ est $\\mathbb R \\setminus \\{-1,2\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{2x-1}{(x+1)(x-2)}$ est $\\mathbb R \\setminus \\{-2,1\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{3+x}{(x+1)(x-2)}$ est $\\mathbb R \\setminus [-1,2]$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{3x^2+x+1}{x+2}$ est $]-\\infty,-2[\\cup ]-2,+\\infty[$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{x+2}{x^2+2x+1}$ est $]-\\infty,-1[\\cup ]-1,+\\infty[$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{x+2}{x^2+2}$ est $\\mathbb R$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x+2}{x^2+1}$ est $\\mathbb R \\setminus \\{-1,1\\}$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{2x-1}{x^2-6x+9}$ est $]-\\infty,3[\\cup ]3,+\\infty[$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{x^2+3}{x^2-1}$ est $\\mathbb R \\setminus \\{-1,1\\}$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{x^2-1}{x^2-4}$ est $\\mathbb R \\setminus \\{-2,2\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x^2-1}{x^2-4}$ est $]-\\infty,-2[\\cup]2,+\\infty[$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{1}{x^2-3x}$ est $\\mathbb R \\setminus \\{0,3\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x-2}{x^2-x}$ est $]-\\infty,0[\\cup ]1,+\\infty[$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x-2}{x^2+2x}$ est $\\mathbb R \\setminus \\{0,2\\}$."},
{"answer": true, "statement": "Le domaine de définition de l'expression $\\dfrac{1}{3x^2+5x}$ est $\\mathbb R \\setminus \\{-5/3,0\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{2+x}{2x^2+3x}$ est $\\mathbb R \\setminus \\{0,3/2\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{2+x}{2x^2+3x}$ est $\\mathbb R \\setminus \\{0,-2/3\\}$."},
{"answer": false, "statement": "Le domaine de définition de l'expression $\\dfrac{x-1}{x+1}$ est $\\mathbb R \\setminus \\{1\\}$."},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x}$ est $[0,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x+2}$ est $[0,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x+2}$ est $[2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{2x-6}$ est $[6,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x+3}$ est $]3,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x-1}$ est $]-1,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x-4}$ est $]-\\infty,4]$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x-5}$ est $[5,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{3-x}$ est $]-\\infty,3]$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{1-x}$ est $]-\\infty,-1]$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{\\sqrt{x-1}}{\\sqrt{x+1}}$ est le même que celui de l'expression $\\sqrt{\\dfrac{x-1}{x+1}}$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x-1}\\sqrt{x+1}$ est le même que celui de l'expression $\\sqrt{(x-1)(x+1)}$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{1}{\\sqrt{x-2}}$ est $[2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{1}{\\sqrt{2x-6}}$ est $]3,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{\\sqrt{x-2}-1}$ est $[3,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{\\sqrt{x-1}-2}$ est $[3,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{\\sqrt{x-2}-2}$ est $[6,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x^2-2}$ est $[-2,2]$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x^2-2}$ est $]-\\infty,-2]\\cup [2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\sqrt{x^2-1}$ est $]-\\infty,-1]\\cup [1,+\\infty[$.","answer":true},
{"statement": "Les expressions $\\ln(x^2)$ et $2\\ln(x)$ ont le même domaine de définition.","answer":false},
{"statement": "Les expressions $\\ln(x^2-1)$ et $\\ln(x+1)+\\ln(x-1)$ ont le même domaine de définition.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(x-1)$ est $[1,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(x-5)$ est $]5,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(x-2)$ est $]-2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(2-x)$ est $]2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(3-x)$ est $]-\\infty,3[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(2x+1)$ est $]-1,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(2x+2)$ est $]-1,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(2x+2)$ est $]-2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(1+x+x^2)$ est $\\mathbb{R}$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(x^2+3x+2)$ est $\\mathbb{R}$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(x^2-1)$ est $]-\\infty,-1[\\cup ]1,+\\infty[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(x^2-1)$ est $]-\\infty,1[\\cup ]1,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(x^2-2)$ est $]-\\infty,-2[\\cup ]2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\ln(2-x^2)$ est $]-\\sqrt{2},\\sqrt{2}[$.","answer":true},
{"statement": "Le domaine de définition de l'expression $\\ln(x^2-4)$ est $]2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{x-3}{\\ln(x+1)}$ est $]-1,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{x+5}{\\ln(x-2)}$ est $]2,+\\infty[$.","answer":false},
{"statement": "Le domaine de définition de l'expression $\\dfrac{2x}{\\ln(x-1)}$ est $]1,2[\\cup]2,+\\infty[$.","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x-2}{x-3}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{x-2}{x-3}$ est bien définie ssi $x\\neq 3$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{x-2}{x-3}}$ est bien définie ssi $\\dfrac{x-2}{x-3}$ est positive, autrement dit ssi $x-2\\geq x-3$ autrement dit jamais. L'expression $\\sqrt{\\dfrac{x-2}{x-3}}$ n'est donc jamais bien définie.»","answer":false,"comment": "Confusion entre $\\geq 0$ et $\\geq 1$ mais même là le reste est incorrect."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{1}{x+1}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{1}{x+1}$ est bien définie ssi $x\\neq -1$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{1}{x+1}}$ est bien définie ssi $\\dfrac{1}{x+1}$ est positive, autrement dit ssi $x+1$ l'est, et donc ssi $x\\geq -1$.<br> Le domaine de définition de $\\sqrt{\\dfrac{1}{x+1}}$ est donc $]-1,+\\infty[$.»","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x-3}{x-2}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{x-3}{x-2}$ est bien définie ssi $x\\neq 2$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{x-3}{x-2}}$ est bien définie ssi $\\dfrac{x-3}{x-2}>0$, autrement dit ssi $x>3$ ou $x<2$. Le domaine de définition de $\\sqrt{\\dfrac{x-3}{x-2}}$ est donc $]-\\infty,2[\\cup ]3,+\\infty[$.»","answer":false,"comment": "L'étape avec «$>0$» est incorrecte, la racine carrée de $0$ est bien définie."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{x}{x+2}$ est bien définie si et seulement si $x\\neq -2$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{x}{x+2}}$ est bien définie ssi $\\dfrac{x}{x+2}\\geq 0$, autrement dit ssi $x\\geq 0$ ou $x<-2$. Le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$ est donc $]-\\infty,-2[\\cup [0,+\\infty[$.»","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{x}{x+2}$ est bien définie si et seulement si $x\\neq -2$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{x}{x+2}}$ est bien définie ssi $\\dfrac{x}{x+2}\\geq 0$, autrement dit ssi $x\\geq 0$ et $x\\geq -2$. Le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$ est donc $\\mathbb{R}_{+}$.»","answer":false,"comment": "Si le numérateur et le dénominateur sont négatifs, alors le quotient est positif."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. L'expression $\\dfrac{x}{x+2}$ est bien définie si et seulement si $x\\neq -2$.<br> Si c'est le cas, l'expression $\\sqrt{\\dfrac{x}{x+2}}$ est bien définie ssi $\\dfrac{x}{x+2}\\geq 0$, autrement dit ssi $x\\geq 0$ ou $x\\geq -2$. Le domaine de définition de $\\sqrt{\\dfrac{x}{x+2}}$ est donc $]-2,+\\infty[$.»","answer":false,"comment": "Par exemple, si $x=-1$, on voit que $\\dfrac{x}{x+2}< 0$."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x-3}^2$.<br> <b>Solution rédigée à évaluer :</b><br>  « Soit $x\\in\\mathbb{R}$. On a $\\sqrt{x-3}^2 = \\sqrt{(x-3)^2} = |x-3|$. Le domaine de définition de $\\sqrt{x-3}^2$ est donc $\\mathbb{R}$ tout entier.»","answer":false,"comment": "Erreur dès le début."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{-1+x-x^2}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{-1+x-x^2}$ est bien définie si et seulement si $-1+x-x^2\\geq 0$. Ce trinôme a un discriminant égal à $\\Delta=b^2-4ac=-3$ donc n'a aucune racine réelle. Il ne s'annule donc jamais et donc est toujours positif. Le domaine de définition de $\\sqrt{-1+x-x^2}$ est donc $\\mathbb{R}$ tout entier.»","answer":false,"comment": "Discriminant correct mais le trinôme est négatif."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x-1}\\sqrt{x-2}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$. On a $\\sqrt{x-1}\\sqrt{x-2}=\\sqrt{(x-1)(x-2)}=\\sqrt{x^2-3x+2}$ est bien définie si et seulement si $x^2-3x+2\\geq0$ Le discriminant du trinôme vaut $\\Delta = 9-4\\times2=1$, les racines sont $1$ et $2$. Le domaine de définition de l'expression est donc $\\mathbb{R}\\setminus [1,2]$.»","answer":false,"comment": "La toute première étape est incorrecte (et la dernière aussi)."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x-1}\\sqrt{x+1}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{x-1}$ est bien définie si et seulement si $x\\geq 1$. L'expression $\\sqrt{x+1}$ est bien définie si et seulement si $x\\leq -1$ Le domaine de définition de $\\sqrt{x-1}\\sqrt{x+1}$ est donc vide.»","answer":false,"comment": "Erreur sur le domaine de la deuxième racine."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x+2}\\sqrt{x+3}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{x+2}$ est bien définie si et seulement si $x\\geq -2$. L'expression $\\sqrt{x+3}$ est bien définie si et seulement si $x\\geq -3$ Le domaine de définition de $\\sqrt{x+2}\\sqrt{x+3}$ est donc $[-2,+\\infty[$.»","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{2+3x+4x^2}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$. Comme les coefficients $2$, $3$ et $4$ du trinôme $2+3x+4x^2$ sont positifs, celui-ci est positif et sa racine carrée est donc bien définie. Le domaine de définition de $\\sqrt{2+3x+4x^2}$ est donc $\\mathbb{R}$ tout entier.»","answer":false,"comment": "Faute de raisonnement sur la justification de positivité du trinôme, donc réponse incorrecte même si le domaine est un peu par hasard le bon."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{(x+2)(x-3)}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{(x+2)(x-3)}$ est bien définie si et seulement si $(x+2)(x-3)$ est positive, c'est-à-dire ssi $x\\geq 3$ ou $x\\leq -2$. Le domaine de définition de $\\sqrt{(x+2)(x-3)}$ est donc $\\mathbb{R}\\setminus ]-2,3[$.»","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{(x-2)(x+1)}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{(x-2)(x+1)}$ est bien définie si et seulement si $(x-2)(x+1)$ est positive, c'est-à-dire ssi $x\\geq 2$ ou $x\\leq -1$. Le domaine de définition de $\\sqrt{(x-2)(x+1)}$ est donc $\\mathbb{R}\\setminus [-1,2]$.»","answer":false,"comment": "Erreur sur l'exclusion des bornes."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{(1-x)(x-2)}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{(1-x)(x-2)}$ est bien définie ssi $(1-x)(x-2)$ est positive c'est-à-dire ssi $x\\in[1,2]$. Le domaine de définition de $\\sqrt{(1-x)(x-2)}$ est donc $[1,2]$.»","answer":true},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x^2-5x+6}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{x^2-5x+6}$ est bien définie ssi $x^2-5x+6$ est positive. Le discriminant de ce trinôme vaut $\\Delta = 25-24=1$, les deux racines sont $2$ et $3$ et son coefficient dominant est positif. Le domaine de définition de $\\sqrt{x^2-5x+6}$ est donc $]-\\infty,2]\\cup[3,+\\infty[$.»","answer":true,"comment": "Réponse correcte même si c'est dommage d'utiliser le discriminant pour un trinôme facile à factoriser comme celui-ci."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x^2-6x+9}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{x^2-6x+9}$ est bien définie ssi $x^2-6x+9$ est positive. Le discriminant de ce trinôme vaut $\\Delta = 36-4\\times 9 = 0$, il y a une racine double égale à $3$. Comme le coefficient dominant du trinôme est positif, celui-ci est donc toujours positif. Le domaine de définition de $\\sqrt{x^2-6x+9}$ est donc $\\mathbb{R}$ tout entier.»","answer":true,"comment": "Réponse correcte mais on ne doit surtout pas utiliser un discriminant pour cela : l'expression $x^2-6x+9$ doit être reconnue, c'est l'identité remarquable pour $a^2-2ab+b^2$."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{x^2-9}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\sqrt{x^2-9}$ est bien définie ssi $x^2-9$ est positive. Le discriminant de ce trinôme vaut $\\Delta = 0-4\\times(-9)=36$, les racines sont $3$ et $-3$. Comme le coefficient dominant du trinôme est positif, le domaine de définition de $\\sqrt{x^2-9}$ est donc $\\mathbb{R}\\setminus ]-3,3[$.»","answer":true,"comment": "Réponse correcte mais on ne doit surtout pas utiliser un discriminant pour cela : l'expression $x^2-9$ doit être reconnue, c'est l'identité remarquable pour $a^2-b^2$."},
{"statement": "<b>Énoncé</b> : déterminer le domaine de définition de $\\sqrt{\\dfrac{x}{(x-1)(x+1)}}$.<br> <b>Solution rédigée à évaluer :</b><br>  «Soit $x\\in\\mathbb{R}$.  L'expression $\\dfrac{x}{(x-1)(x+1)}$ est bien définie ssi $(x-1)(x+1)\\neq 0$ c'est-à-dire ssi $x\\not\\in\\{-1,1\\}$. Si c'est le cas, $\\sqrt{\\dfrac{x}{(x-1)(x+1)}}$ est bien définie ssi $\\dfrac{x}{(x-1)(x+1)}\\geq 0$, autrement dit ssi $-1\\leq x\\leq 0$ ou $x\\geq 1$. Le domaine de définition de $\\sqrt{\\dfrac{x}{(x-1)(x+1)}}$ est donc $]-1,0]\\cup ]1,+\\infty[$.»","answer":true},
{"statement": "Les droites d'équations $2x+y=1$ et $x-2y=3$ sont perpendiculaires.","answer":true},
{"statement": "Les droites d'équations $2x+y=1$ et $x+2y=1$ sont perpendiculaires.","answer":false},
{"statement": "Les droites d'équations $3x-y=1$ et $3x-y=5$ sont parallèles.","answer":true},
{"statement": "Les droites d'équations $2x-3y=1$ et $4x-6y=3$ sont parallèles.","answer":true},
{"statement": "Les droites d'équations $x+y=1$ et $x-2y=0$ se coupent dans le premier quadrant.","answer":true},
{"statement": "Les droites d'équations $x-y=1$ et $x-2y=0$ se coupent dans le deuxième quadrant.","answer":false},
{"statement": "La droite d'équation $x+y=1$ intersecte le cercle de centre $O$ et de rayon $1$.","answer":true},
{"statement": "La droite d'équation $x+y=-1$ intersecte le cercle de centre $O$ et de rayon $1$.","answer":true},
{"statement": "La droite d'équation $3x+2y=6$ intersecte le cercle de centre $O$ et de rayon $1$.","answer":false},
{"statement": "Le point de coordonnées $(1,1)$ appartient à la droite d'équation $2x+3y+5=0$","answer":false},
{"statement": "Le point de coordonnées $(2,3)$ appartient à la droite  $\\left\\{\\begin{pmatrix}2t+1\\\\3t+1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$.","answer":false},
{"statement": "Le point de coordonnées $(-1,-2)$ appartient à la droite  $\\left\\{\\begin{pmatrix}2t+1\\\\3t+1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$.","answer":true},
{"statement": "La droite  $\\left\\{\\begin{pmatrix}2t+1\\\\3t+1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$ est orthogonale à la droite d'équation $2x+3y+7=0$.","answer":true},
{"statement": "La droite  $\\left\\{\\begin{pmatrix}t+1\\\\3t-1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$ peut être définie par l'équation $3x-y-4=0$.","answer":true},
{"statement": "La droite  $\\left\\{\\begin{pmatrix}2t+1\\\\3t+2\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$ peut être définie par l'équation $3x+2y-7=0$.","answer":false},
{"statement": "La droite  $\\left\\{\\begin{pmatrix}2t\\\\3t+1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$ est parallèle à la droite d'équation $3x-2y+7=0$.","answer":true},
{"statement": "La droite  $\\left\\{\\begin{pmatrix}5t+1\\\\2t-1\\end{pmatrix}\\middle| t\\in\\mathbb{R}\\right\\}$ est orthogonale à la droite d'équation $2x-5y+7=0$.","answer":false},
{"statement": "La droite d'équation $3x-y=1$ est dirigée par le vecteur de coordonnées $(3,-1)$.","answer":false},
{"statement": "La droite d'équation $3x-2y=5$ est dirigée par le vecteur de coordonnées $(2,3)$.","answer":true},
{"statement": "Le vecteur de coordonnées $(-1,2)$ est un vecteur normal à la droite d'équation $x-2y=1$.","answer":true},
{"statement": "Le vecteur de coordonnées $(1,3)$ dirige la droite d'équation $x+3y=2$.","answer":false},
{"answer": true, "statement": "$2$ est une solution de l'équation $x^4-3x^3+x^2+4=0$.","comment": "Notez qu'on ne demande pas de résoudre l'équation."},
{"answer": true, "statement": "$2$ est une solution de l'équation $x^6-x^4-6x^3=0$.","comment": "Les petites puissances de $2$ sont à connaître."},
{"answer": false, "statement": "$2$ est une solution de l'équation $-x^5+3x^4-6x+2=0$.","comment": "Les petites puissances de $2$ sont à connaître."},
{"answer": true, "statement": "Une solution de l'équation $x^3-10x+3=0$ est $3$."},
{"answer": false, "statement": "$3$ est une solution de l'équation $x^3-6x+8=0$.","comment": "Pas besoin de calculer : toutes les puissances de $3$ sont impaires, ça ne peut pas marcher."},
{"answer": false, "statement": "L'équation $x^2-3x+2=0$ a une solution dans $\\mathbb Z$."},
{"answer": true, "statement": "L'équation $x^2-3x+2=0$ a deux solutions dans $\\mathbb Z$."},
{"answer": false, "statement": "$1/2$ est une solution de l'équation $x^2+x-1=0$.","comment": "Notez qu'on ne demande pas de résoudre l'équation."},
{"answer": true, "statement": "$-1$ est une solution de l'équation $|x+2/3|-1/3=0$.","comment": "Notez qu'on ne demande pas de résoudre l'équation."},
{"answer": false, "statement": "$5$ est une solution de l'équation $x^2-6x+1=0$.","comment": "Notez qu'on ne demande pas de résoudre l'équation."},
{"answer": true, "statement": "L'équation $x^2-6x+1=0$ a deux solutions distinctes dans $\\mathbb R$.","comment": "Le discriminant du trinôme doit être calculé de tête."},
{"answer": false, "statement": "L'équation $x^2-6x+1=0$ a deux solutions distinctes dans $\\mathbb Q$.","comment": "$\\sqrt{32} =4 \\sqrt 2$ n'est pas rationnel."},
{"answer": true, "statement": "L'équation $x^2-3x-4=0$ a deux solutions distinctes dans $\\mathbb Q$.","comment": "Dans ce cas particulier, le discriminant est un carré."},
{"answer": true, "statement": "Le trinôme $X^2-X-3$ a deux racines distinctes dans $\\mathbb R$.","comment": "Le discriminant du trinôme doit être calculé de tête."},
{"answer": false, "statement": "Le trinôme $X^2-3X+3$ a deux racines distinctes dans $\\mathbb R$.","comment": "Ici les racines sont distinctes, mais complexes"},
{"answer": false, "statement": "Le trinôme $X^2-6X+9$ a deux racines distinctes.","comment": "On doit reconnaître l'identité remarquable avant même de penser à calculer le discriminant."},
{"answer": false, "statement": "Le trinôme $X^2+8X+16$ a deux racines distinctes.","comment": "On doit reconnaître l'identité remarquable avant même de penser à calculer le discriminant."},
{"answer": false, "statement": "L'équation $e^x=-5$, d'inconnue $x\\in \\mathbb R$, admet $\\ln(-5)$ comme solution.","comment": "Une exponentielle est strictement positive et d'ailleurs $\\ln(-5)$ n'existe pas."},
{"statement": "Il est possible qu'un espace vectoriel possède un seul élément.","answer":true},
{"statement": "Il est possible qu'un espace vectoriel ne possède aucun élément.","answer":false},
{"statement": "Il est possible qu'un $\\mathbb R$-ev possède exactement deux éléments.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Alors, $F \\cap G$ est un sous-ev.","answer":true},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Alors, $F \\cup G$ est un sous-ev.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Alors, $F + G$ est un sous-ev.","answer":true},
{"statement": "Soit $E$ un $\\mathbb R$-ev de dimension finie, et $F,G$ des sous-ev.  Si $dim(F)+dim(G)=dim(E)$, alors $F$ et $G$ sont supplémentaires.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Si $E=F \\oplus G$ et $x\\not\\in F$, alors $x\\in G$.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Le complémentaire de $F$ est un sous-ev de $G$.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, $F$ un sous-ev, et ${}^c F$ le complémentaire de $F$. Alors, $E = F \\oplus {}^c F$.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, $F$ un sous-ev, et ${}^c F$ le complémentaire de de $F$. Alors, $E = Vect\\{F,{}^c F\\}$.","answer":true},
{"statement": "Soit $E$ un $\\mathbb R$-ev, $F,G,H$ des sous-ev. Si $E=F \\oplus G$ et $E=F \\oplus H$, alors $G=H$.","answer":false},
{"statement": "Soit $E$ un $\\mathbb R$-ev, et $F,G$ des sous-ev. Si $dim(F)=dim(G)=2$ et $F \\cap G=\\{0\\}$, alors $dim(E) \\geq 4$.","answer":true},
{"statement": "Soit $E=\\mathbb R^5$, et $F,G$ des sous-ev. Si $dim(F)=dim(G)=3$ alors $F \\cap G\\neq\\{0\\}$.","answer":true},
{"statement": "Soit $E=\\mathbb R^5$, et $F,G$ des sous-ev. Si $dim(F)=dim(G)=3$ alors $dim(F \\cap G)=1$.","answer":false},
{"statement": "$\\{ (x,y,z) \\in \\mathbb R^3, 3x+2y=0\\text{ et } x+y=0\\}$ est un sous-ev de $\\mathbb R^3$","answer":true},
{"statement": "$\\{ (x,y,z) \\in \\mathbb R^3, x+y\\geq 0\\}$ est un sous-ev de $\\mathbb R^3$","answer":false},
{"statement": "$\\{ (x,y) \\in \\mathbb R^2, x=y^2\\}$ est un sous-ev de $\\mathbb R^2$","answer":false},
{"statement": "$\\{ (x,y) \\in \\mathbb R^2, (x-y)^2=0\\}$ est un sous-ev de $\\mathbb R^2$","answer":true,"comment": "Vrai car $(x-y)^2=0$ équivaut à $x=y$."},
{"statement": "$\\{ P \\in \\mathbb R[X], \\int_0^1 P(t)dt=0\\}$ est un sous-ev de $\\mathbb R[X]$","answer":true},
{"statement": "$\\{ P \\in \\mathbb R[X], P+P'=1\\}$ est un sous-ev de $\\mathbb R[X]$","answer":false},
{"statement": "$\\{ P \\in \\mathbb R[X], P(3)+P'(3)=0\\}$ est un sous-ev de $\\mathbb R[X]$","answer":true},
{"statement": "$\\{ P \\in \\mathbb R[X], P(3)=3\\}$ est un sous-ev de $\\mathbb R[X]$","answer":false},
{"statement": "$\\{ P \\in \\mathbb R[X], P=3P'\\}$ est un sous-ev de $\\mathbb R[X]$","answer":true},
{"statement": "Une famille liée à laquelle on enlève un vecteur reste liée.","answer":false},
{"statement": "Une famille liée à laquelle on enlève un vecteur devient libre.","answer":false},
{"statement": "Une famille libre à laquelle on ajoute un vecteur reste libre.","answer":false},
{"statement": "Une famille libre à laquelle on ajoute un vecteur devient liée.","answer":false},
{"statement": "Une famille liée à laquelle on ajoute un vecteur reste liée.","answer":true},
{"statement": "Une famille est libre si ses vecteurs sont deux à deux non colinéaires ","answer":false},
{"statement": "Une sous-famille d'une famille libre est libre.","answer":true},
{"statement": "Une sous-famille d'une famille liée est liée.","answer":false},
{"statement": "Ajouter un vecteur à une base produit une famille libre.","answer":false},
{"statement": "Enlever un vecteur à une base produit une famille libre.","answer":true},
{"answer":true,"statement": "$a^2+2ab+b^2$ est factorisable par $a+b$."},
{"answer":true,"statement": "$x^2-b^2$ est factorisable par $b-x$."},
{"answer":true,"statement": "$a^2-2ab+b^2$ est factorisable par $b-a$."},
{"answer":true,"statement": "$a^2+3a+2$ est factorisable par $a+1$."},
{"answer":true,"statement": "$n^2+6n+9$ est factorisable par $n+3$."},
{"answer":true,"statement": "$p^2+4p+4$ est factorisable par $p+2$."},
{"answer":true,"statement": "$a^2+5a+6$ est factorisable par $a+2$."},
{"answer":true,"statement": "$n^2+n-2$ est factorisable par $n+2$."},
{"answer":true,"statement": "$a^2+a-2$ est factorisable par $a-1$."},
{"answer":true,"statement": "$p^2-p-2$ est factorisable par $p-2$."},
{"answer":false,"statement": "$x^2+3x+2$ est factorisable par $x+3$."},
{"answer":false,"statement": "$a^2-3a+2$ est factorisable par $a+2$."},
{"answer":false,"statement": "$a^2+a-2$ est factorisable par $a+1$."},
{"answer":false,"statement": "$n^2+n+1$ est factorisable par $n+1$."},
{"answer":false,"statement": "$a^2+2a-8$ est factorisable par $a+2$."},
{"answer":false,"statement": "$p^2+3p+3$ est factorisable par $p+3$."},
{"answer":false,"statement": "$a^2+3a+9$ est factorisable par $a+3$."},
{"answer":true,"statement": "$ab+a+b+1$ est factorisable par $a+1$."},
{"answer":false,"statement": "$ab+a+b+1$ est factorisable par $a+b$."},
{"answer":true,"statement": "$ab+2a+3b+6$ est factorisable par $a+3$."},
{"answer":false,"statement": "$ab+2a+3b+6$ est factorisable par $a+2$."},
{"answer":false,"statement": "$ab+2a+3b+5$ est factorisable par $a+3$."},
{"answer":true,"statement": "$xy+x+2y+2$ est factorisable par $x+2$."},
{"answer":false,"statement": "$xy+x+2y+2$ est factorisable par $x+1$."},
{"answer":true,"statement": "$ax-a+2x-2$ est factorisable par $a+2$."},
{"answer":false,"statement": "$ax-a+2x-2$ est factorisable par $x+1$."},
{"answer":true,"statement": "$a^2+3ab+2b^2$ est factorisable par $a+2b$."},
{"answer":true,"statement": "$a^2+ab-2b^2$ est factorisable par $a+2b$."},
{"answer":false,"statement": "$a^2+ab-2b^2$ est factorisable par $a-2b$."},
{"statement": "La fraction $\\dfrac{21}{34}$ est irréductible.","answer":true},
{"statement": "La fraction $\\dfrac{15}{123}$ est irréductible.","answer":false},
{"statement": "La fraction $\\dfrac{21}{33}$ est irréductible.","answer":false},
{"statement": "La fraction $\\dfrac{48}{39}$ est irréductible.","answer":false},
{"statement": "$\\dfrac{48}{70} \\leq \\dfrac{2}{3}$","answer":false},
{"statement": "$\\dfrac{34}{50} \\leq \\dfrac{2}{3}$","answer":false},
{"statement": "$\\dfrac{42}{65} \\leq \\dfrac{2}{3}$","answer":true},
{"statement": "$\\dfrac{1}{7} + \\dfrac{7}{9} \\leq 1$","answer":true},
{"statement": "$\\dfrac{5}{12} + \\dfrac{2}{3} \\leq 1$","answer":false},
{"statement": "$\\dfrac{5}{12} + \\dfrac{5}{8} \\geq 1$","answer":true},
{"statement": "$\\dfrac{7}{10} + \\dfrac{2}{7} \\geq 1$","answer":false},
{"statement": "$\\dfrac{7}{12} + \\dfrac{3}{8}  = \\dfrac{23}{24}$","answer":true},
{"statement": "$\\dfrac{5}{4} + \\dfrac{7}{10}  = \\dfrac{29}{20}$","answer":false},
{"statement": "$\\dfrac{a}{b}+ \\dfrac{c}{d} =\\dfrac{a+c}{b+d}$","answer":false},
{"statement": "$\\dfrac{a}{b}+ \\dfrac{c}{d} =\\dfrac{ab+cd}{b+d}$","answer":false},
{"statement": "$\\dfrac{a}{b}+ \\dfrac{c}{d} =\\dfrac{ab+cd}{bd}$","answer":false},
{"statement": "$\\dfrac{a}{b}+ \\dfrac{c}{d} =\\dfrac{ad+bc}{bd}$","answer":true},
{"statement": "$\\dfrac{1}{n}+ \\dfrac{1}{n+1} =\\dfrac{1}{n(n+1)}$","answer":false},
{"statement": "$\\dfrac{1}{n}- \\dfrac{1}{n+1} =\\dfrac{1}{n(n+1)}$","answer":true},
{"statement": "$\\dfrac{n+1}{n^2-1} =\\dfrac{1}{n-1}$","answer":true},
{"answer":false,"statement": "« $A \\implies B$ » signifie « $A$ ou non-$B$ »."},
{"answer":false,"statement": "« $A \\implies B$ » peut se lire « $A$ est vraie, donc $B$ est vraie »."},
{"answer":false,"statement": "« $A \\implies B$ » peut se lire « $B$ est vraie car $A$ est vraie»."},
{"answer":true,"statement": "« $A \\implies B$ » peut se lire « $A$ est fausse ou $B$ est vraie »."},
{"answer":true,"statement": "« $A \\implies B$ » peut se lire « si $A$, alors $B$»."},
{"answer":true,"statement": "« $A \\implies B$ » peut se lire « $A$ est une condition suffisante pour $B$ »."},
{"answer":true,"statement": "« $A \\implies B$ » peut se lire « $B$ est une condition nécessaire pour $A$ »."},
{"answer":true,"statement": "« $A \\implies B$ » signifie « non-$A$ ou $B$ »."},
{"answer":false,"statement": "Si « $A \\implies B$ » est vraie, alors $B$ est vraie."},
{"answer":false,"statement": "Si « $A \\implies B$ » est vraie, alors $A$ est vraie (et $B$ aussi)."},
{"answer":true,"statement": "Si $7\\times 8 = 46$, alors $7\\times 8 = 56$."},
{"answer":true,"statement": "Si $8\\times 5 = 40$, alors $7\\times 8 = 56$."},
{"answer":true,"statement": "Si $8\\times 9 = 63$, alors $7\\times 9 = 72$."},
{"answer":false,"statement": "Si $9\\times 6 = 54$, alors $7\\times 8 = 46$."},
{"answer":true,"statement": "$2+2=5$ est une condition suffisante pour que $2\\times 2=6$."},
{"answer":true,"statement": "$2+2=5$ est une condition nécessaire pour que $2\\times 2=6$."},
{"answer":false,"statement": "$6\\times 7 = 42 $ est une condition suffisante pour que $2\\times 2=5$."},
{"answer":true,"statement": "$6\\times 7 = 42 $ est une condition nécessaire pour que $2\\times 2=5$."},
{"answer":true,"statement": "$6\\times 7 = 42 $ est une condition nécessaire pour que $5\\times 7 = 35$."},
{"answer":true,"statement": "$6\\times 7 = 42 $ est une condition suffisante pour que $5\\times 7 = 35$."},
{"answer":true,"statement": "$2+5=8 \\implies 3\\times 7 = 21$."},
{"answer":true,"statement": "$9\\times 8 = 72 \\implies 3\\times 7 = 21$."},
{"answer":false,"statement": "$6\\times 9 = 54 \\implies 7\\times 8 = 48$."},
{"answer":true,"statement": "Pour que $2+2=5$, il faut que $3\\times 8 = 24$."},
{"answer":true,"statement": "Pour que $2+2=5$, il suffit que $9\\times 5 = 40$."},
{"answer":true,"statement": "Pour que $2+2=4$, il suffit que $9\\times 5 = 40$."},
{"answer":false,"statement": "$9\\times 7 = 63 \\implies 6\\times 8 = 46$."},
{"answer":false,"statement": "$2+2=4 \\implies 7\\times 9 = 53$."},
{"statement": "Si $x\\in [2,3]$, alors $x^2\\in [4,9]$","answer": true},
{"statement": "Si $x\\in [-1,2]$, alors $x^2\\in [0,4]$","answer": true},
{"statement": "Si $x\\in [-1,2]$, alors $x^2\\in [1,4]$","answer": false},
{"statement": "Si $x\\in [-3,-1[$, alors $x^2\\in ]1,9]$","answer": true},
{"statement": "Si $x\\in [-3,-1[$, alors $x^2\\in [1,9[$","answer": false},
{"statement": "Si $x\\in [1,4[$, alors $\\sqrt x \\in [1,2]$","answer": true},
{"statement": "Si $x \\leq -1$, alors $2x+1\\leq -1$","answer": true},
{"statement": "Si $x \\leq 2$, alors $x^2\\leq 4$","answer": false},
{"statement": "Si $x \\leq 4$, alors $\\sqrt x\\leq 2$","answer": false,"comment": "Assertion mal définie."},
{"statement": "Si $x \\geq 2$, alors $x^2\\geq 4$","answer": true},
{"statement": "$x \\geq 2$ si et seulement si $x^2\\geq 4$","answer": false},
{"statement": "$x \\leq 3$ si et seulement si $x^2\\leq 9$","answer": false},
{"statement": "Si $x^2 \\leq 4$, alors $x\\leq 2$","answer": true},
{"statement": "Si $x^2 \\leq 4$, alors $x\\geq -2$","answer": true},
{"statement": "Si $x^2 \\geq 4$, alors $x\\geq 2$","answer": false},
{"statement": "Si $x\\in[2,3]$, alors $x^2-x\\in[-1,7]$","answer": true},
{"statement": "Si $x\\in[2,3]$, alors $x^2-x\\in[2,6]$","answer": true,"comment": "Attention, le raisonnement n'est pas une soustraction illégale d'inégalités, le raisonnement est que la fonction est croissante sur $[2,3]$."},
{"statement": "Si $x\\in[0,3]$, alors $x^2-x\\in[0,6]$","answer": false},
{"statement": "Si $x\\in[0,3]$, alors $x^2-x\\in[-3,9]$","answer": true},
{"statement": "Si $x\\in[1,2]$, alors $x^2-x\\in[0,3]$","answer": true,"comment": "Si $x\\geq 1$, alors $x^2\\geq x$."},
{"statement": "Si $x\\in[2,3]$, alors $\\sqrt x-x\\in[\\sqrt 2-3,\\sqrt 3 -2]$","answer": true},
{"statement": "Si $x\\in[2,3]$, alors $\\sqrt 2 - 2 \\leq \\sqrt x-x\\leq \\sqrt 3 - 3$","answer": false},
{"statement": "Si $x\\in[2,3]$, alors $\\sqrt x-x\\in[\\sqrt 2-3,0[$","answer": true,"comment": "Si $x>1$, alors $\\sqrt x < x$."},
{"statement": "Deux isométries commutent.","answer":false},
{"statement": "La composée de deux isométries est une isométrie.","answer":true},
{"statement": "La composée de deux isométries indirectes est indirecte.","answer":false},
{"statement": "La composée de deux isométries directes est directe.","answer":true},
{"statement": "La composée d'une isométrie directe et d'une indirecte est indirecte.","answer":true},
{"statement": "Une isométrie préserve l'alignement.","answer":true},
{"statement": "Une isométrie préserve les milieux.","answer":true},
{"statement": "Une isométrie préserve les barycentres.","answer":true},
{"statement": "Une isométrie envoie une droite sur une autre droite qui lui est parallèle.","answer":false},
{"statement": "Une isométrie directe est soit une rotation, soit une translation.","answer":true},
{"statement": "Une isométrie est soit une rotation, soit une translation, soit une réflexion (symétrie axiale).","answer":false},
{"statement": "La composée de deux réflexions (symétries axiales) est une réflexion.","answer":false},
{"statement": "La composée de deux réflexions (symétries axiales) est une translation.","answer":false,"comment": "Pas toujours."},
{"statement": "La composée de deux réflexions (symétries axiales) est une rotation.","answer":false,"comment": "Pas toujours."},
{"statement": "La composée de deux réflexions (symétries axiales) est une rotation ou une translation.","answer":true},
{"statement": "La composée d'une réflexion et d'une translation est une réflexion.","answer":false},
{"statement": "Les isométries qui laissent un carré invariant sont au nombre de quatre.","answer":false},
{"statement": "Les isométries qui laissent un carré invariant sont au nombre de huit.","answer":true},
{"statement": "Les isométries qui laissent un parallélogramme (non losange et non rectangle) invariant sont au nombre de deux.","answer":true},
{"statement": "Les isométries qui laissent un rectangle (non carré) invariant sont au nombre de quatre.","answer":true},
{"statement": "Les isométries qui laissent un triangle invariant sont au nombre de six.","answer":false,"comment": "Ca dépend du triangle."},
{"statement": "Toute isométrie directe possède des points fixes.","answer":false},
{"statement": "Toute isométrie indirecte possède des points fixes.","answer":false},
{"statement": "Une isométrie directe possède soit aucun, soit un seul point fixe.","answer":false,"comment": "Il y a aussi l'identité."},
{"statement": "Une isométrie  ayant deux points fixes (distincts) est l'identité.","answer":false},
{"statement": "Une isométrie directe ayant deux points fixes (distincts) est l'identité.","answer":true},
{"statement": "Une isométrie ayant trois points fixes (distincts) est l'identité.","answer":false,"comment": "Condition insuffisante si les points sont alignés."},
{"statement": "Soient $A$ et $B$ deux points distincts. Il existe une isométrie vérifiant $f(A)=B$.","answer":true},
{"statement": "Soient $A$ et $B$ deux points distincts. Il y a une infinité d'isométries vérifiant $f(A)=B$.","answer":true},
{"statement": "Soient $A$ et $B$ deux points distincts. Il y a une infinité d'isométries directes vérifiant $f(A)=B$.","answer":true},
{"statement": "Soient $A$, $B$, $A'$ et $B'$ quatre points. Il existe une isométrie vérifiant «$f(A)=A'$ et $f(B)=B'$».","answer":false},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $A\\neq A'$ et $B\\neq B'$. Il existe une isométrie vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":false},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$. Il existe une isométrie vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":true},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$. Il existe une isométrie directe vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":true},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$. Il existe exactement une isométrie directe vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":false},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$ et $A\\neq B$. Il existe exactement une isométrie directe vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":true},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$ et $A\\neq A'$. Il existe exactement une isométrie directe vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":false,"comment": "Si $A=B$, il y en a une infinité."},
{"statement": "Soient $A$, $B$, $A'$ et $B'$  quatre points, avec $AB=A'B'$ et $A\\neq B$. Il existe exactement deux isométries vérifiant $f(A)=A'$ et $f(B)=B'$.","answer":true},
{"statement": "Une matrice carrée est inversible ssi son déterminant est non nul.","answer": true},
{"statement": "La somme de deux matrices carrées de même taille non inversibles est non inversible.","answer": false},
{"statement": "Si le produit de deux matrices existe et est inversible, alors chaque matrice est inversible.","answer": false, "comment": "Le produit de deux matrices non carrées peut être carré."},
{"statement": "Soient $A, B \\in M_n(\\mathbb R)$. Si $AB$ est inversible, alors $A$ et $B$ aussi.","answer": true},
{"statement": "Si $AB=I$, alors on a automatiquement $BA=I$ et $B$ est l'inverse de $A$.", "answer":false},
{"statement": "Soient $A, B \\in M_n(\\mathbb R)$. Alors $AB=I \\Leftrightarrow BA=I$.", "answer":true},
{"statement": "$Tr(AB)=Tr(BA)$.", "answer":true,"comment": "Même si les matrices sont rectangulaires."},
{"statement": "Pour $A, B, C \\in M_n(\\mathbb R)$, $Tr(ABC)=Tr(CBA)$", "answer":false,"comment": "Trouver un contre-exemple."},
{"statement": "Pour $A, B, C \\in M_n(\\mathbb R)$, $Tr(ABC)=Tr(BCA)$", "answer":true,"comment": "Voir ça comme $Tr(A\\cdot (BC))$."},
{"statement": "$Tr(AB)=Tr(A)\\cdot Tr(B)$.", "answer":false},
{"statement": "$Tr(A+B)=Tr(A)+Tr(B)$.", "answer":true},
{"statement": "${}^t(AB) = {}^tB\\cdot{}^tA$", "answer":true},
{"statement": "Toute matrice carrée réelle est somme d'une matrice symétrique et d'une antisymétrique.", "answer":true},
{"statement": "Les lignes d'une matrice sont indépendantes ssi ses colonnes le sont également.", "answer":false,"comment": "Si la matrice est carrée c'est vrai. Sinon, considérer une matrice $1\\times 2$..."},
{"statement": "Une matrice carrée est inversible ssi son noyau est vide.", "answer":false,"comment": "Un ev n'est jamais vide."},
{"statement": "Une matrice est inversible ssi son noyau est réduit à zéro.", "answer":false,"comment": "Une matrice non carrée peut avoir un noyau nul."},
{"statement": "Si la $k$-ème colonne de $A$ est nulle, la $k$-ème colonne de $AB$ l'est aussi.", "answer":false},
{"statement": "Si la $k$-ème colonne de $A$ est nulle, la $k$-ème colonne de $BA$ l'est aussi.", "answer":true},
{"statement": "Si une matrice carrée vérifie $A^5+A=I$, alors elle est inversible", "answer":true,"comment": "Vérifier que l'inverse est $A^4+I$. Généraliser l'exercice."},
{"statement": "Si une matrice carrée vérifie $A^k=I$ pour un entier $k$, alors elle est inversible.", "answer":false,"comment": "Si $k>0$ c'est vrai."},
{"statement": "Si une matrice vérifie $A^p=0$ pour un certain entier $p$, alors elle n'est jamais inversible.", "answer":true},
{"statement": "Si deux matrices non nulles vérifient $AB=0$, aucune d'entre elles n'est inversible.", "answer":true,"comment": "Il faut vraiment les supposer non nulles."},
{"statement": "Si deux matrices vérifient $AB=0$, alors $A=0$ ou $B=0$.", "answer":false, "comment": "Deux matrices non nulles peuvent avoir un produit nul."},
{"statement": "Soit $A$ une matrice. S'il existe $B\\neq 0$ tq $AB=0$, alors $BA=0$ aussi.", "answer":false},
{"statement": "Si une matrice carrée vérifie $A^2+2A=0$, alors $A+I$ est inversible et son propre inverse.","answer":true, "comment": "Il suffit de vérifier la définition d'inverse."},
{"statement": "Si une matrice carrée vérifie $A^2+2A=0$, alors soit $A=0$, soit $A=-2I$","answer":false},
{"statement": "La somme de deux complexes de module un est de module un.","answer":false},
{"statement": "La somme de deux racines de l'unité est une racine de l'unité.","answer":false},
{"statement": "Le produit de deux complexes de module un est de module un.","answer":true},
{"statement": "Le produit de deux racines de l'unité est une racine de l'unité.","answer":true},
{"statement": "Le produit de deux racines $n$-èmes de l'unité est une racine $n$-ème de l'unité.","answer":true},
{"statement": "Le produit d'une racine de l'unité par un complexe de module un est de module un.","answer":true},
{"statement": "Le produit d'une racine de l'unité par un complexe de module un est une racine de l'unité.","answer":false},
{"statement": "$\\dfrac{3}{5}+i\\dfrac{4}{5}$ est de module un.","answer":true},
{"statement": "$-i$ est une racine de l'unité.","answer":true},
{"statement": "$e^{i\\pi/n}$ est une racine $n$-ème de l'unité.","answer":false},
{"statement": "$\\dfrac{3}{5}+i\\dfrac{4}{5}$ est une racine de l'unité.","answer":false},
{"statement": "$1+i\\sqrt 3$ est une racine de l'unité.","answer":false},
{"statement": "$\\dfrac{1}{2}+i\\dfrac{\\sqrt 3}{2}$ est une racine cubique de l'unité.","answer":false},
{"statement": "$\\dfrac{1}{2}+i\\dfrac{\\sqrt 3}{2}$ est une racine de l'unité.","answer":true},
{"statement": "$\\mathbb U_3 \\subset  \\mathbb U_6$.","answer":true},
{"statement": "$\\mathbb U_4 \\cap  \\mathbb U_5=\\emptyset$.","answer":false},
{"statement": "$\\mathbb U_4 \\cap  \\mathbb U_5=\\{1\\}$.","answer":true},
{"statement": "$\\mathbb U_4 \\cap  \\mathbb U_6=\\mathbb U_2$.","answer":true},
{"statement": "$\\mathbb U_p \\cap  \\mathbb U_q=\\mathbb U_{pgcd(p,q)}$.","answer":true},
{"statement": "$\\mathbb U_p \\cap  \\mathbb U_q=\\mathbb U_{ppcm(p,q)}$.","answer":false},
{"statement": "$\\mathbb U_p \\cup  \\mathbb U_q=\\mathbb U_{ppcm(p,q)}$.","answer":false},
{"statement": "$\\mathbb U_p \\cup  \\mathbb U_q=\\mathbb U_{pgcd(p,q)}$.","answer":false},
{"statement": "Si $p\\leq q$, alors $\\mathbb U_p \\subset  \\mathbb U_q$.","answer":false},
{"statement": "Si $p\\leq q$, alors $\\mathbb U_q \\subset  \\mathbb U_p$.","answer":false},
{"statement": "Si $p|q$, alors $\\mathbb U_q \\subset  \\mathbb U_p$.","answer":false},
{"statement": "Si $p|q$, alors $\\mathbb U_p \\subset  \\mathbb U_q$.","answer":true},
{"answer":false,"statement": "$x \\geq 0 \\Rightarrow x > 0$ est toujours fausse."},
{"answer":false,"statement": "$x > 0 \\Rightarrow x \\geq 0$ est fausse si $x=-1$."},
{"answer":false,"statement": "$x > 0 \\Rightarrow x \\geq 0$ est parfois vraie, parfois fausse, ça dépend de $x$."},
{"answer":false,"statement": "L'assertion « $x>0 \\Rightarrow x \\geq 0$ » est parfois vraie, parfois fausse, ça dépend de $x$."},
{"answer":true,"statement": "L'assertion « $x\\geq 3 \\Rightarrow x \\geq 2$ » est vraie quel que soit le paramètre réel $x$."},
{"answer":true,"statement": "L'assertion « $x\\geq 3 \\Rightarrow x \\geq 2$ » est vraie si $x=0$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est toujours fausse."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est parfois vraie, parfois fausse, ça dépend de $x$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si $x\\geq 3$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si et seulement si $x\\geq 3$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si et seulement si ($x\\geq 3$ ou $x<2$)."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si $x=4$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si $x=2$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\geq 3$ » est vraie si $x=1$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Leftrightarrow x \\geq 3$ » est vraie si $x\\geq 3$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Leftrightarrow x \\geq 3$ » est vraie si et seulement si $x\\geq 3$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Leftrightarrow x \\geq 3$ » est vraie si et seulement si ($x\\geq 3$ ou $x<2$)."},
{"answer":false,"statement": "L'assertion « $x\\leq 2 \\Rightarrow x \\geq 3$ » est toujours fausse."},
{"answer":true,"statement": "L'assertion « $x\\leq 2 \\Rightarrow x \\geq 3$ » est vraie si $x=2,5$."},
{"answer":false,"statement": "L'assertion « $x\\leq 2 \\Rightarrow x \\geq 3$ » est vraie si $x=2$."},
{"answer":true,"statement": "L'assertion « $x\\leq 2 \\Rightarrow x \\geq 3$ » est vraie si et seulement si $x>2$."},
{"answer":true,"statement": "L'assertion « $x\\leq 2 \\Rightarrow x \\geq 3$ » est vraie si  $x\\in ]2;3[$."},
{"answer":false,"statement": "L'assertion « $x\\leq 2 \\Leftrightarrow x \\geq 3$ » est toujours fausse."},
{"answer":true,"statement": "L'assertion « $x\\leq 2 \\Leftrightarrow x \\geq 3$ » est vraie si $x=2,5$."},
{"answer":false,"statement": "L'assertion « $x\\leq 2 \\Leftrightarrow x \\geq 3$ » est vraie si $x\\geq 3$."},
{"answer":false,"statement": "L'assertion « $x\\leq 2 \\Leftrightarrow x \\geq 3$ » est vraie si et seulement si $x\\geq 3$."},
{"answer":true,"statement": "L'assertion « $x\\leq 2 \\Leftrightarrow x \\geq 3$ » est vraie si et seulement si $x\\in ]2;3[$."},
{"answer":true,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\leq 3$ » est vraie si et seulement si $x\\leq 3$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\leq 3$ » est vraie si et seulement si $x\\in ]2;3[$."},
{"answer":false,"statement": "L'assertion « $x\\geq 2 \\Rightarrow x \\leq 3$ » est fausse si $x<2$."},
{"statement": "La somme des angles d'un quadrilatère convexe vaut $360$°.","answer": true},
{"statement": "La somme des angles d'un quadrilatère vaut $360$°.","answer": false},
{"statement": "Si $ABCD$ est un carré, les diagonales se coupent en leur milieu à angle droit.","answer": true},
{"statement": "Si $[AC]$ et $[BD]$ se coupent en leur milieu à angle droit, alors $ABCD$ est un carré.","answer": false},
{"statement": "Si $[AC]$ et $[BD]$ se coupent en leur milieu et ont même longueur, alors $ABCD$ est un carré.","answer": false},
{"statement": "Si $[AC]$ et $[BD]$ se coupent en leur milieu et ont même longueur, alors $ABCD$ est un losange.","answer": false},
{"statement": "Si $ABCD$ est un rectangle, les diagonales se coupent en leur milieu.","answer": true},
{"statement": "Si $ABCD$ est un rectangle, les diagonales se coupent à angle droit.","answer": false},
{"statement": "$ABCD$ est un parallélogramme si et seulement si ses diagonales se coupent en leur milieu.","answer": true},
{"statement": "$ABCD$ est un parallélogramme si et seulement si $AB=CD$.","answer": false},
{"statement": "Si $(AB)//(CD)$, alors $ABCD$ est un parallélogramme.","answer": false},
{"statement": "Si $AB=CD$, alors $ABCD$ est un parallélogramme.","answer": false},
{"statement": " Si $AB=CD$ et $(BC)//(AD)$ alors $ABCD$ est un parallélogramme.","answer": false},
{"statement": " Si $ABCD$ est un parallélogramme, alors $AB=CD$ et $(BC)//(AD)$.","answer": true},
{"statement": " Tout parallélogramme avec deux côtés égaux est un carré","answer": false},
{"statement": " Tout parallélogramme avec deux côtés consécutifs égaux est un carré","answer": false},
{"statement": " Tout parallélogramme avec un angle droit est un rectangle","answer": true},
{"statement": " Tout parallélogramme avec des diagonales de même longueur est un rectangle","answer": true},
{"statement": "$ABCD$ est un trapèze si et seulement si $AB=CD$.","answer": false},
{"statement": "Si $AB=CD$ alors $ABCD$ est un trapèze.","answer": false},
{"statement": "Si $AB=CD$ alors $ABCD$ est un trapèze isocèle.","answer": false},
{"statement": "Si $AB=CD$ et $(AB)//(CD)$ alors $ABCD$ est un trapèze isocèle.","answer": false},
{"statement": "Si  $ABCD$ est un trapèze isocèle alors ses diagonales se coupent en leur milieu.","answer": false},
{"statement": "Si $ABCD$ est un losange, alors ses diagonales se coupent en leur milieu.","answer": true},
{"statement": "Si $[AC]$ et $[BD]$ se coupent en leur milieu à angle droit, alors $ABCD$ est un losange.","answer": true},
{"statement": "Si $AB=BC=CD=DA$, alors $(AC)\\bot(BD)$.","answer": true},
{"statement": "Tout losange avec des diagonales de même longueur est un rectangle.","answer": true},
{"statement": "Les sommets d'un trapèze isocèle sont sur un même cercle.","answer": true},
{"statement": "Les sommets d'un losange sont sur un même cercle.","answer": false},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: x>3$."},
{"answer":true,"statement": "$\\exists x \\in \\mathbb R,\\: x>3$."},
{"answer":true,"statement": "Le contraire de $\\forall x \\in \\mathbb R,\\: x>3$ est équivalent à $2+2=4$."},
{"answer":false,"statement": "Le contraire de $\\exists x \\in \\mathbb R,\\: x>3$ est équivalent à $2+2=4$."},
{"answer":true,"statement": "$\\exists x \\in \\mathbb R,\\: (x+2)^2>3$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: (x+2)^2>3$.","comment": "Faux si $x=-2$ par exemple."},
{"answer":true,"statement": "$\\forall x \\in \\mathbb R_+,\\: (x+2)^2>3$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: x>3$ est équivalente à $2+2=4$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: 1/x>-3$.","comment": "Malformation: $1/x$ n'est pas bien défini si $x\\in \\mathbb R$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R^*,\\: 1/x>-3$.","comment": "Faux pour $x=-1/4$."},
{"answer":true,"statement": "$\\exists x \\in \\mathbb R^*,\\: 1/x>-3$."},
{"answer":true,"statement": "$\\forall x \\in \\mathbb R^*_+,\\: 1/x>-3$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: \\sqrt x > 3$.","comment": "Malformation : $\\sqrt x$ n'est pas bien défini si $x\\in \\mathbb R$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R_+,\\: \\sqrt x > 3$."},
{"answer":true,"statement": "$\\exists x \\in \\mathbb R_+,\\: \\sqrt x > 3$.","comment": "Vrai si $x=10$ par exemple."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R_+,\\: \\sqrt x^3>0$."},
{"answer":true,"statement": "$\\forall x \\in \\mathbb R_+,\\: \\sqrt x^3\\geq 0$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\: \\sqrt x^3>0$.","comment": "Malformation, radical non défini."},
{"answer":true,"statement": "$\\exists x \\in \\mathbb R,\\:\\exists y \\in \\mathbb R,\\: x>y$."},
{"answer":true,"statement": "$\\forall x \\in \\mathbb R,\\:\\exists y \\in \\mathbb R,\\: x>y$."},
{"answer":false,"statement": "$\\exists x \\in \\mathbb R,\\:\\forall y \\in \\mathbb R,\\: x>y$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\:\\forall y \\in \\mathbb R,\\: x>y$."},
{"answer":false,"statement": "$\\forall x \\in \\mathbb R,\\:\\exists x \\in \\mathbb R,\\: x>y$.","comment": "Malformation : $y$ n'a pas été défini."},
{"answer":true,"statement": "Le contraire de $\\forall x \\in \\mathbb R,\\: x>0$ est $\\exists x \\in \\mathbb R,\\: x\\leq 0$."},
{"answer":false,"statement": "Le contraire de $\\forall x \\in \\mathbb R,\\: x>0$ est $\\exists x \\in \\mathbb R,\\: x< 0$."},
{"answer":false,"statement": "Le contraire de $\\forall x \\in \\mathbb R,\\: x>0$ est $\\exists x \\in \\mathbb R,\\: x> 0$."},
{"answer":false,"statement": "$\\forall n \\in \\mathbb N,\\: n^2\\leq 2^n$","comment": "Attention, c'est faux pour $n=3$."},
{"answer":true,"statement": "$\\exists n \\in \\mathbb N,\\: n^2\\leq 2^n$."},
{"answer":true,"statement": "$\\exists n \\in \\mathbb N^*,\\: 1/n<1/\\pi$."},
{"answer":false,"statement": "$\\forall n \\in \\mathbb N^*,\\: 1/n<1/\\pi$."},
{"answer":true,"statement": "$\\forall n \\in \\mathbb N,\\: \\cos(n)\\leq 1$."},
{"answer":false,"statement": "$\\forall n \\in \\mathbb N,\\: 1/\\cos(n)\\geq 1$.","comment": "Bien défini. Par contre, le cosinus peut être négatif."},
{"answer":true,"statement": "$\\forall n \\in \\mathbb N,\\: |1/\\cos(n)|\\geq 1$."},
{"answer": false, "statement": "$7\\sqrt{2}>10$","comment":"Élever au carré."},
{"answer": true, "statement": "$\\sqrt{256}>15$","comment":"Élever au carré."},
{"answer": true, "statement": "$\\sqrt{60}=2\\sqrt{15}$"},
{"answer": true, "statement": "$\\sqrt{360}=6\\sqrt{10}$"},
{"answer": false, "statement": "$\\sqrt{90}<9$","comment":"Élever au carré."},
{"answer": true, "statement": "$2\\sqrt{2}<3$","comment":"Élever au carré."},
{"answer": false, "statement": "$3\\sqrt{3}<5$","comment":"Élever au carré."},
{"answer": true, "statement": "$\\sqrt{5}+1>3$"},
{"answer": false, "statement": "$2\\sqrt{40}>13$"},
{"answer": true, "statement": "$2\\sqrt{30}<11$","comment":"Élever au carré."},
{"answer": true, "statement": "$\\sqrt{1024}=32$"},
{"answer": true, "statement": "$\\sqrt{1000}=10\\sqrt{10}$"},
{"answer": true, "statement": "$\\sqrt{800}=5\\sqrt{32}$"},
{"answer": true, "statement": "$\\sqrt{800}=20\\sqrt{2}$"},
{"answer": false, "statement": "$\\sqrt{800}=6\\sqrt{50}$"},
{"answer": false, "statement": "$\\sqrt{600}=5\\sqrt{30}$"},
{"answer": false, "statement": "$\\sqrt{99}=9\\sqrt{9}$"},
{"answer": true, "statement": "$\\sqrt{169}=13$"},
{"answer": false, "statement": "$\\sqrt{154}=12$"},
{"answer": true, "statement": "$\\sqrt{150}>12$","comment":"Élever au carré."},
{"answer": false, "statement": "$\\sqrt{112}>11$","comment":"Élever au carré."},
{"answer": false, "statement": "$\\sqrt{180}=9\\sqrt{20}$"},
{"answer": true, "statement": "$\\sqrt{180}<14$","comment":"Élever au carré."},
{"answer": true, "statement": "$\\sqrt{2700}=30\\sqrt{3}$"},
{"answer": true, "statement": "$\\sqrt{72}=3\\sqrt{8}$"},
{"answer": true, "statement": "$\\sqrt{72}=6\\sqrt{2}$"},
{"answer": false, "statement": "$\\sqrt{72}=2\\sqrt{9}$"},
{"answer": true, "statement": "$\\sqrt{2}+\\sqrt{8} = 3\\sqrt{2}$"},
{"answer": false, "statement": "$\\sqrt{3}+\\sqrt{2}=\\sqrt{5}$"},
{"answer": false, "statement": "$\\sqrt{3}+\\sqrt{2}=\\sqrt{6}$"},
{"answer": true, "statement": "$\\sqrt{27}+\\sqrt{3}=4\\sqrt{3}$"},
{"answer": false, "statement": "$\\sqrt{12}+\\sqrt{3}=5\\sqrt{3}$"},
{"answer": true, "statement": "$\\sqrt{18}-\\sqrt{2}=\\sqrt{8}$"},
{"answer": false, "statement": "$\\sqrt{20}+7\\sqrt{5}=\\sqrt{15}$"},
{"answer": false, "statement": "$2\\sqrt{12}+4\\sqrt{3}=4\\sqrt{6}$"},
{"answer": false, "statement": "$6\\sqrt{5}<5\\sqrt{6}$","comment":"Élever au carré."},
{"answer": false, "statement": "$3\\sqrt{5}<2\\sqrt{11}$","comment":"Élever au carré."},
{"answer": false, "statement": "$3\\sqrt{64}+2\\sqrt{49}=48$"},
{"answer": true, "statement": "$12\\sqrt{121}=132$"},
{"answer": false, "statement": "$2\\sqrt{81}+4\\sqrt{49}=36$"},
{"answer": true, "statement": "$(\\sqrt{2}+2)(\\sqrt{2}-1)=\\sqrt{2}$"},
{"answer": false, "statement": "$(\\sqrt{2}+2)(\\sqrt{2}+1)=2+3\\sqrt{2}$"},
{"answer": true, "statement": "$(\\sqrt{2}+1)(\\sqrt{2}+1)=3+\\sqrt{8}$"},
{"answer": false, "statement": "$(\\sqrt{3}-1)(1-\\sqrt{3})=-4-2\\sqrt{3}$"},
{"answer": true, "statement": "$\\sqrt{2}(\\sqrt{2}+\\sqrt{3})=2+\\sqrt{6}$"},
{"answer": true, "statement": "$\\sqrt{2}(\\sqrt{8}-\\sqrt{2})=2$"},
{"answer": true, "statement": "$(\\sqrt{5}+\\sqrt{2})\\sqrt{10}=5\\sqrt{2}+2\\sqrt{5}$"},
{"answer": false, "statement": "$(\\sqrt{2}+\\sqrt{3})(\\sqrt{2}-\\sqrt{3})=1$"},
{"answer": true, "statement": "$\\sqrt{3}(\\sqrt{12}-\\sqrt{3})=3$"},
{"answer": true, "statement": "$(\\sqrt{18}+\\sqrt{8})\\sqrt{2}=10$"},
{"answer": false, "statement": "$\\sqrt{2}(\\sqrt{18}-\\sqrt{8})=4$"},
{"answer": true, "statement": "$\\sqrt{3+2\\sqrt{2}}=1+\\sqrt{2}$"},
{"answer": true, "statement": "$\\sqrt{\\sqrt{4}}=\\sqrt{2}$"},
{"answer": false, "statement": "$\\sqrt{\\sqrt{64}}=4$"},
{"answer": false, "statement": "$\\sqrt{\\sqrt{8}}=2$"},
{"answer": false, "statement": "$\\sqrt{\\sqrt{128}}=4$"},
{"answer": false, "statement": "$\\sqrt{6+2\\sqrt{2}}=2+2\\sqrt{2}$"},
{"answer": true, "statement": "$\\sqrt{4+2\\sqrt{3}}=1+\\sqrt{3}$"},
{"answer": false, "statement": "$\\sqrt{3}(\\sqrt{6}+\\sqrt{8})=3\\sqrt{2}+2\\sqrt{3}$"},
{"answer": true, "statement": "$(\\sqrt{3}+1)(3+\\sqrt{3})=6+4\\sqrt{3}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{60}}{\\sqrt{3}}=2\\sqrt{5}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{3}}{\\sqrt{20}}=\\dfrac{1}{2}\\sqrt{\\dfrac{3}{5}}$"},
{"answer": false, "statement": "$\\dfrac{3}{\\sqrt{6}}=\\dfrac{6}{\\sqrt{2}}$"},
{"answer": false, "statement": "$\\dfrac{6}{\\sqrt{2}}=\\sqrt{3}$"},
{"answer": true, "statement": "$\\dfrac{10}{\\sqrt{8}}=\\dfrac{5}{\\sqrt{2}}$"},
{"answer": true, "statement": "$\\dfrac{6}{\\sqrt{12}}=\\sqrt{3}$"},
{"answer": true, "statement": "$\\dfrac{1}{\\sqrt{2}+1}=\\sqrt{2}-1$"},
{"answer": true, "statement": "$\\dfrac{2}{\\sqrt{3}-1}=1+\\sqrt{3}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{2}-1}{\\sqrt{2}+1} = 3-\\sqrt{8}$"},
{"answer": false, "statement": "$\\dfrac{\\sqrt{8}}{\\sqrt{3}-1} = \\sqrt{6}-\\sqrt{2}$"},
{"answer": false, "statement": "$\\dfrac{1}{\\sqrt{8}}+\\dfrac{1}{\\sqrt{20}} = \\dfrac{\\sqrt{5}+\\sqrt{2}}{4\\sqrt{10}}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{2}}{\\sqrt{3}}+\\dfrac{\\sqrt{3}}{\\sqrt{2}} = \\dfrac{5}{\\sqrt{6}}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{48}+\\sqrt{75}}{\\sqrt{3}}=9$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{2}}{\\sqrt{8}-\\sqrt{2}}=1$"},
{"answer": true, "statement": "$\\dfrac{2}{\\sqrt{5}+1} = \\dfrac{\\sqrt{5}-1}{2}$"},
{"answer": false, "statement": "$\\dfrac{2}{\\sqrt{3}+1} = \\dfrac{\\sqrt{3}-1}{2}$"},
{"answer": true, "statement": "$\\sqrt{3}+\\dfrac{1}{\\sqrt{3}}=\\dfrac{4}{\\sqrt{3}}$"},
{"answer": false, "statement": "$\\sqrt{2}+\\dfrac{1}{\\sqrt{2}}=3\\sqrt{2}$"},
{"answer": false, "statement": "$\\dfrac{1}{3+\\sqrt{5}}=\\dfrac{3-\\sqrt{5}}{2}$"},
{"answer": false, "statement": "$\\dfrac{1}{1+\\sqrt{2}}=1-\\sqrt{2}$"},
{"answer": false, "statement": "$\\dfrac{1}{1+\\sqrt{3}}=\\dfrac{1-\\sqrt{3}}{2}$"},
{"answer": false, "statement": "$\\dfrac{1}{\\sqrt{5}+\\sqrt{3}} = \\sqrt{5}-\\sqrt{3}$"},
{"answer": true, "statement": "$\\dfrac{1}{\\sqrt{2}+\\sqrt{8}} = \\dfrac{\\sqrt{2}}{6}$"},
{"answer": true, "statement": "$\\dfrac{1}{2+\\sqrt{5}} = \\sqrt{5} - 2$"},
{"answer": false, "statement": "$\\dfrac{1}{\\sqrt{3}+\\sqrt{4}} = \\sqrt{3}-2$"},
{"answer": true, "statement": "$\\dfrac{1}{\\sqrt{2}+\\sqrt{3}} = \\sqrt{3} - \\sqrt{2}$"},
{"answer": true, "statement": "$\\dfrac{\\sqrt{2}}{\\sqrt{3}} + \\dfrac{1}{\\sqrt{6}} = \\dfrac{\\sqrt{3}}{\\sqrt{2}}$"},
{"answer": true, "statement": "$\\sqrt{2}-\\dfrac{1}{\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}$"},
{"answer": true, "statement": "$3/5$ est une solution de l'équation $5x+4=7$."},
{"answer": true, "statement": "$3/2$ est une solution de l'équation $4x+1=7$."},
{"answer": false, "statement": "$3/4$ est une solution de l'équation $4x-3=6$."},
{"answer": true, "statement": "$5/6 - 3/4=1/12$."},
{"answer": true, "statement": "$7/9 + 5/6=29/18$."},
{"answer": true, "statement": "$11/4 - 13/8=9/8$."},
{"answer": true, "statement": "$5/14 + 5/6=25/21$."},
{"answer": false, "statement": "$1/6 - 3/4=7/12$."},
{"answer": false, "statement": "$3/9 + 5/6=22/18$."},
{"answer": false, "statement": "$7/4 + 13/8=25/8$."},
{"answer": false, "statement": "$3/14 + 5/6=43/42$."},
{"answer": true, "statement": "$5\\times 13 = 65$ et $7\\times 19 = 133$."},
{"answer": true, "statement": "$5\\times 13 = 65$ ou $7\\times 15 = 115$."},
{"answer": false, "statement": "$5\\times 13 = 65$ et $7\\times 15 = 115$."},
{"answer": true, "statement": "Soit $z\\in \\mathbb C$. On a $\\overline{z}^2=\\overline{z^2}$."},
{"answer": true, "statement": "Soient $z$ et $z'$ deux complexes. On a $\\overline{z+z'} = \\overline z + \\overline {z'}$."},
{"answer": false, "statement": "Soient $z$ et $z'$ deux complexes. On a $|z+z'| = |z| + |z'|$."},
{"answer": true, "statement": "$(2+i)(1+2i) =  5i$"},
{"answer": false, "statement": "$(2+i)(1-2i) =  -i$"},
{"answer": false, "statement": "$|2+i| =  \\sqrt 3$."},
{"answer": true, "statement": "$|2+i| =  \\sqrt 5$."},
{"answer": false, "statement": "$|4+i| \\geq |3+3i|$."},
{"answer": true, "statement": "$|3+i| \\geq |2+2i|$."},
{"answer": true, "statement": "$\\dfrac{1+i}{1-i} = i$."},
{"answer": true, "statement": "$\\dfrac{1}{i} = -i$."},
{"answer": false, "statement": "$\\dfrac{i-1}{i+1} = -i$."},
{"answer": false, "statement": "$\\dfrac{2i-3}{2i+3} = \\dfrac{5-6i}{13}$."},
{"answer": true, "statement": "Le trinôme $3X^2-6X+3$ a une racine double dans $\\mathbb R$."},
{"answer": true, "statement": "Le trinôme $8X^2-8X+2$ a une racine double dans $\\mathbb R$."},
{"answer": true, "statement": "Le trinôme $2X^2-4X+2$ a une racine double dans $\\mathbb R$."},
{"answer": false, "statement": "Le trinôme $3x^2-11x+9$ a une racine double dans $\\mathbb R$."},
{"answer": false, "statement": "Si $x$ est un réel, alors $(\\sqrt{x^2})^3 = x^3$."},
{"answer": false, "statement": "$(a+b)^3 = a^3+3ab+b^3$"},
{"answer": false, "statement": "$(a+b)^3 = a^3+3ab+3ba+b^3$"},
{"answer": true, "statement": "$(a+b)^3 = a^3+3a^2b+3ab^2+b^3$"},
{"answer": true, "statement": "$a^3-b^3 = (a-b)(a^2+ab+b^2)$."},
{"answer": false, "statement": "La dérivée de $x\\mapsto \\sin(3+2x)$ est $x\\mapsto 3\\cos(3+2x)$."},
{"answer": true, "statement": "La dérivée de $x\\mapsto \\cos(3-2x)$ est $x\\mapsto 2\\sin(3-2x)$."},
{"answer": true, "statement": "La dérivée de $x\\mapsto \\sin(3x+2)$ est $x\\mapsto 3\\cos(3x+2)$."},
{"answer": false, "statement": "La dérivée de $x\\mapsto \\cos(2x+3)$ est $x\\mapsto 2\\sin(2x+3)$."},
{"answer": false, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\sqrt(x^2-5)$ est $]-\\infty,-\\sqrt{5}[\\cup ]\\sqrt{5},+\\infty[$."},
{"answer": true, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\sqrt(5-x^2)$ est $[-\\sqrt{5},\\sqrt{5}]$."},
{"answer": true, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\sqrt(5-\\ln x)$ est $]0,e^5]$."},
{"answer": false, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\sqrt(\\ln x)$ est $\\mathbb R_+^*$."},
{"answer": true, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\ln(5-\\sqrt  x)$ est $[0,25[$."},
{"answer": false, "statement": "Soit $x\\in \\mathbb R$. Le domaine de définition de l'expression $\\sqrt(2-\\ln x)$ est $[0,e^2[$."},
{"answer": false, "statement": "$\\lim \\dfrac{3\\sqrt n +n}{2 \\sqrt n + n} = \\dfrac{3}{2}$."},
{"answer": false, "statement": "La fonction $f : \\mathbb R^* \\to \\mathbb R, x\\mapsto 1/x$ est décroissante.","comment": "Preuve: $-1<1$ et pourtant $f(-1)<f(1)$."},
{"answer": false, "statement": "$\\sqrt{68} = 4 \\sqrt{17}$."},
{"answer": true, "statement": "$\\sqrt{48} = 4 \\sqrt{3}$."},
{"answer": true, "statement": "$\\dfrac{2+\\sqrt 3}{2-\\sqrt 3} = 7+4\\sqrt 3$."},
{"answer": false, "statement": "$\\dfrac{\\sqrt 2+3}{\\sqrt 2-3} = \\dfrac{5+6\\sqrt 2}{5}$."},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff xy^2=yx^2$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff \\cos^2(x)+\\sin^2(y)=1$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff xy^2=yx^2$ coïncide avec l'égalité.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff xe^{y}=ye^{x}$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\square$ sur $\\mathbb R^2$ définie par $(x,y)\\square (x',y') \\iff x=x'$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\square$ sur $\\mathbb R^2$ définie par $(x,y)\\square (x',y') \\iff x^2=x'^2$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\square$ sur $\\mathbb R^2$ définie par $(x,y)\\square (x',y') \\iff x=-y'$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\heartsuit$ sur $\\mathbb R^2$ définie par $y\\heartsuit x \\iff x+3y=5$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\bullet$ sur $\\mathbb R^2$ définie par $x\\bullet y \\iff (\\exists \\lambda\\in\\mathbb R, x+3y=\\lambda))$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2+m^2 = 2nm+2n$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2-m^2 = 2nm+2n$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2+m^2 = 2nm$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff 3 | (n-m)$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb N,n=km))$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb N,n=k+m))$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb Z,n=k+m))$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n|m$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff |x-1|\\leq 1$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff xy^2=yx^2$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\star$ sur un ensemble $E$ dont le graphe est la diagonale $\\Delta_E:=\\{(t,t)\\:|\\: t\\in E\\}$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\star$ sur un ensemble $E$ dont le graphe est $E\\times E$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\star$ sur un ensemble $E$ non vide dont le graphe est vide est une relation d'équivalence","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ dont le graphe est $\\Gamma_\\star=\\{(x,y)\\in\\mathbb R^2\\:|\\: y=x^2\\}$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ dont le graphe est $\\Gamma_\\star=\\mathbb R \\times \\{0\\}$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff x\\in \\mathbb Z$ ou $y\\in \\mathbb Z$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ dont le graphe est $\\Gamma_\\star=\\mathbb Z^2$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\diamond$ sur $\\mathbb R$ dont le graphe est $\\Gamma_\\diamond=\\{(x,y)\\in\\mathbb R^2\\:|\\: x=y\\text{ ou } x=-y\\}$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\dagger$ sur $\\mathbb R$ dont le graphe est $\\Gamma_\\dagger=\\{(x,y)\\in\\mathbb R^2\\:|\\: x^2+y^2\\leq 2\\}$ est une relation d'équivalence","answer":false},
{"statement": "La relation $\\odot$ sur $\\mathbb R$ définie par $x\\odot y \\iff \\cos^2(x)+\\sin^2(y)=1$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff xy^2=yx^2$ coïncide avec l'égalité.","answer":false},
{"statement": "La relation $\\otimes$ sur $\\mathbb R$ définie par $x\\otimes y \\iff xe^{y}=ye^{x}$ est une relation d'équivalence","answer":true},
{"statement": "La relation $\\square$ sur $\\mathbb R^2$ définie par $(x,y)\\square (x',y') \\iff x=x'$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\oplus$ sur $\\mathbb R^2$ définie par $(x,y)\\oplus (x',y') \\iff x^2=x'^2$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\square$ sur $\\mathbb R^2$ définie par $(x,y)\\square (x',y') \\iff x=-y'$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\heartsuit$ sur $\\mathbb R$ définie par $x\\heartsuit y \\iff x+3y=5$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\bullet$ sur $\\mathbb R$ définie par $x\\bullet y \\iff (\\exists \\lambda\\in\\mathcal R, x+3y=\\lambda))$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2+m^2 = 2nm+2n$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2-m^2 = 2nm+2n$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n^2+m^2 = 2nm$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff 3 | (n-m)$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb N,n=km))$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb N,n=k+m))$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff (\\exists k\\in\\mathbb Z,n=k+m))$ est une relation d'équivalence.","answer":true},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb N$ définie par $n\\mathcal R m \\iff n|m$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb R$ définie par $x\\star y \\iff |x-1|\\leq 1$ est une relation d'équivalence.","answer":false},
{"statement": "La relation $\\triangleleft$ sur $\\mathbb R$ définie par $x\\triangleleft y \\iff x^2\\leq y^2$ est une relation d'ordre.","answer":false},
{"statement": "La relation $\\triangleleft$ sur $\\mathbb R$ définie par $x\\triangleleft y \\iff x^3\\leq y^3$ est une relation d'ordre.","answer":true},
{"statement": "La relation $\\preccurlyeq$ sur $\\mathbb N^*$ définie par $p\\preccurlyeq q \\iff \\exists k\\in\\mathbb N^*,q=p^k$ est une relation d'ordre.","answer":true},
{"statement": "La relation de divisibilité sur $\\mathbb N^*$ est une relation d'ordre.","answer":true},
{"statement": "La relation de divisibilité sur $\\mathbb N$ est une relation d'ordre.","answer":true},
{"statement": "La relation de divisibilité sur $\\mathbb N$ est une relation d'ordre total.","answer":false},
{"statement": "La relation de divisibilité sur $\\mathbb N^*$ n'a pas de plus grand élément.","answer":true},
{"statement": "La relation de divisibilité sur $\\mathbb N$ n'a pas de plus grand élément.","answer":false},
{"statement": "La relation de divisibilité sur $\\{1,2,3,4\\}$ n'a pas de plus grand élément.","answer":true},
{"statement": "La relation de divisibilité sur $\\{0,1,2,3,4\\}$ n'a pas de plus grand élément.","answer":false},
{"statement": "L'ensemble $\\{0,1,2,3,4\\}$ muni de la relation de divisibilité admet $4$ comme plus grand élément.","answer":false},
{"statement": "L'ensemble $\\{0,1,2,3,4\\}$ muni de la relation de divisibilité admet $0$ comme plus petit élément.","answer":false},
{"statement": "L'ensemble $\\{0,1,2,3,4\\}$ muni de la relation de divisibilité admet $1$ comme plus petit élément.","answer":true},
{"statement": "L'ensemble $\\{0,1,2,3,4\\}$ muni de la relation de divisibilité admet $0$ comme plus grand élément.","answer":true},
{"statement": "La relation de divisibilité sur $\\mathbb Z$ est une relation d'ordre.","answer":false,"comment": "Pas antisymétrique."},
{"statement": "Si $E$ est un ensemble, la relation d'inclusion sur $\\mathcal P(E)$ est une relation d'ordre.","answer":true},
{"statement": "Si $E$ est un ensemble, la relation d'inclusion sur $\\mathcal P(E)$ est une relation d'ordre total.","answer":false},
{"statement": "Si $E$ est un ensemble, la relation d'inclusion sur $\\mathcal P(E)$ possède un plus grand élément","answer":true},
{"statement": "La relation $\\lessdot$ sur $\\mathbb R^2$ définie par $(x,y) \\lessdot (x',y') \\iff (x\\leq x' \\text{ ou } y\\leq y')$ est une relation d'ordre.","answer":false},
{"statement": "La relation $\\mathcal R$ sur $\\mathbb R^2$ définie par $(x,y) \\mathcal R (x',y') \\iff (x\\leq x' \\text{ et } y\\leq y')$ est une relation d'ordre.","answer":true},
{"statement": "La relation $\\star$ sur $\\mathbb N$ définie par $x\\star y \\iff x-y\\geq 1$ est une relation d'ordre.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb N$ définie par $x\\star y \\iff \\exists k\\in\\mathbb N, x^2=k-y^2$ est une relation d'ordre.","answer":false},
{"statement": "La relation $\\star$ sur $\\mathbb N$ définie par $x\\star y \\iff \\exists k\\in\\mathbb N, x^2=k+y^2$ est une relation d'ordre.","answer":true},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$. L'assertion «$f$ est une rotation» signifie «$\\exists \\Omega\\in\\mathcal P, \\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":true},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$. L'assertion «$f$ est une rotation» signifie «$\\exists \\Omega\\in\\mathcal P, \\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z+\\omega)-\\omega$.»","answer":false},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$ et $\\Omega\\in\\mathcal P$. L'assertion «$f$ est rotation de centre $\\Omega$» signifie «$\\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":true},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$ et $\\theta\\in\\mathbb R$. L'assertion «$f$ est rotation d'angle $\\theta$» signifie «$\\exists \\omega\\in\\mathbb C, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":true},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$, $\\Omega\\in\\mathcal P$ et $\\theta\\in\\mathbb R$. L'assertion «$f$ est rotation d'angle $\\theta$ et centre $\\Omega$» signifie «$\\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":true},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$. L'assertion «$f$ est la rotation de centre $\\Omega$ et d'angle $\\theta$» signifie «$\\exists \\Omega\\in\\mathcal P, \\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":false},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$ et soit $\\Omega\\in\\mathcal P$. L'assertion «$f$ est une rotation de centre $\\Omega$» signifie «$\\exists \\Omega\\in\\mathcal P, \\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":false},
{"statement": "Soit $f:\\mathcal P\\to \\mathcal P$ et soit $\\theta\\in\\mathbb R$. L'assertion «$f$ est une rotation d'angle $\\theta$» signifie «$\\exists \\Omega\\in\\mathcal P, \\exists \\theta\\in\\mathbb R, \\forall z\\in\\mathbb C, \\tilde f(z)=e^{i\\theta}(z-\\omega)+\\omega$.»","answer":false},
{"statement": "Deux rotations commutent toujours.","answer":false},
{"statement": "Deux rotations de même centre commutent toujours.","answer":true},
{"statement": "La composée de deux rotations est une rotation.","answer":false},
{"statement": "La composée de deux rotations de même centre est une rotation de même centre.","answer":true},
{"statement": "La composée de deux rotations de centre distincts est une rotation.","answer":false},
{"statement": "La composée de deux rotations de centre distincts est une translation.","answer":false},
{"statement": "Soient $\\theta, \\theta'\\in\\mathbb R$. La composée de deux rotations d'angles $\\theta$ et $\\theta'$ est une rotation d'angle $\\theta+\\theta'$.","answer":false},
{"statement": "Une rotation conserve l'alignement.","answer":true},
{"statement": "Une rotation conserve les distances.","answer":true},
{"statement": "Une rotation conserve les rapports de longueurs (autrement dit les proportions).","answer":true},
{"statement": "Une rotation conserve les milieux.","answer":true},
{"statement": "Une rotation envoie une droite sur une droite parallèle.","answer":false},
{"answer": true, "statement": "$\\begin{cases}5x-y &= 1 \\\\ 2x+3y &= 2\\end{cases}$ admet une unique solution."},
{"answer": false, "statement": "$\\begin{cases}2x+3y &= 1 \\\\ 4x+6y &= 2\\end{cases}$ admet une unique solution."},
{"answer": true, "statement": "$\\begin{cases}-x+3y &= -1 \\\\ 2x-6y &= 0\\end{cases}$ n'admet pas de solutions."},
{"answer": false, "statement": "$\\begin{cases}2x+3y &= 1 \\\\ 4x+6y &= 2\\end{cases}$ n'admet pas de solutions."},
{"answer": true, "statement": "$\\begin{cases}2x+y &= 1 \\\\ x-y &= 2\\end{cases}$ admet des solutions."},
{"answer": true, "statement": "$\\begin{cases}2x+3y &= 1 \\\\ 4x+6y &= 2\\end{cases}$ admet des solutions."},
{"answer": false, "statement": "$\\begin{cases}3x+2y &= 1 \\\\ 6x+4y &= 1\\end{cases}$ admet des solutions."},
{"answer": true, "statement": "$\\begin{cases}x-3y &= 1 \\\\ 2x-6y &= 2\\end{cases}$ admet une infinité de solutions."},
{"answer": false, "statement": "$\\begin{cases}2x+3y &= 1 \\\\ x+3y &= 2\\end{cases}$ admet une infinité de solutions."},
{"answer": true, "statement": "$\\begin{cases}2x-y &= 3 \\\\ 4x-2y &= 6\\end{cases}$ admet plusieurs solutions."},
{"answer": false, "statement": "$\\begin{cases}2x-y &= 6 \\\\ x-2y &= 3\\end{cases}$ admet plusieurs solutions."},
{"answer": true, "statement": "$\\begin{pmatrix}1\\\\1\\end{pmatrix}$ est une solution de $\\begin{cases}6x-2y &= 4 \\\\ 2x+y &= 3\\end{cases}$."},
{"answer": true, "statement": "$\\begin{pmatrix}1\\\\-1\\end{pmatrix}$ est une solution de $\\begin{cases}2x+y &= 1 \\\\ x-y &= 2\\end{cases}$."},
{"answer": false, "statement": "$\\begin{pmatrix}2\\\\1\\end{pmatrix}$ est une solution de $\\begin{cases}x-2y &= 0 \\\\ -x+y &= 1\\end{cases}$."},
{"answer": true, "statement": "$\\begin{pmatrix}1\\\\1\\end{pmatrix}$ est l'unique solution de $\\begin{cases}3x-2y &= 1 \\\\ x+y &= 2\\end{cases}$."},
{"answer": false, "statement": "$\\begin{pmatrix}2\\\\1\\end{pmatrix}$ est l'unique solution de $\\begin{cases}x-3y &= -1 \\\\ -2x+6y &= 2\\end{cases}$."},
{"answer": true, "statement": "L'ensemble des solutions de $\\begin{cases}2x-y &= 3 \\\\ 4x-2y &= 6\\end{cases}$ est une droite."},
{"answer": false, "statement": "L'ensemble des solutions de $\\begin{cases}2x-y &= 6 \\\\ x-2y &= 3\\end{cases}$ est une droite."},
{"answer": true, "statement": "L'ensemble des solutions de $\\begin{cases}x-y &= 1 \\\\ x+y &= 2\\end{cases}$ contient un seul élément."},
{"answer": false, "statement": "L'ensemble des solutions de $\\begin{cases}2x-4y &= -2 \\\\ -x+2y &= 1\\end{cases}$ contient un seul élément."},
{"answer": false, "statement": "L'ensemble des solutions de $\\begin{cases} -x+2y &= 1 \\\\ 2x-4y &= 3 \\end{cases}$ contient un seul élément."},
{"answer": true, "statement": "L'ensemble des solutions de $\\begin{cases} -x+2y &= 1 \\\\ 2x-4y &= 3 \\end{cases}$ est vide."},
{"answer": false, "statement": "L'ensemble des solutions de $\\begin{cases} -x+2y &= 1 \\\\ 2x-y &= 1 \\end{cases}$ est vide."},
{"answer": true, "statement": "L'ensemble des solutions de $\\begin{cases} x+y &= 4 \\\\ x-y &= 2 \\end{cases}$ est $\\left\\{\\begin{pmatrix}3\\\\1\\end{pmatrix}\\right\\}$."},
{"answer": false, "statement": "L'ensemble des solutions de $\\begin{cases} x+y &= 4 \\\\ x-y &= 2 \\end{cases}$ est $\\left\\{\\begin{pmatrix}1\\\\3\\end{pmatrix}\\right\\}$."},
{"answer": true, "statement": "$\\begin{cases} 2x-6y &=0 \\\\ -x+3y &= -1\\end{cases}$ est équivalent à $0=1$."},
{"answer": true, "statement": "$\\begin{cases}-x+3y &= -1 \\\\ 2x-6y &= 2\\end{cases}$ est équivalent à l'équation $x-3y = 1$."},
{"answer": true, "statement": "$\\begin{cases}5x-2y &= 3 \\\\ x+2y &= 3\\end{cases}$ est équivalent au système $\\begin{cases}x&=1 \\\\ y&=1\\end{cases}$."},
{"answer": false, "statement": "$\\begin{cases}4x-y &= 2 \\\\ x+y &= 2\\end{cases}$ est équivalent au système $\\begin{cases}x&=1 \\\\ y&=2\\end{cases}$."},
{"answer": true, "statement": "$\\cos(a+b)=\\cos(a)\\cos(b)-\\sin(a)\\sin(b)$."},
{"answer": false, "statement": "$\\cos(a+b)=\\sin(a)\\sin(b)+\\cos(a)\\cos(b)$."},
{"answer": true, "statement": "$\\cos(a-b)=\\cos(a)\\cos(b)+\\sin(a)\\sin(b)$."},
{"answer": false, "statement": "$\\sin(a+b)=\\sin(a)\\sin(b)+\\cos(a)\\cos(b)$."},
{"answer": true, "statement": "$\\sin(a-b)=\\sin(a)\\cos(b)-\\sin(b)\\cos(a)$."},
{"answer": false, "statement": "$\\sin(a-b)=\\cos(a)\\sin(b)-\\sin(a)\\cos(b)$."},
{"answer": false, "statement": "$\\cos(2a)=2\\sin^2(a)-1$."},
{"answer": false, "statement": "$\\cos(2a)=1-2\\cos^2(a)$."},
{"answer": true, "statement": "$\\cos(2a)=\\cos^2(a)-\\sin^2(a)$."},
{"answer": false, "statement": "$\\cos(2a)=\\cos^2(a)+\\sin^2(a)$."},
{"answer": true, "statement": "$\\sin(2a)=2\\sin(a)\\cos(a)$."},
{"answer": false, "statement": "$\\sin(2a)=2\\sin^2(a)-1$."},
{"answer": true, "statement": "$\\cos^2(a)=\\dfrac{1+\\cos(2a)}{2}$."},
{"answer": false, "statement": "$\\sin^2(a)=\\dfrac{1+\\sin(2a)}{2}$."},
{"answer": true, "statement": "$\\sin(a+\\pi)=-\\sin(a)$."},
{"answer": true, "statement": "$\\sin(a+\\dfrac{\\pi}{2})=\\cos(a)$."},
{"answer": false, "statement": "$\\sin(a+2\\pi)=-\\sin(a)$."},
{"answer": false, "statement": "$\\sin(-a)=\\sin(a)$."},
{"answer": true, "statement": "$\\cos(a+\\pi)=-\\cos(a)$."},
{"answer": true, "statement": "$\\cos(a+\\dfrac{\\pi}{2})=-\\sin(a)$."},
{"answer": true, "statement": "$\\cos(-a)=\\cos(a)$."},
{"answer": false, "statement": "$\\cos(a+\\pi)=\\cos(a)$."},
{"answer": false, "statement": "$\\cos(a+\\dfrac{\\pi}{2})=\\sin(a)$."},
{"answer": false, "statement": "$\\cos(a+2\\pi)=-\\cos(a)$."},
{"answer": false, "statement": "$\\cos(-a)=-\\cos(a)$."},
{"answer": true, "statement": "$\\cos(a-\\dfrac{\\pi}{2})=\\sin(a)$."},
{"answer": true, "statement": "$\\cos(\\dfrac{\\pi}{2}-a)=\\sin(a)$."},
{"answer": false, "statement": "$\\sin(a-\\dfrac{\\pi}{2})=\\cos(a)$."},
{"answer": true, "statement": "$\\sin(\\dfrac{\\pi}{2}-a)=\\cos(a)$."},
{"answer": true, "statement": "$\\cos(7\\pi/6)=-\\sqrt{3}/2$."},
{"answer": true, "statement": "$\\cos(5\\pi/4)=-1/\\sqrt{2}$."},
{"answer": true, "statement": "$\\cos(4\\pi/3)=-1/2$."},
{"answer": false, "statement": "$\\cos(11\\pi/6)=-1/2$."},
{"answer": false, "statement": "$\\sin(2\\pi/3)=\\sqrt{2}/2$."},
{"answer": false, "statement": "$\\sin(5\\pi/6)=-\\sqrt{3}/2$."},
{"answer": false, "statement": "$\\sin(\\pi)=-1$."},
{"answer": false, "statement": "$\\sin(7\\pi/6)=-\\sqrt{2}/2$."},
{"answer": false, "statement": "$\\sin(5\\pi/4)=-1/2$."},
{"answer": false, "statement": "$\\sin(4\\pi/3)=\\sqrt{3}/2$."},
{"answer": true, "statement": "$\\cos(11\\pi/6)=\\sqrt{3}/2$."},
{"answer": true, "statement": "$\\sin(2\\pi/3)=\\sqrt{3}/2$."},
{"answer": true, "statement": "$\\sin(3\\pi/4)=1/\\sqrt{2}$."},
{"answer": true, "statement": "$\\sin(5\\pi/6)=1/2$."},
{"answer": true, "statement": "$\\sin(\\pi)=0$."},
{"answer": false, "statement": "$\\cos(a-b)=\\cos(a)\\cos(b)-\\sin(a)\\sin(b)$."},
{"answer": true, "statement": "$\\sin(a+b)=\\cos(a)\\sin(b)+\\sin(a)\\cos(b)$."},
{"answer": true, "statement": "$\\cos(2a)=2\\cos^2(a)-1$."},
{"answer": true, "statement": "$\\cos(2a)=1-2\\sin^2(a)$."},
{"answer": true, "statement": "$\\sin^2(a)=\\dfrac{1-\\cos(2a)}{2}$."},
{"answer": false, "statement": "$\\cos^2(a)=\\dfrac{1-\\cos(2a)}{2}$."},
{"answer": true, "statement": "$\\sin(a+2\\pi)=\\sin(a)$."},
{"answer": true, "statement": "$\\sin(-a)=-\\sin(a)$."},
{"answer": false, "statement": "$\\sin(a+\\pi)=\\sin(a)$."},
{"answer": false, "statement": "$\\sin(a+\\dfrac{\\pi}{2})=-\\cos(a)$."},
{"answer": true, "statement": "$\\sin(7\\pi/6)=-1/2$."},
{"answer": true, "statement": "$\\sin(5\\pi/4)=-1/\\sqrt{2}$."},
{"answer": true, "statement": "$\\sin(4\\pi/3)=-\\sqrt{3}/2$."},
{"answer": false, "statement": "$\\cos(7\\pi/6)=-1/2$."},
{"answer": false, "statement": "$\\cos(5\\pi/4)=\\sqrt{2}/2$."},
{"answer": false, "statement": "$\\cos(4\\pi/3)=-\\sqrt{3}/2$."},
{"answer": true, "statement": "$\\cos(3\\pi/2)=0$."},
{"answer": true, "statement": "$\\cos(5\\pi/3)=1/2$."},
{"answer": true, "statement": "$\\cos(7\\pi/4)=\\sqrt{2}/2$."},
{"answer": false, "statement": "$\\cos(3\\pi/2)=-1$."},
{"answer": false, "statement": "$\\cos(5\\pi/3)=-\\sqrt{3}/2$."},
{"answer": false, "statement": "$\\cos(7\\pi/4)=1/2$."},
{"answer": false, "statement": "$\\sin(3\\pi/4)=1/2$."},
{"answer": true, "statement": "$\\cos(a+2\\pi)=\\cos(a)$."},
{"answer": true,"statement": "$\\tan(a+b)=\\dfrac{\\tan(a) + \\tan(b)}{1-\\tan(a)\\tan(b)}$."},
{"answer": false,"statement": "$\\tan(a+b)=\\dfrac{\\tan(a) + \\tan(b)}{1+\\tan(a)\\tan(b)}$."},
{"answer": false,"statement": "$\\tan(a+b)=\\dfrac{\\tan(a) - \\tan(b)}{1+\\tan(a)\\tan(b)}$."},
{"answer": true,"statement": "$\\tan(a-b)=\\dfrac{\\tan(a) - \\tan(b)}{1+\\tan(a)\\tan(b)}$."},
{"answer": true,"statement": "$\\tan(0)=0$."},
{"answer": true,"statement": "$\\tan(\\pi/6)=\\sqrt{3}/3$."},
{"answer": true,"statement": "$\\tan(\\pi/3)=\\sqrt{3}$."},
{"answer": true,"statement": "$\\tan(\\pi/2)$ n'est pas défini."},
{"answer": true,"statement": "$\\tan(2\\pi/3)=-\\sqrt{3}$."},
{"answer": true,"statement": "$\\tan(3\\pi/4)=-1$."},
{"answer": true,"statement": "$\\tan(3\\pi/4)$ est défini."},
{"answer": false,"statement": "$\\tan(3\\pi/4)=1$."},
{"answer": false,"statement": "$\\tan(3\\pi/4)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(5\\pi/6)=\\sqrt{3}/3$."},
{"answer": false,"statement": "$\\tan(\\pi)=1$."},
{"answer": false,"statement": "$\\tan(\\pi)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(7\\pi/6)=-\\sqrt{3}/3$."},
{"answer": false,"statement": "$\\tan(5\\pi/4)=-1$."},
{"answer": false,"statement": "$\\tan(5\\pi/4)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(4\\pi/3)=-\\sqrt{3}$."},
{"answer": false,"statement": "$\\tan(3\\pi/2)$ est défini."},
{"answer": false,"statement": "$\\tan(5\\pi/3)=\\sqrt{3}$."},
{"answer": false,"statement": "$\\tan(7\\pi/4)=1$."},
{"answer": false,"statement": "$\\tan(7\\pi/4)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(11\\pi/6)=\\sqrt{3}/3$."},
{"answer": true,"statement": "$\\tan(a)=\\tan(b)$  $\\Leftrightarrow \\left(a\\equiv b [\\pi]\\right)$."},
{"answer": true,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": true,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftarrow \\left(a\\equiv -b [2\\pi]\\right)$."},
{"answer": true,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": true,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftarrow \\left(a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Rightarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Rightarrow \\left(a\\equiv -b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Rightarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Rightarrow \\left(a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftarrow \\left(a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": true,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\cos(x)=\\dfrac{1-t^2}{1+t^2}$."},
{"answer": true,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\sin(x)=\\dfrac{2t}{1+t^2}$."},
{"answer": false,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\tan(x)=\\dfrac{2t}{1+t^2}$."},
{"answer": false,"statement": "$\\tan(a-b)=\\dfrac{\\tan(a) - \\tan(b)}{1-\\tan(a)\\tan(b)}$."},
{"answer": false,"statement": "$\\tan(a-b)=\\dfrac{\\tan(a) + \\tan(b)}{1-\\tan(a)\\tan(b)}$."},
{"answer": true,"statement": "$\\tan(0)$ est défini."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftarrow \\left(a\\equiv -b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ et } a\\equiv -b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ et } a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ ou } a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ ou } a\\equiv -b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\tan(a)=\\tan(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ ou } a\\equiv -b [2\\pi]\\right)$."},
{"answer": true,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\tan(x)=\\dfrac{2t}{1-t^2}$."},
{"answer": false,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\cos(x)=\\dfrac{1+t^2}{1-t^2}$."},
{"answer": false,"statement": "Si $t=\\tan\\dfrac{x}{2}$, on a $\\sin(x)=\\dfrac{2t}{1-t^2}$."},
{"answer": true,"statement": "$\\cos(a)=\\cos(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ ou } a\\equiv -b [2\\pi]\\right)$."},
{"answer": true,"statement": "$\\sin(a)=\\sin(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\text{ ou } a\\equiv \\pi-b [2\\pi]\\right)$."},
{"answer": false,"statement": "$\\tan(a)=\\tan(b)$  $\\Leftrightarrow \\left(a\\equiv b [2\\pi]\\right)$."},
{"answer": true,"statement": "$\\tan(5\\pi/6)=-\\sqrt{3}/3$."},
{"answer": true,"statement": "$\\tan(\\pi)=0$."},
{"answer": true,"statement": "$\\tan(\\pi)$ est défini."},
{"answer": true,"statement": "$\\tan(7\\pi/6)=\\sqrt{3}/3$."},
{"answer": true,"statement": "$\\tan(\\pi/4)=1$."},
{"answer": true,"statement": "$\\tan(\\pi/4)$ est défini."},
{"answer": true,"statement": "$\\tan(5\\pi/4)=1$."},
{"answer": true,"statement": "$\\tan(5\\pi/4)$ est défini."},
{"answer": true,"statement": "$\\tan(4\\pi/3)=\\sqrt{3}$."},
{"answer": true,"statement": "$\\tan(3\\pi/2)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(\\pi/2)$ est défini."},
{"answer": false,"statement": "$\\tan(2\\pi/3)=-\\sqrt{3}/3$."},
{"answer": true,"statement": "$\\tan(5\\pi/3)=-\\sqrt{3}$."},
{"answer": true,"statement": "$\\tan(7\\pi/4)=-1$."},
{"answer": true,"statement": "$\\tan(7\\pi/4)$ est défini."},
{"answer": true,"statement": "$\\tan(11\\pi/6)=-\\sqrt{3}/3$."},
{"answer": false,"statement": "$\\tan(0)=1$."},
{"answer": false,"statement": "$\\tan(0)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(\\pi/6)=\\sqrt{3}$."},
{"answer": false,"statement": "$\\tan(\\pi/4)$ n'est pas défini."},
{"answer": false,"statement": "$\\tan(\\pi/3)=\\sqrt{3}/3$."},
{"statement":"Le fait que deux assertions $P$ et $Q$ sont incompatibles peut se traduire, au choix, par l'assertion $P \\implies \\text{non}\\ (Q)$ ou par $Q \\implies \\text{non}\\  (P)$.","answer":true},
{"statement":"Si $f : E \\to F$ est une application et $A \\subset B \\subset E$, alors $f[A] \\subset f[B]$.","answer":true},
{"statement":"Si $f : E \\to F$ est une application et $A \\neq  B \\subset E$, alors $f[A] \\neq f[B]$.","answer":false},
{"statement":"Toute application $f : \\llbracket 1, 10 \\rrbracket \\to \\llbracket 1, 20 \\rrbracket$ est injective.","answer":false},
{"statement":"Aucune application $f : \\llbracket 1, 10 \\rrbracket \\to \\llbracket 1, 20 \\rrbracket$ n'est surjective.","answer":true},
{"statement":"Les deux solutions de l'équation $x^2 + 3ix + 1 = 0$ sont conjuguées.","answer":false},
{"statement":"Le nombre $12^{2019} + 13^{2019}$ est divisible par $25$.","answer":true},
{"statement":"$(n+1)! \\eq{n\\to+\\infty}  n!$.","answer":false},
{"statement":"Si $c_n$ est le nombre de chiffres de $n$ dans l'écriture décimale de l'entier $n$, alors $c_n \\eq{n\\to+\\infty}  \\log n$. ","answer":false},
{"statement":"Soit $(u_n)_{n\\in\\N}$ une suite réelle. \\newline Alors  $1 = \\underset{n\\to+\\infty}o(u_n)$ si et seulement si $u_n \\xrightarrow[n\\to+\\infty]{} +\\infty$.","answer":false},
{"statement":"Si $f(x)=\\frac1{x+1}+\\underset{x\\to+\\infty}o\\left(\\frac1{x^2}\\right)$, alors $f(x)\\underset{x\\to+\\infty}{\\sim}\\frac1{x}$.","answer":true},
{"statement":"Si $u_n \\eq{n\\to+\\infty} v_n$ et que $(v_n)_n$ est strictement positive à partir d'un certain rang, alors $(u_n)_n$ est strictement positive à partir d'un certain rang.","answer":true},
{"statement":"Si $u_n \\eq{n\\to+\\infty}  v_n$ et que $(v_n)_n$ est décroissante à partir d'un certain rang, alors $(u_n)_n$ est décroissante à partir d'un certain rang.","answer":false},
{"statement":"Si $u_n \\eq{n\\to+\\infty}  v_n$ et que $(v_n)_n$ est strictement décroissante à partir d'un certain rang, alors $(u_n)_n$ est strictement décroissante à partir d'un certain rang.","answer":false},
{"statement":"Si une suite à valeurs entières converge, elle est stationnaire. ","answer":true},
{"statement":"Si le produit de deux suites tend vers $+\\infty$, alors au moins l'une des deux tend également vers $+\\infty$.","answer":false},
{"statement":"Il existe $\\theta\\in\\R$ tel que la suite $(\\sin(n\\theta))_{n\\in\\N}$ converge. ","answer":true},
{"statement":"La suite $(u_n)$ définie par $\\left\\{ \\begin{array}{@{} l @{}} u_0 = \\frac 32 \\\\ \\forall n\\in \\N, u_{n+1}=-3u_{n}+10 \\end{array} \\right.$ converge.","answer":false},
{"statement":"La suite $(u_n)$ définie par $\\left\\{ \\begin{array}{@{} l @{}} u_0 = \\frac 52 \\\\ \\forall n\\in \\N, u_{n+1}=-3u_{n}+10 \\end{array} \\right.$ converge.","answer":true},
{"statement":"Une suite réelle de limite $\\geq 0$ est positive à partir d'un certain rang.","answer":false},
{"statement":"Une suite monotone converge.","answer":false},
{"statement":"Une suite bornée converge.","answer":false},
{"statement":"Deux suites bornées $(u_n){n\\in\\N}$ et $(v_n){n\\in\\N}$ telles que $u_n-v_n \\xrightarrow[n\\to+\\infty]{}  0$ convergent vers la même limite.","answer":false},
{"statement":"Si les deux sous-suites $(u_{2n}){n\\in\\N}$ et $(u{2n+1}){n\\in\\N}$ convergent vers la même limite alors $(u{n})_{n\\in\\N}$ converge.","answer":true},
{"statement":"Soit $(u_n){n\\in\\N}$ une suite croissante. On suppose que $(u{2n}){n\\in\\N}$ converge. Alors la suite $(u_n){n\\in\\N}$ converge.","answer":true},
{"statement":"Si la série $\\sum_n u_n$ converge, alors la suite $(u_n)_{n\\in\\N}$ converge. ","answer":true},
{"statement":"$\\sum_{k=1}^n\\frac1{k} \\eq{n\\to+\\infty} \\ln n$.","answer":true},
{"statement":"La série $\\sum_n \\rho^n$ converge si et seulement si $|\\rho|<1$. ","answer":true},
{"statement":"La série de terme général $\\cfrac1{\\sqrt{n}\\ln n}$ converge.","answer":false},
{"statement":"Le produit de deux fonctions croissantes est croissant.","answer":false},
{"statement":"La fonction $x\\mapsto \\lfloor x\\rfloor$ est impaire.","answer":false},
{"statement":"Si $f$ est périodique, alors $g\\circ f$ est périodique.","answer":true},
{"statement":"Pour tout $x\\in\\mathbb{R}$, $\\exp(x)\\geq 1+x+\\cfrac{x^2}{2}$.","answer":false},
{"statement":"$\\cos: \\left[ - \\frac \\pi 2, \\frac \\pi 2 \\right]\\to[-1,1]$ est une bijection.","answer":false},
{"statement":"Dès que la formule a un sens, on a $\\arctan(\\tan x) = x$.","answer":false},
{"statement":"Dès que la formule a un sens, on a $\\tan(\\arctan x) = x$.","answer":true},
{"statement":"Sur $\\R^*$, la dérivée de $x\\mapsto \\ln|x|$ est $x\\mapsto\\cfrac1{|x|}$.","answer":false},
{"statement":"Si la fonction $\\exp\\circ f$ admet une limite finie en $+\\infty$, alors la fonction $f$ admet une limite finie en $+\\infty$.","answer":false},
{"statement":"Une fonction monotone admet une limite en tout point intérieur à son domaine de définition.","answer":false},
{"statement":"Étant donné une fonction $f : \\R \\to \\R$, il existe une fonction $g : \\R \\to \\R$ croissante telle que $f \\leq g$.","answer":false},
{"statement":"Une fonction continue périodique est bornée.","answer":true},
{"statement":"Une fonction bornée atteint ses bornes.","answer":false},
{"statement":"Une fonction continue bornée atteint ses bornes.","answer":false},
{"statement":"Une fonction polynomiale $\\R \\to \\R$ de degré impair admet au moins une racine réelle.","answer":true},
{"statement":"La fonction $x\\mapsto \\cfrac{x}{|x|}$ est prolongeable par continuité en $0$.","answer":false},
{"statement":"La fonction $x\\mapsto \\cfrac{\\cos x-1}{|x|}$ est prolongeable par continuité en $0$.","answer":true},
{"statement":"La dérivée en $0$ de $x\\mapsto \\ln(1+(\\tan x)^2)$ est $0$.","answer":true},
{"statement":"Une fonction de classe $C^1$ est dérivable.","answer":true},
{"statement":"La fonction $x\\mapsto x|x|$ est de classe $C^1$.","answer":true},
{"statement":"Une fonction de classe $C^1$ sur un segment est lipschitzienne.","answer":true},
{"statement":"Soit $f:\\R\\to\\R$ dérivable. La fonction $|f|$ est dérivable si et seulement si $f$ ne s'annule pas.","answer":false},
{"statement":"Soit $f : \\R \\to \\R$ dérivable. \\newline Si la dérivée de $f$ s'annule en $0$, alors $f$ admet un extremum local en $0$.","answer":false},
{"statement":"Soit $f : \\left[ 0, 1 \\right] \\to \\R$ dérivable. \\newline Si $f$ admet un maximum en $0$, alors $f'(0)=0$.","answer":false},
{"statement":"Soit $f : \\R \\to \\R$ dérivable.\\newline Si $f$ admet un maximum en $0$, alors $f'(0)=0$.","answer":true},
{"statement":"Si une fonction réelle $f$ est de classe $C^n$ et admet $n+1$ zéros distincts sur un intervalle, alors sa dérivée $n$-ième s'annule au moins une fois.","answer":true},
{"statement":"Une primitive de $x\\mapsto\\ln x$ est $x\\mapsto x\\ln x -x-1$.","answer":true},
{"statement":"Soit $f$, $g\\in C^0([0,1])$. Alors, $\\left|\\int_0^1f(t)g(t)dt\\right|\\leq \\|f\\|_\\infty \\left|\\int_0^1g(t)dt\\right|$.","answer":false},
{"statement":"Soit $f$, $g\\in C^0([0,1])$. Alors, $\\left|\\int_0^1f(t)g(t)dt\\right|\\leq \\|f\\|_\\infty \\int_0^1 \\left\\lvert g(t) \\right\\rvert dt$.","answer":true},
{"statement":"Une fonction $f\\in C^0([0,1],\\mathbb{R})$ admet exactement une primitive d'intégrale nulle sur le segment~$[0,1]$.","answer":true},
{"statement":"Une fonction $f$ dérivable vérifie $f'=2f$ si et seulement si, pour tout $x$, il existe $C$ tel que $f(x)=Ce^{2x}$.","answer":false},
{"statement":"Les solutions de $y'+a\\,y=0$ sont de la forme $x\\mapsto C e^{ax}$ avec $C\\in\\mathbb{R}$.","answer":false},
{"statement":"Les solutions de $y'+2y=0$ sont deux à deux proportionnelles.","answer":true},
{"statement":"Les solutions de $y''+2y'=0$ sont deux à deux proportionnelles.","answer":false},
{"statement":"Les fonctions $x\\mapsto \\sin(x)$ et $x\\mapsto \\sin(2x)$ sont solutions d'une même équation linéaire d'ordre $2$ à coefficients constants réels.","answer":false},
{"statement":"Pour tous $a\\leq b$ entiers, le cardinal de  $\\{ a,\\ldots, b\\}=b-a$.","answer":false},
{"statement":"Il y a $50$ entiers pairs dans l'intervalle $[0,100]$.","answer":false},
{"statement":"Le produit de sept entiers consécutifs est toujours divisible par $720$.","answer":true},
{"statement":"Il est possible de construire $2^n$ parties différentes de $\\llbracket 1, 2n \\rrbracket$ à $n$ éléments, donc $\\binom {2n}n \\geq 2^n$.","answer":true},
{"statement":"Une matrice et sa transposée ont même noyau.","answer":false},
{"statement":"Pour $A,B\\in M_n(\\mathbb{R})$, $\\tr(AB)=\\tr(BA)$.","answer":true},
{"statement":"Pour $A,B,C\\in M_n(\\mathbb{R})$, $\\tr(ABC)=\\tr(ACB)$.","answer":false},
{"statement":"Deux systèmes linéaires ont les mêmes ensembles de solutions si et seulement si leurs matrices augmentées sont équivalentes par lignes.","answer":false},
{"statement":"Multiplier $A$ à droite par une matrice d'opération élémentaire fait agir l'opération élémentaire correspondante sur ses colonnes. ","answer":true},
{"statement":"Soit $\\alpha_1, \\ldots, \\alpha_n \\in \\R^*$.\\newline La matrice «antidiagonale» $\\begin{pmatrix} 0 & \\cdots & 0 & \\alpha_1 \\\\ 0 & \\cdots & \\alpha_2 & 0 \\\\ \\vdots & \\iddots & \\vdots & \\vdots \\\\ \\alpha_n & \\cdots & 0 & 0 \\end{pmatrix}$ est inversible.","answer":true},
{"statement":"Le système $\\left\\{ \\begin{array}{@{} c @{\\,}c@{\\,} c @{\\,}c@{\\,} c @{\\,}c@{\\,} c @{}} x &+& 2y &+& 3z &=& 13 \\\\ 4x &+& 5y &+& 6z &=& 6 \\\\ 7x &+& 8y &+& 9z &=& 2019 \\end{array} \\right.$ a une unique solution.","answer":false},
{"statement":"Si le système $AX = Y$ admet des solutions, alors $A$ est inversible.","answer":false},
{"statement":"Soit $A, B, C \\in M_n(K)$. Alors la matrice $\\begin{pmatrix} A & B \\\\ 0 & C \\end{pmatrix} \\in M_{2n}(K)$ est inversible si et seulement si $A$ et $C$ sont inversibles.","answer":true},
{"statement":"L'ensemble $M_n(\\R) \\setminus GL_n(\\R)$ des matrices non-inversibles est un sous-espace vectoriel de $M_n(\\mathbb{K})$.","answer":false},
{"statement":"L'ensemble constitué des suites monotones est un sous-espace vectoriel de l'espace vectoriel $\\R^\\N$.","answer":false},
{"statement":"L'ensemble des solutions de l'équation différentielle $y'' + 2y' + 3y = 0$ est un sous-espace vectoriel de $C^\\infty(\\R)$.","answer":true},
{"statement":"L'ensemble des solutions de l'équation différentielle $y'' + 2y' + 3y = 1$ est un sous-espace vectoriel de $C^\\infty(\\R)$.","answer":false},
{"statement":"L'ensemble des suites bornées est un sous-espace vectoriel de $\\mathbb{R}^{\\mathbb{N}}$.","answer":true},
{"statement":"L'intersection de deux sous-espaces vectoriels d'un même espace vectoriel est un sous-espace vectoriel.","answer":true},
{"statement":"La réunion de deux sous-espaces vectoriels d'un même espace vectoriel est un sous-espace vectoriel.","answer":false},
{"statement":"La somme de deux sous-espaces vectoriels d'un même espace vectoriel est un sous-espace vectoriel.","answer":true},
{"statement":"Soit $F$, $G$, $H$ trois sous-espaces vectoriels d'un meme espace vectoriel tels que $F + G = F + H$. Alors $G = H$.","answer":false},
{"statement":"Soit $F$, $G$ deux sous-espaces vectoriels de $E$ tels que $F+G=F\\cap G$. On a alors l'égalité $F=G$.","answer":true},
{"statement":"Soit $F$, $G$ deux sous-espaces vectoriels de $E$ tels que $F+G=F$. On a alors l'égalité $F=G$.","answer":false},
{"statement":"Une famille de vecteurs deux à deux non colinéaires est libre.","answer":false},
{"statement":"La famille des fonctions $x\\mapsto x$, $x\\mapsto -x$ et $x\\mapsto |x|$ est libre.","answer":false},
{"statement":"La famille des fonctions $x\\mapsto 1$, $x\\mapsto |x|$ et $x\\mapsto |x-1|$ est libre.","answer":true},
{"statement":"Si $(e_1,\\ldots,e_n)$ est une famille libre d'un espace vectoriel $E$ et $x\\in E$, alors la famille $(e_1+x,\\ldots,e_n+x)$ est libre.","answer":false},
{"statement":"Si $(e_1,\\ldots,e_n)$ et $(f_1,\\ldots,f_n)$ sont des familles libres de $E$, alors $(e_1+f_1,\\ldots,e_n+f_n)$ est une famille libre.","answer":false},
{"statement":"Si $u\\in \\mathcal{L}(E)$, alors $\\im u$ et $\\ker u$ sont supplémentaires.","answer":false},
{"statement":"Si $u,v\\in\\mathcal{L}(E)$, alors $\\im(u+v) \\subset \\im u+ \\im(v)$.","answer":true},
{"statement":"Si $u\\in \\mathcal{L}(E)$ et que $G$ et $H$ sont deux sous-espaces vectoriels de $E$, alors on a l'égalité $u[G+H]=u[G]+u[H]$.","answer":true},
{"statement":"Soit $u, v \\in \\mathcal{L}(E)$. Alors $u\\circ v=0$ si et seulement si $\\im v \\subset \\ker u$.","answer":true},
{"statement":"Soit $p\\in \\mathcal{L}(E)$. Alors $p$ est un projecteur si et seulement si la différence $\\id_E - p$ est un projecteur.","answer":true},
{"statement":"Si $p\\in\\mathcal{L}(E)$ est un projecteur, alors $\\im p= \\ker (p-\\id_E)$.","answer":true},
{"statement":"Si $s\\in\\mathcal{L}(E)$ est une symétrie, alors $\\im s= \\ker (s-\\id_E)$.","answer":false},
{"statement":"De toute famille génératrice d'un espace vectoriel de dimension finie, on peut extraire une base.","answer":true},
{"statement":"Tout vecteur d'un espace vectoriel de dimension finie peut être complété en une base.","answer":false},
{"statement":"Soit $F$ un sous-espace d'un espace vectoriel $E$ de dimension finie. Alors $E=F$ si, et seulement si, $\\dim E=\\dim F$.","answer":true},
{"statement":"Si $(f_1,\\ldots,f_n)$ est une base de $F$, que $(g_1,\\ldots,g_p)$ est une base de $G$ et enfin que $(f_1,\\ldots,f_n,g_1,\\ldots,g_p)$ est une base de $E$, alors $E=F\\oplus G$.","answer":true},
{"statement":"Si $u\\in \\mathcal{L}(E,F)$ est une application linéaire injective entre deux espaces vectoriels de dimension finie, alors $\\dim E \\leq\\dim F$.","answer":true},
{"statement":"Soit $E$ et $F$ deux espaces vectoriels de dimension finie tels que $\\dim E \\geq \\dim F$. Alors toute application linéaire $E \\to F$ est surjective.","answer":false},
{"statement":"Soit $E$ un espace vectoriel de dimension $n$ possédant une base $\\mathscr B$.\\newline  On a $\\Mat_{\\mathscr B}(\\id_E) = I_n$.","answer":true},
{"statement":"Soit $E$ un espace vectoriel de dimension $n$ possédant deux bases $\\mathscr B, \\mathscr C$.\\newline  On a $\\Mat_{\\mathscr B,\\mathscr C}(\\id_E) = I_n$.","answer":false},
{"statement":"Une matrice et sa transposée ont même rang.","answer":true},
{"statement":"Pour $A,B\\in M_n(\\mathbb{R})$, $\\rg(AB)\\leq \\rg B$.","answer":true},
{"statement":"Si $A\\in M_{2,3}(\\R)$ et $B \\in M_{3,2}(\\R)$ sont deux matrices vérifiant $AB \\in GL_2(\\R)$, alors $\\rg A = \\rg B = 2$.","answer":true},
{"statement":"Il existe une base de $M_n(\\mathbb{R})$ composée de matrices de rang $1$.","answer":true},
{"statement":"Il existe une base de $M_n(\\mathbb{R})$ composée de matrices inversibles.","answer":true},
{"statement":"Un polynôme constant est de degré nul.","answer":false},
{"statement":"Si $(P,Q,R,S)$ est une base de $\\R_3[X]$, alors les degrés des quatre polynômes sont tous distincts.","answer":false},
{"statement":"$X^2+X+1$ est irréductible dans $\\mathbb{R}[X]$.","answer":true},
{"statement":"$X^2+X+1$ est irréductible dans $\\mathbb{C}[X]$.","answer":false},
{"statement":"$X^3+X+1$ est irréductible dans $\\mathbb{R}[X]$.","answer":false},
{"statement":"Le nombre $1$ est racine simple de $1+X+X^2+X^3+X^4+X^5$.","answer":true},
{"statement":"Si $P$ est un polynôme réel vérifiant $\\forall n \\in \\Z, P(n) \\in \\Z$, alors les coefficients de $P$ sont entiers.","answer":false},
{"statement":"Soit $\\vec x$ et $\\vec y$ deux vecteurs d'un espace euclidien. Alors $\\vec x$ et $\\vec y$ sont orthogonaux si et seulement si $\\left\\|\\vec x+ \\vec y\\right\\|^2=\\left\\|\\vec x\\right\\|^2+\\left\\|\\vec y\\right\\|^2$.","answer":true},
{"statement":"Toute famille orthonormale d'un espace euclidien est libre.","answer":true},
{"statement":"Aucun vecteur de $\\overrightarrow {\\mathscr P}$ n'est orthogonal à tous les vecteurs de $\\overrightarrow {\\mathscr P}$.","answer":false},
{"statement":"Deux droites disjointes dans le plan sont parallèles.","answer":true},
{"statement":"Deux droites disjointes dans l'espace sont parallèles.","answer":false},
{"statement":"Deux plans disjoints dans l'espace sont parallèles.","answer":true},
{"statement":"Étant donné deux droites quelconques de $\\R^3$, il existe une droite simultanément perpendiculaire aux deux.","answer":true},
{"statement":"On considère un point $O$ et deux droites $\\Delta$, $\\Delta'$ du plan. Alors il existe une rotation envoyant $\\Delta$ sur $\\Delta'$ si et seulement si $d(O,\\Delta) = d(O,\\Delta')$.","answer":true},
{"statement":"Soit $p_1$, ..., $p_n\\in\\mathbb{R}_+$ de somme $1$. Il existe une unique probabilité $\\mathbb{P}$ sur l'univers $\\Omega=\\{1,\\ldots,n\\}$ telle que $\\mathbb{P}(\\{k\\})=p_k$.","answer":true},
{"statement":"Soit $A$ de probabilité non nulle. Alors, pour tout $B\\in \\mathscr P(\\Omega)$, $\\mathbb{P}(B|A)\\leq \\mathbb{P}(B)$.","answer":false},
{"statement":"Dans un espace probabilisé $(\\Omega, P)$ fini, tout événement $A$ indépendant de $\\Omega \\setminus A$  est de probabilité $0$ ou $1$.","answer":true},
{"statement":"Soit $A$ et $B$ deux événements. Alors $\\mathbb{P}(A\\cup B)=\\mathbb{P}(A)+\\mathbb{P}(B)$ si et seulement si $A$ et $B$ sont indépendants.","answer":false},
{"statement":"Soit $A$, $B$ et $C$ des événements tels que $A$ et $B$ sont indépendants et $B$ et $C$ sont indépendants. Alors $A$ et $C$ sont indépendants.","answer":false},
{"statement":"Trois événements indépendants sont indépendants deux à deux. ","answer":true},
{"statement":"La somme de deux variables de loi de Bernoulli de paramètre $p$ suit une loi binomiale de paramètre $2$ et $p$.","answer":false},
{"statement":"Si $X\\sim \\mathcal{U}(\\{0,\\ldots,n\\})$, alors $n-X\\sim \\mathcal{U}(\\{0,\\ldots,n\\})$.","answer":true},
{"statement":"Si $X\\sim \\mathcal{B}(n,p)$, alors $n-X\\sim \\mathcal{B}(n,p)$.","answer":false},
{"statement":"Si une variable aléatoire $X : \\Omega \\to \\mathbb{R}$ est d'espérance nulle, alors la variable $e^X$ est d'espérance $1$.","answer":false},
{"statement":"Soit $X: \\Omega \\to \\mathbb{R}$ une variable aléatoire réelle. Alors, pour tout $a\\in \\mathbb{R}$, on a l'inégalité $\\mathbb{E}(X)\\geq a\\,\\mathbb{P}(X\\geq a)$.","answer":false},
{"answer":true,"statement":"Tout rectangle dont les diagonales sont perpendiculaires est un losange.","comment":"Oui car c'est alors en réalité un carré."},
{"answer":false,"statement":"Tout trapèze ayant un angle droit est un rectangle."},
{"answer":false,"statement":"Tout trapèze ayant deux angles droits est un rectangle."},
{"answer":true,"statement":"Tout trapèze isocèle ayant un angle droit est un rectangle."},
{"answer":false,"statement":"Tout trapèze isocèle ayant un angle droit est un carré."},
{"answer":false,"statement":"Tout quadrilatère dont les diagonales sont perpendiculaires et de même longueur est un carré.","comment":"Non: un tel quadrilatère est appelé un 'pseudo-carré'."},
{"answer":true,"statement":"Tout losange avec un angle droit est un carré."},
{"answer":true,"statement":"Tout losange avec un angle droit a des diagonales de même longueur."},
{"answer":false,"statement":"Tout losange avec deux angles égaux est un carré."},
{"answer":true,"statement":"Tout losange avec deux angles consécutifs égaux est un carré."},
{"answer":false,"statement":"Tout trapèze avec deux angles égaux est un trapèze isocèle."},
{"answer":false,"statement":"Tout trapèze avec deux angles consécutifs égaux est un trapèze isocèle."},
{"answer":false,"statement":"Tout trapèze avec deux bases de même longueur est un rectangle."},
{"answer":false,"statement":"Tout trapèze avec deux bases de même longueur est un losange."},
{"answer":true,"statement":"Tout trapèze avec deux bases de même longueur est un parallélogramme."},
{"answer":false,"statement":"Tout quadrilatère ayant au moins un axe de symétrie est un losange ou bien un trapèze isocèle.","comment":"Non, ça peut aussi être ce que l'on appelle un 'cerf-volant'."},
{"answer":false,"statement":"Tout quadrilatère ayant exactement un axe de symétrie est un trapèze isocèle.","comment":"Non, ça peut aussi être ce que l'on appelle un 'cerf-volant'."},
{"answer":false,"statement":"Tout carré possède exactement deux axes de symétrie."},
{"answer":false,"statement":"Tout carré possède exactement huit axes de symétrie."},
{"answer":true,"statement":"Tout carré possède exactement quatre axes de symétrie."},
{"answer":false,"statement":"Tout rectangle possède exactement quatre axes de symétrie."},
{"answer":false,"statement":"Tout rectangle possède exactement deux axes de symétrie.","comment":"Ce pourrait être un carré."},
{"answer":true,"statement":"Tout rectangle possède au moins deux axes de symétrie."},
{"answer":false,"statement":"Tout losange possède exactement deux axes de symétrie.","comment":"Ce pourrait être un carré."},
{"answer":true,"statement":"Tout losange possède au moins deux axes de symétrie."},
{"answer":false,"statement":"Tout losange possède exactement quatre axes de symétrie."},
{"answer":false,"statement":"Tout pentagone possède cinq axes de symétrie."},
{"answer":true,"statement":"Tout pentagone régulier possède cinq axes de symétrie."},
{"answer":true,"statement":"Tout triangle équilatéral possède trois axes de symétrie."},
{"answer":false,"statement":"Tout triangle isocèle possède exactement un axe de symétrie.","comment":"Il pourrait être équilatéral."},
{"answer":true,"statement":"Tout triangle isocèle possède au moins un axe de symétrie."},
{"answer":false,"statement":"Les axes de symétrie d'un hexagone régulier passent par ses sommets."},
{"answer":true,"statement":"Les axes de symétrie d'un pentagone régulier passent par ses sommets."},
{"answer":false,"statement":"Les axes de symétrie d'un carré  passent par ses sommets."},
{"answer":true,"statement":"Les axes de symétrie d'un triangle équilatéral  passent par ses sommets."},
{"answer":false,"statement":"Les axes de symétrie d'un carré sont ses diagonales."},
{"answer":false,"statement":"Les axes de symétrie d'un losange sont ses diagonales","comment":"Si le losange est un carré, il y en a d'autres."},
{"answer":false,"statement":"Tout trapèze possède au moins un axe de symétrie."},
{"answer":true,"statement":"Tout trapèze isocèle possède au moins un axe de symétrie."},
{"answer":false,"statement":"Tout parallélogramme possède un axe de symétrie."},
{"answer":true,"statement":"Tout parallélogramme possède un centre de symétrie."},
{"answer":true,"statement":"Tout losange possède un centre de symétrie."},
{"answer":true,"statement":"Tout rectangle possède un centre de symétrie."},
{"answer":true,"statement":"Tout carré possède un centre de symétrie."},
{"answer":false,"statement":"Tout trapèze possède un centre de symétrie."},
{"answer":false,"statement":"Tout trapèze isocèle possède un centre de symétrie."},
{"answer":true,"statement":"$7 \\times 13 = 91$"},
{"answer":true,"statement":"$8 \\times 13 = 104$"},
{"answer":true,"statement":"$12 \\times 7 = 84$"},
{"answer":false,"statement":"$12 \\times 7 = 74$"},
{"answer":true,"statement":"$14 \\times 6 = 84$"},
{"answer":true,"statement":"$7 \\times 13 = 91$"},
{"answer":true,"statement":"$5 \\times 17 = 85$"},
{"answer":false,"statement":"$5 \\times 17 = 95$"},
{"answer":true,"statement":"$18 \\times 4 = 72$"},
{"answer":false,"statement":"$18 \\times 4 = 76$"},
{"answer":false,"statement":"$18 \\times 5 = 80$"},
{"answer":false,"statement":"$17 \\times 6 = 92$"},
{"answer":false,"statement":"$23 \\times 3 = 79$"},
{"answer":true,"statement":"$23 \\times 4 = 92$"},
{"answer":true,"statement":"$21 \\times 5 = 105$"},
{"answer":true,"statement":"$11 \\times 8 = 88$"},
{"answer":false,"statement":"$11 \\times 11 = 111$"},
{"answer":true,"statement":"$12 \\times 12 = 144$"},
{"answer":false,"statement":"$13 \\times 13 = 179$"},
{"answer":true,"statement":"$13 \\times 13 = 169$"},
{"answer":false,"statement":"$13 \\times 13 = 159$"},
{"answer":true,"statement":"$14 \\times 14 = 196$"},
{"answer":false,"statement":"$14 \\times 14 = 206$"},
{"answer":true,"statement":"$15 \\times 15 = 225$"},
{"answer":false,"statement":"$15 \\times 15 = 255$"},
{"answer":true,"statement":"$16 \\times 16 = 256$"},
{"answer":true,"statement":"$8 \\times 32 = 256$"},
{"answer":false,"statement":"$8 \\times 16 = 256$"},
{"answer":false,"statement":"$11 \\times 13 = 133$"},
{"answer":true,"statement":"$12 \\times 11 = 132$"},
{"answer":true,"statement":"$12 \\times 14 = 168$"},
{"answer":false,"statement":"$12 \\times 14 = 158$"},
{"answer":false,"statement":"$11 \\times 14 = 164$"},
{"answer":true,"statement":"$(a+1)(a+2)=a^2+3a+2$"},
{"answer":true,"statement":"$(a-1)(a+2)=a^2+a-2$"},
{"answer":true,"statement":"$(a+1)(a-2)=a^2-a-2$"},
{"answer":true,"statement":"$(a-1)(a-2)=a^2-3a+2$"},
{"answer":true,"statement":"$(a+1)(a+3)=a^2+4a+3$"},
{"answer":true,"statement":"$(a-1)(a+3)=a^2+2a-3$"},
{"answer":true,"statement":"$(a+1)(a-3)=a^2-2a-3$"},
{"answer":true,"statement":"$(a-1)(a-3)=a^2-4a+3$"},
{"answer":true,"statement":"$(a+2)(a+3)=a^2+5a+6$"},
{"answer":true,"statement":"$(a-2)(a+3)=a^2+a-6$"},
{"answer":true,"statement":"$(a+2)(a-3)=a^2-a-6$"},
{"answer":true,"statement":"$(a-2)(a-3)=a^2-5a+6$"},
{"answer":true,"statement":"$(a+1)(a+1)=a^2+2a+1$"},
{"answer":true,"statement":"$(a-1)(a-1)=a^2-2a+1$"},
{"answer":true,"statement":"$(a+2)(a+2)=a^2+4a+4$"},
{"answer":true,"statement":"$(a-2)(a-2)=a^2-4a+4$"},
{"answer":false,"statement":"$(a+1)(a+2)=a^2+2a+2$"},
{"answer":false,"statement":"$(a-1)(a+2)=a^2+2a-2$"},
{"answer":false,"statement":"$(a+1)(a-2)=a^2-a+2$"},
{"answer":false,"statement":"$(a-1)(a-2)=a^2-3a-2$"},
{"answer":false,"statement":"$(a+1)(a+3)=a^2+a+3$"},
{"answer":false,"statement":"$(a-1)(a+3)=a^2+2a+3$"},
{"answer":false,"statement":"$(a+1)(a-3)=a^2+a-3$"},
{"answer":false,"statement":"$(a-1)(a-3)=a^2-2a+3$"},
{"answer":false,"statement":"$(a+2)(a+3)=a^2+6a+6$"},
{"answer":false,"statement":"$(a-2)(a+3)=a^2+a+6$"},
{"answer":false,"statement":"$(a+2)(a-3)=a^2+a-6$"},
{"answer":false,"statement":"$(a-2)(a-3)=a^2+5a+6$"},
{"answer":false,"statement":"$(a+1)(a+1)=a^2+2a+2$"},
{"answer":false,"statement":"$(a-1)(a-1)=a^2-2a-1$"},
{"answer":false,"statement":"$(a+2)(a+2)=a^2+2a+4$"},
{"answer":false,"statement":"$(a-2)(a-2)=a^2-4a-4$"},
{"answer":true,"statement":"$(2a+1)(a+1)=2a^2+3a+1$"},
{"answer":true,"statement":"$(2a-1)(a+1)=2a^2+a-1$"},
{"answer":true,"statement":"$(2a+1)(a-1)=2a^2-a-1$"},
{"answer":true,"statement":"$(2a-1)(a-1)=2a^2-3a+1$"},
{"answer":true,"statement":"$(2a+1)(a+3)=2a^2+7a+3$"},
{"answer":true,"statement":"$(2a+1)(a-3)=2a^2-5a-3$"},
{"answer":true,"statement":"$(2a-1)(a+3)=2a^2+5a-3$"},
{"answer":true,"statement":"$(2a-1)(a-3)=2a^2-7a+3$"},
{"answer":false,"statement":"$(2a+1)(a+1)=2a^2+3a+2$"},
{"answer":false,"statement":"$(2a-1)(a+1)=2a^2-a-1$"},
{"answer":false,"statement":"$(2a+1)(a-1)=2a^2-2a-1$"},
{"answer":false,"statement":"$(2a-1)(a-1)=2a^2-3a-1$"},
{"answer":false,"statement":"$(2a+1)(a+3)=2a^2+4a+3$"},
{"answer":false,"statement":"$(2a+1)(a-3)=2a^2-6a-3$"},
{"answer":false,"statement":"$(2a-1)(a+3)=2a^2+7a-3$"},
{"answer":false,"statement":"$(2a-1)(a-3)=2a^2-5a+3$"},
{"answer":true,"statement":"$(a+1)(b+1)=ab+a+b+1$"},
{"answer":true,"statement":"$(a+1)(b-1)=ab-a+b-1$"},
{"answer":true,"statement":"$(a-1)(b+1)=ab+a-b-1$"},
{"answer":true,"statement":"$(a-1)(b-1)=ab-a-b+1$"},
{"answer":true,"statement":"$(a+2)(b+1)=ab+a+2b+2$"},
{"answer":true,"statement":"$(a+2)(b-1)=ab-a+2b-2$"},
{"answer":true,"statement":"$(a-2)(b+1)=ab+a-2b-2$"},
{"answer":true,"statement":"$(a-2)(b-1)=ab-a-2b+2$"},
{"answer":true,"statement":"$(a+b)(a+1)=a^2+ab+a+b$"},
{"answer":true,"statement":"$(a+b)(a-1)=a^2+ab-a-b$"},
{"answer":true,"statement":"$(a-b)(a+1)=a^2-ab+a-b$"},
{"answer":true,"statement":"$(a-b)(a-1)=a^2-ab-a+b$"},
{"answer":true,"statement":"$(a-2b)(a+2)=a^2-2ab+2a-4b$"},
{"answer":true,"statement":"$(a+2b)(a-3)=a^2+2ab-3a-6b$"},
{"answer":true,"statement":"$(2a-3b)(3a+2)=6a^2-9ab+4a-6b$"},
{"answer":true,"statement":"$(3a-2b)(2a+3)=6a^2-4ab+9a-6b$"},
{"answer":true,"statement":"$(a+b)(a-b)=a^2-b^2$"},
{"answer":true,"statement":"$(a+2b)(a+3b)=a^2+5ab+6b^2$"},
{"answer":true,"statement":"$(2a+b)(a-b)=2a^2-ab-b^2$"},
{"answer":true,"statement":"$(2a-b)(3a+b)=6a^2-ab-b^2$"},
{"answer":true,"statement":"$(2a+b)(a-3b)=2a^2-5ab-3b^2$"},
{"answer":false,"statement":"$(a+1)(b+1)=ab+2a+2b+1$"},
{"answer":false,"statement":"$(a+1)(b-1)=ab+a+b-1$"},
{"answer":false,"statement":"$(a-1)(b+1)=ab-a-b-1$"},
{"answer":false,"statement":"$(a-1)(b-1)=ab-a-b-1$"},
{"answer":false,"statement":"$(a+2)(b+1)=ab+a+b+2$"},
{"answer":false,"statement":"$(a+2)(b-1)=ab-a+2b+2$"},
{"answer":false,"statement":"$(a-2)(b+1)=ab+a+2b-2$"},
{"answer":false,"statement":"$(a-2)(b-1)=ab-a-2b-2$"},
{"answer":false,"statement":"$(a+b)(a+1)=a^2+2ab+a+b$"},
{"answer":false,"statement":"$(a+b)(a-1)=a^2+ab+a-b$"},
{"answer":false,"statement":"$(a-b)(a+1)=a^2+ab+a-b$"},
{"answer":false,"statement":"$(a-b)(a-1)=a^2-ab+a+b$"},
{"answer":false,"statement":"$(a-2b)(a+2)=a^2-2ab-2a-4b$"},
{"answer":false,"statement":"$(a+2b)(a-3)=a^2+2ab+3a-6b$"},
{"answer":false,"statement":"$(2a-3b)(3a+2)=6a^2-9ab-4a-6b$"},
{"answer":false,"statement":"$(3a-2b)(2a+3)=6a^2-4ab+9a+6b$"},
{"answer":false,"statement":"$(a+b)(a-b)=a^2+b^2$"},
{"answer":false,"statement":"$(a+2b)(a+3b)=a^2+6ab+5b^2$"},
{"answer":false,"statement":"$(2a+b)(a-b)=2a^2+ab-b^2$"},
{"answer":false,"statement":"$(2a-b)(3a+b)=6a^2-5ab-b^2$"},
{"answer":false,"statement":"$(2a+b)(a-3b)=2a^2-5ab+3b^2$"},
{"answer":false,"statement":"Les diagonales d'un pentagone régulier se coupent en leur milieu."},
{"answer":true,"statement":"Tout losange possède au moins deux angles égaux."},
{"answer":true,"statement":"Tout parallélogramme possède au moins deux angles égaux."},
{"answer":true,"statement":"$(a+1)^3=a^3+3a^2+3a+1$."},
{"answer":true,"statement":"$(a+1)^3=1+3a+3a^2+a^3$."},
{"answer":false,"statement":"$(a+2)^3$ $=a^3+3a^2+3a+2$."},
{"answer":false,"statement":"$(a+2)^3$ $=a^3+3a^2+3a+8$."},
{"answer":true,"statement":"$(a+2)^3$ $=a^3+6a^2+12a+8$."},
{"answer":true,"statement":"$(a+3)^3$ $=a^3+9a^2+27a+27$."},
{"answer":false,"statement":"$(a+1)^3=1+a+a^2+a^3$."},
{"answer":false,"statement":"$(a+1)^3=a^3+2a^2+2a+1$."},
{"answer":true,"statement":"$(a-1)^3=a^3-3a^2+3a-1$."},
{"answer":false,"statement":"$(a-1)^3=a^3-3a^2-3a+1$."},
{"answer":false,"statement":"$(a-1)^3=1-3a+3a^2-a^3$."},
{"answer":true,"statement":"$(1-a)^3=1-3a+3a^2-a^3$."},
{"answer":true,"statement":"$(a-b)^2=(b-a)^2$."},
{"answer":false,"statement":"$(a-1)^3=(1-a)^3$."},
{"answer":true,"statement":"$(a+b)^3$ $=a^3+3a^2b+3ab^2+b^3$."},
{"answer":false,"statement":"$(a+b)^3$ $=a^3+3a^2b+3ba^2+b^3$.","comment":"Attention, $a^2b=ba^2$ !"},
{"answer":true,"statement":"$(a-b)^3$ $=a^3-3a^2b+3ab^2-b^3$."},
{"answer":true,"statement":"$(a-b)^3$ $=a^3-3a^2b-3ab^2+b^3$."},
{"answer":false,"statement":"$(a-b)^3$ $=a^3-3ab^2+3a^2b-b^3$."},
{"answer":true,"statement":"$a^3-b^3$ $=(a-b)(a^2+ab+b^2)$."},
{"answer":false,"statement":"$a^3-b^3$ $=(a-b)(a^2+a+1)$."},
{"answer":false,"statement":"$a^3-b^3$ $=(a-b)(a^2-ab+b^2)$."},
{"answer":true,"statement":"$a^3-1=(a-1)(a^2+a+1)$."},
{"answer":true,"statement":"$a^3+b^3=(a+b)(a^2-ab+b^2)$."},
{"answer":false,"statement":"$a^3+b^3=(a+b)(a^2+ab+b^2)$."},
{"answer":true,"statement":"$(a+b)^4$ $=a^4+4a^3b+6a^2b^2+4ab^3+b^4$."},
{"answer":false,"statement":"$(a+b)^4$ $=a^4+4a^3+6a^2+4a+1$."},
{"answer":false,"statement":"$(a+b)^4$ $=a^4+4a^3b+4a^2b^2$ $+4ab^3+b^4$."},
{"answer":true,"statement":"$(a-b)^4$ $=a^4-4a^3b+6a^2b^2$ $-4ab^3+b^4$."},
{"answer":false,"statement":"$(a-b)^4$ $=a^4-4a^3b-6a^2b^2$ $-4ab^3+b^4$."},
{"answer":true,"statement":"$(a+2)^4$ $=a^4+8a^3b+24a^2+32a+16$."},
{"answer":true,"statement":"$(a+3)^4$ $=a^4+12a^3b+54a^2+108a+81$."},
{"answer":false,"statement":"$(a+3)^4$ $=a^4+12a^3b+54a^2+108a+27$."},
{"answer":false,"statement":"$(a+2)^4$ $=a^4+4a^3b+6a^2+4a+2$."},
{"answer":true,"statement":"$(a+b)^5$ $=a^5+5a^4b+10a^3b^2$ $+10a^2b^3+5ab^4+b^5$."},
{"answer":true,"statement":"$(a+1)^5$ $=a^5+5a^4+10a^3$ $+10a^2+5a+1$."},
{"answer": false, "statement": "Toute fonction affine est linéaire.","comment":""},
{"answer": true, "statement": "Toute fonction linéaire est affine.","comment":""},
{"answer": true, "statement": "Toute fonction constante est affine.","comment":""},
{"answer": false, "statement": "Toute fonction constante est linéaire.","comment":""},
{"answer": true, "statement": "La fonction nulle est linéaire.","comment":""},
{"answer": true, "statement": "la fonction nulle est affine.","comment":""},
{"answer": false, "statement": "La fonction $x\\mapsto -3x+5$ est linéaire.","comment":"L'image de $0$ n'est pas $0$."},
{"answer": true, "statement": "La fonction $x\\mapsto -3x+5$ est affine.","comment":""},
{"answer": true, "statement": "L'image de $2$ par la fonction $x\\mapsto 2x+7$ est $11$.","comment":""},
{"answer": true, "statement": "L'image de $3$ par la fonction $x\\mapsto -5x+2$ est $-13$.","comment":""},
{"answer": false, "statement": "L'image de $3$ par la fonction $x\\mapsto 9x+7$ est $33$.","comment":""},
{"answer": false, "statement": "L'image de $7$ par la fonction $x\\mapsto 3x+11$ est $22$.","comment":""},
{"answer": true, "statement": "L'image de $11$ par la fonction $x\\mapsto 9x+22$ est $121$.","comment":""},
{"answer": true, "statement": "L'image de $12$ par la fonction $x\\mapsto 7x-35$ est $49$.","comment":""},
{"answer": false, "statement": "L'image de $8$ par la fonction $x\\mapsto 11x-59$ est $39$.","comment":""},
{"answer": false, "statement": "L'antécédent de $7$ par la fonction $x\\mapsto 2x+3$ est $17$.","comment":""},
{"answer": true, "statement": "L'antécédent de $7$ par la fonction $x\\mapsto 2x+3$ est $2$.","comment":""},
{"answer": true, "statement": "L'antécédent de $9$ par la fonction $x\\mapsto 5x+7$ est $2/5$.","comment":""},
{"answer": true, "statement": "L'antécédent de $12$ par la fonction $x\\mapsto 5x+7$ est $1$.","comment":""},
{"answer": true, "statement": "L'antécédent de $13$ par la fonction $x\\mapsto 5x+7$ est $6/5$.","comment":""},
{"answer": false, "statement": "L'antécédent de $13$ par la fonction $x\\mapsto 5x+7$ est $5/6$.","comment":""},
{"answer": false, "statement": "L'antécédent de $11$ par la fonction $x\\mapsto 5x+7$ est $2/5$.","comment":""},
{"answer": true, "statement": "Toute fonction constante est croissante.","comment":""},
{"answer": true, "statement": "Toute fonction constante est décroissante.","comment":""},
{"answer": false, "statement": "Toute fonction affine est croissante.","comment":""},
{"answer": false, "statement": "Toute fonction croissante est affine.","comment":""},
{"answer": true, "statement": "La fonction $x\\mapsto 11x-7/2$ est croissante.","comment":""},
{"answer": false, "statement": "La fonction $x\\mapsto 9x-5/3$ est décroissante.","comment":""},
{"answer": false, "statement": "La fonction $x\\mapsto 2-x/7$ est croissante.","comment":""},
{"answer": false, "statement": "Si une fonction affine de la forme $x\\mapsto ax+b$ est croissante, alors $a>0$.","comment":"$a\\geq 0$!"},
{"answer": false, "statement": "Si une fonction affine de la forme $x\\mapsto ax+b$ est croissante, alors $a\\leq b$.","comment":""},
{"answer": false, "statement": "Si une fonction affine de la forme $x\\mapsto ax+b$ est croissante, alors $a\\geq b$.","comment":""},
{"answer": true, "statement": "Si une fonction affine de la forme $x\\mapsto ax+b$ est décroissante, alors $a\\leq 0$.","comment":""},
{"answer": false, "statement": "La droite qui représente la fonction affine $x\\mapsto 7x+9$ a un coefficient directeur égal à $9$.","comment":""},
{"answer": false, "statement": "La droite qui représente la fonction affine $x\\mapsto -5x+11$ a un coefficient directeur égal à $5$.","comment":""},
{"answer": true, "statement": "La droite qui représente la fonction affine $x\\mapsto 8x-3$ a un coefficient directeur égal à $8$.","comment":""},
{"answer": false, "statement": "La droite qui représente la fonction affine $x\\mapsto 8x-3$ a une ordonnée à l'origine égale à $3$.","comment":""},
{"answer": false, "statement": "La droite qui représente la fonction affine $x\\mapsto 8x-3$ a une ordonnée à l'origine égale à $8$.","comment":""},
{"answer": false, "statement": "La droite qui représente la fonction affine $x\\mapsto 11x+7$ a une ordonnée à l'origine égale à $7/11$.","comment":""},
{"answer": true, "statement": "La droite qui représente la fonction affine $x\\mapsto 9x-5$ a une ordonnée à l'origine égale à $-5$.","comment":""},
{"answer": false, "statement": "Une fonction affine de la forme  $x\\mapsto ax+b$ est linéaire si et seulement si $a=0$.","comment":""},
{"answer": true, "statement": "Une fonction affine de la forme  $x\\mapsto ax+b$ est linéaire si et seulement si $b=0$.","comment":""},
{"answer": false, "statement": "Une fonction affine est linéaire si et seulement si son coefficient directeur est nul.","comment":""},
{"answer": true, "statement": "Une fonction affine est linéaire si et seulement si son ordonnée à l'origine est nulle.","comment":""},
{"answer": true, "statement": "Une fonction affine est croissante si et seulement si son coefficient directeur est positif.","comment":""},
{"answer": true, "statement": "Si le coefficient directeur d'une fonction affine est strictement positif, alors elle est croissante.","comment":""},
{"answer": false, "statement": "Si une fonction affine est croissante, alors son coefficient directeur est strictement positif.","comment":""},
{"answer": false, "statement": "Si une fonction affine est croissante, alors son ordonnée à l'origine est positive.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2+X+1$ est égal à $3$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-X+1$ est égal à $-3$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2+X+1$ est égal à $-3$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-X-1$ est égal à $3$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-X-1$ est égal à $5$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-2X+2$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-18X+36$ est égal à $0$.","comment":"Ne peut pas se factoriser comme un carré parfait."},
{"answer": false, "statement": "Le discriminant du trinôme $X^2+4X+16$ est égal à $0$.","comment":"Ne peut pas se factoriser comme un carré parfait."},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-7X+49$ est égal à $0$.","comment":"Ne peut pas se factoriser comme un carré parfait."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-6X+9$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-8X+16$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-14X+49$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2+22X+121$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-26X+169$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2+24X+144$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $X^2+30X+225$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $4X^2+48X+144$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $4X^2+36X+81$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": true, "statement": "Le discriminant du trinôme $4X^2-20X+25$ est égal à $0$.","comment":"On reconnait la forme $(a+b)^2$."},
{"answer": false, "statement": "Le discriminant du trinôme $4X^2-8X+16$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $9X^2-12X+16$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2+12X+144$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-8X+64$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-16X-64$ est égal à $0$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-3X+1$ est égal à $-13$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-2X+3$ est égal à $-16$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-2X-3$ est égal à $16$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-X+3$ est égal à $-11$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-X+3$ est égal à $13$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-5X+1$ est égal à $29$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-5X+1$ est égal à $-21$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-5X+2$ est égal à $17$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-9X+11$ est égal à $37$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $X^2-7X-5$ est égal à $69$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $X^2-6X-7$ est égal à $8$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $9X^2-6X+1$ est égal à $0$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $2X^2-5X+3$ est égal à $1$.","comment":""},
{"answer": true, "statement": "Le discriminant du trinôme $2X^2-3X-7$ est égal à $65$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $3X^2-6X+1$ est égal à $32$.","comment":""},
{"answer": false, "statement": "Le discriminant du trinôme $2X^2+5X+3$ est égal à $13$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$, on a : $1+2+\\cdots+n=\\dfrac{n^2+n}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $1+2+\\cdots+n=\\dfrac{n(n-1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $1+2+\\cdots+n+1=\\dfrac{n(n+1)}{2}$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$, on a : $2+4+6+\\cdots+2n=n^2+n$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$, on a : $1+3+5+\\cdots+2n+1=n^2+2n$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $1+3+5+\\cdots+2n+1=(2n+1)(2n+3)$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $1+3+5+\\cdots+2n+1=\\dfrac{(2n+1)(2n+3)}{2}$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$, on a : $1+3+5+\\cdots+2n+1=(n+1)^2$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $3+6+9+\\cdots+3n=\\dfrac{n(n+1)}{3}$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$, on a : $2+3+\\cdots+n=\\dfrac{(n+2)(n-1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$, on a : $2+3+\\cdots+n=\\dfrac{(n+1)(n+2)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=k\\dfrac{n(n+1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{n(n+1)}{2} -k$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{n(n+1)}{2} -\\dfrac{k(k+1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{n(n+1)}{2} -\\dfrac{k(k-1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{(n-k)(n-k+1)}{2}$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{(n-k)(n-k+1)}{2}+k$.","comment":""},
{"answer": false, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{(n-k+1)(n-k+2)}{2}+k$.","comment":""},
{"answer": true, "statement": "Pour tout entier naturel $n$ et tout entier naturel $k\\leq n$, on a : $k+(k+1)+\\cdots+n=\\dfrac{(n-k+1)(n-k+2)}{2}+k+1$.","comment":""},
{"answer": true, "statement": "$1+2+\\cdots+1000=500500$.","comment":""},
{"answer": true, "statement": "$1+2+\\cdots+50=1275$.","comment":""},
{"answer": false, "statement": "$1+2+\\cdots+50=1225$.","comment":""},
{"answer": false, "statement": "$1+2+\\cdots+50=5050$.","comment":""},
{"answer": true, "statement": "$1+2+\\cdots+10=55$.","comment":""},
{"answer": true, "statement": "$3+4+\\cdots+10=52$.","comment":""},
{"answer": true, "statement": "$1+2+\\cdots+20=210$.","comment":""},
{"answer": true, "statement": "$10+20+\\cdots+200=2100$.","comment":""},
{"answer": true, "statement": "$11+22+\\cdots+99=495$.","comment":""},
{"answer": false, "statement": "$11+22+\\cdots+99=485$.","comment":""},
{"answer": true, "statement": "$10+11+12+\\cdots+20=165$.","comment":""},
{"answer": false, "statement": "$10+11+12+\\cdots+20=155$.","comment":""},
{"answer": true, "statement": "Toute suite constante est une suite arithmétique.","comment":""},
{"answer": true, "statement": "La somme de deux suites arithmétiques est une suite arithmétique.","comment":""},
{"answer": false, "statement": "La somme de deux suites arithmétiques de raison $r$ est une suite arithmétique de raison $r$.","comment":""},
{"answer": true, "statement": "La somme de deux suites arithmétiques de raisons $r$ et $r'$ est une suite arithmétique de raison $r+r'$.","comment":""},
{"answer": false, "statement": "La somme de deux suites arithmétiques de raisons $r$ et $r'$ est une suite arithmétique de raison $\\dfrac{r+r'}{2}$.","comment":""},
{"answer": true, "statement": "La différence de deux suites arithmétiques est une suite arithmétique.","comment":""},
{"answer": false, "statement": "Le produit de deux suites arithmétiques est une suite arithmétique.","comment":""},
{"answer": false, "statement": "Le produit de deux suites arithmétiques de raisons $r$ et $r'$ est une suite arithmétique de raison $rr'$.","comment":""},
{"answer": false, "statement": "Le quotient d'une suite arithmétique par une suite arithmétique ne s'annulant jamais est une suite arithmétique.","comment":""},
{"answer": true, "statement": "La suite nulle est une suite arithmétique.","comment":""},
{"answer": true, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=u_n+7$ est arithmétique.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=2u_n+7$ est arithmétique.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=7u_n$ est arithmétique.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=-u_n+7$ est arithmétique de raison $7$.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=2n+7$ est arithmétique.","comment":"Premier terme !"},
{"answer": true, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=2n+7$ est arithmétique.","comment":""},
{"answer": true, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=3n+7$ est arithmétique de raison $3$.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq 0$ la relation $u_{n+1}=3n+7$ est arithmétique de raison $3$.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=5n+3$ est arithmétique de raison $5$ et terme initial $3$.","comment":"Le terme initial est $u_0$."},
{"answer": true, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=-2n+7$ est arithmétique.","comment":""},
{"answer": false, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=-2n+7$ est arithmétique de raison $7$.","comment":""},
{"answer": true, "statement": "Une suite vérifiant pour tout $n\\geq -1$ la relation $u_{n+1}=4n+3$ est arithmétique de raison $4$.","comment":""},
{"answer": true, "statement": "La suite $0,1,2,3,4,\\dots$ est arithmétique.","comment":""},
{"answer": true, "statement": "La suite $0,2,4,6,8,\\dots$ est arithmétique.","comment":""},
{"answer": true, "statement": "La suite $1,3,5,\\dots$ est arithmétique.","comment":""},
{"answer": true, "statement": "La suite $5,7,9,11,\\dots$ est arithmétique.","comment":""},
{"answer": false, "statement": "La suite $1,-1,1,-1,\\dots$ est arithmétique.","comment":""},
{"answer": false, "statement": "La suite $0,-1,2,-3,4,-5,\\dots$ est arithmétique.","comment":""},
{"answer": false, "statement": "La suite $u_n=(-1)^n$ est arithmétique.","comment":""},
{"answer": false, "statement": "La suite $1,2,4,8,16,\\dots$ est arithmétique.","comment":""},
{"answer": false, "statement": "La suite de Fibonacci est arithmétique.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique de raison $10$. Si $u_1=7$ alors $u_{10}=107$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique de raison $6$. Si $u_1=7$ alors $u_{10}=61$.","comment":""},
{"answer": true, "statement": "Si une suite arithmétique $(u_n)$ vérifie $u_5=2$ et $u_9=10$, alors $u_{12}=16$.","comment":""},
{"answer": true, "statement": "Si une suite arithmétique $(u_n)$ vérifie $u_3=2$ et $u_9=20$, alors $u_5=8$.","comment":""},
{"answer": true, "statement": "Si une suite arithmétique $(u_n)$ vérifie $u_3=8$ et $u_9=20$, son terme général est $u_n=2+2n$.","comment":""},
{"answer": true, "statement": "Si une suite arithmétique $(u_n)$ vérifie $u_3=5$ et $u_5=3$, son terme général est $u_n=8-n$.","comment":""},
{"answer": false, "statement": "Si une suite arithmétique vérifie $u_3=5$ et $u_5=3$, sa raison est égale à $1$.","comment":""},
{"answer": true, "statement": "Si une suite arithmétique $(u_n)$ vérifie $u_3=5$ et $u_5=11$, alors pour tout $k$, $u_{k}-2$ est divisible par trois.","comment":""},
{"answer": false, "statement": "Si une suite arithmétique $(u_n)$ est de raison $2$, alors pour avoir $u_k>20$ il faut $k>10$.","comment":""},
{"answer": false, "statement": "Si une suite arithmétique $(u_n)$ est de raison $2$, alors pour avoir $u_k>20$ il suffit $k>10$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_3=5$ et $u_7=7$. Pour que $u_k>50$, il faut que $k>100$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_3=5$ et $u_7=7$. Pour que $u_k>50$, il suffit que $k>100$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_3=5$ et $u_7=7$. Pour que $u_k>100$, il suffit que $k>50$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_3=5$ et $u_7=7$. Pour que $u_k>100$, il faut que $k>50$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_5=1$ et $u_9=3$. Pour que $u_k>50$, il faut que $k>100$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique vérifiant $u_5=1$ et $u_9=3$. Pour que $u_k>50$, il suffit que $k>100$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique de raison $\\dfrac{1}{2}$. Pour que $u_k>100$, il faut que $k>50$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique de raison $\\dfrac{1}{2}$. Pour que $u_k>100$, il suffit que $k>50$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si tous les termes sont divisibles par $3$, alors la raison est égale à $3$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si tous les termes sont divisibles par $7$, alors la raison est un multiple $7$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si la raison est un multiple de $7$ alors tous les termes sont divisibles par $7$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si la raison est paire, alors tous les termes sont pairs.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si la raison est impaire, alors tous les termes sont impairs.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si $u_0$ et $u_1$ sont pairs, alors tous les termes sont pairs.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si $u_1$ et $u_2$ sont pairs, alors tous les termes sont pairs.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si $u_0$ et $u_1$ sont impairs, alors tous les termes sont impairs.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si deux termes de la suite sont pairs, alors tous les termes sont pairs.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si deux termes consécutifs de la suite sont pairs, alors tous les termes sont pairs.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Si deux termes consécutifs de la suite sont pairs, alors la raison est paire.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Si deux termes consécutifs de la suite sont impairs, alors la raison est impaire.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Sa raison est égale à $u_7-u_6$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_5=u_4+u_6$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_8=\\dfrac{u_7+u_9}{2}$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_7=\\dfrac{u_6+u_7+u_8}{3}$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_6=\\dfrac{u_5+u_6+u_7}{2}$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_7=\\dfrac{u_5+u_9}{2}$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_{10}=\\dfrac{u_1+u_{20}}{2}$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_{20}=\\dfrac{u_{10}+u_{30}}{2}$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_7=\\dfrac{u_5+u_9}{4}$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_6=\\dfrac{u_4+u_5+u_7+u_8}{4}$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Alors $u_4=\\dfrac{u_2+u_3+u_4+u_5+u_6}{4}$.","comment":""},
{"answer": false, "statement": "Soit $(u_n)$ une suite arithmétique. Sa raison est égale à $\\dfrac{u_8-u_5}{4}$.","comment":""},
{"answer": true, "statement": "Soit $(u_n)$ une suite arithmétique. Sa raison est égale à $\\dfrac{u_7-u_3}{4}$.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique de raison positive est positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique de raison strictement positive est strictement positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique dont le premier terme est positif est positive.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut que son premier terme soit positif.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il suffit que son premier terme soit positif.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut que sa raison soit positive.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il suffit que sa raison soit positive.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il suffit que sa raison et son premier terme soient positifs.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il suffit que sa raison ou son premier terme soient positifs.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut que sa raison et son premier terme soient positifs.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut que sa raison ou son premier terme soient positifs.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut et il suffit que sa raison et son premier terme soient positifs.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il faut et il suffit que sa raison ou son premier terme soient positifs.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il faut et il suffit que sa raison soit positive, et qu'un terme particulier le soit également.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est croissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique est monotone.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est strictement monotone.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique est croissante ou décroissante.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit croissante, il faut qu'elle soit positive.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit croissante, il suffit qu'elle soit positive.","comment":""},
{"answer": true, "statement": "Pour qu'une suite arithmétique soit positive, il faut qu'elle soit croissante.","comment":""},
{"answer": false, "statement": "Pour qu'une suite arithmétique soit positive, il suffit qu'elle soit croissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique dont la raison est positive est croissante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique dont la raison est positive est strictement croissante.","comment":""},
{"answer": true, "statement": "Une suite arithmétique est croissante si et seulement si sa raison est positive.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique positive est croissante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique croissante est positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique strictement croissante est positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique positive est strictement croissante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique strictement positive est strictement croissante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est bornée.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est non-bornée.","comment":""},
{"answer": true, "statement": "Une suite arithmétique peut être bornée.","comment":""},
{"answer": true, "statement": "Une suite arithmétique peut être non-bornée.","comment":""},
{"answer": false, "statement": "Toute suite bornée est arithmétique.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique est bornée.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique bornée est croissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique bornée est décroissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique bornée est minorée.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique bornée est majorée.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique majorée est bornée.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique minorée est bornée.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non constante est non-bornée.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non bornée est non-constante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique non bornée est strictement croissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non bornée est strictement monotone.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique non bornée a une raison positive.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique non bornée a une raison strictement positive.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique minorée est croissante.","comment":""},
{"answer": false, "statement": "Toute suite arithmétique majorée est croissante.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non majorée a une raison positive.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non majorée a une raison strictement positive.","comment":""},
{"answer": true, "statement": "Toute suite arithmétique non majorée est strictement croissante.","comment":""},
{"answer":true,"statement":"$(6+3)\\times(9-7)=18$."},
{"answer":true,"statement":"$(9-5)\\times(7+2)=36$."},
{"answer":true,"statement":"$(4+3)\\times(9-1)=56$."},
{"answer":true,"statement":"$(7+2)\\times(5+3)=72$."},
{"answer":true,"statement":"$(5+3)\\times(9-2)=56$."},
{"answer":true,"statement":"$(9-2)\\times(9-3)=42$."},
{"answer":true,"statement":"$(2+6)\\times(9-2)=56$."},
{"answer":true,"statement":"$(9-4)\\times(4+5)=45$."},
{"answer":true,"statement":"$(7-2)\\times(7+2)=45$."},
{"answer":true,"statement":"$(6-3)\\times(6+3)=27$."},
{"answer":true,"statement":"$(9-7)\\times(9-6)=6$."},
{"answer":true,"statement":"$(8-3)\\times(5+2)=35$."},
{"answer":true,"statement":"$(3+6)\\times(1+7)=72$."},
{"answer":true,"statement":"$(5+2)\\times(3+6)=63$."},
{"answer":true,"statement":"$(5+4)\\times(1+5)=54$."},
{"answer":true,"statement":"$(8-2)\\times(2+7)=54$."},
{"answer":true,"statement":"$(2+5)\\times(9-5)=28$."},
{"answer":true,"statement":"$(2+6)\\times(1+5)=48$."},
{"answer":true,"statement":"$(9-3)\\times(3+5)=48$."},
{"answer":true,"statement":"$(2+6)\\times(8-3)=40$."},
{"answer":false,"statement":"$(6+3)\\times(9-7)=36$."},
{"answer":false,"statement":"$(9-5)\\times(7+2)=27$."},
{"answer":false,"statement":"$(4+3)\\times(9-1)=72$."},
{"answer":false,"statement":"$(7+2)\\times(5+3)=54$."},
{"answer":false,"statement":"$(5+3)\\times(9-2)=63$."},
{"answer":false,"statement":"$(9-2)\\times(9-4)=42$."},
{"answer":false,"statement":"$(3+6)\\times(9-2)=56$."},
{"answer":false,"statement":"$(9-4)\\times(4+5)=40$."},
{"answer":false,"statement":"$(7-2)\\times(7+2)=40$."},
{"answer":false,"statement":"$(6-3)\\times(6+3)=54$."},
{"answer":false,"statement":"$(9-7)\\times(9-6)=21$."},
{"answer":false,"statement":"$(8-3)\\times(5+2)=40$."},
{"answer":false,"statement":"$(3+6)\\times(1+7)=63$."},
{"answer":false,"statement":"$(5+2)\\times(3+6)=54$."},
{"answer":false,"statement":"$(5+4)\\times(1+5)=48$."},
{"answer":false,"statement":"$(8-2)\\times(2+7)=53$."},
{"answer":false,"statement":"$(2+5)\\times(9-5)=35$."},
{"answer":false,"statement":"$(2+6)\\times(1+5)=58$."},
{"answer":false,"statement":"$(9-3)\\times(3+5)=54$."},
{"answer":false,"statement":"$(2+6)\\times(8-3)=45$."},
{"statement":"Soient $a,b,c\\in \\Z\\setminus \\{0\\}$. Si $a|bc$, alors $a|b$ ou $a|c$.","answer":false},
{"statement":"Soient $a,b,c\\in \\Z\\setminus\\{0\\}$. Si $a|bc$ et $b\\wedge c =1$, alors $a|b$ ou $a|c$.","answer":false},
{"statement":"Soient $a,b,c\\in \\Z\\setminus\\{0\\}$, avec $a$ premier. Si $a|bc$, alors $a|b$ ou $a|c$.","answer":true},
{"statement":"Soient $a,b,c\\in \\Z\\setminus\\{0\\}$. Si $a|bc$ et $a\\wedge b=1$, alors $a|c$.","answer":true},
{"statement":"Soient $a,b,c\\in \\Z\\setminus \\{0\\}$. Si $a|c$ et $b|c$, alors $ab|c$.","answer":false},
{"statement":"Soient  $a,b,c\\in \\Z\\setminus \\{0\\}$. On suppose $a$ et $b$ premiers. Si $a|c$ et $b|c$, alors $ab|c$.","answer":false},
{"statement":"Soient $a,b,c\\in \\Z\\setminus\\{0\\}$. On suppose $a\\wedge b=1$. Si $a|c$ et $b|c$. Alors $a|bc$.","answer":true},
{"statement":"Soient $a,b,q,r\\in \\Z$. Si $a=bq+r$, alors $r\\in \\llbracket 0,|b|-1\\rrbracket$.","answer":false},
{"statement":"Soient $a,b,q,r\\in  \\Z$. On suppose que $a=bq+r$, avec $b\\in \\N$ et $r\\in \\llbracket 0,b-1\\rrbracket$. Alors $q=\\lfloor \\dfrac{a}{b} \\rfloor$.","answer":true},
{"statement":"Soient $a,b\\in \\Z$. Alors $a\\wedge b=(a-b)\\wedge b$.","answer":true},
{"statement":"Soient $a,b,q,r\\in \\Z$. On suppose que $a=bq+r$. Alors $a\\wedge b=b\\wedge r$.","answer":true},
{"statement":"Soient $a,b,u,v,d\\in \\Z$. Si $au+bv=d$, avec $d \\geq 0$, alors $d=a\\wedge b$.","answer":false},
{"statement":"Soient $a,b,u,v\\in \\Z$ et $d=a\\wedge b$. Alors  $au+bv|d$.","answer":false},
{"statement":"Soient $a,b,u,v\\in \\Z$ et $d=a\\wedge b$. Alors  $d|au+bv$.","answer":true},
{"statement":"Soient $a,b,u,v\\in \\Z$ et $d$ un diviseur commun à $a$ et $b$. Alors $d| au+bv$.","answer":true},
{"statement":"Soient $a,b\\in \\Z$. Alors l'équation $ax+by=0$, d'inconnue $(x,y)\\in \\Z^2$ admet une solution si et seulement si $a\\wedge b=1$.","answer":false},
{"statement":"Soient $a,b,c\\in \\Z$ et $d=a\\wedge b$. Alors l'équation $ax+by=c$, d'inconnue $(x,y)\\in \\Z^2$ admet une solution si et seulement si $d|c$.","answer":true},
{"statement":"Soient $a,b,c\\in \\Z$ et $d=a\\wedge b$. Si l'équation $ax+by=c$, d'inconnue $(x,y)\\in \\Z^2$ admet une solution, alors  $d|c$.","answer":true},
{"statement":"Soient $a,b,c\\in \\Z$ et $d=a\\wedge b$. Si $d|c$, alors l'équation $ax+by=c$, d'inconnue $(x,y)\\in \\Z^2$ admet une unique solution.","answer":false},
{"statement":"Soient $a,b,c\\in \\Z$ et $m=a\\vee b$. Alors   l'équation $ax+by=c$, d'inconnue $(x,y)\\in \\Z^2$,  admet une solution si et seulement si $m|c$.","answer":false},
{"statement":"$1$ est premier.","answer":false},
{"statement":"Soit $n\\in \\N_{\\geq 2}$. Alors son plus petit diviseur strictement plus grand que $1$ est premier.","answer":true},
{"statement":"Pour $n\\in \\Z$, on note $D(n)$ l'ensemble de  ses diviseurs. Soient $a,b\\in \\Z$. $D(a+b)\\subset D(a)\\cup D(b)$.","answer":false},
{"statement":"Soient $n\\in \\N$. Tout diviseur premier de $n!$+1 est strictement supérieur à $n$.","answer":true},
{"statement":"Soient $n\\in \\N$. Tout diviseur premier de $n!^2$+1 est strictement supérieur à $n$.","answer":true},
{"statement":"Soient $E$ un ensemble fini non-vide de nombres premiers positifs et $n=\\prod_{p\\in E}p+1$. Alors $n$ est premier.","answer":false},
{"statement":"Soient $E$ un ensemble fini non-vide de nombres premiers positifs et $n=\\prod_{p\\in E}p+1$. Alors tout diviseur premier de $n$ est strictement supérieur à $\\max(E)$.","answer":false},
{"statement":"Soient $m,n\\in \\N_{\\geq 2}$. On écrit  $m=p_1^{\\alpha_1}\\ldots p_k^{\\alpha_k}$, $n=p_1^{\\beta_1}\\ldots p_k^{\\beta_k}$ avec $k\\in \\N$, $p_1,\\ldots,p_k$ premiers distincts et $\\alpha_1,\\ldots,\\alpha_k,\\beta_1,\\ldots, \\beta_k\\in \\N$. Alors $a\\wedge b=p_1^{\\gamma_1}\\ldots p_k^{\\gamma_k}$, où $\\gamma_i=\\min(\\alpha_i,\\beta_i)$ pour $i\\in \\llbracket 1,k\\rrbracket$.","answer":true},
{"statement":"Soient $m,n\\in \\N_{\\geq 2}$. On écrit  $m=p_1^{\\alpha_1}\\ldots p_k^{\\alpha_k}$, $n=p_1^{\\beta_1}\\ldots p_k^{\\beta_k}$ avec $k\\in \\N$, $p_1,\\ldots,p_k$ premiers distincts et $\\alpha_1,\\ldots,\\alpha_k,\\beta_1,\\ldots, \\beta_k\\in \\N$. Alors $a\\vee b=p_1^{\\gamma_1}\\ldots p_k^{\\gamma_k}$, où $\\gamma_i=\\max(\\alpha_i,\\beta_i)$ pour $i\\in \\llbracket 1,k\\rrbracket$.","answer":true},
{"statement":"Soient $m,n\\in \\N_{\\geq 2}$. On écrit  $m=p_1^{\\alpha_1}\\ldots p_k^{\\alpha_k}$, $n=p_1^{\\beta_1}\\ldots p_k^{\\beta_k}$ avec $k\\in \\N$, $p_1,\\ldots,p_k$ premiers et $\\alpha_1,\\ldots,\\alpha_k,\\beta_1,\\ldots, \\beta_k\\in \\N$. Alors $a\\wedge b=p_1^{\\gamma_1}\\ldots p_k^{\\gamma_k}$, où $\\gamma_i=\\min(\\alpha_i,\\beta_i)$ pour $i\\in \\llbracket 1,k\\rrbracket$.","answer":false},
{"statement":"Soient $m,n\\in \\N_{\\geq 2}$. On écrit  $m=p_1^{\\alpha_1}\\ldots p_k^{\\alpha_k}$, $n=p_1^{\\beta_1}\\ldots p_k^{\\beta_k}$ avec $k\\in \\N$, $p_1,\\ldots,p_k$ premiers  et $\\alpha_1,\\ldots,\\alpha_k,\\beta_1,\\ldots, \\beta_k\\in \\N$. Alors $a\\vee b=p_1^{\\gamma_1}\\ldots p_k^{\\gamma_k}$, où $\\gamma_i=\\max(\\alpha_i,\\beta_i)$ pour $i\\in \\llbracket 1,k\\rrbracket$.","answer":false},
{"statement":"Soient $p$ un nombre premier et $k\\in \\N_{\\geq 2}$. Alors $(\\Z/p^k\\Z,+)\\simeq ((\\Z/p\\Z)^k,+)$.","answer":false},
{"statement":"Soit $\\overline{a}\\in \\Z/n\\Z$. Alors $\\overline{a}$ est inversible dans $(\\Z/n\\Z,\\times)$ si et seulement si $a\\wedge n =1$.","answer":true},
{"statement":"Soit $a\\in \\Z/n\\Z$. Alors $\\{b\\in \\Z/n\\Z\\mid ab=0\\}=\\{0\\}$ si et seulement si $a$ est inversible dans $(\\Z/n\\Z,\\times)$.","answer":true},
{"statement":"Tout groupe fini est cyclique.","answer":false},
{"statement":"Tout groupe fini est monogène.","answer":false},
{"statement":"Tout groupe fini est abélien.","answer":false},
{"statement":"Tout groupe monogène est cyclique.","answer":false},
{"statement":"Tout groupe monogène est fini.","answer":false},
{"statement":"Tout groupe monogène est abélien.","answer":true},
{"statement":"Tout groupe cyclique est monogène.","answer":true},
{"statement":"Tout groupe cyclique est abélien.","answer":true},
{"statement":"Tout sous-groupe d'un groupe cyclique est cyclique.","answer":true},
{"statement":"Tout produit de groupes cycliques est cyclique.","answer":false},
{"statement":"Tout produit de groupes monogènes est monogène.","answer":false},
{"statement":"Tout groupe d'ordre $p$ avec $p$ premier est cyclique.","answer":true},
{"statement":"Soit $G$ un groupe cyclique de cardinal $n$. Pour tout entier naturel $d\\leq n$, il existe un sous-groupe de $G$ de cardinal $d$","answer":false},
{"statement":"Soit $G$ un groupe cyclique de cardinal $n$. Pour tout entier naturel non nul $d\\leq n$, il existe un sous-groupe de $G$ de cardinal $d$","answer":false},
{"statement":"Soit $G$ un groupe cyclique de cardinal $n$. Pour tout entier naturel $d$ divisant $n$, il existe un sous-groupe de $G$ de cardinal $d$","answer":true},
{"statement":"Soit $G$ un groupe cyclique de cardinal $n$. Pour tout entier naturel $d$ divisant $n$, il existe un unique sous-groupe de $G$ de cardinal $d$","answer":true},
{"statement":"Tout groupe d'ordre $p^2$ avec $p$ premier est cyclique.","answer":false},
{"statement":"Soit $G$ un groupe cyclique d'ordre $n$ et $d$ un diviseur de $n$ : il existe exactement<br>un sous-groupe de $G$ d'ordre $d$.","answer":true},
{"statement":"Tout groupe d'ordre $4$ est cyclique.","answer":false},
{"statement":"Tout groupe d'ordre $4$ est abélien.","answer":true},
{"statement":"Tout groupe d'ordre $6$ est cyclique.","answer":false},
{"statement":"Tout groupe d'ordre $6$ est abélien.","answer":false},
{"statement":"Tout groupe d'ordre $8$ est abélien.","answer":false},
{"statement":"Si $G$ est un groupe abélien d'ordre $n$ et si $d|n$, alors $G$ possède un élément d'ordre $d$.","answer":true},
{"statement":"Si $G$ est un groupe abélien d'ordre $n$ et si $d|n$, alors $G$ possède un unique élément d'ordre $d$.","answer":false},
{"statement":"Si $G$ est un groupe abélien d'ordre $n$ et si $d|n$, alors $G$ possède un unique sous-groupe d'ordre $d$.","answer":true},
{"statement":"L'isomorphisme $\\Z/21\\Z \\simeq \\Z/3\\Z \\times \\Z/7\\Z$ est la décomposition cyclique<br>du groupe $\\Z/21\\Z$. Autrement dit, la suite des invariants de $\\Z/21\\Z$ est $(3,7)$.","answer":false},
{"statement":"À isomorphisme près, il existe un seul groupe abélien d'ordre quatre","answer":false},
{"statement":"À isomorphisme près, il existe deux groupes abéliens d'ordre quatre","answer":true},
{"statement":"À isomorphisme près, il existe un seul groupe abélien d'ordre six","answer":true},
{"statement":"À isomorphisme près, il existe deux groupes abéliens d'ordre six","answer":false},
{"statement":"À isomorphisme près, il existe un seul groupe abélien d'ordre huit","answer":false},
{"statement":"À isomorphisme près, il existe deux groupes abéliens d'ordre huit","answer":false},
{"statement":"À isomorphisme près, il existe trois groupes abéliens d'ordre huit","answer":true},
{"statement":"À isomorphisme près, il existe deux groupes abéliens d'ordre $12$","answer":true},
{"statement":"À isomorphisme près, il existe trois groupes abéliens d'ordre $12$","answer":false},
{"statement":"À isomorphisme près, il existe quatre groupes abéliens d'ordre $16$","answer":false},
{"statement":"À isomorphisme près, il existe cinq groupes abéliens d'ordre $16$","answer":true},
{"statement":"À isomorphisme près, il existe quatre groupes abéliens d'ordre $24$","answer":false},
{"statement":"À isomorphisme près, il existe trois groupes abéliens d'ordre $24$","answer":true},
{"statement":"À isomorphisme près, il existe six groupes abéliens d'ordre $32$","answer":false},
{"statement":"À isomorphisme près, il existe sept groupes abéliens d'ordre $32$","answer":true},
{"statement":"À isomorphisme près, il existe trois groupes abéliens d'ordre $36$","answer":true},
{"statement":"À isomorphisme près, il existe quatre groupes abéliens d'ordre $36$","answer":false},
{"statement":"les groupes additifs $\\Z/4\\Z$ et $(\\Z/2\\Z)^2$ sont isomorphes","answer":false},
{"statement":"les groupes additifs $\\Z/6\\Z$ et $\\Z/2\\Z\\times\\Z/3\\Z$ sont isomorphes","answer":true},
{"statement":"les groupes additifs $\\Z/12\\Z\\times \\Z/5\\Z$ et $\\Z/20\\Z\\times\\Z/3\\Z$ sont isomorphes","answer":true},
{"statement":"les groupes additifs $\\Z/2\\Z\\times\\Z/6\\Z$ et $\\Z/3\\Z\\times\\Z/4\\Z$ sont isomorphes","answer":false},
{"statement":"L'unique sous-groupe de $\\Z$ contenant $1$ est $\\Z$ lui-même.","answer":true},
{"statement":"Dans un groupe, tout élément a au moins un inverse.","answer":true},
{"statement":"Dans un groupe, tout élément a exactement un inverse","answer":true},
{"statement":"Si $H$ est un sous-groupe de $G$ et que $G$ est un groupe fini, alors l'ordre de $H$ divise l'ordre de $G$","answer":true},
{"statement":"Pour pouvoir définir le quotient d'un groupe par un sous-groupe, il faut que le sous-groupe soit distingué.","answer":false},
{"statement":"Pour munir le quotient $G/H$ d'un groupe $G$ par un sous-groupe $H$ d'une structure de groupe compatible à la projection canonique, il faut que le sous-groupe $H$ soit distingué.","answer":true},
{"statement":"Dans un groupe abélien, tous les sous-groupes sont distingués.","answer":true},
{"statement":"Les sous-groupes de $\\Z$ sont tous de la forme $n \\Z$, avec $n$ un entier relatif.","answer":true},
{"statement":"Un morphisme de groupes est toujours surjectif.","answer":false},
{"statement":"Un morphisme de groupes est injectif si et seulement si son noyau est réduit à l'élément neutre.","answer":true},
{"statement":"Si $f:G \\to H$ est un morphisme de groupes, alors $\\forall x \\in G, \\forall k \\in \\Z$, on a $f(x^k)=f(x)^k$.","answer":true},
{"statement":"Dans tout groupe, tous les éléments ont un ordre fini.","answer":false},
{"statement":"Dans tout groupe, il existe un élément d'ordre fini.","answer":true},
{"statement":"Pour tout groupe $G$, la translation à gauche $g \\cdot x = gx$ définit une action de $G$ sur lui-même.","answer":true},
{"statement":"Tout groupe est isomorphe à un sous-groupe du groupe des permutations d'un ensemble fini.","answer":false},
{"statement":"Soit $G$ un groupe d'ordre $n$ et $d$ un diviseur de $n$ : il existe un sous-groupe de $G$ d'ordre $d$.","answer":false},
{"statement":"Soit $G$ un groupe d'ordre $n$ et $d$ un entier ne divisant pas $n$ : il existe un sous-groupe de $G$ d'ordre $d$.","answer":false},
{"statement":"Le groupe trivial est simple.","answer":false},
{"statement":"Un groupe est simple si et seulement s'il possède exactement deux sous-groupes distingués.","answer":true},
{"statement":"Un groupe est simple si et seulement s'il possède exactement un sous-groupe distingué.","answer":false},
{"statement":"Un groupe est simple si et seulement s'il ne possède pas de sous-groupes distingués.","answer":false},
{"statement":"Tous les groupes abéliens sont simples.","answer":false},
{"statement":"Tous les groupes simples sont abéliens","answer":false},
{"statement":"Aucun groupe abélien n'est simple.","answer":false},
{"statement":"Tous les groupes finis sont simples.","answer":false},
{"statement":"Tous les groupes simples sont finis.","answer":false},
{"statement":"Tout groupe dont le cardinal est un nombre premier est simple.","answer":true},
{"statement":"Le cardinal d'un groupe fini simple est un nombre premier.","answer":false},
{"statement":"Il existe des groupes simples de cardinal $\\leq 100$ qui ne sont pas cycliques.","answer":true},
{"statement":"Il existe des groupes simples de cardinal $\\leq 50$ qui ne sont pas cycliques.","answer":false},
{"statement":"À isomorphisme près, il existe exactement quatre groupes simples de cardinal $\\leq 10$.","answer":true},
{"statement":"Tous les groupes cycliques sont simples.","answer":false},
{"statement":"Certains groupes cycliques sont simples.","answer":true},
{"statement":"Tous les groupes simples sont cycliques.","answer":false},
{"statement":"Aucun groupe cyclique n'est simple.","answer":false},
{"statement":"Le groupe additif $\\Z/6\\Z$ est simple.","answer":false},
{"statement":"Le groupe additif $\\Z/5\\Z$ est simple.","answer":true},
{"statement":"Le groupe additif $\\R$ est simple.","answer":false},
{"statement":"Le groupe multiplicatif $\\R^*$ est simple.","answer":false},
{"statement":"Le groupe multiplicatif $GL_n(\\R)$ est simple.","answer":false},
{"statement":"Un sous-groupe d'un groupe simple est simple.","answer":false},
{"statement":"Un sous-groupe distingué d'un groupe simple est simple.","answer":false},
{"statement":"Les cycles $(123)$ et $(231)$ sont égaux.","answer":true},
{"statement":"Les cycles $(123)$ et $(132)$ sont égaux.","answer":false},
{"statement":"$(1 2)\\circ(1 2 3) = (3 2)$.","answer":true},
{"statement":"$(1 2)\\circ(3 4) = (3 4) \\circ (1 2)$.","answer":true},
{"statement":"$(1 2)\\circ(1 3) = (1 3)\\circ(1 2)$.","answer":false},
{"statement":"Si $\\sigma$ est un cycle, alors $\\sigma^2$ est un cycle","answer":false},
{"statement":"Un cycle de longueur $r$ est inversible et son inverse est encore un cycle de longueur $r$.","answer":true},
{"statement":"Un cycle de longueur $r$ est d'ordre $r!$.","answer":false},
{"statement":"Un cycle de longueur $r$ est d'ordre $r+1$.","answer":false},
{"statement":"L'inverse d'un cycle est un cycle.","answer":true},
{"statement":"Le produit de deux cycles est un cycle.","answer":false},
{"statement":"Le produit de deux cycles à supports disjoints est un cycle.","answer":false},
{"statement":"Deux permutations à supports disjoints commutent","answer":true},
{"statement":"Si deux permutations commutent, alors leurs supports sont disjoints","answer":false},
{"statement":"Le groupe symétrique $\\frak{S}_3$ est cyclique.","answer":false},
{"statement":"Les groupes symétriques $\\mathfrak{S}_n$ sont abéliens.","answer":false},
{"statement":"Les groupes symétriques $\\mathfrak{S}_n$ ne sont pas abéliens.","answer":false},
{"statement":"Le groupe symétrique $\\frak{S}_4$ est de cardinal $12$.","answer":false},
{"statement":"Soit $n \\in \\N^*$. Pour tout $\\sigma \\in \\mathfrak{S}_n$, il existe $N\\in\\N$ tel que $\\sigma^N=\\mathrm{Id}$.","answer":true},
{"statement":"Soit $n \\in \\N^*$. Il existe $N\\in\\N$ tel que pour tout $\\sigma \\in \\mathfrak{S}_n$ on ait $\\sigma^N=\\mathrm{Id}$.","answer":true},
{"statement":"Soient $\\sigma, \\sigma' \\in \\mathfrak{S}_n$. L'ordre de leur produit est le produit de leurs ordres","answer":false},
{"statement":"Soient $\\sigma, \\sigma' \\in \\mathfrak{S}_n$. L'ordre de leur produit est le ppcm de leurs ordres","answer":false},
{"statement":"Toute permutation se décompose en produit de cycles deux à deux à supports disjoints.","answer":true},
{"statement":"Deux permutations sont conjuguées si et seulement si les longueurs des cycles apparaissant<br>dans leurs décompositions sont les mêmes (comptées avec multiplicités).","answer":true},
{"statement":"Dans $\\mathfrak{S}_n$, deux cycles sont toujours conjugués.","answer":false},
{"statement":"Dans $\\mathfrak{S}_n$, deux $k$-cycles sont toujours conjugués.","answer":true},
{"statement":"Soit $n\\geq 3$ et $\\sigma \\in \\mathfrak{S}_n$. Alors :<br>\\[\\sigma\\circ (1 2 3)\\circ \\sigma^{-1} = (\\sigma(1) \\sigma(2) \\sigma(3))\\]","answer":true},
{"statement":"Soit $n\\geq 3$ et $\\sigma \\in \\mathfrak{S}_n$. Alors :<br>\\[\\sigma^{-1}\\circ (1 2 3)\\circ \\sigma = (\\sigma(1) \\sigma(2) \\sigma(3))\\]","answer":false},
{"statement":"Toute permutation s'écrit de manière unique comme produit de transpositions.","answer":false},
{"statement":"Toute permutation s'écrit comme produit de transpositions.","answer":true},
{"statement":"Le groupe symétrique $\\mathfrak{S}_n$ contient $\\binom{n}{2}$ transpositions","answer":true},
{"statement":"Toute permutation s'écrit comme produit de $3$-cycles.","answer":false},
{"statement":"Les groupes symétriques sont simples.","answer":false},
{"statement":"Les groupes symétriques ne sont jamais simples.","answer":false},
{"statement":"Si $n\\geq 5$, le groupe symétrique  $\\mathfrak{S}_n$ est simple.","answer":false},
{"statement":"Le groupe symétrique  $\\mathfrak{S}_2$ est simple.","answer":true},
{"statement":"Le groupe symétrique  $\\mathfrak{S}_3$ est simple.","answer":false},
{"statement":"La signature d'une permutation est un élément de $\\{-1,1\\}$.","answer":true},
{"statement":"La signature du produit de permutations est le produit de leurs signatures.","answer":true},
{"statement":"Si un morphisme $\\phi : (\\mathfrak{S}_n,\\circ)\\to (\\C^*,\\times)$ envoie une transposition sur $1$, alors il est trivial.","answer":true},
{"statement":"Deux permutations conjuguées ont la même signature.","answer":true},
{"statement":"La signature de $(1 3 4 2)\\circ (2 3)$ est $1$.","answer":true},
{"statement":"La signature de $(1 2 3)\\circ (1 2)$ est $1$.","answer":false},
{"statement":"Si une permutation admet un nombre pair d'orbites, alors sa signature est égale à $1$.","answer":false},
{"statement":"Si une permutation admet un nombre impair d'orbites, alors sa signature est égale à $-1$.","answer":false},
{"statement":"Soit $\\sigma \\in \\mathfrak{S}_n$ une permutation admettant $k$ orbites. Sa signature est égale à $(-1)^{n-k}$.","answer":true},
{"statement":"Soit $\\sigma \\in \\mathfrak{S}_n$ une permutation admettant $k$ orbites. Sa signature est égale à $(-1)^{k}$.","answer":false},
{"statement":"La signature est un morphisme de groupes entre $\\mathfrak{S}_n$ et $(\\C,+)$.","answer":false},
{"statement":"La signature est un morphisme de groupes entre $\\mathfrak{S}_n$ et $(\\C^*,\\times)$.","answer":true},
{"statement":"La signature est le seul morphisme de groupes entre $\\mathfrak{S}_n$ et $(\\C^*,\\times)$.","answer":false},
{"statement":"Un $r$-cycle est de signature $(-1)^r$.","answer":false},
{"statement":"Si $n>0$, le groupe alterné $\\mathfrak{A}_n$ est de cardinal $n/2$","answer":false},
{"statement":"Si $n>0$, le groupe alterné $\\mathfrak{A}_n$ est de cardinal $n!/2$","answer":false},
{"statement":"Si $n\\geq 2$, le groupe alterné $\\mathfrak{A}_n$ est de cardinal $n!/2$","answer":true},
{"statement":"Les groupes alternés sont simples.","answer":false},
{"statement":"Les groupes alternés ne sont jamais simples.","answer":false},
{"statement":"Si $n\\geq 3$, le groupe alterné $\\mathfrak{A}_n$ est simple.","answer":false},
{"statement":"Si $n\\geq 5$, le groupe alterné $\\mathfrak{A}_n$ est simple.","answer":true},
{"statement":"Le groupe alterné  $\\mathfrak{A}_2$ est simple.","answer":false},
{"statement":"Le groupe alterné  $\\mathfrak{A}_3$ est simple.","answer":true},
{"statement":"Le groupe alterné  $\\mathfrak{A}_4$ est simple.","answer":false},
{"statement":"Dans un anneau, on a la formule $a\\times (b+c)=a\\times b+a\\times c$.","answer":true},
{"statement":"Dans un anneau, on a la formule $(na)\\times (nb) = nab$.","answer":false},
{"statement":"Dans un anneau $(A,+,\\times)$, tout élément est inversible pour la loi $+$.","answer":true},
{"statement":"Dans un anneau $(A,+,\\times)$, tout élément est inversible pour la loi $\\times$.","answer":false},
{"statement":"Dans un anneau $(A,+,\\times)$, tout élément non nul est inversible pour la loi $\\times$.","answer":false},
{"statement":"Dans un anneau, on a la formule $a^2-b^2 = (a+b)(a-b)$.","answer":false},
{"statement":"Dans un anneau, on a la formule du binôme de Newton : <br>\\[(a+b)^n = \\sum_{i=0}^n \\binom{n}{i} a^ib^{n-i}\\]","answer":false},
{"statement":"Dans un anneau commutatif, on a la formule du binôme de Newton : <br>\\[(a+b)^n = \\sum_{i=0}^n \\binom{n}{i} a^ib^{n-i}\\].","answer":true},
{"statement":"Dans un anneau commutatif de caractéristique $p>0$, on a la formule \\[(a+b)^p=a^p+b^p\\]","answer":true},
{"statement":"La réunion de deux idéaux d'un anneau est un idéal.","answer":false},
{"statement":"L'intersection de deux idéaux d'un anneau est un idéal.","answer":true},
{"statement":"Étant donné un anneau $A$ et un idéal $I$ de $A$, le quotient $A/I$ est bien défini comme ensemble et ce quotient a une structure naturelle d'anneau.","answer":true},
{"statement":"Étant donné un anneau $A$ et un sous-anneau $B$ de $A$, le quotient $A/B$ est bien défini comme ensemble et ce quotient a une structure naturelle d'anneau.","answer":false},
{"statement":"Tout idéal maximal est premier.","answer":true},
{"statement":"Tout idéal premier est maximal.","answer":false},
{"statement":"Dans un anneau, un élément est premier si et seulement si il est irréductible.","answer":false},
{"statement":"Le ppcm et le pgcd de deux éléments est défini dans n'importe quel anneau.","answer":false},
{"statement":"Si un idéal $I$ de $A$ contient un élément inversible, alors $I=A$.","answer":true},
{"statement":"L'anneau des matrices carrées diagonales $n\\times n$  est commutatif.","answer":true},
{"statement":"L'anneau des matrices carrées triangulaires supérieures $n\\times n$  est commutatif.","answer":false},
{"statement":"L'anneau $M_n(\\R)$ des matrices carrées $n\\times n$ n'est jamais commutatif.","answer":false},
{"statement":"L'anneau $M_n(\\R)$ des matrices carrées $n\\times n$ est commutatif.","answer":false},
{"statement":"Le noyau d'un morphisme d'anneaux est un sous-anneau.","answer":false},
{"statement":"Le noyau d'un morphisme d'anneaux est un idéal.","answer":true},
{"statement":"Tout morphisme d'anneaux est injectif.","answer":false},
{"statement":"L'image d'un morphisme d'anneaux est un sous-anneau.","answer":true},
{"statement":"L'image d'un morphisme d'anneaux est un idéal.","answer":false},
{"statement":"L'image d'un sous-anneau par un morphisme d'anneaux est un sous-anneau.","answer":true},
{"statement":"L'image réciproque d'un sous-anneau par un morphisme d'anneaux est un sous-anneau.","answer":true},
{"statement":"L'image d'un idéal par un morphisme d'anneaux est un idéal.","answer":false},
{"statement":"L'image réciproque d'un idéal par un morphisme d'anneaux est un idéal.","answer":true},
{"statement":"L'image réciproque d'un idéal premier par un morphisme d'anneaux est un idéal premier.","answer":true},
{"statement":"L'image réciproque d'un idéal maximal par un morphisme d'anneaux est un idéal maximal.","answer":false},
{"statement":"Un sous-anneau d'un anneau intègre est intègre.","answer":true},
{"statement":"Si $A$ est intègre, alors $A[X]$ est intègre.","answer":true},
{"statement":"Dans un anneau intègre, tout élément irréductible est premier.","answer":false},
{"statement":"Si $I$ est un idéal maximal d'un anneau $A$, alors $A/I$ est un anneau intègre.","answer":true},
{"statement":"Si $I$ est un idéal premier d'un anneau $A$, alors $A/I$ est un anneau intègre.","answer":true},
{"statement":"L'anneau $\\Z$ est intègre.","answer":true},
{"statement":"L'anneau $\\R$ est intègre.","answer":true},
{"statement":"L'anneau $\\R[X]$ est intègre.","answer":true},
{"statement":"L'anneau $\\C[X,Y]$ est intègre.","answer":true},
{"statement":"L'anneau des nombres décimaux est intègre.","answer":true},
{"statement":"L'anneau $\\Z[i]$ des entiers de Gauss est intègre.","answer":true},
{"statement":"L'anneau $\\Z[\\sqrt{2}]$ est intègre.","answer":true},
{"statement":"L'anneau $\\R^{\\R}$ des fonctions de $\\R$ dans $\\R$ est intègre.","answer":false},
{"statement":"L'anneau $\\mathcal{C}^0(\\R,\\R)$ des fonctions continues de $\\R$ dans $\\R$ est intègre.","answer":false},
{"statement":"L'anneau $\\mathcal{C}^\\infty(\\R,\\R)$ des fonctions de classe $\\mathcal{C}^\\infty$ de $\\R$ dans $\\R$ est intègre.","answer":false},
{"statement":"L'anneau $\\R^{\\N}$ des suites réelles est intègre.","answer":false},
{"statement":"L'anneau $M_n(\\R)$ des matrices carrées $n\\times n$ est intègre.","answer":false},
{"statement":"L'anneau des matrices carrées diagonales $n\\times n$  est intègre.","answer":false},
{"statement":"L'anneau $M_n(\\R)$ des matrices carrées $n\\times n$ n'est jamais intègre.","answer":false},
{"statement":"L'anneau produit $\\R\\times\\R$ est intègre.","answer":false},
{"statement":"L'anneau $\\Z/n\\Z$ est toujours intègre.","answer":false},
{"statement":"L'anneau $\\Z/n\\Z$ n'est jamais intègre.","answer":false},
{"statement":"Soit $n\\in \\N$. Si l'anneau $\\Z/n\\Z$ est intègre, alors $n$ est un nombre premier.","answer":true},
{"statement":"Un sous-anneau d'un anneau factoriel est factoriel.","answer":false},
{"statement":"L'anneau $\\Z$ est factoriel.","answer":true},
{"statement":"L'anneau $\\Q$ est factoriel.","answer":true},
{"statement":"L'anneau des nombres décimaux est factoriel.","answer":true},
{"statement":"L'anneau produit $\\Z \\times \\Z$ est factoriel.","answer":false},
{"statement":"L'anneau produit $\\C \\times \\C$ est factoriel.","answer":false},
{"statement":"L'anneau $M_n(\\R)$ des matrices carrées $n\\times n$ est factoriel.","answer":false},
{"statement":"L'anneau $\\R^{\\R}$ des fonctions de $\\R$ dans $\\R$ est factoriel.","answer":false},
{"statement":"L'anneau $\\mathcal{C}^0(\\R,\\R)$ des fonctions continues de $\\R$ dans $\\R$ est factoriel.","answer":false},
{"statement":"L'anneau $\\R^{\\N}$ des suites réelles est factoriel.","answer":false},
{"statement":"L'anneau $\\Q[X]$ est factoriel.","answer":true},
{"statement":"L'anneau $\\Z[X]$ est factoriel.","answer":true},
{"statement":"Tout anneau intègre est factoriel.","answer":false},
{"statement":"Tout anneau factoriel est intègre.","answer":true},
{"statement":"Dans un anneau factoriel, deux éléments quelconques possèdent toujours un pgcd et un ppcm.","answer":true},
{"statement":"Si $A$ est factoriel, alors $A[X]$ est factoriel.","answer":true},
{"statement":"Si $A$ est intègre, alors $A[X]$ est factoriel.","answer":false},
{"statement":"Un sous-anneau d'un anneau principal est principal.","answer":false},
{"statement":"Les idéaux d'un anneau $A$ triviaux ($\\{0\\}$ et $A$) sont principaux.","answer":true},
{"statement":"Dans un anneau principal, un élément est premier si et seulement si il est irréductible.","answer":false},
{"statement":"Dans un anneau principal, des éléments $a$ et $b$ sont premiers entre eux si et seulement<br>si il existe des éléments $u$ et $v$ tels que $au+bv=1$.","answer":true},
{"statement":"Dans un anneau principal, si $a | bc$ et $a \\not | b$, alors $a | c$.","answer":false},
{"statement":"Tout anneau intègre est principal.","answer":false},
{"statement":"Tout anneau factoriel est principal.","answer":false},
{"statement":"Tout anneau principal est intègre.","answer":true},
{"statement":"Tout anneau principal est factoriel.","answer":true},
{"statement":"L'anneau $\\Z$ est principal","answer":true},
{"statement":"L'anneau des nombres décimaux est principal.","answer":true},
{"statement":"L'anneau $\\Q[X]$ est principal.","answer":true},
{"statement":"L'anneau $\\R[X]$ est principal.","answer":true},
{"statement":"L'anneau $\\Z[X]$ est principal.","answer":false},
{"statement":"Dans $\\Z[X]$, l'idéal $(X,2)$ est principal","answer":false},
{"statement":"Dans $\\Z[X]$, l'idéal $(X,1)$ est principal","answer":true},
{"statement":"Dans $\\Z[X]$, l'idéal $(X,X^2)$ est principal","answer":true},
{"statement":"Dans $\\Z[X]$, l'idéal $(X^2,X^3)$ est principal","answer":true},
{"statement":"Dans $\\Z[X]$, l'idéal $(X,2X)$ est principal","answer":true},
{"statement":"Dans $\\Z[X]$, l'idéal $(2X,3X)$ est principal","answer":true},
{"statement":"Dans $\\Q[X]$, l'idéal $(X,2)$ est principal","answer":true},
{"statement":"Si $A$ est principal, alors $A[X]$ est principal.","answer":false},
{"statement":"Si $A$ est principal, alors $A[X]$ est factoriel.","answer":true},
{"statement":"Si $A$ est factoriel, alors $A[X]$ est principal.","answer":false},
{"statement":"Un sous-anneau d'un anneau euclidien est euclidien.","answer":false},
{"statement":"Il existe des anneaux principaux non euclidiens.","answer":true},
{"statement":"L'anneau $\\Z$ est euclidien","answer":true},
{"statement":"L'anneau $\\Q$ est euclidien","answer":true},
{"statement":"L'anneau $\\Z[i]$ est euclidien","answer":true},
{"statement":"L'anneau $\\Z[j]$ (où $j$ désigne le nombre complexe $e^{2i\\pi/3}$) est euclidien","answer":true},
{"statement":"Pour tout nombre complexe $\\alpha$, l'anneau $\\Z[\\alpha]$ est euclidien.","answer":false},
{"statement":"L'anneau $\\Z[X]$ est euclidien","answer":false},
{"statement":"L'anneau $\\Q[X]$ est euclidien","answer":true},
{"statement":"L'anneau $\\R[X]$ est euclidien","answer":true},
{"statement":"Si $A$ est euclidien, alors $A[X]$ est euclidien.","answer":false},
{"statement":"Tout anneau principal est euclidien.","answer":false},
{"statement":"Tout anneau euclidien est intègre.","answer":true},
{"statement":"Tout anneau euclidien est factoriel.","answer":true},
{"statement":"Tout anneau euclidien est principal.","answer":true},
{"statement":"Dans un anneau euclidien, deux éléments quelconques possèdent toujours un pgcd et un ppcm.","answer":true},
{"statement":"Tout anneau intègre est euclidien.","answer":false},
{"statement":"Tout anneau factoriel est euclidien.","answer":false},
{"statement":"Un corps est un anneau dont tous les éléments non nuls sont inversibles.","answer":false},
{"statement":"Un corps est un anneau non nul dont tous les éléments non nuls sont inversibles.","answer":false},
{"statement":"Un corps est un anneau $A$ tel que $(A\\setminus \\{0\\},\\times)$ soit un groupe.","answer":false},
{"statement":"Un corps est un anneau $A$ tel que $(A\\setminus \\{0\\},\\times)$ soit un groupe commutatif.","answer":true},
{"statement":"Un corps ne possède pas d'idéaux.","answer":false},
{"statement":"Un corps est un anneau qui possède exactement un idéal.","answer":false},
{"statement":"Un corps est un anneau commutatif qui possède exactement deux idéaux.","answer":true},
{"statement":"Un corps possède exactement un idéal maximal.","answer":true},
{"statement":"Si $k$ est un corps, alors $k[X]$ est principal.","answer":true},
{"statement":"Si $k$ est un corps, alors $k[X]$ est un corps.","answer":false},
{"statement":"Si $K$ et $L$ sont des corps, l'anneau produit $K\\times L$ est un corps.","answer":false},
{"statement":"Tout sous-anneau d'un corps est un corps.","answer":false},
{"statement":"Tout corps est un anneau intègre","answer":true},
{"statement":"Tout corps est un anneau factoriel.","answer":true},
{"statement":"Tout corps est un anneau principal.","answer":true},
{"statement":"Tout corps est un anneau euclidien.","answer":true},
{"statement":"Si $I$ est un idéal premier d'un anneau commutatif $A$, alors $A/I$ est un corps.","answer":false},
{"statement":"Si $I$ est un idéal maximal d'un anneau commutatif $A$, alors $A/I$ est un corps.","answer":true},
{"statement":"Tout anneau intègre fini est un corps","answer":true},
{"statement":"Tout anneau fini est un corps","answer":false},
{"statement":"Tout anneau intègre est un corps","answer":false},
{"statement":"Soit $n\\in \\N$. L'anneau $\\Z/n\\Z$ est un corps.","answer":false},
{"statement":"Soit $n\\in \\N$. Si l'anneau $\\Z/n\\Z$ est un corps, alors $n$ est un nombre premier.","answer":true},
{"statement":"$a+\\dfrac{1}{a} = \\dfrac{a^2+1}{a}$","answer":true},
{"statement":"$b+\\dfrac{1}{b} = \\dfrac{b+1}{b}$","answer":false},
{"statement":"$\\dfrac{x}{x+1} = 1+x$","answer":false},
{"statement":"$\\dfrac{y+1}{y} = 1+y$","answer":false},
{"statement":"$\\dfrac{y+1}{y} = 1+\\dfrac{1}{y}$","answer":true},
{"statement":"$\\dfrac{n^2-1}{n-1} = n+1$","answer":true},
{"statement":"$\\dfrac{n^2-1}{n+1} = n-1$","answer":true},
{"statement":"$\\dfrac{n^3-1}{n-1} = n^2+n+1$","answer":true},
{"statement":"$\\dfrac{n^3+1}{n+1} = n^2-n+1$","answer":true},
{"statement":"$\\dfrac{n^3+1}{n+1} = n^2+1$","answer":false},
{"statement":"$\\dfrac{n^3-1}{n+1} = n^2-1$","answer":false},
{"statement":"$\\dfrac{n^3+1}{n-1} = n^2+1$","answer":false},
{"statement":"$\\dfrac{n^2+1}{n+1} = n-1$","answer":false},
{"statement":"$\\dfrac{n^2+1}{n-1} = n+1$","answer":false},
{"statement":"$\\dfrac{1}{x-1} +  \\dfrac{1}{x+1} = \\dfrac{1}{x^2-1}$","answer":false},
{"statement":"$\\dfrac{1}{x-1} +  \\dfrac{1}{x-1} = \\dfrac{1}{x^2-2x+1}$","answer":false},
{"statement":"$\\dfrac{1}{x+1} +  \\dfrac{1}{x+1} = \\dfrac{1}{x^2+2x+1}$","answer":false},
{"statement":"$\\dfrac{1}{\\ell+1} +\\dfrac{1}{\\ell+3}=  \\dfrac{1}{\\ell+4}$","answer":false},
{"statement":"$\\dfrac{1}{\\ell+1} +\\dfrac{1}{\\ell+3}=  \\dfrac{1}{2\\ell+4}$","answer":false},
{"statement":"$\\dfrac{1}{p} +\\dfrac{1}{p-1} = \\dfrac{2p-1}{p(p-1)}$","answer":true},
{"statement":"$\\dfrac{1}{q} +\\dfrac{1}{1-q} = \\dfrac{1}{q(1-q)}$","answer":true},
{"statement":"$\\dfrac{1}{n} +\\dfrac{1}{1-n} = \\dfrac{1}{n^2-n}$","answer":false},
{"statement":"$\\dfrac{1}{2a} +  \\dfrac{1}{3a} = \\dfrac{1}{5a} $","answer":false},
{"statement":"$\\dfrac{1}{2a} +  \\dfrac{1}{3a} = \\dfrac{1}{6a} $","answer":false},
{"statement":"$\\dfrac{1}{2a} +  \\dfrac{1}{3a} = \\dfrac{5}{6a} $","answer":true},
{"statement":"$\\dfrac{1}{b+1} +  \\dfrac{1}{b-1} = \\dfrac{1}{b^2-1} $","answer":false},
{"statement":"$\\dfrac{1}{b+1} +  \\dfrac{1}{b-1} = \\dfrac{2b}{b^2-1} $","answer":true},
{"statement":"$\\dfrac{1}{b+1} +  \\dfrac{1}{b-1} = \\dfrac{2}{b^2-1} $","answer":false},
{"statement":"$\\dfrac{1}{b-1} -  \\dfrac{1}{b+1} = \\dfrac{2}{b^2-1} $","answer":true},
{"statement":"$\\dfrac{1}{b+1} -  \\dfrac{1}{b-1} = \\dfrac{2}{b^2-1} $","answer":false},
{"statement":"$\\dfrac{1}{b+1} -  \\dfrac{1}{b-1} = \\dfrac{2}{1-b^2} $","answer":true},
{"statement":"La série de terme général $\\dfrac{1}{(\\ln n)^{\\ln n}}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\left(1-\\dfrac{1}{\\sqrt n}\\right)^n$ est convergente.","answer":true},
{"statement":"La série de terme général $(1-th(n))$ est convergente.","answer":true},
{"statement":"La série de terme général $\\left(\\cos\\dfrac{1}{n}\\right)^n$ est convergente.","answer":false},
{"statement":"La série de terme général $n \\sin\\left(\\dfrac{1}{n}\\right)$ est convergente.","answer":false},
{"statement":"La série de terme général $\\left(\\dfrac{1}{\\sqrt n}\\right)^{\\sqrt n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{1}{\\sqrt n}\\ln\\left(1+\\dfrac{1}{\\sqrt n}\\right)$ est convergente.","answer":false},
{"statement":"La série de terme général $1-\\cos \\dfrac{\\pi}{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{(-1)^n+n}{1+n^2}$ est convergente.","answer":false},
{"statement":"La série de terme général $ne^{-\\sqrt n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{\\ln n}{n^2}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{\\ln n}{n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{1}{n \\ln n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{1}{n \\ln^2 n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\ln\\left(\\dfrac{n^2+n+1}{n^2+n-1}\\right)$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{\\ln(n^2+3)\\sqrt{2^n+1}}{4^n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{\\ln n}{\\ln(e^n-1)}$ est convergente","answer":false},
{"statement":"La série de terme général $\\sqrt{ch\\dfrac{1}{n} -1}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\left(\\dfrac{n}{n+1}\\right)^{n^2}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\left(\\dfrac{n}{n+1}\\right)^{n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\left(\\dfrac{n^2+n-1}{n^2+n+1}\\right)^{n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\left(\\dfrac{n^2+n+1}{n^2+n-1}\\right)^{n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\left(\\dfrac{\\sqrt n -1}{\\sqrt n}\\right)^{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\left(\\dfrac{\\sqrt n }{1+\\sqrt n}\\right)^{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{1}{n!}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{n^n}{n!}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{n!}{n^n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{1}{n \\ln n \\ln \\ln n}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{1}{n^{1+1/n}}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{n^{\\ln n}}{(\\ln n)^n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\frac 1{n^n}$ est convergente.","answer":true},
{"statement":"La série de terme général $ne^{-n}$ est convergente.","answer":true},
{"statement":"La série de terme général $e^{-\\sqrt n}$ est convergente.","answer":true},
{"statement":"La série de terme général $(n^2+6 \\ln n)\\sin(2^{-n})$ est convergente.","answer":true},
{"statement":"La série de terme général $\\ln\\left(\\cos\\left(\\dfrac{1}{n}\\right)\\right)$ est convergente.","answer":true},
{"statement":"La série de terme général $n - \\sqrt{n^2 - 1}$ est convergente.","answer":false},
{"statement":"La série de terme général $n - \\sqrt[3]{n^3 - 1}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\sqrt[3]{1 - \\frac 1n} - 1$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{\\cos(2n)}{3n^2-4n+1}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{1}{\\sqrt n \\ln(n)}$ est convergente.","answer":false},
{"statement":"La série de terme général $\\sin\\left(\\dfrac{(-1)^n}n \\right) - \\dfrac{(-1)^n}{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\sin\\left(\\dfrac{1}n \\right) - \\ln\\left( 1 + \\frac 1n\\right)$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{(-1)^n}{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{(-1)^n}{\\sqrt n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\sin(n)$ est convergente.","answer":false},
{"statement":"La série de terme général $\\dfrac{\\sin(n)}{n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\dfrac{\\cos(n)}{\\sqrt n}$ est convergente.","answer":true},
{"statement":"La série de terme général $\\left(1+(-1)^n\\right)\\sin(n)$ converge.","answer":false},
{"statement":"La série de terme général $\\left(1+(-1)^n\\right)\\sin(n\\pi/2)$ converge.","answer":true},
{"statement":"La série de terme général $1/n$ si $n$ est premier et $0$ sinon est une série convergente.","answer":false},
{"statement":"Si $(u_n)$ est une suite strictement positive vérifiant $\\forall n\\in \\N, \\dfrac{u_{n+1}}{u_n}<1$, alors la série $\\sum u_n$ est convergente.","answer":false},
{"statement":"Si la série $\\sum u_n$ converge et que $u_n$ ne s'annule jamais, alors $\\dfrac{u_{n+1}}{u_n}$ converge vers une limite $<1$.","answer":false},
{"statement":"Si la série $\\sum u_n$ diverge, alors $u_n$ ne tend pas vers zéro.","answer":false},
{"statement":"Si $u_n\\sim v_n$ alors les séries $\\sum u_n$ et $\\sum v_n$ sont de même nature.","answer":false},
{"statement":"Si $u_n\\sim v_n$ et les deux suites sont positives, alors les séries $\\sum u_n$ et $\\sum v_n$ sont de même nature.","answer":true},
{"statement":"Si $u_n\\sim v_n$ alors  $\\sum_{k=0}^n u_k \\sim \\sum_{k=0}^n v_k$.","answer":false},
{"statement":"Si $u_n\\sim v_n$ et les deux suites sont positives, alors  $\\sum_{k=0}^n u_k \\sim \\sum_{k=0}^n v_k$.","answer":false},
{"statement":"Si la série $\\sum u_n$ diverge, alors la série $\\sum |u_n|$ diverge également.","answer":true},
{"statement":"La somme de deux séries convergentes est convergente.","answer":true},
{"statement":"La somme de deux séries absolument convergentes est absolument convergente.","answer":true},
{"statement":"La somme de deux séries non absolument convergentes n'est pas absolument convergente.","answer":false},
{"statement":"La somme de deux séries divergentes est divergente.","answer":false},
{"statement":"La somme de deux séries positives divergentes est divergente.","answer":true},
{"statement":"Si la série de terme général $u_n$ converge, alors la série de terme général $(-1)^nu_n$ aussi.","answer":false},
{"statement":"Si la série de terme général $u_n$ converge, alors la série de terme général $u_n^2$ aussi.","answer":false},
{"statement":"Si la série de terme général $u_n$ converge, alors la série de terme général $u_n^4$ aussi.","answer":false},
{"statement":"Soit $(u_n)$ une suite réelle. Si les séries de terme général $u_{2n}$ et $u_{2n+1}$ convergent, la série de terme général $u_n$ converge.","answer":true},
{"statement":"La série de terme général $u_n$ converge si et seulement si les séries de terme général $u_{2n}$ et $u_{2n+1}$ convergent.","answer":false},
{"statement":"Si $u_n=o\\left(\\dfrac{1}{n}\\right)$, alors la série de terme général $u_n$ converge","answer":false},
{"statement":"Si $u_n=o\\left(\\dfrac{(-1)^n}{n}\\right)$, alors la série de terme général $u_n$ converge","answer":false},
{"statement":"Si $u_n=o\\left(\\dfrac{1}{n^2}\\right)$, alors la série de terme général $u_n$ converge","answer":true},
{"statement":"Si $(u_n)$ est une suite positive et $u_n=o\\left(\\dfrac{1}{n}\\right)$, alors la série de terme général $u_n$ converge","answer":false},
{"statement":"Si $(u_n)$ est une suite positive décroissante et $u_n=o\\left(\\dfrac{1}{n}\\right)$, alors la série de terme général $u_n$ converge","answer":false},
{"statement":"Si une série $\\sum u_n$ converge, alors $u_n=o\\left(\\dfrac{1}{n}\\right)$.","answer":false},
{"statement":"Si une série $\\sum u_n$ à termes positifs converge, alors $u_n=o\\left(\\dfrac{1}{n}\\right)$.","answer":false},
{"statement":"Si la série $\\sum u_n$ est convergente et $v_n \\to 0$, alors la série $\\sum u_nv_n$ est convergente","answer":false},
{"statement":"Si la série $\\sum u_n$ est convergente et $v_n$ décroît vers $0$, alors la série $\\sum u_nv_n$ est convergente","answer":true},
{"statement":"Si $u_n \\leq v_n$ et si la série $\\sum v_n$ converge, alors la série $\\sum u_n$ converge.","answer":false},
{"statement":"Si $(u_n)_{n \\in \\mathbb N}$ est une suite de réels positifs, la série de terme général $u_n$ est de même nature que la série de terme général $\\ln(1+u_n)$.","answer":true},
{"statement":"Si $(u_n)_{n \\in \\mathbb N}$ est une suite de réels et que la série de terme général $u_n$ est absolument convergente, alors la série de terme général $u_n^2$ est convergente.","answer":true},
{"statement":"La série de terme général $\\frac 1{n^n}$ est une série de Riemann convergente.","answer":false},
{"statement":"Si $(u_n)$ est décroissante de limite nulle, alors la série $\\sum u_n$ converge.","answer":false},
{"statement":"Si la série $\\sum u_n$ converge, alors la suite $(u_n)$ converge.","answer":true},
{"statement":"Si la série $\\sum u_n$ converge, alors la suite $(u_n)$ tend vers zéro.","answer":true},
{"statement":"Si la série $\\sum u_n$ converge, alors la suite $(u_n)$ décroît vers zéro.","answer":false},
{"statement":"Si la série $\\sum u_n$ converge, alors à partir d'un certain rang, la suite $(u_n)$ décroît vers zéro.","answer":false},
{"statement":"Si la série $\\sum u_n$ converge, alors à partir d'un certain rang, la suite $(|u_n|)$ décroît vers zéro.","answer":false},
{"statement":"Si la série $\\sum (u_{n+1} - u_n)$ converge, alors la série de terme général $u_n$ converge aussi.","answer":false},
{"statement":"Si la série $\\sum (u_{n+1} - u_n)$ converge, alors la suite $(u_n)$ converge aussi.","answer":true},
{"statement":"Si la série $\\sum u_n^2$ converge, alors la série $\\sum |u_n|$ converge aussi.","answer":false},
{"statement":"La somme de deux fonctions holomorphes est holomorphe.","answer":true},
{"statement":"Le produit de deux fonctions holomorphes est holomorphe.","answer":true},
{"statement":"La composée de deux fonctions holomorphes est holomorphe.","answer":true},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $P$ et $Q$ sont de classe $\\mathcal C^1$.","answer":true},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $P$ et $Q$ sont holomorphes.","answer":false},
{"statement":"Pour tout $P\\in \\C[T]$, la fonction $f : \\C\\to\\C, z\\mapsto P(z)$ est holomorphe","answer":true},
{"statement":"Pour tout $P\\in \\R[T]$, la fonction $f : \\C\\to \\C, z\\mapsto P(z)$ est holomorphe","answer":true},
{"statement":"Pour tout $P\\in \\Q[T]$, la fonction $f : \\C\\to\\C, z\\mapsto P(z)$ est holomorphe","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -x+iy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -y+ix$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto y-ix$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto y+ix$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -x+iy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x-y+i(x+y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x+y+i(x+y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x+y+i(y-x)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x+y+i(x-y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x-y-i(x+y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x-2y+i(2x+y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto 2x+3y+i(2y-3x)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x+2y+i(2x-y)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\C\\to \\C, z\\mapsto |z|$ est holomorphe.","answer":false},
{"statement":"La fonction $f : \\C\\to \\C, z\\mapsto |z|^2$ est holomorphe.","answer":false},
{"statement":"La fonction $f : \\C\\to \\C, z\\mapsto |z|^2$ est dérivable au sens complexe en l'origine.","answer":true},
{"statement":"La fonction $f : \\C\\to \\C, z\\mapsto \\overline{z}$ est holomorphe.","answer":false},
{"statement":"La fonction $f : \\C\\to \\C, z\\mapsto z^3-3$ est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x^2-y^2+2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x^2-y^2-2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto y^2-x^2-2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto y^2-x^2+2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -2xy +i(x^2-y^2)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto 2xy +i(y^2-x^2)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto 2xy +i(x^2-y^2)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -2xy +i(y^2-x^2)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x^2+y^2+2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x^2+y^2-2ixy$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto x^3-3xy^2+i(3x^2y-y^3)$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^x\\cos y + ie^x \\sin y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^x\\cos 2y + ie^x \\sin 2y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^{-x}\\cos y - ie^{-x} \\sin y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^x\\cos y - ie^x \\sin y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^{-y}\\cos x + ie^{-y} \\sin x$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^y\\cos x - ie^y \\sin x$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^y\\cos x + ie^y \\sin x$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^{-y}\\cos x - ie^{-y} \\sin x$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto -e^x\\sin y + ie^x \\cos y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^x\\sin y - ie^x \\cos y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":true},
{"statement":"La fonction $f : \\R^2 \\to\\C, (x,y)\\mapsto e^x\\sin y + ie^x \\cos y$, considérée comme fonction de $\\C$ dans $\\C$, est holomorphe.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$ différentiables. La fonction $f=P+iQ$ est holomorphe si et seulement si $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$ différentiables. La fonction $f=P+iQ$ est holomorphe si et seulement si $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial Q}{\\partial y}$ et $\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$ différentiables. La fonction $f=P+iQ$ est holomorphe si et seulement si $\\dfrac{\\partial P}{\\partial x} = -\\dfrac{\\partial Q}{\\partial y}$ et $\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial x}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$ différentiables. La fonction $f=P+iQ$ est holomorphe si et seulement si $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial Q}{\\partial y}$ et $\\dfrac{\\partial P}{\\partial y} = - \\dfrac{\\partial Q}{\\partial x}$.","answer":true},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial Q}{\\partial x}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = -\\dfrac{\\partial Q}{\\partial x}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = -\\dfrac{\\partial P}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = \\dfrac{\\partial Q}{\\partial y}$.","answer":true},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial x} = -\\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial Q}{\\partial x} = -\\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial Q}{\\partial x} = \\dfrac{\\partial P}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial Q}{\\partial x} = -\\dfrac{\\partial P}{\\partial y}$.","answer":true},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial y} = \\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"Soient $P, Q : \\R^2\\to \\R$. Si $f=P+iQ$ est holomorphe, alors $\\dfrac{\\partial P}{\\partial y} = -\\dfrac{\\partial Q}{\\partial y}$.","answer":false},
{"statement":"La forme en polaires des équations de Cauchy-Riemann pour une fonction $f=u+iv$ est<br>$\\dfrac{\\partial u}{\\partial r} = r \\dfrac{\\partial v}{\\partial \\theta}$ et $\\dfrac{\\partial v}{\\partial r} = -r \\dfrac{\\partial u}{\\partial \\theta}$.","answer":false},
{"statement":"La forme en polaires des équations de Cauchy-Riemann pour une fonction $f=u+iv$ est<br>$r \\dfrac{\\partial u}{\\partial r} =  \\dfrac{\\partial v}{\\partial \\theta}$ et $r \\dfrac{\\partial v}{\\partial r} = - \\dfrac{\\partial u}{\\partial \\theta}$.","answer":true},
{"statement":"La forme en polaires des équations de Cauchy-Riemann pour une fonction $f=u+iv$ est<br>$\\dfrac{\\partial u}{\\partial r} = \\dfrac{1}{r} \\dfrac{\\partial v}{\\partial \\theta}$ et $\\dfrac{\\partial v}{\\partial r} = - \\dfrac{1}{r} \\dfrac{\\partial u}{\\partial \\theta}$.","answer":true},
{"statement":"La forme en polaires des équations de Cauchy-Riemann pour une fonction $f=u+iv$ est<br>$\\dfrac{\\partial u}{\\partial r} = - \\dfrac{1}{r} \\dfrac{\\partial v}{\\partial \\theta}$ et $\\dfrac{\\partial v}{\\partial r} = \\dfrac{1}{r} \\dfrac{\\partial u}{\\partial \\theta}$.","answer":false},
{"statement":"Une fonction différentiable $f : \\C\\to \\C$  est holomorphe si et seulement si $\\dfrac{\\partial f}{\\partial \\overline z} = 0$.","answer":true},
{"statement":"Une fonction différentiable $f : \\C\\to \\C$ est holomorphe si et seulement si $\\dfrac{\\partial f}{\\partial z} = 0$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial z} = \\dfrac{\\partial}{\\partial x}+\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial z} = \\dfrac{\\partial}{\\partial x}+i\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial z} = \\dfrac{\\partial}{\\partial x}-i\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial z} = \\dfrac12\\left(\\dfrac{\\partial}{\\partial x}-i\\dfrac{\\partial}{\\partial y}\\right)$.","answer":true},
{"statement":"$\\dfrac{\\partial}{\\partial z} = \\dfrac12\\left(\\dfrac{\\partial}{\\partial x}+i\\dfrac{\\partial}{\\partial y}\\right)$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac{\\partial}{\\partial x}+\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac{\\partial}{\\partial x}+i\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac{\\partial}{\\partial x}-i\\dfrac{\\partial}{\\partial y}$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac12\\left(\\dfrac{\\partial}{\\partial x}-i\\dfrac{\\partial}{\\partial y}\\right)$.","answer":false},
{"statement":"$\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac12\\left(\\dfrac{\\partial}{\\partial x}+i\\dfrac{\\partial}{\\partial y}\\right)$.","answer":true},
{"statement":"$\\dfrac{\\partial}{\\partial z}\\dfrac{\\partial}{\\partial \\bar z} = \\dfrac{\\partial^2}{\\partial x^2}+\\dfrac{\\partial^2}{\\partial y^2}$.","answer":false},
{"statement":"$\\dfrac{\\partial^2}{\\partial x^2}+\\dfrac{\\partial^2}{\\partial y^2} = 4\\dfrac{\\partial}{\\partial z}\\dfrac{\\partial}{\\partial \\bar z}$.","answer":true},
{"statement":"$ \\dfrac{\\partial}{\\partial z}\\dfrac{\\partial}{\\partial \\bar z} = 4\\left(\\dfrac{\\partial^2}{\\partial x^2}+\\dfrac{\\partial^2}{\\partial y^2}\\right)$.","answer":false},
{"statement":"$\\dfrac{\\partial \\bar f}{\\partial \\bar z} = \\overline{\\left(\\dfrac{\\partial f}{\\partial z}\\right)}$.","answer":true},
{"statement":"L'ensemble des fonctions holomorphes sur $\\C$ est un anneau pour les lois usuelles.","answer":true},
{"statement":"L'ensemble des fonctions holomorphes sur $\\C$ est une $\\C$-algèbre pour les lois usuelles.","answer":true},
{"statement":"L'ensemble des fonctions holomorphes sur $\\C$ est un corps pour les lois usuelles.","answer":false},
{"statement":"L'ensemble des fonctions holomorphes sur un ouvert $U\\subset \\C$ est un anneau pour les lois usuelles.","answer":true},
{"statement":"L'anneau des fonctions holomorphes sur un ouvert $U\\subset \\C$ est  principal.","answer":false},
{"statement":"L'anneau des fonctions holomorphes sur un ouvert $U\\subset \\C$ est  factoriel.","answer":false},
{"statement":"L'anneau des fonctions holomorphes sur un ouvert $U\\subset \\C$ est  noethérien.","answer":false},
{"statement":"L'anneau des fonctions holomorphes sur $\\C$ est  intègre.","answer":true},
{"statement":"L'anneau des fonctions holomorphes sur un ouvert $U\\subset \\C$ est  intègre.","answer":false},
{"statement":"L'anneau des fonctions holomorphes sur un ouvert connexe $U\\subset \\C$ est intègre.","answer":true},
{"statement":"Toute fonction holomorphe $f:\\C\\to\\C$ est harmonique.","answer":true},
{"statement":"Toute fonction harmonique $f:\\C\\to\\C$ est holomorphe.","answer":false},
{"statement":"Soit $f : \\C\\to\\C$ holomorphe et $\\phi :\\C\\to \\R$ harmonique. Alors $\\phi \\circ f$ est holomorphe.","answer":false},
{"statement":"Soit $f : \\C\\to\\C$ holomorphe et $\\phi :\\C\\to \\R$ harmonique. Alors $\\phi \\circ f$ est harmonique.","answer":true},
{"statement":"La somme de deux fonctions harmoniques est harmonique.","answer":true},
{"statement":"Le produit de deux fonctions harmoniques est harmonique.","answer":false},
{"statement":"La composée de deux fonctions harmoniques est harmonique.","answer":false},
{"statement":"Soit $f : \\C\\to\\C$ holomorphe, ne s'annulant pas. Alors $\\ln|f|$ est harmonique.","answer":true},
{"statement":"Soit $f : \\C\\to\\C$ holomorphe. Alors $|f|$ est harmonique.","answer":false},
{"statement":"Soit $f : \\C\\to\\C$ holomorphe. Alors $|f|^2$ est harmonique.","answer":false},
{"statement":"Soient $u, v : \\C\\to \\R$. Si $f:=u+iv$ est holomorphe, alors $u$ et $v$ sont harmoniques.","answer":true},
{"statement":"Soient $u, v : \\C\\to \\R$ deux fonctions harmoniques. Alors, $f:=u+iv$ est holomorphe.","answer":false},
{"statement":"Soit $u : \\C\\to \\R$ harmonique. Alors il existe une unique fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":false},
{"statement":"Soit $u : \\C\\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":true},
{"statement":"Soit $\\Omega \\subset \\C$ un ouvert et $u : \\Omega \\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":false},
{"statement":"Soit $\\Omega \\subset \\C$ un ouvert connexe et $u : \\Omega \\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":false},
{"statement":"Soit $\\Omega \\subset \\C$ un ouvert convexe et $u : \\Omega \\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":true},
{"statement":"Soit $\\Omega \\subset \\C$ un ouvert étoilé et $u : \\Omega \\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":true},
{"statement":"Soit $\\Omega \\subset \\C$ un ouvert simplement connexe et $u : \\Omega \\to \\R$ harmonique. Alors il existe une fonction $v : \\C\\to \\R$ telle que $f:=u+iv$ soit holomorphe.","answer":true},
{"statement":"Dans un triangle rectangle, le cosinus d’un angle aigu est le quotient de la mesure de la longueur du côté adjacent à cet angle par celle de l’hypoténuse du triangle.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$, on a $\\cos(\\widehat A) = \\frac{AC}{AB}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$, on a $\\cos(\\widehat B) = \\frac{BC}{AB}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=5$ et $BC=3$, on a $\\cos(\\widehat A) = \\frac{4}{5}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=5$ et $BC=4$, on a $\\cos(\\widehat A) = \\frac{3}{5}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=2$ et $BC=1$, on a $\\cos(\\widehat A) = \\frac{\\sqrt{3}}{2}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=2$, on a $\\cos(\\widehat A) = \\frac{\\sqrt{5}}{3}$.","answer":true},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=1$, on a $\\cos(\\widehat A) = \\frac{2\\sqrt{2}}{3}$.","answer":true},
{"statement":"Le cosinus d'un angle aigu est toujours inférieur ou égal à $1$.","answer":true},
{"statement":"Le cosinus d'un angle aigu est toujours positif ou nul.","answer":true},
{"statement":"$\\cos(30^{\\circ})=\\frac{\\sqrt{3}}{2}$.","answer":true},
{"statement":"$\\cos(45^{\\circ})=\\frac{\\sqrt{2}}{2}$.","answer":true},
{"statement":"$\\cos(45^{\\circ})=\\frac{1}{\\sqrt{2}}$.","answer":true},
{"statement":"$\\cos(60^{\\circ})=\\frac{1}{2}$.","answer":true},
{"statement":"$\\cos(30^{\\circ})=\\frac{1}{2}$.","answer":false},
{"statement":"$\\cos(30^{\\circ})=\\frac{\\sqrt{3}}{3}$.","answer":false},
{"statement":"$\\cos(45^{\\circ})=\\frac{1}{2}$.","answer":false},
{"statement":"$\\cos(45^{\\circ})=\\sqrt{2}$.","answer":false},
{"statement":"$\\cos(60^{\\circ})=\\frac{\\sqrt{3}}{2}$.","answer":false},
{"statement":"Dans un triangle rectangle, le cosinus d’un angle aigu est le quotient de la mesure de la longueur de l'hypoténuse par celle du côté adjacent à cet angle.","answer":false},
{"statement":"Dans un triangle rectangle, le cosinus d’un angle aigu est le quotient de la mesure de la longueur du côté opposé à cet angle par celle de l’hypoténuse du triangle.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$, on a $\\cos(\\widehat A) = \\frac{BC}{AB}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$, on a $\\cos(\\widehat B) = \\frac{AC}{AB}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=5$ et $BC=3$, on a $\\cos(\\widehat A) = \\frac{3}{5}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=5$ et $BC=4$, on a $\\cos(\\widehat A) = \\frac{4}{5}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=2$ et $BC=1$, on a $\\cos(\\widehat A) = \\frac{1}{2}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=2$ et $BC=1$, on a $\\cos(\\widehat A) = \\sqrt{3}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=2$, on a $\\cos(\\widehat A) = \\sqrt{5}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=1$, on a $\\cos(\\widehat A) = 2\\sqrt{2}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=2$, on a $\\cos(\\widehat A) = \\frac{2}{3}$.","answer":false},
{"statement":"Dans un triangle $ABC$ rectangle en $C$ avec $AB=3$ et $BC=1$, on a $\\cos(\\widehat A) = \\frac{1}{3}$.","answer":false},
{"statement":"$\\cos(67^{\\circ})<\\frac{1}{2}$.","answer":true},
{"statement":"$\\cos(51^{\\circ})<\\frac{1}{\\sqrt{2}}$.","answer":true},
{"statement":"$\\cos(43^{\\circ})<\\frac{\\sqrt{3}}{2}$.","answer":true},
{"statement":"$\\cos(56^{\\circ})>\\frac{1}{2}$.","answer":true},
{"statement":"$\\cos(41^{\\circ})>\\frac{\\sqrt{2}}{2}$.","answer":true},
{"statement":"$\\cos(29^{\\circ})>\\frac{\\sqrt{3}}{2}$.","answer":true},
{"statement":"$\\cos(62^{\\circ})>\\frac{1}{2}$.","answer":false},
{"statement":"$\\cos(53^{\\circ})>\\frac{1}{\\sqrt{2}}$.","answer":false},
{"statement":"$\\cos(39^{\\circ})>\\frac{\\sqrt{3}}{2}$.","answer":false},
{"statement":"$\\cos(53^{\\circ})<\\frac{1}{2}$.","answer":false},
{"statement":"$\\cos(43^{\\circ})<\\frac{\\sqrt{2}}{2}$.","answer":false},
{"statement":"$\\cos(27^{\\circ})<\\frac{\\sqrt{3}}{2}$.","answer":false},
{"statement":"$9\\times 9 = 81$.", "answer":true},
{"statement":"$9\\times 8 = 72$.", "answer":true},
{"statement":"$9\\times 7 = 63$.", "answer":true},
{"statement":"$9\\times 6 = 54$.", "answer":true},
{"statement":"$9\\times 5 = 45$.", "answer":true},
{"statement":"$8\\times 8 = 64$.", "answer":true},
{"statement":"$8\\times 7 = 56$.", "answer":true},
{"statement":"$8\\times 6 = 48$.", "answer":true},
{"statement":"$8\\times 5 = 40$.", "answer":true},
{"statement":"$7\\times 7 = 49$.", "answer":true},
{"statement":"$7\\times 6 = 42$.", "answer":true},
{"statement":"$7\\times 5 = 35$.", "answer":true},
{"statement":"$6\\times 6 = 36$.", "answer":true},
{"statement":"$6\\times 5 = 30$.", "answer":true},
{"statement":"$5\\times 5 = 25$.", "answer":true},
{"statement":"$9\\times 9 = 89$.", "answer":false},
{"statement":"$9\\times 8 = 62$.", "answer":false},
{"statement":"$9\\times 7 = 72$.", "answer":false},
{"statement":"$9\\times 6 = 63$.", "answer":false},
{"statement":"$9\\times 5 = 40$.", "answer":false},
{"statement":"$8\\times 8 = 81$.", "answer":false},
{"statement":"$8\\times 7 = 66$.", "answer":false},
{"statement":"$8\\times 6 = 58$.", "answer":false},
{"statement":"$8\\times 5 = 45$.", "answer":false},
{"statement":"$7\\times 7 = 42$.", "answer":false},
{"statement":"$7\\times 6 = 54$.", "answer":false},
{"statement":"$7\\times 5 = 45$.", "answer":false},
{"statement":"$6\\times 6 = 42$.", "answer":false},
{"statement":"$6\\times 5 = 40$.", "answer":false},
{"statement":"$5\\times 5 = 35$.", "answer":false},
{"statement":"$9\\times 9 + 9\\times 9 = 162$", "answer":true},
{"statement":"$9\\times 8 + 9\\times 9 = 153$", "answer":true},
{"statement":"$9\\times 8 + 9\\times 8 = 144$", "answer":true},
{"statement":"$9\\times 7 + 9\\times 9 = 144$", "answer":true},
{"statement":"$9\\times 7 + 9\\times 8 = 135$", "answer":true},
{"statement":"$8\\times 8 + 9\\times 9 = 145$", "answer":true},
{"statement":"$8\\times 7 + 9\\times 9 = 137$", "answer":true},
{"statement":"$8\\times 7 + 8\\times 9 = 128$", "answer":true},
{"statement":"$8\\times 6 + 9\\times 9 = 129$", "answer":true},
{"statement":"$8\\times 6 + 8\\times 9 = 120$", "answer":true},
{"statement":"$7\\times 7 + 9\\times 9 = 130$", "answer":true},
{"statement":"$7\\times 6 + 9\\times 9 = 123$", "answer":true},
{"statement":"$7\\times 6 + 8\\times 9 = 114$", "answer":true},
{"statement":"$6\\times 7 + 9\\times 9 = 123$", "answer":true},
{"statement":"$6\\times 7 + 8\\times 9 = 114$", "answer":true},
{"statement":"$6\\times 6 + 9\\times 9 = 117$", "answer":true},
{"statement":"$6\\times 6 + 8\\times 8 = 100$", "answer":true},
{"statement":"$9\\times 9 + 9\\times 9 = 152$", "answer":false},
{"statement":"$9\\times 8 + 9\\times 9 = 143$", "answer":false},
{"statement":"$9\\times 8 + 9\\times 8 = 134$", "answer":false},
{"statement":"$9\\times 7 + 9\\times 9 = 134$", "answer":false},
{"statement":"$9\\times 7 + 9\\times 8 = 125$", "answer":false},
{"statement":"$8\\times 8 + 9\\times 9 = 135$", "answer":false},
{"statement":"$8\\times 7 + 9\\times 9 = 127$", "answer":false},
{"statement":"$8\\times 7 + 8\\times 9 = 138$", "answer":false},
{"statement":"$8\\times 6 + 9\\times 9 = 119$", "answer":false},
{"statement":"$8\\times 6 + 8\\times 9 = 130$", "answer":false},
{"statement":"$7\\times 7 + 9\\times 9 = 120$", "answer":false},
{"statement":"$7\\times 6 + 9\\times 9 = 113$", "answer":false},
{"statement":"$7\\times 6 + 8\\times 9 = 124$", "answer":false},
{"statement":"$6\\times 7 + 9\\times 9 = 113$", "answer":false},
{"statement":"$6\\times 7 + 8\\times 9 = 118$", "answer":false},
{"statement":"$6\\times 6 + 9\\times 9 = 107$", "answer":false},
{"statement":"$6\\times 6 + 8\\times 8 = 90$", "answer":false},
{"statement":"$28+34=62$.","answer":true},
{"statement":"$46+26=72$.","answer":true},
{"statement":"$35+49=84$.","answer":true},
{"statement":"$52+18=70$.","answer":true},
{"statement":"$39+43=82$.","answer":true},
{"statement":"$44+37=81$.","answer":true},
{"statement":"$55+24=79$.","answer":true},
{"statement":"$28+33=61$.","answer":true},
{"statement":"$48+47=95$.","answer":true},
{"statement":"$39+55=94$.","answer":true},
{"statement":"$24+56=80$.","answer":true},
{"statement":"$49+28=77$.","answer":true},
{"statement":"$35+62=97$.","answer":true},
{"statement":"$26+48=74$.","answer":true},
{"statement":"$54+29=83$.","answer":true},
{"statement":"$34+37=71$.","answer":true},
{"statement":"$47+25=72$.","answer":true},
{"statement":"$27+48=75$.","answer":true},
{"statement":"$27+36=63$.","answer":true},
{"statement":"$39+59=98$.","answer":true},
{"statement":"$28+33=51$.","answer":false},
{"statement":"$46+25=61$.","answer":false},
{"statement":"$35+48=73$.","answer":false},
{"statement":"$52+17=79$.","answer":false},
{"statement":"$39+42=91$.","answer":false},
{"statement":"$44+36=70$.","answer":false},
{"statement":"$53+25=88$.","answer":false},
{"statement":"$21+39=70$.","answer":false},
{"statement":"$42+47=99$.","answer":false},
{"statement":"$39+54=83$.","answer":false},
{"statement":"$24+55=89$.","answer":false},
{"statement":"$49+27=66$.","answer":false},
{"statement":"$35+61=86$.","answer":false},
{"statement":"$26+47=63$.","answer":false},
{"statement":"$54+28=72$.","answer":false},
{"statement":"$34+36=60$.","answer":false},
{"statement":"$47+24=61$.","answer":false},
{"statement":"$27+47=64$.","answer":false},
{"statement":"$27+35=52$.","answer":false},
{"statement":"$39+58=87$.","answer":false},
{"statement":"Le mot DOJO possède $12$ anagrammes.","answer":true},
{"statement":"Le mot EMMY possède $24$ anagrammes.","answer":false},
{"statement":"Le mot RIRE possède $12$ anagrammes.","answer":true},
{"statement":"Le mot NANCY possède $120$ anagrammes.","answer":false},
{"statement":"Le mot CARRÉ possède $60$ anagrammes.","answer":true},
{"statement":"Le mot EULER possède $120$ anagrammes.","answer":false},
{"statement":"Le mot HERBE possède $60$ anagrammes.","answer":true},
{"statement":"Le mot KEPLER possède $380$ anagrammes.","answer":false},
{"statement":"Le mot PASCAL possède $360$ anagrammes.","answer":true},
{"statement":"Le mot NEWTON possède $720$ anagrammes.","answer":false},
{"statement":"Le mot CENTRE possède $360$ anagrammes.","answer":true},
{"statement":"Le mot EUROPE possède $180$ anagrammes.","answer":false},
{"statement":"Le mot KARATÉ possède $360$ anagrammes.","answer":true},
{"statement":"Le mot ANNA possède $12$ anagrammes.","answer":false},
{"statement":"Le mot SERRE possède $30$ anagrammes.","answer":true},
{"statement":"Le mot VERRE possède $60$ anagrammes.","answer":false},
{"statement":"Le mot KAYAK possède $30$ anagrammes.","answer":true},
{"statement":"Le mot TUTTI possède $40$ anagrammes.","answer":false},
{"statement":"Le mot PIERRE possède $360$ anagrammes.","answer":false},
{"statement":"Le mot CALCUL possède $180$ anagrammes.","answer":true},
{"statement":"Le mot CERCLE possède $360$ anagrammes.","answer":false},
{"statement":"Le mot YOCCOZ possède $180$ anagrammes.","answer":true},
{"statement":"Le mot BERGER possède $160$ anagrammes.","answer":false},
{"statement":"Le mot ERREUR possède $60$ anagrammes.","answer":true},
{"statement":"Le mot ERREUR possède $120$ anagrammes.","answer":false},
{"statement":"Le mot ERREUR possède $180$ anagrammes.","answer":false},
{"statement":"Le mot ANANAS possède $60$ anagrammes.","answer":true},
{"statement":"Le mot MAYDAY possède $160$ anagrammes.","answer":false},
{"statement":"Le mot SUISSE possède $120$ anagrammes.","answer":true},
{"statement":"Le mot COCCYX possède $240$ anagrammes.","answer":false},
{"statement":"Le mot LENNON possède $120$ anagrammes.","answer":true},
{"statement":"Le mot JOUJOU possède $60$ anagrammes.","answer":false},
{"statement":"Le mot BLABLA possède $90$ anagrammes.","answer":true},
{"statement":"Le mot BAOBAB possède $90$ anagrammes.","answer":false},
{"statement":"Le mot QUELQUE possède $630$ anagrammes.","answer":true},
{"statement":"Le mot HILBERT possède $5040$ anagrammes.","answer":true},
{"statement":"Le mot FORMULE possède $720$ anagrammes.","answer":false},
{"statement":"Le mot TABLEAU possède $2520$ anagrammes.","answer":true},
{"statement":"Le mot NOETHER possède $5040$ anagrammes.","answer":false},
{"statement":"Le mot LEIBNIZ possède $5040$ anagrammes.","answer":false},
{"statement":"Le mot DELIGNE possède $2520$ anagrammes.","answer":true},
{"statement":"Le mot QUATUOR possède $2520$ anagrammes.","answer":false},
{"statement":"Le mot RUSSELL possède $1260$ anagrammes.","answer":true},
{"statement":"Le mot CARROLL possède $1024$ anagrammes.","answer":false},
{"statement":"Le mot ILLUSIE possède $1260$ anagrammes.","answer":true},
{"statement":"Le mot CHERCHE possède $7!/3!$ anagrammes.","answer":false},
{"statement":"Le mot CHERCHE possède $630$ anagrammes.","answer":true},
{"statement":"Le mot EINSTEIN possède $540$ anagrammes.","answer":true},
{"statement":"Le mot EINSTEIN possède $1080$ anagrammes.","answer":false},
{"statement":"Le mot EINSTEIN possède $7!$ anagrammes.","answer":true},
{"statement":"Le mot CHERCHER possède $7!/2$ anagrammes.","answer":true},
{"statement":"Le mot CHERCHER possède $8!/4!$ anagrammes.","answer":false},
{"statement":"Le mot CHERCHER possède $8!/(2^4)$ anagrammes.","answer":true},
{"statement":"Le mot SHANNON possède $840$ anagrammes.","answer":true},
{"statement":"Le mot CELLULE possède $840$ anagrammes.","answer":false},
{"statement":"Le mot CELLULE possède $7!/4$ anagrammes.","answer":false},
{"statement":"Le mot CELLULE possède $7!/3!$ anagrammes.","answer":false},
{"statement":"Le mot LAUSANNE possède $10080$ anagrammes.","answer":true},
{"statement":"Le mot GUILLAUME possède $9!/4$ anagrammes.","answer":true},
{"statement":"Le mot DESCARTES possède $9!/2!$ anagrammes.","answer":false},
{"statement":"Le mot RAMANUJAN possède $9!/12$ anagrammes.","answer":true},
{"statement":"Le mot ANAGRAMME possède $9!/6$ anagrammes.","answer":false},
{"statement":"Le mot RECHERCHER possède $10!/(3!^22!^2)$ anagrammes.","answer":true},
{"statement":"Le mot TURLUTUTU possède $7!/2$ anagrammes.","answer":true},
{"statement":"Le mot SUISSESSE possède $9!/(4!2!)$ anagrammes.","answer":false},
{"statement":"Le mot SUISSESSES possède $7!/2$ anagrammes.","answer":true},
{"statement":"Les lettre du mot QUIZ peuvent être permutées de $4^4$ manières.","answer":false},
{"statement":"Les lettre du mot WEIL peuvent être permutées de $24$ manières.","answer":true},
{"statement":"Les lettre du mot WILES peuvent être permutées de $128$ manières.","answer":false},
{"statement":"Les lettre du mot TRIGO peuvent être permutées de $120$ manières.","answer":true},
{"statement":"Les lettre du mot DROITE peuvent être permutées de $620$ manières.","answer":false},
{"statement":"Les lettre du mot FERMAT peuvent être permutées de $720$ manières.","answer":true},
{"statement":"Les lettre du mot THALES peuvent être permutées de $620$ manières.","answer":false},
{"statement":"Les lettre du mot TURING peuvent être permutées de $720$ manières.","answer":true},
{"statement":"Les lettre du mot GALOIS peuvent être permutées de $360$ manières.","answer":false},
{"statement":"Un ensemble à $3$ éléments possède $3$ permutations.","answer":false},
{"statement":"Un ensemble à $3$ éléments possède $6$ permutations.","answer":true},
{"statement":"Un ensemble à $4$ éléments possède $12$ permutations.","answer":false},
{"statement":"Un ensemble à $4$ éléments possède $24$ permutations.","answer":true},
{"statement":"Un ensemble à $5$ éléments possède $60$ permutations.","answer":false},
{"statement":"Un ensemble à $5$ éléments possède $120$ permutations.","answer":true},
{"statement":"Un ensemble à $5$ éléments possède $720$ permutations.","answer":false},
{"statement":"Un ensemble à $6$ éléments possède $120$ permutations.","answer":false},
{"statement":"Un ensemble à $6$ éléments possède $720$ permutations.","answer":true},
{"statement":"Un ensemble à $6$ éléments possède $620$ permutations.","answer":false},
{"statement": "Il y a $12$ permutations du mot QUIZ qui commencent par une consonne.","answer":true},
{"statement": "Il y a $16$ permutations du mot WEIL qui commencent par une voyelle.","answer":false},
{"statement": "Il y a $48$ permutations du mot ERDŐS qui commencent par une voyelle.","answer":true},
{"statement": "Il y a $82$ permutations du mot ERDŐS qui commencent par une consonne.","answer":false},
{"statement": "Il y a $240$ permutations du mot CANTOR qui commencent par une voyelle.","answer":true},
{"statement": "Il y a $380$ permutations du mot CANTOR qui commencent par une consonne.","answer":false},
{"statement": "Il y a $340$ permutations du mot TURING qui commencent par une voyelle.","answer":false},
{"statement": "Il y a $480$ permutations du mot TURING qui commencent par une consonne.","answer":true},
{"statement": "Il y a $360$ permutations du mot GALOIS qui commencent par une voyelle.","answer":true},
{"statement": "Il y a $480$ permutations du mot GALOIS qui commencent par une consonne.","answer":false},
{"statement": "Il y a $4$ permutations du mot CEVA qui commencent et finissent par une consonne.","answer":true},
{"statement": "Il y a $36$ permutations du mot MONGE qui commencent et finissent par une voyelle.","answer":false},
{"statement": "Il y a $36$ permutations du mot MONGE qui commencent et finissent par une consonne.","answer":true},
{"statement": "Il y a $48$ permutations du mot BOLYAI qui commencent et finissent par une consonne.","answer":true},
{"statement": "Il y a $288$ permutations du mot BOLYAI qui commencent et finissent par une voyelle.","answer":true},
{"statement": "Il y a $4$ permutations du mot CEVA qui commencent par une voyelle et finissent par une consonne.","answer":false},
{"statement": "Il y a $36$ permutations du mot NAGEL qui commencent par une voyelle et finissent par une consonne.","answer":true},
{"statement": "Il y a $182$ permutations du mot PLATON qui commencent par une voyelle et finissent par une consonne.","answer":false},
{"statement": "Il y a $192$ permutations du mot BOLYAI qui commencent par une voyelle et finissent par une consonne.","answer":true},
{"statement": "Il y a $192$ permutations du mot MÖBIUS qui commencent par une voyelle et finissent par une consonne.","answer":false},
{"statement": "Il y a $20$ permutations du mot CEVA qui commencent ou finissent par une consonne.","answer":true},
{"statement": "Il y a $98$ permutations du mot NAGEL qui commencent ou finissent par une consonne.","answer":false},
{"statement": "Il y a $84$ permutations du mot NAGEL qui commencent ou finissent par une voyelle.","answer":true},
{"statement": "Il y a $108$ permutations du mot ERDŐS qui commencent ou finissent par une consonne.","answer":true},
{"statement": "Il y a $108$ permutations du mot ERDŐS qui commencent ou finissent par une voyelle.","answer":false},
{"statement": "Il y a $672$ permutations du mot PLATON qui commencent ou finissent par une consonne.","answer":true},
{"statement": "Il y a $532$ permutations du mot PLATON qui commencent ou finissent par une voyelle.","answer":false},
{"statement": "Il y a $16$ permutations du mot CEVA qui commencent par une voyelle ou finissent par une consonne.","answer":true},
{"statement": "Il y a $64$ permutations du mot NAGEL qui commencent par une voyelle ou finissent par une consonne.","answer":false},
{"statement": "Sophie Germain a vécu du temps de la Révolution et de Napoléon 1er.","answer":true,"comment":"Sophie Germain est née en 1776."},
{"statement": "Sophie Germain est née à Toulouse.","answer":false,"comment":"Sophie Germain est née à Paris."},
{"statement": "Sophie Germain a vécu au XVIIe siècle.","answer":false,"comment":"Sophie Germain est née en 1776 et est décédée en 1831 donc a vécu au tournant du XIXe siècle."},
{"statement": "Sophie Germain apprend les mathématiques en autodidacte.","answer":true,"comment":"Sophie Germain lit les oeuvres de Bézout, Montucla. Elle décide ensuite d'apprendre le latin et le grec, ce qui lui permet alors d'étudier les travaux de Newton et Euler, puis de Gauss."},
{"statement": "Sophie Germain a été reçue à l'École Polytechnique.","answer":false,"comment":"À l'époque, l'École Polytechnique est réservée aux hommes. Elle se procure les cours et correspond avec les professeurs en se faisant passer pour un homme."},
{"statement": "Sophie Germain communique avec Joseph-Louis Lagrange, professeur à l'École Polytechnique, en envoyant ses remarques sous le nom de 'Monsieur Le Blanc'.","answer":true,"comment":"À l'époque, l'École Polytechnique est réservée aux hommes. Lagrange, impressionné par la complexité et rigueur de ses analyses, finit par découvrir la supercherie. Il devient l'ami et le mentor de la jeune fille."},
{"statement": "Pour assurer sa subsistance, Sophie Germain est obligée de se marier à un médecin.","answer":false,"comment":"Sophie Germain n'a jamais été mariée. Sa famille renonce à lui faire épouser un bon parti, faisant preuve d'une grande tolérance pour l'époque."},
{"statement": "Sophie Germain a travaillé avec Pierre de Fermat.","answer":false,"comment":"Ils n'ont pas vécu à la même époque."},
{"statement": "Sophie Germain a démontré le célèbre théorème de Fermat.","answer":false,"comment":"Le théorème de Fermat n'a été démontré qu'en 1992 ! Sophie Germain a démontré une partie de ce théorème, ce qui a constitué une avancée importante."},
{"statement": "Sophie Germain a démontré le célèbre théorème de Fermat pour tous les exposants premiers inférieurs à $100$.","answer":true,"comment":"Sophie Germain a en fait démontré un résultat plus général, qui porte le nom de 'théorème de Sophie Germain'."},
{"statement": "À partir de 1804, Sophie Germain correspond avec Carl Friedrich Gauss sur des questions d'arithmétique.","answer":true,"comment":"Pendant cette période, Sophie Germain envoie en tout dix courriers volumineux à Gauss, écrits sous le pseudonyme de 'Le Blanc'."},
{"statement": "Sophie Germain a sauvé la vie du mathématicien Leonhard Euler en chargeant le général Pernety de veiller à sa sécurité lors de l'invasion de la Prusse par les Français.","answer":false,"comment":"Il s'agit en fait du mathématicien Carl Friedrich Gauss."},
{"statement": "En 1806, quand Napoléon envahit la Prusse, Sophie Germain craint pour la vie de son ami Carl Friedrich Gauss. Elle demande au général Pernety, qu'elle connaît personnellement, de veiller à la sécurité de Gauss.","answer":true,"comment":"Sophie Germain entretenait une correspondance avec Gauss depuis cinq ans sous le nom de 'Le Blanc'. Lorsque Gauss se rend compte de la supercherie, il écrit une lettre à Sophie Germain pour lui exprimer son 'admiration et étonnement'."},
{"statement": "Sophie Germain a publié la démonstration de son théorème majeur, appelé 'théorème de Sophie Germain', en 1808.","answer":false,"comment":"Sophie Germain n'a jamais publié son théorème. C'est Legendre qui s'en est chargé, en insérant plusieurs théorèmes de SOphie Germain dans son ouvrage 'Théorie des Nombres'."},
{"statement": "À partir de 1808, Sophie Germain travaille sur le problème des plaques vibrantes et des figures géométriques qui s'y créent. Elle résout le problème dans un mémoire à l'Académie des Sciences en 1811.","answer":false,"comment":"Son premier mémoire de 1811 est jugé incomplet et elle n'obtient pas le prix. Elle complète son travail dans deux autres mémoires. Elle obtient le prix de l'Académie pour ce troisième mémoire en 1816. "},
{"statement": "Dans son mémoire de 1816 et des travaux ultérieux, Sophie Germain étudie le problème des ondes stationnaires sur des objets non nécessairement plats et utilise pour cela la notion de 'courbure moyenne'.","answer":true,"comment":"À peu près au même moment, Gauss étudie la notion de 'courbure scalaire', une autre façon d'étudier les surfaces."},
{"statement": "Sophie Germain effectue ses études à l'université de Göttingen et y obtient son doctorat.","answer":false,"comment":"En 1831, Gauss propose que l'université de Göttingen lui décerne un doctorat honorifique, mais elle meurt avant de pouvoir le recevoir."},
{"statement": "Sophie Germain est décédée à Toulouse.","answer":false,"comment":"Sophie Germain est décédée à Paris. Elle est enterrée au Père-Lachaise."},
{"statement": "Dans son certificat de décès, Sophie Germain apparaît comme 'mathématicienne'.","answer":false,"comment":"Elle apparaît comme rentière et non comme scientifique.  « Ce ne sont pas des affaires de femmes », considère le fonctionnaire."},
{"statement": "Sophie Germain a donné son nom à un cratère sur Venus.","answer":true,"comment":"Il s'agit du cratère nommé 'Germain'."},
{"statement": "Sophie Germain a donné son nom au bâtiment de mathématiques de l'université Paris 7.","answer":true,"comment":"C'est un des bâtiments du campus des Grands Moulins à Paris."},
{"statement": "Sophie Germain est l'héroïne d'une bande dessinée.","answer":true,"comment":"Il s'agit de la bande dessinée «Les Oubliés de la science », de Camille Van Belle (Alisio Sciences, 2022)."},
{"statement": "Sophie Germain a donné son nom à un prix mathématique.","answer":true,"comment":"Le prix Sophie-Germain de mathématiques, créé en 2003, est remis chaque année par la fondation Sophie Germain."},
{"statement":"Thalès a vécu avant Platon.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Thal%C3%A8s'>Thalès de Milet</a> (vers 624 av. J.-C. - vers 546 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Platon'>Platon</a> (vers 428/427 av. J.-C. - vers 348/347 av. J.-C.)"},
{"statement":"Euclide a vécu avant Thalès.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Thal%C3%A8s'>Thalès de Milet</a> (vers 624 av. J.-C. - vers 546 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Euclide'>Euclide</a> (vers 300 av. J.-C. - vers 275 av. J.-C.)"},
{"statement":"Thalès a vécu avant Archimède.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Thal%C3%A8s'>Thalès de Milet</a> (vers 624 av. J.-C. - vers 546 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Archim%C3%A8de'>Archimède de Syracuse</a> (vers 287 av. J.-C. - vers 212 av. J.-C.)"},
{"statement":"Platon a vécu avant Pythagore.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pythagore'>Pythagore de Samos</a> (vers 570 av. J.-C. - vers 495 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Platon'>Platon</a> (vers 428/427 av. J.-C. - vers 348/347 av. J.-C.)"},
{"statement":"Pythagore a vécu avant Euclide.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pythagore'>Pythagore de Samos</a> (vers 570 av. J.-C. - vers 495 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Euclide'>Euclide</a> (vers 300 av. J.-C. - vers 275 av. J.-C.)"},
{"statement":"Archimède a vécu avant Pythagore.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pythagore'>Pythagore de Samos</a> (vers 570 av. J.-C. - vers 495 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Archim%C3%A8de'>Archimède de Syracuse</a> (vers 287 av. J.-C. - vers 212 av. J.-C.)."},
{"statement":"Zénon d'Élée a vécu avant Aristote.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Z%C3%A9non_d%27%C3%89l%C3%A9e'>Zénon d'Élée</a> (vers 490 av. J.-C. - vers 430 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Aristote'>Aristote</a> (384 av. J.-C. - 322 av. J.-C.)"},
{"statement":"Ératosthène de Cyrène a vécu avant Zénon d'Élée.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Z%C3%A9non_d%27%C3%89l%C3%A9e'>Zénon d'Élée</a> (vers 490 av. J.-C. - vers 430 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89ratosth%C3%A8ne'>Ératosthène de Cyrène </a>(vers 276 av. J.-C. - vers 194 av. J.-C.)"},
{"statement":"Hippocrate de Chios a vécu avant Aristote.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Hippocrate_de_Chios'>Hippocrate de Chios</a> (vers 470 av. J.-C. - vers 410 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Aristote'>Aristote</a> (384 av. J.-C. - 322 av. J.-C.)"},
{"statement":"Euclide a vécu avant Platon.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Platon'>Platon</a> (vers 428/427 av. J.-C. - vers 348/347 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Euclide'>Euclide</a> (vers 300 av. J.-C. - vers 275 av. J.-C.)"},
{"statement":"Platon a vécu avant Diophante d'Alexandrie.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Platon'>Platon</a> (vers 428/427 av. J.-C. - vers 348/347 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Diophante_d%27Alexandrie'>Diophante d'Alexandrie</a> (vers 200 apr. J.-C. - vers 284 apr. J.-C.)"},
{"statement":"Hypatie d'Alexandrie a vécu avant Ératosthène de Cyrène.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89ratosth%C3%A8ne'>Ératosthène de Cyrène</a> (vers 276 av. J.-C. - vers 194 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Hypatie'>Hypatie d'Alexandrie</a> (vers 355/370 apr. J.-C. - mars 415 apr. J.-C.) - Grèce/Rome"},
{"statement":"Apollonius de Perga a vécu avant Ptolémée.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Apollonios_de_Perga'>Apollonius de Perga</a> (vers 262 av. J.-C. - vers 190 av. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Claude_Ptol%C3%A9m%C3%A9e'>Ptolémée</a> (vers 100 apr. J.-C. - vers 170 apr. J.-C.)"},
{"statement":"Hypatie d'Alexandrie a vécu avant Héron d'Alexandrie.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/H%C3%A9ron_d%27Alexandrie'>Héron d'Alexandrie</a> (vers 10 apr. J.-C. - vers 70 apr. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Hypatie'>Hypatie d'Alexandrie</a> (vers 355/370 apr. J.-C. - mars 415 apr. J.-C.) - Grèce/Rome"},
{"statement":"Diophante d'Alexandrie a vécu avant Ptolémée.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Claude_Ptol%C3%A9m%C3%A9e'>Ptolémée</a> (vers 100 apr. J.-C. - vers 170 apr. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Diophante_d%27Alexandrie'>Diophante d'Alexandrie</a> (vers 200 apr. J.-C. - vers 284 apr. J.-C.)"},
{"statement":"Diophante d'Alexandrie a vécu avant Hypatie d'Alexandrie.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Diophante_d%27Alexandrie'>Diophante d'Alexandrie</a> (vers 200 apr. J.-C. - vers 284 apr. J.-C.).<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Hypatie'>Hypatie d'Alexandrie</a> (vers 355/370 apr. J.-C. - mars 415 apr. J.-C.) - Grèce/Rome"},
{"statement":"Les Élements ont été écrits vers l'an 300 de notre ère.","answer":false,"comment":"Vers 300 *avant* notre ère."},
{"statement":"Les Élements traitent des fondements de la théorie des probabilités.","answer":false,"comment":"Les Éléments sont un traité d'arithmétique et de géométrie."},
{"statement":"Il n'y a aucune erreur mathématique dans les Éléments.","answer":false,"comment":"Les Élements sont écrits avec une rigueur impressionnante pour l'époque, encore conforme aux standards actuels de rédaction mathématique. Mais il y a malgré tout quelques angles morts parfois subtils sur les axiomes de base. L'étude de ces insuffisances, en particulier autour des questions d'existence d'intersections (<a target='_blank' href='https://fr.wikipedia.org/wiki/Axiome_de_Pasch'>axiome de Pasch</a>), a mené aux axiomatisations modernes de la géométrie par Hilbert, Birkhoff et d'autres mathématiciens au XXe siècle. Une fois les axiomes nécessaires rajoutés, les démonstrations des Éléments sont correctes."},
{"statement":"Les Élements ont été écrits par Euclide. L'ouvrage est composé de théorèmes qu'il a démontrés.","answer":false,"comment":"Les Éléments sont une compilation de résultats dont certains étaient antérieurs à Euclide. Par exemple, Pythagore a vécu avant Euclide."},
{"statement":"Le manuscript original des Éléments est conservé à la bibliothèque d'Alexandrie.","answer":false,"comment":"L'ouvrage d'origine, probablement écrit sur des rouleaux de Papyrus, a été perdu."},
{"statement":"Les Élements contiennent les démonstrations des théorèmes de Thalès et de Pythagore.","answer":true,"comment":""},
{"statement":"Les Élements contiennent la notion de triangle semblable et son étude.","answer":true,"comment":""},
{"statement":"Les Élements contiennent la méthode de construction du pentagone régulier à la règle et au compas.","answer":true,"comment":"La construction est assez difficile. Même au moyen-âge, certains savants célèbres n'ayant pas eu l'opportunité de lire les 'Éléments' ne savaient pas comment construire un pentagone régulier de manière exacte."},
{"statement":"Les Élements contiennent la démonstration qu'il existe une infinité de nombres premiers.","answer":true,"comment":""},
{"statement":"Dans les Élements, la démonstration qu'il existe une infinité de nombres premiers est une démonstration par l'absurde.","answer":false,"comment":"La preuve n'est pas rédigée par l'absurde. Il s'agit d'une preuve directe et constructive. Avec le vocabulaire actuel, la preuve consiste à construire une suite injective de nombres premiers."},
{"statement":"Les Élements contiennent la méthode de construction à la règle et au compas des triangles d'or et d'argent.","answer":true,"comment":""},
{"statement":"Les Élements contiennent la méthode de construction de l'heptagone régulier à la règle et au compas.","answer":false,"comment":"Il a été démontré beaucoup plus tard, au XIXe siècle, que l'heptagone régulier (polygone régulier à sept côtés) n'est *pas* constructible à la règme et au compas."},
{"statement":"Les Élements contiennent l'étude de la somme des termes d'une suite géométrique.","answer":true,"comment":""},
{"statement":"Les Élements contiennent la définition et les propriétés des PGCD et PPCM.","answer":true,"comment":""},
{"statement":"Les Élements contiennent la démonstration que par un point donné, il passe une unique droite parallèle à une droite donnée.","answer":false,"comment":"Il s'agit du fameux 'cinquième postulat d'Euclide'. Pendant des siècles, les mathématiciens ont cru qu'il était possible de le démontrer à partir des autres postulats mais cela s'est révélé faux. Cette étude a débouché sur l'invention des géométries non euclidiennes."},
{"statement":"Les Élements démontrent les principaux théorèmes de géométrie en utilisant des coordonnées.","answer":false,"comment":"L'usage de coordonnées en géométrie a été développé par René Descartes, bien après."},
{"statement":"Les Élements contiennent la preuve que le nombre $\\pi$ est irrationnel.","answer":false,"comment":"L'irrationnalité de $\\pi$ a été démontrée bien plus tard, en 1760 par Lambert."},
{"statement":"Les Élements contiennent la première définition du nombre $\\sqrt{2}$.","answer":false,"comment":"Le nombre $\\sqrt{2}$ est connu depuis bien plus longtemps. En Mésopotamie près de mille ans avant, les scribes savaient déjà en calculer des valeurs approchées très précises."},
{"statement":"Ptolémée a vécu avant Sun Tzu.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Claude_Ptol%C3%A9m%C3%A9e'>Ptolémée</a> (vers 100 apr. J.-C. - vers 170 apr. J.-C.)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Sun_Tzu'>Sun Tzu</a> (vers 3ème ou 4ème siècle apr. J.-C.) - Chine"},
{"statement":"Brahmagupta a vécu avant Hypatie d'Alexandrie.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Hypatie'>Hypatie d'Alexandrie</a> (vers 355/370 apr. J.-C. - mars 415 apr. J.-C.) - Grèce/Rome.<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Brahmagupta'>Brahmagupta</a> (598 apr. J.-C. - 668 apr. J.-C.) - Inde"},
{"statement":"Hypatie d'Alexandrie a vécu avant Al-Kindi.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Hypatie'>Hypatie d'Alexandrie</a> (vers 355/370 apr. J.-C. - mars 415 apr. J.-C.) - Grèce/Rome<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kindi'>Al-Kindi</a> (vers 801 apr. J.-C. - vers 873 apr. J.-C.) - Irak (Empire Abbasside)"},
{"statement":"Qin Jiushao a vécu avant Sun Tzu.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Sun_Tzu'>Sun Tzu</a> (vers 3ème ou 4ème siècle apr. J.-C.) - Chine<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Qin_Jiushao'>Qin Jiushao</a> (1202 - 1261) - Chine (Dynastie Song)"},
{"statement":"Sun Tzu a vécu avant Al-Kashi.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Sun_Tzu'>Sun Tzu</a> (vers 3ème ou 4ème siècle apr. J.-C.) - Chine<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kashi'>Al-Kashi</a> (vers 1380 - 22 juin 1429) - Perse (Empire Timouride)"},
{"statement":"Al-Kashi a vécu avant Al-Khwârizmî.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Khw%C3%A2rizm%C3%AE'>Al-Khwârizmî</a> (vers 780 apr. J.-C. - vers 850 apr. J.-C.) - Perse (Empire Abbasside)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kashi'>Al-Kashi</a> (vers 1380 - 22 juin 1429) - Perse (Empire Timouride)"},
{"statement":"Al-Kindi a vécu avant  Fibonacci.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kindi'>Al-Kindi</a> (vers 801 apr. J.-C. - vers 873 apr. J.-C.) - Irak (Empire Abbasside)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Leonardo_Fibonacci'>Leonardo Fibonacci</a> (vers 1170 - vers 1250) - Italie"},
{"statement":"Scipione del Ferro a vécu avant Leonardo Fibonacci.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Leonardo_Fibonacci'>Leonardo Fibonacci</a> (vers 1170 - vers 1250) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Scipione_del_Ferro'>Scipione del Ferro</a> (6 février 1465 - 5 novembre 1526) - Italie"},
{"statement":"Leonardo Fibonacci a vécu avant Niccolò Fontana Tartaglia.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Leonardo_Fibonacci'>Leonardo Fibonacci</a> (vers 1170 - vers 1250) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Niccol%C3%B2_Fontana_Tartaglia'>Niccolò Fontana Tartaglia</a> (1499 - 13 décembre 1557) - Italie"},
{"statement":"Copernic a vécu avant Qin Jiushao.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Qin_Jiushao'>Qin Jiushao</a> (1202 - 1261) - Chine (Dynastie Song)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Nicolas_Copernic'>Nicolas Copernic</a> (19 février 1473 - 24 mai 1543) - Pologne"},
{"statement":"Al-Kashi a vécu avant Copernic.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kashi'>Al-Kashi</a> (vers 1380 - 22 juin 1429) - Perse (Empire Timouride)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Nicolas_Copernic'>Nicolas Copernic</a> (19 février 1473 - 24 mai 1543) - Pologne"},
{"statement":"Galilée a vécu avant Al-Kashi.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Al-Kashi'>Al-Kashi</a> (vers 1380 - 22 juin 1429) - Perse (Empire Timouride)<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Galil%C3%A9e_(savant)'>Galileo Galilei</a> (15 février 1564 - 8 janvier 1642) - Italie"},
{"statement":"Scipione del Ferro a vécu avant Ludovico Ferrari.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Scipione_del_Ferro'>Scipione del Ferro</a> (6 février 1465 - 5 novembre 1526) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Ludovico_Ferrari'>Ludovico Ferrari</a> (2 février 1522 - 5 octobre 1565) - Italie"},
{"statement":"John Neper a vécu avant Scipione del Ferro.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Scipione_del_Ferro'>Scipione del Ferro</a> (6 février 1465 - 5 novembre 1526) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/John_Napier'>John Neper</a> (1550 - 4 avril 1617) - Écosse"},
{"statement":"Copernic a vécu avant Galilée.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Nicolas_Copernic'>Nicolas Copernic</a> (19 février 1473 - 24 mai 1543) - Pologne<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Galil%C3%A9e_(savant)'>Galileo Galilei</a> (15 février 1564 - 8 janvier 1642) - Italie"},
{"statement":"Neper a vécu avant Copernic.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Nicolas_Copernic'>Nicolas Copernic</a> (19 février 1473 - 24 mai 1543) - Pologne<br><a target='_blank' href='https://fr.wikipedia.org/wiki/John_Napier'>John Neper</a> (1550 - 4 avril 1617) - Écosse"},
{"statement":"Niccolò Fontana Tartaglia a vécu avant François Viète.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Niccol%C3%B2_Fontana_Tartaglia'>Niccolò Fontana Tartaglia</a> (1499 - 13 décembre 1557) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Vi%C3%A8te'>François Viète</a> (1540 - 23 février 1603) - France"},
{"statement":"John Neper a vécu avant Girolamo Cardano.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/J%C3%A9r%C3%B4me_Cardan'>Girolamo Cardano</a> (24 septembre 1501 - 21 septembre 1576) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/John_Napier'>John Neper</a> (1550 - 4 avril 1617) - Écosse"},
{"statement":"Fibonacci a vécu avant Descartes.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Leonardo_Fibonacci'>Leonardo Fibonacci</a> (vers 1170 - vers 1250) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France"},
{"statement":"René Descartes a vécu avant Rafael Bombelli.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Rapha%C3%ABl_Bombelli'>Rafael Bombelli</a> (20 janvier 1526 - 1572) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France"},
{"statement":"François Viète a vécu avant René Descartes.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Vi%C3%A8te'>François Viète</a> (1540 - 23 février 1603) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France"},
{"statement":"Pierre de Fermat a vécu avant François Viète.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Fran%C3%A7ois_Vi%C3%A8te'>François Viète</a> (1540 - 23 février 1603) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre_de_Fermat'>Pierre de Fermat</a> (17 août 1601 - 12 janvier 1665) - France"},
{"statement":"Galilée a vécu avant Newton.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Galil%C3%A9e_(savant)'>Galilée</a> (15 février 1564 - 8 janvier 1642) - Italie<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Isaac_Newton'>Isaac Newton</a> (25 décembre 1642 - 20 mars 1727) - Angleterre"},
{"statement":"Isaac Newton a vécu René Descartes.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Isaac_Newton'>Isaac Newton</a> (25 décembre 1642 - 20 mars 1727) - Angleterre"},
{"statement":"René Descartes a vécu avant Émilie du Châtelet.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89milie_du_Ch%C3%A2telet'>Émilie du Châtelet</a> (17 décembre 1706 - 10 septembre 1749) - France"},
{"statement":"Étienne Bézout a vécu avant René Descartes.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Ren%C3%A9_Descartes'>René Descartes</a> (31 mars 1596 - 11 février 1650) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89tienne_B%C3%A9zout'>Étienne Bézout</a> (31 janvier 1730 - 27 septembre 1783) - France"},
{"statement":"Pierre de Fermat a vécu avant Michel Rolle.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre_de_Fermat'>Pierre de Fermat</a> (17 août 1601 - 12 janvier 1665) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Michel_Rolle'>Michel Rolle</a> (21 avril 1652 - 8 novembre 1719) - France"},
{"statement":"Abraham de Moivre a vécu avant Pierre de Fermat.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre_de_Fermat'>Pierre de Fermat</a> (17 août 1601 - 12 janvier 1665) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Abraham_de_Moivre'>Abraham de Moivre</a> (26 mai 1667 - 27 novembre 1754) - France/Angleterre"},
{"statement":"Pierre de Fermat a vécu avant Pierre-Simon de Laplace.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre_de_Fermat'>Pierre de Fermat</a> (17 août 1601 - 12 janvier 1665) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre-Simon_de_Laplace'>Pierre-Simon de Laplace</a> (23 mars 1749 - 5 mars 1827) - France"},
{"statement":"Leonhard Euler a vécu avant John Wallis.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/John_Wallis'>John Wallis</a> (23 novembre 1616 - 28 octobre 1703) - Angleterre<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Leonhard_Euler'>Leonhard Euler</a> (15 avril 1707 - 7 septembre 1783) - Suisse"},
{"statement":"Blaise Pascal a vécu avant Émilie du Châtelet.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Blaise_Pascal'>Blaise Pascal</a> (19 juin 1623 - 19 août 1662) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89milie_du_Ch%C3%A2telet'>Émilie du Châtelet</a> (17 décembre 1706 - 10 septembre 1749) - France"},
{"statement":"Maria Gaetana Agnesi a vécu avant Cassini.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Jean-Dominique_Cassini'>Cassini</a> (8 juin 1625 - 14 septembre 1712) - Italie/France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Maria_Gaetana_Agnesi'>Maria Gaetana Agnesi</a> (16 août 1718 - 9 janvier 1799) - Italie"},
{"statement":"Isaac Newton a vécu avant Gaspard Monge.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Isaac_Newton'>Isaac Newton</a> (25 décembre 1642 - 20 mars 1727) - Angleterre<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Gaspard_Monge'>Gaspard Monge</a> (9 juillet 1746 - 28 juillet 1818) - France"},
{"statement":"Laplace a vécu avant Newton.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Isaac_Newton'>Isaac Newton</a> (25 décembre 1642 - 20 mars 1727) - Angleterre<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Pierre-Simon_de_Laplace'>Pierre-Simon de Laplace</a> (23 mars 1749 - 5 mars 1827) - France"},
{"statement":"Isaac Newton a vécu avant Sophie Germain.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Isaac_Newton'>Isaac Newton</a> (25 décembre 1642 - 20 mars 1727) - Angleterre<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Sophie_Germain'>Sophie Germain</a> (1er avril 1776 - 27 juin 1831) - France"},
{"statement":"Euler a vécu avant Leibniz.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz'>Gottfried Wilhelm Leibniz</a> (1er juillet 1646 - 14 novembre 1716) - Allemagne<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Leonhard_Euler'>Leonhard Euler</a> (15 avril 1707 - 7 septembre 1783) - Suisse"},
{"statement":"Leibniz a vécu avant Maria Gaetana Agnesi.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz'>Gottfried Wilhelm Leibniz</a> (1er juillet 1646 - 14 novembre 1716) - Allemagne<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Maria_Gaetana_Agnesi'>Maria Gaetana Agnesi</a> (16 août 1718 - 9 janvier 1799) - Italie"},
{"statement":"Gaspard Monge a vécu avant Michel Rolle.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Michel_Rolle'>Michel Rolle</a> (21 avril 1652 - 8 novembre 1719) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Gaspard_Monge'>Gaspard Monge</a> (9 juillet 1746 - 28 juillet 1818) - France"},
{"statement":"Michel Rolle a vécu avant Étienne Bézout.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Michel_Rolle'>Michel Rolle</a> (21 avril 1652 - 8 novembre 1719) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89tienne_B%C3%A9zout'>Étienne Bézout</a> (31 janvier 1730 - 27 septembre 1783) - France"},
{"statement":"Carl Friedrich Gauss a vécu avant Jakob Bernoulli.","answer":false,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/Jacques_Bernoulli'>Jakob Bernoulli </a>(27 décembre 1654 - 16 août 1705) - Suisse<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Carl_Friedrich_Gauss'>Carl Friedrich Gauss</a> (30 avril 1777 - 23 février 1855) - Allemagne"},
{"statement":"Émilie du Châtelet a vécu avant Joseph Fourier.","answer":true,"comment":"<a target='_blank' href='https://fr.wikipedia.org/wiki/%C3%89milie_du_Ch%C3%A2telet'>Émilie du Châtelet</a> (17 décembre 1706 - 10 septembre 1749) - France<br><a target='_blank' href='https://fr.wikipedia.org/wiki/Joseph_Fourier'>Joseph Fourier</a> (21 mars 1768 - 16 mai 1830) - France"},
];
function shuffleArray(array) {
  // attention !  le tableau est muté sur place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  console.log("initQuiz() sur le thème " + theme.id);

  // construction du quiz
  // Éventuellement, changer méthode pour garantir au moins un V et un F.
  quiz = structuredClone(theme);
  shuffleArray(quiz.questions);
  // on vide la fin pour ne garder au plus que QUIZ_LENGTH questions
  while (quiz.questions.length > MAX_QUIZ_LENGTH) quiz.questions.shift();
  console.log("questions qui vont tomber : " + quiz.questions);

  quiz.quizLength = quiz.questions.length;
  quiz.nbQuestionsFailed = 0;
  quiz.nbQuestionsSuccessful = 0;
  quiz.nbQuestionsSkipped = 0;
  quiz.history = [];
  quiz.result = 0;
  quiz.points = 0;
  //quiz.initialCombo = user.combo;
  quiz.bonus = 0;
  quiz.finalGrade = 0;
  if (!quiz.maxPointsPerQuestion)
    quiz.maxPointsPerQuestion = MAX_POINTS_PER_QUESTION;

  user.nbQuizStarted += 1;
  nextQuestion();
}
// préciser le type des éléments de quiz.history :
// c'est ce qui va être envoyé au serveur :
// tableau d'objets du type 'quizFinishedEvent' :
// {
// questionNumber: int,
// submittedAnswer: true, false ou undefined,
// result:  : 1, 0 ou -1
// }

function nextQuestion() {
  // appelée par startQuiz() ou bien validateAnswer()
  questionNumber = quiz.questions.splice(0, 1)[0];
  // attention on l'enlève d ela liste
  question = structuredClone(questions[questionNumber]);
  question.num = questionNumber; // on rajoute dans l'objet
  question.points = 0;
  render();
  MathJax.typeset();
  statsQuestions[question.num].viewed += 1;
  statsThemes[theme.id].nbQuestionsViewed += 1;
  user.nbQuestionsViewed += 1;
}

function submitAnswer(answer) {
  // étape inutile ?
  // appelé par action utilisateur sur les trois boutons
  question.submittedAnswer = answer;
  validateAnswer();
}

function validateAnswer() {
  //appelée à la fin de  submitAnswer()
  if (question.submittedAnswer === undefined) {
    // SKIPPED
    question.result = 0;
    question.points = 0;
    statsQuestions[question.num].skipped += 1;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsSkipped += 1;
    user.combo = 0;
    user.nbQuestionsSkipped += 1;
    quiz.nbQuestionsSkipped += 1;
    console.log("question sautée");
    toast("Question sautée", "var(--c-warning)");
  } else if (question.submittedAnswer === question.answer) {
    // SUCCESS
    question.result = 1;
    statsQuestions[question.num].successful += 1;
    if (statsQuestions[question.num].successfulLastTime)
      statsQuestions[question.num].successfulLastTwoTimes = true;
    statsQuestions[question.num].successfulLastTime = true;

    statsThemes[theme.id].nbQuestionsSuccessful += 1;
    user.combo += 1;
    user.longestCombo = Math.max(user.combo, user.longestCombo);
    user.nbQuestionsSuccessful += 1;
    quiz.nbQuestionsSuccessful += 1;

    question.points = Math.min(quiz.maxPointsPerQuestion, user.combo);

    // toast success
    let congratulationsMessage = "";
    if (user.combo > 1) {
      congratulationsMessage += user.combo + " D'AFFILÉE !\n";
    }
    congratulationsMessage +=
      "+" + question.points + " pt" + (question.points > 1 ? "s" : "");
    toast(congratulationsMessage, "var(--c-success)");
  } else {
    // FAIL
    question.result = -1;
    questions.points = -1;
    statsQuestions[question.num].failed++;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsFailed++;
    user.combo = 0;
    user.nbQuestionsFailed++;
    quiz.nbQuestionsFailed++;
    toast("-1 pt", "var(--c-danger)");
  }
  sendQuestionResult(); //envoi serveur.
  console.log("Q" + question.num + ": " + questions[question.num].statement);
  console.log(
    "Submitted answer : " +
      question.submittedAnswer +
      ", Result : " +
      question.result
  );
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < MIN_QUIZ_RESULT; // attention changer en cas de quiz custom ?
  if (isGameover) {
    user.nbQuizGameover++;

    gotoGameover();
    return;
  }

  // BONUS COMBO

  question.bonus = Math.max(question.points - 1, 0); // pts gagnés à cause d'un bonus

  quiz.points += question.points;
  quiz.bonus += question.bonus;

  quiz.history.push({
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  });

  // TODO éventuellement Toast ici "100N - ème question réussie !"

  saveToLocalStorage();

  if (quiz.questions.length > 0) nextQuestion();
  else showQuizResults(); // quiz terminé !
}

function abortQuiz() {
  user.nbQuizAborted++;
  gotoTheme(theme.id);
}

function showQuizResults() {
  //appelée par validateResults() si la liste de questions est vide
  if (daysSinceLastActive() > 0) {
    //reset daily stats
    user.pointsToday = 0;
    user.nbQuizFinishedToday = 0;
    user.nbQuizPerfectToday = 0;
  }
  // update streak and longestStreak
  // !! AVANT modif lastActiveTime

  if (daysSinceLastActive() == 1 || user.lastStreak == 0) {
    user.lastStreak++;
    notification(
      "🔥STREAK🔥\n Un jour d'affilée de plus !",
      "oklch(70% 90% var(--hue-accent))"
    );
  } else if (daysSinceLastActive() > 1) {
    user.lastStreak = 1;
  }
  user.longestStreak = Math.max(user.longestStreak, user.lastStreak);

  // CALCUL NOTE
  quiz.finalGrade = grade20FromResult(
    quiz.nbQuestionsSuccessful,
    quiz.quizLength
  );
  // SI PERFECT :
  if (quiz.finalGrade == 20) {
    user.nbQuizPerfect++;
    user.nbQuizPerfectToday++;
    // félicitation tous les 10 perfects :
    if (user.nbQuizPerfect % 10 == 0) {
      toast(
        `${user.nbQuizPerfect}ème perfect !`,
        "oklch(70% 100% var(--hue-accent)"
      );
    }
  }

  // Calcul du BOOST
  console.log("points avant booster : " + quiz.points);
  quiz.points *= getBoost();
  console.log("boost multiplier : " + getBoost());
  console.log("points après boost : " + quiz.points);
  // faire apparaître le boost pendant tout le quiz en haut ?

  // felicitation levelup :
  if (level(user.points + quiz.points) > level(user.points))
    toast(`LEVEL UP !`, "oklch(70% 100% var(--hue-accent)");

  user.points += quiz.points;
  user.pointsToday += quiz.points;
  user.nbQuizFinished++;
  user.nbQuizFinishedToday++;
  statsThemes[theme.id].nbQuizFinished++;

  pointsDiffHistory.push(quiz.points);
  finishedQuizzesHistory.push({
    date: Date.now(),
    themeId: theme.id,
    details: quiz.history,
    pointsEarned: quiz.points,
  });
  // todo :  maintenance pour ne garder l'historique que des 1000 derniers éléments ?
  // pour éviter de saturer la mémoire du storage ?
  // par exemple:
  // while(finishedQuizzesHistory.length>1000) finishedQuizzesHistory.shift();

  // message de félicitations tous les 10 quiz terminés
  if (user.nbQuizFinished % 10 == 0) {
    toast(
      user.nbQuizFinished + " parties terminées, bravo !",
      "oklch(70% 100% var(--hue-accent))"
    );
  }

  // LOCK theme trop utilisé ? et UNLOCK all themes sinon !

  if (haveToLockTheme()) {
    statsThemes[theme.id].isLocked = true;
    theme.isLocked = true;
    console.log("theme locked! Finish a quiz in another theme to unlock");
  } else {
    console.log("unlock all");
    theme.isLocked = false;
    for (themeId in statsThemes) {
      statsThemes[themeId].isLocked = false;
    }
  }

  user.lastActiveTime = Date.now();

  saveToLocalStorage();

  gotoEnd();

  // lors du render, le bouton "rejouer" va être désactivé si le thème est locked

  postFinishedQuiz();
  // console log bilan du quiz
  consoleLogQuizRecap();

  MathJax.typeset(); //pour l'affichage des corrections
}

function haveToLockTheme() {
  if (finishedQuizzesHistory.length < LOCK_LIMIT) return false;

  // on prend les LOCK_LIMIT dernières entrées ( ou tout si moins de LOCK_LIMIT entrées)
  let recentHistory = finishedQuizzesHistory.slice(
    finishedQuizzesHistory.length - LOCK_LIMIT
  );

  for (let i = 0; i < LOCK_LIMIT; i++) {
    if (recentHistory[i].themeId != theme.id) return false;
  }
  return true;
}

function unstack(targetName) {
  // changer le nom puisque ça n'unstack plus les messages
  // appelé en sortie d'écran de fin

  window.setTimeout(getHighscores, 1000); // php est en train d'écrire les fichiers texte

  //giveBoost(); // move to event
  window.dispatchEvent(new Event("afterEnd")); // entraine giveBoost()

  if (targetName == "Chapters") goto("Chapters");
  else if (targetName == "Quiz") gotoQuiz();
}

// - - - - - - - - - - - - - - - - - -
// - - - C O M P O S A N T S - - - - -
// - - - - - - - - - - - - - - - - - -

function glyphResult(note) {
  // écran de fin de quiz
  let glyph = "";
  if (note == 20) glyph = "🏆";
  else if (note >= 16) glyph = "🎉";
  else if (note >= 10) glyph = "👍";
  else if (note >= 8) glyph = "😓";
  else glyph = "😣";
  return glyph;
}
function grade20FromResult(result, maxResult) {
  let MAX_GRADE = 20; // ou 100
  let posResult = Math.max(0, result);
  let grade = (MAX_GRADE * posResult) / maxResult;
  let roundedGrade = Math.floor(grade);
  return roundedGrade;
}

function htmlQuizProgress() {
  // affiche une succession de div dont les couleurs correspondent aux résultats des questions en cours, ou des dic de couleur neutre pour les questions restantes.
  if (state != "Quiz" && state != "End") return ""; // évite l'imbrication dans un x-show
  let s = ""; // sortie
  let color = "";

  quiz.history.forEach((obj) => {
    if (obj.result == 1) color = "var(--c-success)";
    if (obj.result == 0) color = "var(--c-warning)";
    if (obj.result == -1) color = "var(--c-danger)";
    s += `<div style='flex-grow:1; background-color:${color}'>&nbsp;</div>`;
  });

  // Explication :  en mode Quiz, le rendu est fait une fois la question en cours supprimée
  // En mode "End", il ne faut pas ajouter le "+1" sinon on obtient 11.
  let nbRemainingAnswers =
    state == "Quiz" ? quiz.questions.length + 1 : quiz.questions.length;
  for (let i = 0; i < nbRemainingAnswers; i++) {
    s += `<div style='flex-grow:1;background-color:var(--c-primary-40-desat)'>&nbsp;</div>`;
  }
  return s;
}

function htmlSolutions() {
  // affiche les solutions du quiz en cours, qui vient d'être fini.
  let s = "<div style='opacity:70%;' open><p>Correction:</p>";

  quiz.history.forEach((e) => {
    s += htmlSolutionElement(e);
  });
  s += "</div>";
  return s;
}

function htmlSolutionElement({ questionNumber, submittedAnswer, result }) {
  let color, message;
  if (result == 1) {
    message = "✔ Question réussie";
    color = "oklch(30% 30% var(--hue-success))";
  }
  if (result == 0) {
    message = "⚠ Question sautée";
    color = "oklch(30% 30% var(--hue-warning))";
  }
  if (result == -1) {
    message = "✖ Question ratée";
    color = "oklch(30% 30% var(--hue-danger))";
  }
  let answerDiv = "";
  if (submittedAnswer === true)
    answerDiv = "<div>(Réponse donnée : Vrai)</div>";
  if (submittedAnswer === false)
    answerDiv = "<div>(Réponse donnée : Faux)</div>";

  let s = `
    <div style='color:white;margin-bottom:1rem;padding:1.5rem;width:100%;border-radius:2rem;background-color:${color}'>
      <div style='font-weight:900;margin-bottom:1rem;display:flex;justify-content:space-between'>
        <div>${message}</div>
        <div>Q${questionNumber}</div>
      </div>
    <div style="margin-bottom:1rem">${questions[questionNumber].statement}</div>
    ${answerDiv}
    ${htmlCommentElement(questionNumber)}
    ${htmlFeedbackElement(questionNumber)}
  </div>`;
  return s;
}

function htmlCommentElement(questionNumber) {
  if (!questions[questionNumber].comment) return "";
  return `<details open>
    <summary style="font-weight:900;font-size:1rem">Commentaires/explications</summary>
    ${questions[questionNumber].comment}
    </details>`;
}

function htmlFeedbackElement(questionNumber) {
  if (statsQuestions[questionNumber].feedbackSent)
    return "<p>Feedback envoyé, merci !</p>";

  return `<details open>
    <summary style="font-weight:900;font-size:1rem">Réagir ou signaler un problème</summary>
    <div style="display:flex;justify-content:space-between" id="feedbackDiv${questionNumber}">
      <div class="btn btn-feedback" 
        onclick="sendFeedback(${questionNumber},'easy')">
        🥱 
      </div>
      <div class="btn btn-feedback" 
        onclick="sendFeedback(${questionNumber},'hard')">
        🥵 
      </div>
      <div class="btn btn-feedback" 
        onclick="sendFeedback(${questionNumber},'like')">
        ❤️ 
      </div>
      <div  class="btn btn-feedback"  
        onclick="sendFeedback(${questionNumber},'problem')">
        ⚠️
      </div>
    </div>
  </details>`;
}

// - - - - - - - - - N O T I F S  /  T O A S T / A F F I C H A G E
// - - - - - - - - - - - - - - - - - - - - - - -

function consoleLogQuizRecap() {
  console.log(`Total Points gagnés : +${quiz.points}pts`);
  // ici on pourrait faire un recap plus détaillé dans la console si on veut
}

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

// USED BUT INLINED
var svgPathFasHouse = `<path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>`;
var svgPathFasGear = `<path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/>`;
var svgPathFasTrophy = `<path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>`;
//

var svgPathFasChartLine = `<path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>`;
var svgPathFasFlagCheckered = `<path d="M32 0C49.7 0 64 14.3 64 32l0 16 69-17.2c38.1-9.5 78.3-5.1 113.5 12.5c46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1l0 279.7c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4c-37.9-19-81.3-23.7-122.5-13.4L64 384l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-80 0-66L0 64 0 32C0 14.3 14.3 0 32 0zM64 187.1l64-13.9 0 65.5L64 252.6 64 318l48.8-12.2c5.1-1.3 10.1-2.4 15.2-3.3l0-63.9 38.9-8.4c8.3-1.8 16.7-2.5 25.1-2.1l0-64c13.6 .4 27.2 2.6 40.4 6.4l23.6 6.9 0 66.7-41.7-12.3c-7.3-2.1-14.8-3.4-22.3-3.8l0 71.4c21.8 1.9 43.3 6.7 64 14.4l0-69.8 22.7 6.7c13.5 4 27.3 6.4 41.3 7.4l0-64.2c-7.8-.8-15.6-2.3-23.2-4.5l-40.8-12 0-62c-13-3.8-25.8-8.8-38.2-15c-8.2-4.1-16.9-7-25.8-8.8l0 72.4c-13-.4-26 .8-38.7 3.6L128 173.2 128 98 64 114l0 73.1zM320 335.7c16.8 1.5 33.9-.7 50-6.8l14-5.2 0-71.7-7.9 1.8c-18.4 4.3-37.3 5.7-56.1 4.5l0 77.4zm64-149.4l0-70.8c-20.9 6.1-42.4 9.1-64 9.1l0 69.4c13.9 1.4 28 .5 41.7-2.6l22.3-5.2z"/>`;

// ATTENTION? UTILISER 'VAR' ET NON 'LET'
// de sorte à pouvoir récupérer par window[pathname]
var svgPathFasMagnifyingGlass = `<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>`;

// icones menu : inliner, peut-être ? Pour éviter le glitch au load ?

// icones utilisées dans les sections ? : dégraisser ici avec emojis ?
var svgPathFasCheckDouble = `<path d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/>`;
var svgPathFasCheck = `<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>`;
var svgPathFarEye = `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`;
var svgPathFasDumbbell = `<path d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>`;
var svgPathFasListCheck = `<path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>`;
// enlever celui-ci ? Inutile ?

// icones user : ça prend de la place mais ça ajoute un côté sympa
var svgPathFasUserLarge = `<path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/>`;
var svgPathFasUserGraduate = `<path d="M219.3 .5c3.1-.6 6.3-.6 9.4 0l200 40C439.9 42.7 448 52.6 448 64s-8.1 21.3-19.3 23.5L352 102.9V160c0 70.7-57.3 128-128 128s-128-57.3-128-128V102.9L48 93.3v65.1l15.7 78.4c.9 4.7-.3 9.6-3.3 13.3s-7.6 5.9-12.4 5.9H16c-4.8 0-9.3-2.1-12.4-5.9s-4.3-8.6-3.3-13.3L16 158.4V86.6C6.5 83.3 0 74.3 0 64C0 52.6 8.1 42.7 19.3 40.5l200-40zM129.1 323.2l83.2 88.4c6.3 6.7 17 6.7 23.3 0l83.2-88.4c73.7 14.9 129.1 80 129.1 158.1c0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-78.1 55.5-143.2 129.1-158.1z"/>`;
var svgPathFasUserNinja = `<path d="M224 256c-57.2 0-105.6-37.5-122-89.3c-1.1 1.3-2.2 2.6-3.5 3.8c-15.8 15.8-38.8 20.7-53.6 22.1c-8.1 .8-14.6-5.7-13.8-13.8c1.4-14.7 6.3-37.8 22.1-53.6c5.8-5.8 12.6-10.1 19.6-13.4c-7-3.2-13.8-7.6-19.6-13.4C37.4 82.7 32.6 59.7 31.1 44.9c-.8-8.1 5.7-14.6 13.8-13.8c14.7 1.4 37.8 6.3 53.6 22.1c4.8 4.8 8.7 10.4 11.7 16.1C131.4 28.2 174.4 0 224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128zM0 482.3C0 396 61.3 324.1 142.7 307.6l68.5 91.4c6.4 8.5 19.2 8.5 25.6 0l68.5-91.4C386.7 324.1 448 396 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM160 96c-8.8 0-16 7.2-16 16s7.2 16 16 16H288c8.8 0 16-7.2 16-16s-7.2-16-16-16H160z"/>`;
var svgPathFasUserAstronaut = `<path d="M370.7 96.1C346.1 39.5 289.7 0 224 0S101.9 39.5 77.3 96.1C60.9 97.5 48 111.2 48 128v64c0 16.8 12.9 30.5 29.3 31.9C101.9 280.5 158.3 320 224 320s122.1-39.5 146.7-96.1c16.4-1.4 29.3-15.1 29.3-31.9V128c0-16.8-12.9-30.5-29.3-31.9zM336 144v16c0 53-43 96-96 96H208c-53 0-96-43-96-96V144c0-26.5 21.5-48 48-48H288c26.5 0 48 21.5 48 48zM189.3 162.7l-6-21.2c-.9-3.3-3.9-5.5-7.3-5.5s-6.4 2.2-7.3 5.5l-6 21.2-21.2 6c-3.3 .9-5.5 3.9-5.5 7.3s2.2 6.4 5.5 7.3l21.2 6 6 21.2c.9 3.3 3.9 5.5 7.3 5.5s6.4-2.2 7.3-5.5l6-21.2 21.2-6c3.3-.9 5.5-3.9 5.5-7.3s-2.2-6.4-5.5-7.3l-21.2-6zM112.7 316.5C46.7 342.6 0 407 0 482.3C0 498.7 13.3 512 29.7 512H128V448c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64l98.3 0c16.4 0 29.7-13.3 29.7-29.7c0-75.3-46.7-139.7-112.7-165.8C303.9 338.8 265.5 352 224 352s-79.9-13.2-111.3-35.5zM176 448c-8.8 0-16 7.2-16 16v48h32V464c0-8.8-7.2-16-16-16zm96 32c8.8 0 16-7.2 16-16s-7.2-16-16-16s-16 7.2-16 16s7.2 16 16 16z"/>`;
var svgPathFasRobot = `<path d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/>`;

// other:
var svgPathFasShareNodes = `<path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/>`;

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - -- - T H E M E S  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const range = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

let themes = {
  comparaisons_XVIIe_XVIIIe: {
    title: "Mathématiciens des XVII<sup>e</sup> et XVIII<sup>e</sup> siècles",
    info: "Questions pour situer les mathématiciens du XVII<sup>e</sup> et du siècle des Lumières. Détails et liens dans les corrections.",
    questions: range(2650,2669),
    maxPointsPerQuestion: 1,
  },
  comparaisons_pre_XVIIe: {
    title: "Mathématiciens du premier au XVII<sup>e</sup> siècle",
    info: "Questions pour situer les mathématiciens du début de notre ère jusqu'à la fin de la Renaissance. Détails et liens dans les corrections.",
    questions: range(2629,2649),
    maxPointsPerQuestion: 1,
  },
  comparaisons_antiquite: {
    title: "Mathématiciens de l'Antiquité",
    info: "Questions pour situer les mathématiciens de l'antiquité les uns par rapport aux autres. Détails et liens dans les corrections.",
    questions: range(2595,2610),
    maxPointsPerQuestion: 1,
  },
  elements_euclide: {
    title: "Les Éléments d'Euclide",
    info: "Questions sur le célèbre traité mathématique. Commentaires dans les corrections.",
    questions: range(2611,2628),
    maxPointsPerQuestion: 1,
  },
  sophie_germain: {
    title: "Sophie Germain",
    info: "Vie et travaux de Sophie Germain, mathématicienne. Commentaires dans les corrections. Source pour les questions : Wikipédia.",
    questions: range(2572,2594),
    maxPointsPerQuestion: 1,
  },
  permutations_conditions: {
    title: "Permutations avec conditions",
    info: "Questions portant sur le nombre de façon de permuter les lettres d'un mot, mais avec des contraintes ou conditions supplémentaires : commencer par une consonne, commencer ou finir par une voyelle etc.",
    questions: range(2543,2571),
  },
  permutations1: {
    title: "Permutations",
    info: "Questions portant sur le nombre de façon de permuter les lettres d'un mot par exemple.",
    questions: range(2524,2542),
    maxPointsPerQuestion: 5,
  },
  anagrammes2: {
    title: "Anagrammes, bis",
    info: "Mots plus longs, factorielles.",
    questions: range(2492,2523),
    maxPointsPerQuestion: 5,
  },
  anagrammes1: {
    title: "Anagrammes",
    info: "Mots courts, sans factorielles.",
    questions: range(2458,2491),
    maxPointsPerQuestion: 5,
  },
  additions_2chiffres: {
    title: "Additions à deux chiffres",
    info: "Calculs du type 19+57.",
    questions: range(2418, 2457),
    maxPointsPerQuestion: 5,
  },
  tables1: {
    title: "Tables de multiplications à un chiffre",
    info: "Parfait pour réviser ses tables !",
    questions: range(2354, 2383),
    maxPointsPerQuestion: 1,
  },
  additions_tables: {
    title: "Additions de multiplications",
    info: "Calculs du type 9x7+8x6.",
    questions: range(2384, 2417),
    maxPointsPerQuestion: 5,
  },
  valeurs_cosinus: {
    title: "Cosinus d'un angle aigu",
    info: "Définitions, valeurs classiques, calculs de valeurs de cosinus. Les angles sont aigus et donnés en degrés.",
    questions: [...range(2311, 2318), ...range(2321, 2341)],
  },
  comparaisons_cosinus: {
    title: "Comparaisons de cosinus",
    info: "Encadrements et comparaisons de cosinus de différents angle aigus. Les angles sont aigus et donnés en degrés.",
    questions: [2319, 2320, ...range(2342, 2353)],
  },
  fct_harmoniques: {
    title: "Fonctions harmoniques",
    info: "Fonctions harmoniques, liens avec les fonctions holomorphes.",
    questions: range(2292, 2310),
  },
  anneau_holomorphes: {
    title: "Anneaux de fonctions holomorphes",
    info: "Propriétés des anneaux de fonctions holomorphes.",
    questions: range(2282, 2291),
  },
  wirtinger: {
    title: "Notations de Wirtinger",
    info: "Notations et opérateurs de Wirtinger.",
    questions: range(2266, 2281),
  },
  holomorphie: {
    title: "Holomorphie",
    info: "Dérivabilité complexe, Cauchy-Riemann, exemples.",
    questions: range(2198, 2265),
  },
  corps: {
    title: "Corps",
    info: "Attention, les corps sont commutatifs par convention. Deal with it.",
    questions: range(2054, 2076),
  },
  anneaux_euclidiens: {
    title: "Anneaux euclidiens",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(2036, 2053),
  },
  anneaux_principaux: {
    title: "Anneaux principaux",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(2012, 2035),
  },
  anneaux_factoriels: {
    title: "Anneaux factoriels",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(1995, 2011),
  },
  anneaux_integres: {
    title: "Anneaux intègres",
    info: "Attention, les anneaux sont unitaires par convention.",
    questions: range(1972, 1994),
  },
  anneaux: {
    title: "Anneaux",
    info: "Anneaux, sous-anneaux, idéaux, morphismes d'anneaux. Attention, les anneaux sont unitaires par convention.",
    questions: range(1939, 1971),
  },
  signature: {
    title: "Signature",
    info: "Signature, groupes alternés.",
    questions: range(1915, 1938),
  },
  groupes_symetriques: {
    title: "Groupes symétriques",
    info: "Permutations, cycles, compositions, commutation etc.",
    questions: range(1878, 1914),
  },
  groupes_simples: {
    title: "Groupes simples",
    info: "Sous-groupes distingués, groupes simples.",
    questions: range(1853, 1877),
  },
  groupes_operant: {
    title: "Opérations de groupes",
    info: "Groupes opérant sur un ensemble.",
    questions: range(1849, 1852),
  },
  groupes: {
    title: "Groupes (et morphismes)",
    info: "Groupes, morphismes de groupes.",
    questions: range(1837, 1848),
  },
  groupes_ab_finis: {
    title: "Groupes abéliens (finis)",
    info: "Groupes abéliens finis, groupes cycliques.",
    questions: range(1785, 1836),
  },
  arithmetique_Z: {
    title: "Arithmétique dans Z",
    info: "Divisibilité, division euclidienne, pgcd, équations diophantiennes simples.",
    questions: range(1754, 1784),
  },
  tables_parentheses1: {
    title: "Tables de multiplication et parenthèses",
    info: "Calcul mental, multiplications avec parenthèses.",
    questions: range(1714, 1753),
    maxPointsPerQuestion: 5,
  },
  suites_arithmetiques_variations: {
    title: "Variation des suites arithmétiques",
    info: "Questions sur les suites arithmétiques et leurs variations : croissante, monotonie, caractère borné, majoré etc.",
    questions: range(1660, 1713),
  },
  suites_arithmetiques: {
    title: "Suites arithmétiques, Généralités",
    info: "Questions sur les suites arithmétiques.",
    questions: range(1586, 1659),
  },
  sommes_arithmetiques: {
    title: "Sommes arithmétiques",
    info: "Quelques sommes de termes consécutifs de suites arithmétiques. ",
    questions: range(1555, 1585),
  },
  quadrilateres: {
    title: "Quadrilatères",
    info: "Questions sur les quadrilatères : rectangles, carrés, losanges, parallélogrammes, trapèzes etc.",
    questions: [...range(657, 685), ...range(1259, 1273), ...range(1428, 1430)],
    links: [
      {
        title: "Wikipédia (très complet)",
        URL: "https://fr.wikipedia.org/wiki/Quadrilat%C3%A8re",
      },
      {
        title: "Vidéo d'Yvan Monka sur quelques cas",
        URL: "https://www.youtube.com/watch?v=ZYcfGoqDQz4",
      },
    ],
  },
  symetries: {
    title: "Symétries des polygones",
    info: "Axes et centres de symétrie des polygones du plan. Attention aux cas particuliers. Par exemple, un carré est un cas particulier de rectangle (ou de losange).",
    questions: range(1274, 1304),
  },
  fonctions_affines: {
    title: "Fonctions affines",
    info: "Fonctions linéaires et affines, images, antécédents, coefficients directeurs, ordonnée à l'origine...",
    questions: range(1467, 1514),
  },
  abs1: {
    title: "Valeur absolue",
    info: "Questions de base, trier questions",
    questions: range(1, 20),
  },
  analyse1: {
    title: "Analyse, première partie",
    info: "Un peu d'analyse. Fonctions paires, impaires, dérivables, continues.",
    questions: range(21, 34),
  },
  applications: {
    title: "Applications entre ensembles",
    info: "Injections, surjections, bijections. Images, images réciproques etc.<br>Les mots 'fonction' et 'application' sont synonymes.<br>Sauf précision supplémentaire, les applications vont d'un ensemble $E$ dans un ensemble $F$.",
    questions: range(35, 61),
  },
  app_lin1: {
    title: "Applications linéaires",
    info: "Des questions sur les applications linéaires en dimension quelconque.<br><b>Notations:</b> Les lettres $E$, $F$ et $G$ désignent des espaces vectoriels. L'ensemble des endomorphismes d'un espace vectoriel $E$ est noté $\\mathcal{L}(E)$.<br> Si une assertion n'est pas bien définie, on demande de répondre 'Faux'.",
    questions: [...range(62, 92), ...range(1213, 1219)],
  },
  arithmetique1: {
    title: "Arithmétique, première partie",
    info: "Divisibilité, diviseurs, nombres premiers. Pas de congruences.",
    questions: range(93, 116),
  },
  multiplication1: {
    title: "Multiplications",
    info: "Multiplications à deux chiffres.",
    questions: range(1305, 1337),
    maxPointsPerQuestion: 5,
  },
  tables_logique1: {
    title: "Tables et logique",
    info: "Tables de multiplication et connecteurs logiques «et» et «ou».",
    questions: range(117, 132),
    maxPointsPerQuestion: 5,
  },
  complexes_mult: {
    title: "Nombres complexes : forme algébrique",
    info: "Multiplications concrètes de nombres complexes, renforcement en calcul. L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon lors des premiers essais) et seulement alors d'augmenter sa rapidité.",
    questions: range(133, 168),
  },
  complexes_arg: {
    title: "Nombres complexes : arguments classiques",
    info: "Calculs d'arguments concrets simples (ceux correspondant à des valeurs classiques de sinus et cosinus). L'objectif est d'abord de réussir un sans-faute (quitte à utiliser un brouillon) et seulement alors d'augmenter sa rapidité.",
    questions: range(169, 187),
  },
  complexes_mod: {
    title: "Nombres complexes : module, conjugaison",
    info: "Module, conjugaison, parties réelles et imaginaires.<br>les lettres non définies ($z$, $z'$, $w$ etc) désignent des nombres complexes. On demande de répondre 'VRAI' uniquement si l'assertion est universellement vraie, quelque soient les éventuels paramètres, et de répondre 'FAUX' dans le cas contraire. Par exemple, on répondra 'FAUX' à $|z|=|z|^2$ car même si ça peut exceptionnellement être vrai (pour $z=0$ par exemple), c'est en général faux.",
    questions: range(188, 211),
  },
  complexes_geo: {
    title: "Nombres complexes : géométrie élémentaire",
    info: "Triangles, alignement, orthogonalité, quadrilatères, angles. Pas de transformations.<br>Les lettres minuscules non définies ($z$, $z'$, $w$, $a$, $b$ etc) désignent des nombres complexes. Les lettres majuscules désignent des points du plan. Le point $A$ a pour affixe $a$ etc. Tous les points sont distincts.",
    questions: range(212, 239),
  },
  derivees1: {
    title: "Dérivées, première partie",
    info: "Dérivées simples, pas de logarithme ni d'exponentielle, pas de primitives.",
    questions: range(240, 266),
  },
  derivees2: {
    title: "Dérivées, primitives",
    info: "Dérivées et primitives sur le programme de terminale.",
    questions: range(267, 283),
  },
  domaines_zero: {
    title: "Domaines de définition, 1",
    info: "Détermination de domaines de définition en n'utilisant que l'interdiction de diviser par zéro. Pas de racines carrées, ni de logarithmes.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(284, 304),
  },
  domaines_sqrt: {
    title: "Domaines de définition 2 (sqrt)",
    info: "Détermination de domaines de définition d'expression comportant des racines carrées.<br>Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(305, 324),
  },
  domaines_log: {
    title: "Domaines de définition, 3 (log)",
    info: "Détermination de domaines de définition, avec logarithmes. Dans toutes les questions, la lettre $x$ désigne une variable réelle et on demande le domaine de définition d'une expression contenant $x$, c'est-à-dire la plus grande partie de $\\mathbb R$ sur laquelle l'expression est définie. <br/>Terminologie : $A\\setminus B$ se lit «$A$ privé de $B$».",
    questions: range(325, 344),
  },
  domaines_red: {
    title: "Domaines de définition, 4 (rédaction)",
    info: "Différentes rédactions de détermination de domaines de définition. On demande de répondre «Vrai» si la rédaction est correcte, et «Faux» si elle ne l'est pas.",
    questions: range(345, 363),
  },
  droites1: {
    title: "Droites et équations",
    info: "Géométrie en coordonnées, droites du plan, équations cartésiennes et paramétrages. <br/>Terminologie : l'origine du plan est notée $O$. Les axes de coordonnées (abscisses et ordonnées) partagent le plan en quatre <b>quadrants</b>. Le premier quadrant est le quadrant supérieur droit ($x>0$ et $y>0$). Le deuxième quadrant est le supérieur gauche et les autres suivent dans le sens trigonométrique.",
    questions: range(364, 384),
  },
  equations1: {
    title: "Équations 1",
    info: "Équations, avec vérification qu'un élément est solution (en injectant).",
    questions: range(385, 402),
  },
  ev1: {
    title: "Espaces vectoriels 1",
    info: "Espaces vectoriels, sous-espaces vectoriels. Familles libres, liées, bases.<br>Attention, la dimension n'est pas forcément finie.",
    questions: [...range(403, 436), ...range(1197, 1212)],
  },
  calcul_litt1: {
    title: "Calcul littéral, 1",
    info: "Exercices de calcul littéral : identités remarquables, développement d'expressions avec une variable.",
    questions: range(1338, 1385),
  },
  calcul_litt2: {
    title: "Calcul littéral, 2",
    info: "Exercices de calcul littéral : identités remarquables, développement d'expressions avec deux variables.",
    questions: range(1386, 1427),
  },
  calcul_litt3: {
    title: "Calcul littéral, 3",
    info: "Exercices de calcul littéral : développement d'expressions avec deux variables, avec des expressions de degré trois ou plus. (À bac+1, ce sont des identités remarquables à connaître.)",
    questions: range(1431, 1466),
  },
  facto1: {
    title: "Factorisation, première partie",
    info: "Exercices de calcul littéral, accessible en théorie dès la fin du collège. (Note : il n'y a pas besoin de savoir ce qu'est un discriminant et même si la notion est connue, elle fait perdre beaucoup de temps. La compétence à travailler ici est la factorisation de tête.)",
    questions: range(437, 465),
  },
  fractions1: {
    title: "Fractions2",
    info: "Calcul mental et littéral sur les fractions. Les lettres désignent des entiers qui peuvent être quelconques du moment que ça ne provoque pas une division par zéro.",
    questions: range(466, 485),
  },
  implication: {
    titre:
      "Implication logique. <br>Les symboles $A$ et $B$ désignent des assertions.",
    info: "",
    questions: range(486, 513),
  },
  inegalites1: {
    title: "Inégalités 1",
    info: "inégalités avec variables, racines carrées, élévation au carré d'inégalités, implications et équivalences.",
    questions: range(514, 536),
  },
  isometries_planes1: {
    title: "Isométries planes, partie 1",
    info: "On se place dans leplan euclidien blabla, notations etc",
    questions: range(537, 574),
  },
  matrices1: {
    title: "Matrices",
    info: "Attention, une matrice est en général rectangulaire !",
    questions: [...range(575, 600), ...range(1226, 1232), ...range(1188, 1196)],
  },
  complexes_mod1: {
    title: "Nombres complexes de module un, racines de l'unité",
    info: "Questions sur les racines $N$-èmes, sur les racines de l'unité et en général sur le cercle unité du plan complexe.",
    questions: range(601, 626),
  },
  predicats: {
    title: "Calcul des précicats",
    info: "La lettre $x$ désigne un nombre réel.",
    questions: range(627, 656),
  },
  quantificateurs1: {
    title: "Quantificateurs",
    info: "<b>CONSIGNE IMPORTANTE:</b><br>Certaines phrases sont mal formées et n'ont pas de sens mathématique. Dans ce cas, il est demandé de choisir «FAUX».",
    questions: range(686, 718),
  },
  sqrt1: {
    title: "Racines carrées (sans produits)",
    info: "Calculs avec racines carrées : simplifications, factorisations, inégalités.",
    questions: range(719, 758),
  },
  sqrt2: {
    etiquette: "Racine carrée 2",
    niveau: -3,
    title: "Racines carrées et produits",
    info: "Avec produits, mais sans quotients ni calcul littéral",
    questions: range(759, 778),
  },
  sqrt3: {
    title: "Racines carrées et fractions",
    info: "Racines carrées et fractions, sans calcul littéral",
    questions: range(779, 806),
  },
  recap1: {
    title: "Récap terminale",
    info: "Vérifier s'il n'y a pas deux thèmes ici",
    questions: range(807, 858),
  },
  relations_equiv: {
    title: "Relations d'équivalence",
    info: "Sans ensemble quotient",
    questions: range(859, 903),
  },
  relations_ordre: {
    title: "Relations d'ordre",
    info: "Plus grand élément, divisibilité etc..",
    questions: range(904, 926),
  },
  rotations_planes1: {
    title: "Rotations planes",
    info: "notations, plan, application complexe associée",
    questions: range(927, 946),
  },
  systemes1: {
    title: "Systèmes à deux équations et deux inconnues",
    info: "les variables désignent des nombres réels.",
    questions: range(947, 975),
  },
  trigo_valeurs: {
    title: "Trigonométrie, 1 : valeurs classiques",
    info: "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
    questions: [...range(1005, 1019), ...range(1030, 1042)],
  },
  trigo_formules1: {
    title: "Trigonométrie 2 : formules de base",
    info: "Séparer en deux thèmes. Formules de trigonométrie de base : somme, différence, doublement. Valeurs classiques. Les lettres $a$ et $b$ désignent des nombres réels.",
    questions: [...range(976, 1004), ...range(1020, 1029), 1043],
  },
  trigo_tan: {
    title: "",
    info: "Tangente, valeurs classiques, formules, domaine de définition",
    questions: [
      ...range(1044, 1068),
      ...range(1079, 1084),
      1093,
      1094,
      1095,
      ...range(1099, 1119),
    ],
  },
  trigo_congruences: {
    title: "Trigonométrie 4",
    info: "Congruences et équations",
    questions: [...range(1069, 1078), ...range(1085, 1092), 1096, 1097, 1098],
  },
  dim_finie: {
    title: "Dimension finie",
    info: "Espaces vectoriels en dimension finie",
    questions: range(1220, 1225),
  },
  polynomes1: {
    title: "Polynômes",
    info: "Questions sur les polynômes, l'espace des polynômes, et leur arithmétique.",
    questions: [...range(1233, 1239)],
  },
  espaces_probabilises_finis: {
    title: "Espaces probabilisés finis",
    info: "",
    questions: [...range(1248, 1253)],
  },
  variables_aleatoires_finies: {
    title: "Variables aléatoires",
    info: "(Sur un espace probabilisé fini.)",
    questions: [...range(1254, 1258)],
  },
  analyse_asymptotique1: {
    title: "Analyse asymptotique",
    info: "Équivalents de suites, petit o, grand O.",
    questions: [...range(1127, 1129), ...range(1131, 1133)],
  },
  suites1: {
    title: "Suites et limites",
    info: "Questions de convergence.",
    questions: [...range(1134, 1144)],
  },
  series1: {
    title: "Séries (pratique)",
    info: "Natures de séries données par un terme général concret.",
    questions: [...range(1145, 1148), ...range(2108, 2157)],
  },
  series_theorie: {
    title: "Séries (questions théoriques)",
    info: "Questions de convergence, comparaison etc.",
    questions: [...range(2158, 2197)],
  },
  continuite1: {
    title: "Limites et continuité",
    info: "Convergence et limite en un point, continuité de fonctions réelles à variable réelle, prolongements par continuité.",
    questions: [...range(1157, 1165)],
  },
  derivabilite1: {
    title: "Dérivabilité",
    info: "",
    questions: [...range(1166, 1174)],
  },
  discriminants1: {
    title: "Discriminants",
    info: "",
    questions: [...range(1515, 1554)],
  },
};

