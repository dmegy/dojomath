<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Définir le header pour la réponse JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// récupération de l'heure courante
$date = date("Y-m-d H:i:s");


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

// Vérifier la présence des clés 
if (!isset($data['user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing user'
    ]);
    exit;
}

// Décoder les données 'user'
$user = json_decode($data['user'], true);

// Vérifier la validité des données décodées
if (json_last_error() !== JSON_ERROR_NONE || !$user) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid user data'
    ]);
    exit;
}





// validation ?


try {
    // Crée une nouvelle instance de PDO avec les informations de connexion
    $pdo = new PDO('sqlite:database/database.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->prepare("SELECT * FROM Users WHERE userId = :user_id ORDER BY id DESC LIMIT 1");
    $stmt->bindParam(':user_id', $user['userId'], PDO::PARAM_STR);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (empty($result)) {
        $response = [
            'status' => 'error',
            'message' => 'No such user'
        ];
        echo json_encode($response);
        exit;
    }

    $response = [
        'status' => 'success',
        'giftAmount' => $result['giftAmount'],
        'giftMessage' => $result['giftMessage']
    ];

    $stmt = $pdo->prepare("
        UPDATE Users SET giftAmount = 0, giftMessage = '' WHERE userId = :user_id");
    $stmt->bindParam(':user_id', $user['userId'], PDO::PARAM_STR);
    $stmt->execute();

    
} catch (PDOException $e) {
    $response = [
        'status' => 'Error',
        'message' => $e->getMessage()
    ];
}


echo json_encode($response);

?>