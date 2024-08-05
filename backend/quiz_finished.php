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


// IP récupérée plus haut
$userId = $user['userId'];
$userName = $user['userName'];
$userAreaCode = $user['areaCode'];
$userStreak = $user['lastStreak'];

$pointsEarned = $quiz['points']; // attention confusion possible
$quizThemeId = $quiz['id'];
$grade = $quiz['finalGrade'];
$userPoints = $user['points'];

$userCombo = $user['combo'];

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



// Envoyer la réponse JSON
echo json_encode($response);

?>
