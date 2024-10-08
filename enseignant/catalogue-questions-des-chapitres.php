<?php
session_start();
include "goto-index-if-not-connected.php";

?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Consolidation en  mathématiques: programme"
    />
    <meta name="author" content="Damien Mégy" />
    <title>DojoMath Enseignants : programme complet</title>
    <link
      href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.min.css"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="styles-enseignants.css" />

    <script type="text/javascript" src="../js/chapters.js"></script>
    <script type="text/javascript" src="../js/themes.js"></script>
    <script type="text/javascript" src="../js/questions.js"></script>
  </head>

  <body>
    <div class="body-container">
      <?php include "header-body.php"; ?>
      <main>
        <p id="top">
          Il est possible de trier les questions par chapitre, sous-chapitre et
          numéro, croissant ou décroissant, et de les filtrer par mot(s)-clé.
          Par défaut, les questions sont affichées dix par dix mais ceci est
          modfiable. Le menu <a href="#bottom">en bas de page</a> permet
          d'afficher les questions suivantes ou précédentes.
        </p>

        <table id="mainTable"></table>
        <p align="right" id="bottom">
          Les boutons ci-dessus permettent d'afficher les questions suivantes ou
          précédentes.<br />

          <a href="#top">Remonter en haut de la page.</a>
        </p>
      </main>
    </div>

    <script>
      let s = `<thead><tr>
              <th>Chapitre</th>
              <th>Sous-chap. (themeID)</th>
              <th>N°</th>
              <th>?</th>
              <th>Énoncé</th>
          </tr>
          </thead>
          <tbody>`;
      for (let i = 0; i < chapters.length; i++) {
        for (let j = 0; j < chapters[i].themes.length; j++) {
          let themeId = chapters[i].themes[j].id;
          let themeLabel = chapters[i].themes[j].label;
          for (let k = 0; k < themes[themeId].questions.length; k++) {
            let questNum = themes[themeId].questions[k];
            let ligne = `<tr>
              <td class="no-wrap">${i}. ${chapters[i].name}</td>
              <td>${themeLabel} (${themeId})</td>
              <td>${questNum}</td>
              <td>${questions[questNum].answer ? "VRAI" : "FAUX"}</td>
              <td>${questions[questNum].statement}</td>
            </tr>`;
            s += ligne;
          }
        }
      }
      s += "</tbody>";
      document.getElementById("mainTable").innerHTML = s;
    </script>

    <script>
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
    </script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.datatables.net/2.1.3/js/dataTables.min.js"></script>
    <script>
      let table = new DataTable("#mainTable", {
        pageLength: 10,
        drawCallback: function (settings) {
          if (MathJax.typeset) MathJax.typeset();
          else
            window.setTimeout(() => {
              if (MathJax.typeset) MathJax.typeset();
            }, 1000);
        },
      });
    </script>
    <script
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    ></script>
  </body>
</html>
