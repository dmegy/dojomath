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
  console.log(elements);
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].offsetParent === null) {
      // seule méthode trouvée pour vérifier la visibilité
      continue;
    }
    let content = eval(elements[i].attributes["x-html"].value);
    elements[i].innerHTML = content;
  }
}

window.addEventListener("load", () => {
  xShow();
  xHtml();
});
