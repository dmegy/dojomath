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

// Récupérer les données brutes de la requête
$rawData = file_get_contents("php://input");

// Si on ne peut pas lire les données brutes
if ($rawData === false) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Unable to read input data'
    ]);
    exit;
}

// Décoder le JSON reçu
$data = json_decode($rawData, true);

// Vérifier les erreurs de décodage JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid JSON'
    ]);
    exit;
}

// Vérifier la présence des clés 'user' et 'quiz'
if (!isset($data['user']) || !isset($data['quiz'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing user or quiz data'
    ]);
    exit;
}

// Décoder les données 'user' et 'quiz'
$user = json_decode($data['user'], true);
$quiz = json_decode($data['quiz'], true);

// Vérifier la validité des données décodées
if (json_last_error() !== JSON_ERROR_NONE || !$user || !$quiz) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid user or quiz data'
    ]);
    exit;
}


$referer = $_SERVER['HTTP_REFERER'];
$bon_referer = (strpos($referer, 'dojomath.fr') !== false);

if ( !$bon_referer )
  exit;




// VALIDATION ! ! ! !

// si erreur ou triche, on exit.


// IP récupérée plus haut
$userId = $user['userId'];
$userName = $user['userName'];
$userAreaCode = $user['areaCode'];
$userPoints = $user['points'];
$userStreak = $user['lastStreak'];

$userCombo = $user['combo'];

$pointsEarned = $quiz['points']; // attention confusion possible, ce sont les points gagnés à la partie
$quizThemeId = $quiz['id'];
$grade = $quiz['finalGrade'];




// - - - validation
$errors = [];

    // Validation des données selon les contraintes spécifiées
if (!isset($userId) || !is_string($userId) || strlen($userId) > 16) {
    $errors[] = "Invalid userId : " . $userId;
}
if (!is_string($userName) || strlen($userName) > 16) {
    $errors[] = "Invalid userName : " . $userName ;
}
// validation numéro de département
$validAreaCodes = ["AUCUN","","Autre","AEFE","986","987","988"];
// Boucle de 1 à 95 pour générer les codes d'aire au format "01", "02", ..., "95"
for ($i = 1; $i <= 95; $i++) {
    $validAreaCodes[] = str_pad((string)$i, 2, '0', STR_PAD_LEFT);
}
for ($i = 971; $i <= 978; $i++) {
    $validAreaCodes[] = (string)$i;
}
if (!in_array($userAreaCode, $validAreaCodes)) {
    $errors[] = "Invalid UserAreaCode : " . $userAreaCode ;
}

if (!isset($userPoints) || !filter_var($userPoints, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1, "max_range" => 900000]])) {
    $errors[] = "Invalid userPoints : " . $userPoints;
}
// plus de validation !

if (!isset($userStreak) || !filter_var($userStreak, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 10000]])) {
    $errors[] = "Invalid UserStreak : " . $userStreak;
}
// vérifier plutot si le streak est bien inférieur à date.now - user.firstconnection ...

if (!isset($quizThemeId) || !is_string($quizThemeId) || strlen($quizThemeId) > 32) {
    $errors[] = "Invalid QuizThemeId : " . $quizThemeId;
}
// là on pourrait tester que ça appartient à une liste précise.

if (!isset($pointsEarned) || !filter_var($pointsEarned, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 400]])) {
    $errors[] = "Invalid pointsEarned : " . $pointsEarned;
 }
 
if (!filter_var($grade, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 20]])) {
     $errors[] = "Invalid Grade : " . $grade;
}

/*
if (!filter_var($userCombo, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 1000000]])) {
    $errors[] = "Invalid UserCombo ! " . $userCombo; // rate pour zéro ??? pourquoi ??
}*/

// il faudrait des validations supplémentaires ici... note qui correspond aux résultats etc. 
// Vérifier sur les données de quiz.


// Execution validation :

if (!empty($errors)) {
    $response = [
        'status' => 'Error',
        'message' => "Errors : " . implode(', ', $errors)
    ];
    echo json_encode($response);
    exit;
}

// - - - insertion dans base de données


try {
    // Crée une nouvelle instance de PDO avec les informations de connexion
    $pdo = new PDO(DB_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prépare une requête d'insertion
    $stmt = $pdo->prepare("INSERT INTO FinishedQuizzes (DateTime, UserIP, UserId, UserName, UserAreaCode, QuizThemeId, Grade, PointsEarned, UserPoints, UserStreak, UserCombo) VALUES (:dateTime, :userIP, :userId, :userName, :userAreaCode, :quizThemeId, :grade, :pointsEarned, :userPoints, :userStreak, :userCombo)");
    
    // Liaison des paramètres
    $stmt->bindParam(':dateTime', $dateTime, PDO::PARAM_INT);
    $stmt->bindParam(':userIP', $userIP, PDO::PARAM_STR);
    $stmt->bindParam(':userId', $userId, PDO::PARAM_STR);
    $stmt->bindParam(':userName', $userName, PDO::PARAM_STR);
    $stmt->bindParam(':userAreaCode', $userAreaCode, PDO::PARAM_STR); 
    $stmt->bindParam(':quizThemeId', $quizThemeId, PDO::PARAM_STR);
    $stmt->bindParam(':grade', $grade, PDO::PARAM_INT);
    $stmt->bindParam(':pointsEarned', $pointsEarned, PDO::PARAM_INT);
    $stmt->bindParam(':userPoints', $userPoints, PDO::PARAM_INT);
    $stmt->bindParam(':userStreak', $userStreak, PDO::PARAM_INT);
    $stmt->bindParam(':userCombo', $userCombo, PDO::PARAM_INT);
    
    // Exécute la requête
    $stmt->execute();

    $response = [
        'status' => 'success',
        'message' => 'Data received and saved successfully'
    ];
    
} catch (PDOException $e) {
    $response = [
        'status' => 'Error',
        'message' => $e->getMessage()
    ];
}

include('build_highscores_alltime.php');

include('build_highscores_recent.php');

include('build_highscores_recent_games.php');



// Envoyer la réponse JSON
echo json_encode($response);

?>
