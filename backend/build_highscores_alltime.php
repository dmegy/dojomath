<?php
try {
    // Connexion à la base de données SQLite
    $pdo = new PDO('database.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL avec ROW_NUMBER() pour obtenir les 20 meilleurs scores avec des joueurs uniques
    $sql = "
    SELECT 
        UserId,
        UserAreaCode, 
        UserPoints
    FROM 
        (
            SELECT 
                UserId,
                UserAreaCode,  
                UserPoints,
                ROW_NUMBER() OVER (PARTITION BY UserId ORDER BY Date DESC) AS rn
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

    // Affichage des résultats
    foreach ($highscores as $row) {
        echo "UserId: " . $row['UserId'] . " - UserPoints: " . $row['UserPoints'] . "<br/>";
    }

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>