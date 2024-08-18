<?php

include_once 'databases/db_config.php';

try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_MAIN_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL avec ROW_NUMBER() pour obtenir les 10 meilleurs scores avec des joueurs uniques
    $sql = "
    SELECT 
        Date,
        UserId,
        UserName,
        UserAreaCode, 
        UserPoints,
        UserCombo,
        UserStreak,
        QuizThemeId,
        PointsEarned,
        Grade
    FROM 
        FinishedQuizzes
    ORDER BY 
        Id DESC
    LIMIT 10;
    ";

    // Préparation et exécution de la requête
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Récupération des résultats
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $medal = "";
    $dep = "";
    $userName = "";
    $html = "<table width='100%'>\n";
    $html .= "<thead><tr style='font-weight:900;'><th></th><th align='left'>Joueur</th><th align='left'>Chapitre</th><th align='right'>Points</th></tr></thead>";
    $html .= "<tbody>\n";

    // Affichage des résultats
    $i=1;
    foreach ($array as $row) {

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];

        $html .= "<tr><td align='right' style='width:2ch'></td><td align='left'>".$userName."</td><td align='left'>".$row['QuizThemeId']."</td><td align='right'>+".$row['PointsEarned']."</td></tr>\n";
        $i++;
    }
        $html .= "</tbody></table>";

        file_put_contents("list_recent_games.json",json_encode($array));
        file_put_contents("list_recent_games.html",$html);
        file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Recent Games Highscores built\n",FILE_APPEND);


} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Recent Games Highscores : " . $e->getMessage()."\n",FILE_APPEND);

}
?>