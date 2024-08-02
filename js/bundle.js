 
let t0 = performance.timeOrigin + performance.now();
console.log("Bienvenue ! ");

const QUIZ_MIN_RESULT = 2; // attention certains quiz peuvent faire moins de 2 questions ?
const QUIZ_MAX_LENGTH = 10;
const QUESTION_MAX_POINTS = 20; //maximum de pts que l'on peut gagner à chaque question

let questionNumber; // int, question courante
let question; // question courante : object
let state = "Loading";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.
let quiz = {}; // quiz courant

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

function htmlPoints(points) {
  return points + " pt" + (points == 1 || points == -1 ? "" : "s");
}

// pour l'écran des thèmes et chapitres :

function htmlChapters() {
  let s = "";
  for (let i = 0; i < chapters.length; i++) {
    s += `<details open>
			<summary>${chapters[i].name}</summary>
			<div id='chapter_${i}'>`;
    for (let j = 0; j < chapters[i].themes.length; j++) {
      s += htmlButtonTheme(i, j);
    }
    s += `</div></details>`;
  }
  return s;
}
function htmlButtonTheme(i, j) {
  let label = chapters[i]["themes"][j].label;
  let id = chapters[i]["themes"][j].id;
  return `
		<div style="
                --progression:0;
                background-color: var(--c-secondary-40);
                text-align: center;" 
			class="button-small" 
			id="boutonTheme_${i}_${j}" 
			onclick="gotoTheme('${id}')">
			<div style="
                opacity:50%;
		        background:var(--c-secondary-70);
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: calc( var(--progression,0) * 1%);">
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
  s += "</ul>(Les liens s'ouvrent dans une nouvelle fenêtre.)";
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
    return `<svg class="svg-icon" viewBox="0 0 512 512">${svgPathFasCheck}</svg>`;
  } else {
    return `•`;
  }
}

function htmlNumAdj(n, adj) {
  // l'adjectif doit être déjà conjugué en genre
  // exemple : htmlNombreAdj(3,"vérolée") retourne "3 vérolées"
  return n + " " + adj + (n == 1 ? "" : "s"); // pour zéro on met au plurieu ?
}

let svgPathFasDumbbell = `<path d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/>`;
let svgPathFasListCheck = `<path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>`;
let svgPathFasHouse = `<path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>`;
let svgPathFarEye = `<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>`;
let svgPathFasPlay = `<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>`;

let svgPathFasCheckDouble = `<path d="M374.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7 86.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"/>`;
let svgPathFasCheck = `<path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>`;

let svgPathFasUserLarge = `<path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0S112 64.5 112 144s64.5 144 144 144zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/>`;
let svgPathFasTrophy = `<path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>`;

let svgPathFasRankingStar = `<path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z"/>`;

let svgPathFasArrowRotateRight = `<path d="M386.3 160L336 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>`;

// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - C H A P I T R E S - - - - - -
// - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - -

let chapters = [
  {
    name: "Calcul mental",
    themes: [
      { label: "Priorités", id: "tables_parentheses1" },
      { label: "Mult. à 2 chiffres", id: "multiplication1" },
      { label: "Calcul et logique", id: "tables_logique1" },
    ],
  },
  {
    name: "Géométrie élémentaire",
    themes: [
      { label: "Quadrilatères", id: "quadrilateres" },
      { label: "Symétries", id: "symetries" },
    ],
  },
  {
    name: "Trigonométrie élémentaire",
    themes: [
      { label: "Cosinus", id: "valeurs_cosinus" },
      { label: "Comparaisons de cos", id: "comparaisons_cosinus" },
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
    name: "Probabilités",
    themes: [
      { label: "Esp. probabilisés finis", id: "espaces_probabilises_finis" },
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

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - -- - T H E M E S  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

const range = (start, stop) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

let themes = {
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
    questions: [...range(1849, 1852)],
  },
  groupes: {
    title: "Groupes (et morphismes)",
    info: "Groupes, morphismes de groupes.",
    questions: [...range(1837, 1848)],
  },
  groupes_ab_finis: {
    title: "Groupes abéliens (finis)",
    info: "Groupes abéliens finis, groupes cycliques.",
    questions: [...range(1785, 1836)],
  },
  arithmetique_Z: {
    title: "Arithmétique dans Z",
    info: "Divisibilité, division euclidienne, pgcd, équations diophantiennes simples.",
    questions: [...range(1754, 1784)],
  },
  tables_parentheses1: {
    title: "Tables de multiplication et parenthèses",
    info: "Calcul mental, multiplications avec parenthèses.",
    questions: [...range(1714, 1753)],
  },
  suites_arithmetiques_variations: {
    title: "Variation des suites arithmétiques",
    info: "Questions sur les suites arithmétiques et leurs variations : croissante, monotonie, caractère borné, majoré etc.",
    questions: [...range(1660, 1713)],
  },
  suites_arithmetiques: {
    title: "Suites arithmétiques, Généralités",
    info: "Questions sur les suites arithmétiques.",
    questions: [...range(1586, 1659)],
  },
  sommes_arithmetiques: {
    title: "Sommes arithmétiques",
    info: "Quelques sommes de termes consécutifs de suites arithmétiques. ",
    questions: [...range(1555, 1585)],
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
    title: "Symétries",
    info: "Axes et centres de symétrie des polygones du plan.",
    questions: [...range(1274, 1304)],
  },
  fonctions_affines: {
    title: "Fonctions affines",
    info: "Fonctions linéaires et affines, images, antécédents, coefficients directeurs, ordonnée à l'origine...",
    questions: [...range(1467, 1514)],
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
  },
  tables_logique1: {
    title: "Tables et logique",
    info: "Tables de multiplication et connecteurs logiques «et» et «ou».",
    questions: range(117, 132),
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

// ceci doit tourner après que les questions soient loadées !
// à part la boucle  suivante, ce script comporte uniquement des fonctions.

for (let themeId in themes) {
  //initialisation
  statsThemes[themeId] ??= {
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

function shuffleArray(array) {
  // attention !  le tableau est muté sur place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  console.log("startQuiz() sur le thème " + theme.id);
  quiz = structuredClone(theme);
  // ATTENTION ICI BUG BIZARRE ?

  shuffleArray(quiz.questions);

  // on vide la fin pour ne garder au plus que QUIZ_LENGTH questions
  while (quiz.questions.length > QUIZ_MAX_LENGTH) quiz.questions.shift();
  console.log("questions qui vont tomber : " + quiz.questions);

  quiz.quizLength = quiz.questions.length;
  quiz.nbQuestionsFailed = 0;
  quiz.nbQuestionsSuccessful = 0;
  quiz.nbQuestionsSkipped = 0;
  quiz.history = [];
  quiz.result = 0;
  quiz.points = 0;
  quiz.bonus = 0;
  quiz.finalGrade = 0;
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
  state = "Quiz";
  render();
  MathJax.typeset();
  statsQuestions[question.num].views += 1;
  statsThemes[theme.id].nbQuestionsViewed += 1;
  user.nbQuestionsViewed += 1;
}

function submitAnswer(answer) {
  //called by button
  question.submittedAnswer = answer;
  validateAnswer();
}

function validateAnswer() {
  //appelée à la fin de  submitAnswer()
  if (question.submittedAnswer === undefined) {
    // SKIPPED
    question.result = 0;
    statsQuestions[question.num].skipped += 1;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsSkipped += 1;
    user.combo = 0;
    user.nbQuestionsSkipped += 1;
    quiz.nbQuestionsSkipped += 1;
    console.log("question sautée");
    toast("+0pts", "var(--c-warning)");
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

    // toast success
    let congratulationsMessage =
      "BRAVO !\n+" + user.combo + " PT" + (user.combo > 1 ? "S" : "");
    toast(congratulationsMessage, "var(--c-success)");
    //toast Combo:
    if (user.combo > 1)
      toast(user.combo + " D'AFFILÉE !\n", "var(--c-success)");
  } else {
    // FAIL
    question.result = -1;
    statsQuestions[question.num].failed++;
    statsQuestions[question.num].successfulLastTime = false;
    statsQuestions[question.num].successfulLastTwoTimes = false;
    statsThemes[theme.id].nbQuestionsFailed++;
    user.combo = 0;
    user.nbQuestionsFailed++;
    quiz.nbQuestionsFailed++;
    toast("-1pt", "var(--c-danger)");
  }
  quiz.result += question.result;
  statsQuestions[question.num].penultimateResult =
    statsQuestions[question.num].lastResult;
  statsQuestions[question.num].lastResult = question.result;

  // CHECK GAMEOVER ??
  let maxAchievableResult = quiz.result + quiz.questions.length;
  let isGameover = maxAchievableResult < QUIZ_MIN_RESULT;
  if (isGameover) {
    alert("GAMEOVER :\nTrop de questions ratées ou sautées");
    user.nbQuizGameover++;
    abortQuiz();
    return;
  }

  // ATTRIBUTION DES POINTS A LA QUESTION
  // EN FONCTION DES RESULTATS :
  if (question.result == -1) question.points = -1;
  else question.points = Math.min(QUESTION_MAX_POINTS, user.combo);

  question.bonus = Math.max(question.points - 1, 0); // pts gagnés à cause d'un bonus

  quiz.points += question.points;
  quiz.bonus += question.bonus;

  quiz.history.push({
    questionNumber: question.num,
    submittedAnswer: question.submittedAnswer,
    result: question.result,
  });

  /* gestion des combos, éventuellement affichage de messages (combo etc)*/
  // type "10 d'affilée etc ? mais déjà affiché dans le toast"
  // ou alors : "100ème question réussie"

  saveToLocalStorage();

  if (quiz.questions.length > 0) nextQuestion();
  else showQuizResults();
}

function showAbortQuizModal() {
  let text =
    "DEMANDE DE CONFIRMATION :\n\nSouhaites-tu vraiment interrompre le Quiz ?\n\n(Attention, aucun point ne sera sauvegardé.)";
  if (confirm(text) == true) {
    user.nbQuizAborted++;
    abortQuiz();
  }
}
function abortQuiz() {
  // appelé lorsque l'utilisateur confirme la fermeture, ou en cas de gameover ?
  // éventuel appel serveur, gestion des stats ? ajout quiz interrompu ?
  gotoTheme(theme.id);
}

function showQuizResults() {
  //appelée par validateResults()
  /* calculer stats etc, récompenses, bonus */
  /* empile les messages, les récompenses etc ?*/

  // gérer avec des toasts ?

  quiz.finalGrade = grade20FromResult(
    quiz.nbQuestionsSuccessful,
    quiz.quizLength
  );
  if (quiz.finalGrade == 20) user.nbQuizPerfect++;

  // remplacer success par result pour tenir compte des erreurs
  user.points += quiz.points;
  statsThemes[theme.id].nbQuizFinished++;
  user.nbQuizFinished++;
  saveToLocalStorage();
  state = "End";
  render();
}

function unstack(targetName) {
  /* appelé lorsque le joueur sort de l'écran de fin : il faut afficher tous les messages empilés */
  /* provisoire */
  if (targetName == "Chapters") gotoChapters();
  else if (targetName == "Quiz") startQuiz();
}

// - - - COMPOSANTS - - - --

function glyphResult(note) {
  // écran de fin de quiz
  let glyph = "";
  if (note == 20) glyph = "🏆";
  else if (note >= 15) glyph = "🎉";
  else if (note >= 10) glyph = "👍";
  else glyph = "😅";
  return glyph;
}
function grade20FromResult(result, maxResult) {
  let MAX_GRADE = 20; // ou 100
  let posResult = Math.max(0, result);
  let grade = (MAX_GRADE * posResult) / maxResult;
  let roundedGrade = Math.floor(grade);
  return roundedGrade;
}

function getBooster() {}

function toast(message, color) {
  Toastify({
    text: message,
    duration: 800,
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
