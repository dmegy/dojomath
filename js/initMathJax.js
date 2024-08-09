MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    macros: {
      N: "{\\mathbb{N}}",
      Z: "{\\mathbb{Z}}",
      Q: "{\\mathbb{Q}}",
      R: "{\\mathbb{R}}",
      C: "{\\mathbb{C}}",
      U: "{\\mathbb{U}}",
      P: "{\\mathbb{P}}",
      llbracket: "{[\\![}",
      rrbracket: "{]\\!]}",
      tr: "{\\mathrm{tr}}",
      rg: "{\\mathrm{rg}}",
      im: "{\\mathrm{im}}",
      id: "{\\mathrm{id}}",
      Mat: "{\\mathrm{Mat}}",
    },
    svg: {
      fontCache: "global",
    },
  },
};

function testMathJax() {
  let s = "<div id='testMathJax'>";
  s += "$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k}a^{k}b^{n-k}$.";
  s += `$(2+3)\\times \\left(4^{123456789}\\right)^7 = \\left(\\frac{\\sqrt 2+\\sqrt{2^2}}{\\pi}\\right)$`;
  s += `$\\N \\Z \\Q \\R \\C \\U$`;
  s += "$\\frac{\\partial f}{\\partial \\overline z}$";
  s += "</div>";
  document.body.innerHTML += s;
  /* composé automatiquement normalement, MathJax watch le contenu*/
}
