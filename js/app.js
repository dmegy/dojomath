let state = "home";
let theme = {}; // thème courant, celui affiché lorsqu'on clique sur un thème dans la page des chapitres.

let user = {
  userId: "userIdTest",
  userName: "NomProvisoire",
  points: 0,
};

const gotoHome = () => {
  state = "home";
  render();
};

const gotoChapters = () => {
  console.log("appel de gotoChapters");
  state = "chapters";
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

function getScript(scriptUrl, callback) {
  const script = document.createElement("script");
  script.src = scriptUrl + "?unique=" + Math.random();
  script.onload = callback;
  document.body.appendChild(script);
}

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
