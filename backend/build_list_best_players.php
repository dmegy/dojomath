<?php


include_once 'database/db_config.php';

try {
    // Connexion à la base de données SQLite
    $pdo = new PDO(DB_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL avec ROW_NUMBER() pour obtenir les 10 meilleurs scores avec des joueurs uniques
    $sql = "
    SELECT 
        Date
        UserId,
        UserName,
        UserAreaCode, 
        UserPoints
    FROM 
        (
            SELECT 
                Date,
                UserId,
                UserName,
                UserAreaCode,  
                UserPoints,
                ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY Id DESC) AS rn
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
    $array = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $medal = "";
    $dep = "";
    $userName = "";
    $html = "<table width='100%'><tbody>\n";

    // Affichage des résultats
    $i=1;
    foreach ($array as $row) {
        if($i===1) $medal="🥇";
        else if($i===2) $medal="🥈";
        else if($i===3) $medal="🥉";
        else $medal= "";

        if($row['UserAreaCode']==="Autre" || trim($row['UserAreaCode'])==="Aucun" || trim($row['UserAreaCode'])==="") $dep="";
        else $dep = "(".$row['UserAreaCode'].")";

        if(trim($row['UserName']) === "") $userName = "(" . $row['UserId'] . ")";
        else $userName = $row['UserName'];
        //$userName = $row['UserName'];


        //echo $row['UserName'] . "<br>" ; 

        $html .= "<tr><td align='right' style='width:2ch'>".$medal."</td><td>".$userName."</td><td>".$dep."</td><td align='right'>".$row['UserPoints']." pts</td></tr>\n";
        $i++;
    }
        $html .= "</tbody></table>";
        //echo $text;
        file_put_contents("list_best_players.html",$html);
        file_put_contents("list_best_players.json",json_encode($array));
        file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : Alltime Highscores built\n",FILE_APPEND);


} catch (PDOException $e) {
    file_put_contents("build_highscores.log.txt", date("Y-m-d H:i:s") . " : ERROR building Alltime Highscores : " . $e->getMessage()."\n",FILE_APPEND);

}
?>