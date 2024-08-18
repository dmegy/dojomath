<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Statistiques sur les questions</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.dataTables.css" rel="stylesheet">
  </head>
  <body>
<?php
define('DB_MESSAGES_DSN', 'sqlite:db_messages.db');

try {
    // Crée une nouvelle instance de PDO avec les informations de connexion
    $pdo = new PDO(DB_MESSAGES_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM messages");
    
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if($questions===[]){
        echo "</body></html>";
        exit;
    }
    
    // Affiche les résultats sous forme de table HTML
    echo "<table id='myTable'>";
    echo "<thead>";
    echo "<tr>";
    foreach (array_keys($questions[0]) as $column) {
        echo "<th>" . htmlspecialchars($column) . "</th>";
    }
    echo "</tr>";
    echo "</thead>";
    echo "<tbody>";
    
    foreach ($questions as $question) {
        echo "<tr>";
        foreach ($question as $value) {
            echo "<td>" . htmlspecialchars($value) . "</td>";
        }
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
<script>
    new DataTable('#myTable', {
    order: [[0, 'desc']],
});</script>
</body>
</html>
