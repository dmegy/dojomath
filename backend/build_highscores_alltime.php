<?php


include_once 'database/db_config.php';

try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL avec ROW_NUMBER() pour obtenir les 10 meilleurs scores avec des joueurs uniques
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
    $highscores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $medal = "";
    $dep = "";
    $userName = "";
    $text = "<table width='100%'><tbody>\n";

    // Affichage des résultats
    $i=1;
    foreach ($highscores as $row) {
        if($i===1) $medal="🥇";
        else if($i===2) $medal="🥈";
        else if($i===3) $medal="🥉";
        else $medal= "";

        if($row['UserAreaCode']==="AUTRE" || trim($row['UserAreaCode'])==="") $dep="";
        else $dep = "(".$row['UserAreaCode'].")";

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];
        //$userName = $row['UserName'];


        //echo $row['UserName'] . "<br>" ; 

        $text .= "<tr><td align='right' style='width:2ch'>".$medal."</td><td>".$userName."</td><td>".$dep."</td><td align='right'>".$row['UserPoints']." pts</td></tr>\n";
        $i++;
    }
        $text .= "</tbody></table>";
        //echo $text;
        file_put_contents("highscores_alltime.html.txt",$text);
        file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Alltime Highscores built\n",FILE_APPEND);


} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Alltime Highscores : " . $e->getMessage()."\n",FILE_APPEND);

}
?>