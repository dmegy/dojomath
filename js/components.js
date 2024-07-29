function htmlPoints() {
  let s = `
		<span style="font-weight:400;position:relative">
			${user.points} pt${user.points != 1 ? "s" : ""}
			<span class="notif">
                Niv. ${level(user.points)}
            </span>
		</span>`;
  return s;
}

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
			class="button-small" 
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

function htmlTripleProgress([a, b, c]) {
  // retourne un div html avec des barres de progression dans le ratio a:b:c

  let n = a + b + c;
  let [pa, pb, pc] = [0, 0, 0];
  if (n != 0) [pa, pb, pc] = [(100 * a) / n, (100 * b) / n, (100 * c) / n];

  let s = "";
  s = `	<div class='progress-bar-container'>
				<div style='width:${pa}%;background-color:var(--c-danger)'></div>
				<div style='width:${pb}%;background-color:var(--c-warning)'></div>
				<div style='width:${pc}%;background-color:var(--c-success)'></div>
			</div>`;
  return s;
}

function htmlCheckbox(bool) {
  if (bool) {
    return `<svg class="svg-icon" viewBox="0 0 512 512">${svgPathFasCheck}</svg>`;
  } else {
    return `•`;
  }
}
