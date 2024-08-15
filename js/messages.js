const URL_GET_MESSAGES = "https://www.dojomath.fr/backend/get_messages.php";
const URL_SEND_MESSAGE = "https://www.dojomath.fr/backend/send_message.php";

function editMessage(recipientId) {
  if (user.points < 100) {
    notification(
      "Pour envoyer un message, tu dois avoir plus de 100 points !",
      "var(--c-danger)"
    );
    return;
  }
  if (!window.navigator.onLine) {
    notification("Tu sembles être hors-ligne.", "var(--c-danger)");
    return;
  }
  let promptMessage =
    "Envoi de message\n============\n\nLongueur maximale du message:\n un seul émoji (ou 2 lettres)!";
  let content = prompt(promptMessage, "👏");
  if (!content) return;
  if (content.length > 2) {
    notification(
      "Message trop long.\nLongueur maximale : un seul émoji ou deux lettres.",
      "var(--c-danger)"
    );
    return;
  }
  sendMessage(recipientId, content);
}

function sendMessage(recipientId, content) {
  if (user.points < 100) {
    console.log("Pour envoyer des messages, il faut avoir au moins 100 points");
    return;
  }
  if (content.length > 2 || recipientId.length > 16) {
    // normalement déjà filtré par editMessage
    console.log("Message invalide");
    return;
  }
  if (Date.now() - user.lastMessageSendTime < 1000) {
    console.log("Maximum un envoi de message par seconde");
    return;
  }

  // paramètres en argument ? ou variable globale messageDraft ?
  let requestBody = {
    sender: JSON.stringify(user),
    recipientId: recipientId,
    content: content,
  };

  notification("Envoi du message...", "oklch(70% 90% var(--hue-accent))");
  fetch(URL_SEND_MESSAGE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((obj) => {
      if (obj.status == "success")
        notification("Message envoyé !", "oklch(70% 90% var(--hue-accent))");
      else
        notification(
          "Erreur lors du traitement des données.",
          "var(--c-danger)"
        );
    })
    .catch((error) => {
      notification("Erreur d'envoi", "var(--c-danger)");
    });
}

function getMessages() {
  if (!window.navigator.onLine) {
    console.log("Navigateur hors-ligne.");
    return;
  }
  if (Date.now() - user.lastMessageCheckTime < 3000) {
    console.log("Maximum un check de message par 3 secondes");
    return;
  }

  // paramètres en argument ? ou variable globale messageDraft ?
  let requestBody = {
    user: JSON.stringify(user),
  };

  fetch(URL_GET_MESSAGES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((responseObj) => {
      if (responseObj.status != "success") {
        console.log(
          "Réponse du serveur : Erreur. Message : " + responseObj.message
        );
        return;
      }

      if (responseObj.messages.length == 0) {
        console.log("Pas de messages");
        return;
      }

      if (
        receivedMessages.length != 0 &&
        receivedMessages[0].date === responseObj.messages[0].date
      ) {
        console.log("Pas de nouveaux messages");
        return;
      }
      // END GUARD
      let notifText =
        state == "Profile"
          ? "Nouveau(x) message(s) !"
          : "Tu as de nouveaux messages!\n Tu peux les lire dans ta page de profil.";
      notification(notifText, "oklch(70% 90% var(--hue-accent))");
      receivedMessages = responseObj.messages;
      saveToLocalStorage();
      // on relance pas nu render(), on fait juste ceci :
      document.getElementById("messages").innerHTML = htmlMessages();
    })
    .catch((error) => {
      console.log(error);
    });
}

function refreshMessages() {
  getMessages();
}

function htmlMessages() {
  if (receivedMessages.length == 0) {
    return `Pas encore de messages.<br>
     Les personnes venant de terminer une partie sont contactables par tout le monde.<br>
     Tu peux engager une conversation de cette façon.<br>
     Ensuite, toute personne qui reçoit un message peut y répondre.<br>
     Attention la taille des messages est limitée à un seul émoji !`;
  }
  let s = "";
  for (let i = 0; i < receivedMessages.length; i++) {
    s += `<div style="display:flex;justify-content:space-between;align-items:center;margin:.2rem 0">
      <div>${receivedMessages[i].senderName} dit : ${receivedMessages[i].content}</div>
      <div class="btn btn-small btn-primary" onclick="editMessage('${receivedMessages[i].senderId}')">Répondre</div>
      </div>`;
  }
  return s;
}

window.addEventListener("stateChange", (e) => {
  let s = e.detail.newState;
  if (s == "Home" || s == "Highscores" || s == "Statistics" || s == "Profile") {
    console.log("get messages");
    getMessages();
  }
});
