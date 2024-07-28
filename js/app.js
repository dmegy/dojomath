let state = "home";
let user = {
  userId: "userIdTest",
  userName: "NomProvisoire",
  points: 0,
};

variableTest = "test"; // temporaire
function fonctionTest(v) {
  return 2 * v;
}

const level = (points) => {
  // correspondances points<->niv :
  // 20->niv1, 40->niv2, 80->niv3 etc
  if (points < 20) return 0;
  else return Math.floor(Math.log(points / 10) / Math.log(2));
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

window.addEventListener("load", () => {
  xShow();
  xHtml();
});
