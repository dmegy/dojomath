function sendStatistics() {
  // else :
  // vérification _très_ sommaire, apparemment inutile, les points ont déjà été recorrigés ?

  let requestBody = {
    user: JSON.stringify(user),
    quiz: JSON.stringify(quiz),
  };

  fetch(URL_QUIZ_FINISHED, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  console.log("Points envoyés");
}
