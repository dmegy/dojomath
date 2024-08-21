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
