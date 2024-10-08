<?php
session_start();
include "goto-index-if-not-connected.php";
?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🧑‍🏫 DojoMath Enseignants</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.css" rel="stylesheet">
    <link href="../css/bundle.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="body-container">
    <?php include "header-body.php"; ?>
    <main>
        <section>
<?php


$quizThemeId = $_GET['id'] ?? null;

if ($quizThemeId === null || trim($quizThemeId) === "") {
    echo "<p>⚠️ Aucun identifiant fourni</p><hr>"; 
    echo "<h3>Fonctionnement de cette page</h3>";
    echo "<p>Cette page permet aux enseignant de visualiser les résultats de leurs élèves. Il faut pour cela entrer l'identifiant du quiz dans le formulaire ⤵️ en bas de page ⤵️.</p>\n";
    }

else{
    try {
        $pdo = new PDO('sqlite:../../databases/db_main.sqlite3');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Erreur de connexion à la base de données: " . $e->getMessage() ;
    }


    try {
        $stmt = $pdo->prepare("
            SELECT DateTime, UserId, UserName, Grade, PointsEarned, UserCombo, UserPoints, UserStreak  
            FROM FinishedQuizzes 
            WHERE QuizThemeId = :quizThemeId
        ");

        // SI BESOIN DE PERFORMANCE : rajouter ORDER BY DateTime DESC LIMIT 100

        // Liaison des paramètres
        $stmt->bindParam(':quizThemeId', $quizThemeId, PDO::PARAM_STR);

        // Exécution de la requête
        $stmt->execute();

        // Récupérer les résultats
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);


        // Vérifier si des résultats ont été trouvés
        if (empty($results)) {
            echo "<p>⚠️ Aucun résultat trouvé pour l'identifiant '" . htmlspecialchars($quizThemeId)."'</p><hr>";
            echo $message_accueil;
        } else {
            // Afficher les résultats
            echo "<h4>Dernières parties terminées pour le theme d'identifiant «".$quizThemeId."»</h4>";
            echo "<p>En plus des notes obtenues lors du quiz, la page affiche également le nombre total de points du joueur (cumulés sur plusieurs parties), le 'Combo', c'est-à-dire le nombre de bonnes réponses consécutives actuelles, et le 'Streak' c'est-à-dire le nombre de jours consécutifs d'activité. </p>";
            echo "<table id='myTable'>";
            echo "<thead><tr><th>Date</th><th>User ID</th><th>Nom</th><th>Note</th><th>Points</th><th>Combo</th><th>Streak</th></tr></thead><tbody>";

            foreach ($results as $row) {
                $formattedDate = date('Y-m-d H:i:s', $row['DateTime']/1000);

                echo "<tr>";
                echo "<td>" . $formattedDate . "</td>";
                echo "<td>" . htmlspecialchars($row['UserId']) . "</td>";
                echo "<td>" . htmlspecialchars($row['UserName']) . "</td>";
                echo "<td>" . htmlspecialchars($row['Grade']) . "/20</td>";
                echo "<td>" . htmlspecialchars($row['UserPoints']) . "</td>";
                echo "<td>" . htmlspecialchars($row['UserCombo']) . "</td>";
                echo "<td>" . htmlspecialchars($row['UserStreak']) . "</td>";
                echo "</tr>";
            }
            echo "</tbody></table>";
        }

    } catch (Exception $e) {
        echo "Erreur lors de la récupération des données: " . $e->getMessage() ;
    }

}



?>
</section>
</main>
<footer>
<form method='get' action=''>
<label for='id'>Entrez l'identifiant du quiz :</label>
<input type='text' name='id' id='id' required>
<button type='submit'>Afficher les résultats</button>
</form>
</footer>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
<script>
    new DataTable('#myTable', {
    order: [[0, 'desc']],
    pageLength: 50,
});</script>
</body>
</html>
