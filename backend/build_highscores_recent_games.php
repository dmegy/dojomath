<?php


include_once 'database/db_config.php';

try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL avec ROW_NUMBER() pour obtenir les 10 meilleurs scores avec des joueurs uniques
    $sql = "
    SELECT 
        DateTime,
        UserId,
        UserName,
        UserAreaCode, 
        UserPoints,
        UserCombo,
        UserStreak,
        PointsEarned
    FROM 
        FinishedQuizzes
    ORDER BY 
        DateTime DESC
    LIMIT 10;
    ";

    // Préparation et exécution de la requête
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Récupération des résultats
    $highscores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $medal = "";
    $dep = "";
    $userName = "";
    $text = "<table width='100%'>\n";
    $text .= "<thead><tr style='font-weight:900;'><th></th><th align='left'>Joueur</th><th align='right'>Streak</th><th align='right'>Combo</th><th align='right'>Points</th></tr></thead>";
    $text .= "<tbody>\n";

    // Affichage des résultats
    $i=1;
    foreach ($highscores as $row) {

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];

        $text .= "<tr><td align='right' style='width:2ch'></td><td align='left'>".$userName."</td><td align='right'>".$row['UserStreak']."j</td><td align='right'>".$row['UserCombo']."</td><td align='right'>+".$row['PointsEarned']."</td></tr>\n";
        $i++;
    }
        $text .= "</tbody></table>";
        //echo $text;
        file_put_contents("highscores_recent_games.html.txt",$text);
        file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Recent Games Highscores built\n",FILE_APPEND);


} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Recent Games Highscores : " . $e->getMessage()."\n",FILE_APPEND);

}
?>