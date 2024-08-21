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
    <style>
      summary{margin:.2rem;font-size:1.2rem}
    </style>
  </head>

  <body>
    <div class="body-container">
      <?php include "header-body.php"; ?>
      <main  id="main" style="width:100%;display:flex;">
        <div id="themes" style="width:50%"></div>
        <div id="questions" style="width:50%">
          <h3  id="themeId">Sélectionner un thème</h3>
          <details><summary style="cursor:pointer">Présentation du thème</summary>
            <div id="themeDescription"></div>
          </details>
          <table id="questionsTable"></table>
        </div>
        
      </main>
    </div>

    <script>
      let s="<h3>Chapitres et thèmes</h3>";
      for (let i = 0; i < chapters.length; i++) {
        s+=`<details open><summary style="cursor:pointer">${chapters[i].name}</summary>`;
        for (let j = 0; j < chapters[i].themes.length; j++) {
          let themeId = chapters[i].themes[j].id;
          let themeLabel = chapters[i].themes[j].label;
          s+=`<a href="javascript:showThemeQuestions('${themeId}');">${themes[themeId].title} (id : '${themeId}')</a><br>`;
        }
        s+="</details>";
      }
      
      document.getElementById("themes").innerHTML = s;

      function showThemeQuestions(id){
        document.getElementById("themeId").innerHTML = id;
        document.getElementById("themeDescription").innerHTML = themes[id].info;
        let s=``;
        s += `<thead><tr>
              <th>N°</th>
              <th>?</th>
              <th>Énoncé</th>
          </tr>
          </thead>
          <tbody>`;
      

        for (let k = 0; k < themes[id].questions.length; k++) {
          let questNum = themes[id].questions[k];
          let ligne = `<tr>
            <td>${questNum}</td>
            <td>${questions[questNum].answer ? "VRAI" : "FAUX"}</td>
            <td>${questions[questNum].statement}</td>
          </tr>`;
          s += ligne;
        }
        
      
      s += "</tbody>";
      document.getElementById("questionsTable").innerHTML = s;
      MathJax.typeset();

      }
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
