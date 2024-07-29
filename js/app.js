let t0 = new Date();

if (window.localStorage.getItem("firstConnectionDate") !== null) {
} else
  window.localStorage.setItem(
    "firstConnectionDate",
    JSON.stringify(new Date())
  );

let state = "Home";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.

let user = {
  firstConnection: t0,
  userId: toB64(t0.getTime()),
  userName: toB64(t0.getTime()),
  avatar: "" /* type : dataURL*/,
  depCode: "",
  mathClub: "",
  points: 0,
  streak: 0,
  weakStreak: 0,
};

const removeCircles = () => {
  document
    .querySelectorAll("i")
    .forEach((el) => el.classList.remove("circled"));
};

const gotoChapters = () => {
  state = "Chapters";
  removeCircles();
  render();
};

const goto = (newState) => {
  // oldState= state;
  state = newState;

  removeCircles();
  document.getElementById("navButton" + newState).classList.add("circled");
  render();
};

const gotoTheme = (id) => {
  console.log("appel de gotoTheme avec id " + id);
  state = "theme";
  theme = themes[id];
  // calculer theme.progress, theme.nbQuestionsSeens, nbQuestionsChecked, theme.nbQuestionsDbChecked
  render();
};

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
  console.log(elements);
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
};

window.addEventListener("load", () => {
  //render();
  getScript("data_chapters.js", () => {
    console.log("chapitres chargés!");
    chaptersLoaded = true;
  });
  getScript("data_themes.js", () => {
    console.log("thèmes chargés!");
    themesLoaded = true;
  });
  getScript("data_questions.js", () => {
    console.log("Questions chargées!");
    questionsLoaded = true;
  });

  render(); //rendu des points
});

/*
fetch("questions.json?again=" + Math.random())
  .then((response) => response.json())
  .then((json) => {
    questions = json;
    console.log(questions[3]);
  });
*/
