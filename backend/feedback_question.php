<?php

include_once 'database/db_config.php';

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Définir le header pour la réponse JSON
header("Content-Type: application/json");

// récupération de l'heure courante
//$dateTime = date("Y-m-d H:i:s");
$dateTime = round(microtime(true) * 1000);

// récupération de l'adresse IP du client (on cherche d'abord à savoir si il est derrière un proxy)
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $userIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $userIP = $_SERVER['HTTP_CLIENT_IP'];
} else {
    $userIP = $_SERVER['REMOTE_ADDR'];
}

$referer = $_SERVER['HTTP_REFERER'];
$bon_referer = (strpos($referer, 'dojomath.fr') !== false);

if ( !$bon_referer ){
    echo "lol gtfo.";
    exit;
}

// Récupérer les données brutes de la requête
$rawData = file_get_contents("php://input");

// Si on ne peut pas lire les données brutes
if ($rawData === false) {
    echo "Unable to read data.";
    exit;
}

// Décoder le JSON reçu
$data = json_decode($rawData, true);

// Vérifier les erreurs de décodage JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Invalid json.";
    exit;
}

// Vérifier la présence des clés 'questionNumber' et 'feedbackType'
if (!isset($data['userId']) || !isset($data['userName']) || !isset($data['questionNumber']) || !isset($data['feedbackType'])) {
    echo "Missing data.";
    exit;
}

// Décoder les données 'user' et 'quiz'
$questionNumber = $data['questionNumber'];
$feedbackType = $data['feedbackType'];
$userName = $data['userName'];
$userId = $data['userId'];

// Vérifier la validité des données décodées
if (!is_int($questionNumber) || !is_string($feedbackType)) {
    echo "Invalid data type.";
    exit;
}

// valider le username et userId : il faudrait que le nom figure dans les parties récentes par exemple.



// validation des valeurs
$isDataValid = $questionNumber>0 && $questionNumber < 2500 && ($feedbackType === "like" || $feedbackType === "reportProblem");
if(!$isDataValid){
    echo "Invalid data.";
    exit;
}

$columnToUpdate = ($feedbackType === 'like') ? 'Liked' : 'ProblemReported';




// Connexion à la base de données
try {
    $pdo = new PDO('sqlite:database/questionsFeedback.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}




try {
    // Début de la transaction
    $pdo->beginTransaction();

    // Requête SQL pour mettre à jour les colonnes appropriées
    $stmt = $pdo->prepare("
        UPDATE QuestionsFeedback 
        SET $columnToUpdate = $columnToUpdate + 1, 
            LastContributor = :userId, 
            LastUpdated = :timestamp 
        WHERE Id = :questionNumber
    ");

    // Liaison des paramètres
    $stmt->bindParam(':userId', $userId, PDO::PARAM_STR);
    $stmt->bindParam(':timestamp', time(), PDO::PARAM_INT);
    $stmt->bindParam(':questionNumber', $questionNumber, PDO::PARAM_INT);

    // Exécution de la requête
    $stmt->execute();

    // Validation de la transaction
    $pdo->commit();

    echo "Feedback updated successfully.";

} catch (Exception $e) {
    // Annuler la transaction en cas d'erreur
    $pdo->rollBack();
    die("Erreur lors de la mise à jour du feedback: " . $e->getMessage());
}

?>