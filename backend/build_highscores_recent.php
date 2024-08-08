<?php


include_once 'database/db_config.php';


try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL pour obtenir les 20 derniers utilisateurs actifs classés par score
    $sql = "
        SELECT 
        UserId, 
        UserName,
        UserAreaCode,
        UserPoints
    FROM 
        (
            SELECT 
                UserId,
                UserName,
                UserAreaCode,
                UserPoints,
                ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY DateTime DESC) AS rn
            FROM 
                FinishedQuizzes
            ORDER BY DateTime DESC
            LIMIT 300 -- Limite arbitraire pour performance, à ajuster selon besoin
        ) AS LatestScores
    WHERE 
        rn = 1
    ORDER BY 
        UserPoints DESC
    LIMIT 10;
    ";

    // Préparation et exécution de la requête
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Récupération des résultats
    $latestActivePlayers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $dep = "";
    $userName = "";
    $text = "<table width='100%'><tbody>\n";

    // Affichage des résultats
    foreach ($latestActivePlayers as $row) {
        if($row['UserAreaCode']==="Autre" || trim($row['UserAreaCode'])==="Aucun" || trim($row['UserAreaCode'])==="") $dep="";
        else $dep = "(".$row['UserAreaCode'].")";

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];

        $text .= "<tr><td style='width:2ch'></td><td>".$userName."</td><td>".$dep."</td><td align='right'>".$row['UserPoints']." pts</td></tr>\n";

    }
    $text .= "</tbody></table>";
    //echo $text;
    file_put_contents("highscores_recent.html.txt",$text);
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Recent Highscores built\n",FILE_APPEND);

} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Recent Highscores : " . $e->getMessage()."\n",FILE_APPEND);

}
?>
