<?php

include_once 'databases/db_config.php';

try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_MAIN_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql2 = "SELECT
        Id,
        Date,
        UserId,
        UserName,
        UserAreaCode, 
        UserPoints,
        UserCombo,
        UserStreak,
        PointsEarned
    FROM FinishedQuizzes
    WHERE UserId IN (
        SELECT DISTINCT UserId
        FROM FinishedQuizzes
        ORDER BY Id DESC
        LIMIT 10
    )
    GROUP BY UserId
    ORDER BY Id DESC
    LIMIT 0;
    ";

    $sql="
        WITH RankedEntries AS (
            SELECT
                    Id,
                    Date,
                    UserId,
                    UserName,
                    UserAreaCode, 
                    UserPoints,
                    UserCombo,
                    UserStreak,
                    PointsEarned,
                    ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY Id DESC) as rn
                FROM FinishedQuizzes
                WHERE UserId IN (
                    SELECT DISTINCT UserId
                    FROM FinishedQuizzes
                    ORDER BY Id DESC
                    LIMIT 10
                )
        )
        SELECT
            Date,
            UserId,
            UserName,
            UserAreaCode, 
            UserPoints,
            UserCombo,
            UserStreak,
            PointsEarned
        FROM RankedEntries
        WHERE rn = 1
        ORDER BY Date DESC
        ;";


    // Préparation et exécution de la requête
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Récupération des résultats
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $userName = "";

    $html = "<table width='100%'>\n";
    $html .= "<thead><tr style='font-weight:900;'><th></th><th align='left'>Joueur</th><th align='right'>Streak</th><th align='right'>Combo</th><th align='right'>Points</th></tr></thead>";
    $html .= "<tbody>\n";

    // Affichage des résultats
    $i=1;
    foreach ($array as $row) {

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];

        $html .= "<tr><td align='right' style='width:2ch'><div class='btn  btn-talk' onclick='editMessage(\"".$row['UserId']."\",\"".$userName."\")'>💬</div></td><td align='left'>".$userName."</td><td align='right'>".$row['UserStreak']."j</td><td align='right'>".$row['UserCombo']."</td><td align='right'>+".$row['PointsEarned']."</td></tr>\n";
        $i++;
    }

    $html .= "</tbody></table>";

    file_put_contents("list_recent_players.html",$html);
    file_put_contents("list_recent_players.json",json_encode($array));

    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Recent Players list built\n",FILE_APPEND);


} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Recent Players  : " . $e->getMessage()."\n",FILE_APPEND);

}
?>