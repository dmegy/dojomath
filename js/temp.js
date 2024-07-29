function testMathJax() {
  console.log("fonction : test mathjax");

  let s = "<div>";
  for (let i = 0; i < 1000; i++) {
    s += questions[i].statement + "<br>\n";
  }
  s += "</div>";
  document.body.insertAdjacentHTML("beforeend", s);
  MathJax.typeset();
}
