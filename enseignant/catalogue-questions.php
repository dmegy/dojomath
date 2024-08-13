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
      content="DojoMath.fr : catalogue de toutes les questions, classées par numéro"
    />
    <meta name="author" content="Damien Mégy" />
    <title>DojoMath.fr : Catalogue complet des questions</title>


    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.min.css" rel="stylesheet">

    <link rel="stylesheet" href="styles-enseignants.css" />
    <script src="../js/questions.js"></script>
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 100'><text y='0.9em' font-size='90'>🏆</text></svg>"
    />
  </head>

  <body>
    <div class="body-container">
      <?php include "header-body.php"; ?>
      <main>
        <p>
          Cette page affiche toutes les questions de la base de données (en vrac, sans afficher leur appartenance à un chapitre ou thème particulier).
          Il est possible de les trier et de les filtrer par mot-clé.
        </p>

        <table id="mainTable"></table>
      </main>
    </div>

    <script>
      // création de la table (questions déjà chargées en synchrone)
      let s = `<thead><tr>
             <th>N°</th>
             <th style="width:2rem">?</th>
             <th style="text-align:left;">Énoncé</th>
         </tr>
         </thead>
         <tbody>`;
      for (let i = 0; i < questions.length; i++) {
        // _questions est un tableau
        let question = questions[i];
        let ligne = `
      <tr>
      	<td>${i}</td>
      	<td>${questions[i].answer ? "VRAI" : "FAUX"}</td>
      	<td>${questions[i].statement}</td>
      </tr>`;
        s += ligne;
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
      let table = new DataTable('#mainTable', {
        pageLength: 20,
        drawCallback: function (settings) {
          if(MathJax.typeset) MathJax.typeset();
          else window.setTimeout(() => {
            if(MathJax.typeset) MathJax.typeset();
          }, 1000);
        }
    });
    </script>
    <script
      id="MathJax-script"
      async
      src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    ></script>
  </body>
</html>
