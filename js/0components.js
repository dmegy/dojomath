// pour l'écran des thèmes et chapitres :

function htmlChapters() {
  let s = "";
  for (let i = 0; i < chapters.length; i++) {
    s += `<details open>
			<summary>${chapters[i].name}</summary>
			<div id='chapter_${i}'>`;
    for (let j = 0; j < chapters[i].themes.length; j++) {
      s += htmlButtonTheme(i, j);
    }
    s += `</div></details>`;
  }
  return s;
}
function htmlButtonTheme(i, j) {
  let label = chapters[i]["themes"][j].label;
  let id = chapters[i]["themes"][j].id;
  return `
		<div style="
                --progression:0;
                background-color: var(--c-secondary-40);
                text-align: center;" 
			class="btn btn-small" 
			id="boutonTheme_${i}_${j}" 
			onclick="gotoTheme('${id}')">
			<div style="
                opacity:50%;
		        background:var(--c-secondary-70);
		        position:absolute;
		        top:0;
		        left:0;
		        height:100%;
		        width: calc( var(--progression,0) * 1%);">
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
  s += "</ul>(Les liens s'ouvrent dans une nouvelle fenêtre.)";
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
    return `<svg class="svg-icon" viewBox="0 0 512 512">${svgPathFasCheck}</svg>`;
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
