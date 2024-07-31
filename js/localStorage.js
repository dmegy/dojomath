function saveToLocalStorage() {
  console.log("sauvegarde-> localStorage");
  window.localStorage.setItem("statsQuestions", JSON.stringify(statsQuestions));
  window.localStorage.setItem("statsThemes", JSON.stringify(statsThemes));
  window.localStorage.setItem("user", JSON.stringify(user));
}

function loadFromLocalStorage() {}

window.addEventListener("answerValidated", saveToLocalStorage);
window.addEventListener("quizFinished", saveToLocalStorage);
