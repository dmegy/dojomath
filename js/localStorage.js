function saveToLocalStorage() {
  console.log("sauvegarde-> localStorage");
  window.localStorage.setItem("statsQuestions", JSON.stringify(statsQuestions));
  window.localStorage.setItem("statsThemes", JSON.stringify(statsThemes));
  window.localStorage.setItem("user", JSON.stringify(user));
}

function loadFromLocalStorage() {
  console.log("Récupération des données sauvegardées en local");
  if (window.localStorage.getItem("user") !== null)
    user = { ...user, ...JSON.parse(window.localStorage.getItem("user")) };
  if (window.localStorage.getItem("statsQuestions") !== null)
    user = {
      ...user,
      ...JSON.parse(window.localStorage.getItem("statsQuestions")),
    };
  if (window.localStorage.getItem("statsThemes") !== null)
    user = {
      ...user,
      ...JSON.parse(window.localStorage.getItem("statsThemes")),
    };
}

window.addEventListener("answerValidated", saveToLocalStorage);
window.addEventListener("quizFinished", saveToLocalStorage);

document.addEventListener("load", () => {
  loadFromLocalStorage();
});
