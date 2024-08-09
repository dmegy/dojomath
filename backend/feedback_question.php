<?php


//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

//header("Content-Type: application/json");



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
    echo "lol gtfo!";
    exit;
}

$rawData = file_get_contents("php://input");

if ($rawData === false) {
    echo "Unable to read data.";
    exit;
}

$data = json_decode($rawData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Invalid json.";
    exit;
}

if (!isset($data['userId']) || !isset($data['userName']) || !isset($data['questionNumber']) || !isset($data['feedbackType'])) {
    echo "Missing data.";
    exit;
}

$questionNumber = $data['questionNumber'];
$feedbackType = $data['feedbackType'];
$userName = $data['userName'];
$userId = $data['userId'];

if (!is_int($questionNumber) || !is_string($feedbackType)|| !is_string($userName)|| !is_string($userId)) {
    echo "Invalid data type.";
    exit;
}

// valider le username et userId : il faudrait que le nom figure dans les parties récentes par exemple.



// validation des valeurs

$isQuestionNumberValid = $questionNumber>0 && $questionNumber < 3000 ;
$isFeedbackValid = $feedbackType === "like" || $feedbackType === "reportProblem" ;
$isUserIdValid =  strlen($userId) < 16;
$isUserNameValid =  strlen($userName) < 16;
$isDataValid =  $isQuestionNumberValid && $isFeedbackValid && $isUserIdValid && $isUserNameValid;
if(!$isDataValid){
    echo "Invalid data.";
    exit;
}



try {
    $pdo = new PDO('sqlite:database/db_questions_feedback.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}

$columnToUpdate = ($feedbackType === 'like') ? 'Liked' : 'ProblemReported';




try {
    $pdo->beginTransaction();

    // Requête SQL pour mettre à jour les colonnes appropriées
    $stmt = $pdo->prepare("
        UPDATE QuestionsFeedback 
        SET $columnToUpdate = $columnToUpdate + 1, 
            LastContributorId = :userId, 
            LastContributorName = :userName,
            LastModified = :fullDate,
            LastModifiedSec = :timestamp 
        WHERE Id = :questionNumber
    ");

    // Liaison des paramètres
    $stmt->bindParam(':userId', $userId, PDO::PARAM_STR);
    $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
    $stmt->bindParam(':timestamp', time(), PDO::PARAM_INT);
    $stmt->bindParam(':fullDate', date("Y-m-d H:i:s"), PDO::PARAM_STR);
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