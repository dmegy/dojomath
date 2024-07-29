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
