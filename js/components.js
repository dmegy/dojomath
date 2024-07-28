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
