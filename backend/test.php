<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Définir le header pour la réponse JSON
header("Content-Type: application/json");

// récupération de l'heure courante
$date_courante = date("Y-m-d H:i:s");

// récupération de l'adresse IP du client (on cherche d'abord à savoir si il est derrière un proxy)
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
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


$userId = $user['userId'];
$userName = $user['userName'];
$areaCode=$user['areaCode'];

$themeId = $quiz['id'];
$quizFinalGrade = $quiz['finalGrade'];
$userPoints = $user['points'];



$ligne = $date_courante.";".$ip.";".$userId.";".$userName.";".$themeId.";".$quizFinalGrade.";".$userPoints."\n";

$data = $ligne.file_get_contents('data/test_logs.txt');

file_put_contents('data/test_logs.txt', $data);


// Traitement des données (par exemple, enregistrer dans la base de données)
$response = [
    'status' => 'success',
    'message' => 'Data received successfully'
];

// Envoyer la réponse JSON
echo json_encode($response);

?>
