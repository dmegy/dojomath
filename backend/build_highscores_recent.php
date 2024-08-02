<?php
try {
    // Connexion à la base de données SQLite
    $pdo = new PDO('database.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête SQL pour obtenir les 20 derniers utilisateurs actifs classés par score
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
            ORDER BY Date DESC
            LIMIT 100 -- Limite arbitraire pour performance, à ajuster selon besoin
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

    // Affichage des résultats
    foreach ($latestActivePlayers as $row) {
        echo "UserId: " . $row['UserId'] . " - UserPoints: " . $row['UserPoints'] . "<br/>";
    }

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
