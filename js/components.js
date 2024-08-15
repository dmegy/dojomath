// pour l'écran des thèmes et chapitres :

function htmlChapters() {
  let s = "";
  for (let i = 0; i < chapters.length; i++) {
    if (chapters[i].isHidden && !SHOW_HIDDEN_CHAPTERS) continue;

    s += `<details open>
			<summary>${chapters[i].name}</summary>
			<div id='chapter_${i}'>`;
    for (let j = 0; j < chapters[i].themes.length; j++) {
      if (chapters[i]["themes"][j].isHidden && !SHOW_HIDDEN_THEMES) continue;
      s += htmlButtonTheme(i, j);
    }
    s += `</div></details>`;
  }
  return s;
}
function htmlButtonTheme(i, j) {
  let label = chapters[i]["themes"][j].label;
  let id = chapters[i]["themes"][j].id;

  computeThemeStats(id);

  return `
		<div style="
                background-color: var(--c-secondary-40);
                text-align: center;" 
			class="btn btn-small ${statsThemes[id].isLocked ? "btn-disabled" : ""}" 
			id="boutonTheme_${i}_${j}" 
			onclick="gotoTheme('${id}')">
			<div style="
            opacity:50%;
		        background:var(--c-secondary-70);
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: ${Math.ceil((100 * statsThemes[id].questionsSuccessfulLastTime) / themes[id].questions.length)}%;">
            </div>
      <div style="
            opacity:20%;
		        background:white;
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: ${Math.ceil((100 * statsThemes[id].questionsSuccessfulLastTwoTimes) / themes[id].questions.length)}%;">
            </div>
			<div style="position:relative;">${label}</div>
		</div>
	`;
}

function htmlThemeReferences() {
  // composant car boucle for dedans...
  let s = "";
  let list = theme.links; // le thème courant : passer en paramètre ?
  if (list == undefined) return s;
  s += "Si besoin, ressources externes:<ul>";
  for (let i = 0; i < list.length; i++) {
    s += `<li><a target="_blank" href="${list[i].URL}">${list[i].title}</a></li>`;
  }
  s += "</ul>";
  return s;
}

// pour l'écran des stats utilisateur : barres de progression etc

function htmlProfile() {
  return "";
}

function htmlProgress(a, b) {
  // retourne un div html avec une barre de progression
  if (a > b) a = b; // on tronque
  let p = 0;
  if (b != 0) p = a / b;
  return `<div class='progress-bar-container'>
				<div style='width:${100 * p}% ;' class='progress-bar'></div>
			</div>`;
}

function htmlMultipleProgress(numbers, colorsCSSvarnames) {
  // input : deux tableaux de même taille
  //retourne une barre de stats de type cumulative avec les valeurs et couleurs fournies
  if (numbers.length != colorsCSSvarnames.length) throw Error;
  let sum = numbers.reduce((partialSum, k) => partialSum + k, 0);
  let percentages = numbers.map((x) => {
    return 0;
  }); // initialisation d'un tableau de même longueur et rempli de zéros.
  if (sum != 0)
    percentages = numbers.map((x) => {
      return (100 * x) / sum;
    });
  let s = "<div class='progress-bar-container'>";
  for (let i = 0; i < numbers.length; i++) {
    s += `<div style='width:${percentages[i]}%;background-color:var(${colorsCSSvarnames[i]})'></div>`;
  }
  s += "</div>";
  return s;
}

function htmlCheckbox(bool) {
  if (bool) {
    return "✔";
    //return `<svg class="svg-icon" viewBox="0 0 512 512">${svgPathFasCheck}</svg>`;
  } else {
    return `•`;
  }
}

function htmlNumAdj(n, adj) {
  // l'adjectif doit être déjà conjugué en genre
  // exemple : htmlNombreAdj(3,"vérolée") retourne "3 vérolées"
  return n + " " + adj + (n == 1 || n == -1 ? "" : "s"); // pour zéro on met au plurieu ?
}

function htmlPoints(points) {
  return points + " pt" + (points == 1 || points == -1 ? "" : "s");
}

function htmlGetUserLevel() {
  return "Niv. " + level(user.points);
}

function htmlInputUsername() {
  let s = `
      <input 
        style="display:inline"
        type="text"
        id="userNameInputId"
        name="userNameInputName"
        size="10"
        maxlength="10"
        value="${user.userName}" />`;

  return s;
}

function htmlSelectAreaCode() {
  let s = `<select name="userAreaCodeSelectName" id="userAreaCodeSelectId">`;
  let choices = []; // construction du tableau contenant tous les choix
  choices.push("Aucun");
  for (let i = 1; i <= 95; i++) choices.push(("0" + i).slice(-2));
  for (let i = 971; i <= 978; i++) choices.push(i);
  for (let i = 986; i <= 988; i++) choices.push(i);
  choices.push("AEFE");
  choices.push("Autre");
  // construction du SELECT
  for (let i = 0; i < choices.length; i++) {
    s += `		<option value="${choices[i]}" ${user.areaCode == choices[i] ? "selected" : ""}>${choices[i]}</option>`;
  }
  s += "</select>";
  return s;
}

function htmlShare(msg) {
  let message = encodeURIComponent(msg);
  return `<a
                href="javascript:(()=>{var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); var u = isMobile ? 'whatsapp://send?text=${message}' : 'https://wa.me/?text=${message}' ; window.open(u);})();"
                >Whatsapp</a
              > | 
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.dojomath.fr%2F&t=${message}"
                >Facebook</a
              > | 
              <a
                href="javascript:(()=>{window.open('https://twitter.com/intent/tweet?text=${message}&url=https%3A%2F%2Fwww.dojomath.fr%2F');})();"
                >𝕏</a
              > | 
              <a
                href="mailto:?subject=DojoMath.fr&body=${message}"
                >Email</a
              > | 
              <a
                href="sms:?&body=${message}"
                >SMS</a
              >`;
}
