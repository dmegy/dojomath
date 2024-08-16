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
  // et non render, car on vérifie avec la date du dernier render...
  welcomeBackBoost();
});
