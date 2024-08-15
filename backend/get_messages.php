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

// récupération de l'adresse IP du client (on cherche d'abord à savoir si il est derrière un proxy)
if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $senderIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
} elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
    $senderIp = $_SERVER['HTTP_CLIENT_IP'];
} else {
    $senderIp = $_SERVER['REMOTE_ADDR'];
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


$userId = $user['userId'];


// validation ?

if (!empty($errors)) {
    $response = [
        'status' => 'error',
        'message' => "Error : invalid user "
    ];
    echo json_encode($response);
    exit;
}


try {
    // Crée une nouvelle instance de PDO avec les informations de connexion
    $pdo = new PDO('sqlite:database/db_messages.db');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prépare une requête d'insertion. On ne prend que les 10 derniers messages.
    $stmt = $pdo->prepare("SELECT * FROM messages WHERE recipient_id=:user_id ORDER BY id DESC LIMIT 10");
    
    // Liaison des paramètres
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_STR);
    
    // Exécute la requête
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    /*if (empty($results)) {
        $response = [
            'status' => 'success',
            'message' => 'No messages'
        ];
        echo json_encode($response);
        exit;
    }*/

    $messages = [];
    foreach ($results as $row) {

        array_push($messages,[
            'date' => $row['date'],
            'senderId' => $row['sender_id'],
            'senderName' => $row['sender_name'],
            'content' => $row['content'],
        ]);
    }

    $response = [
        'status' => 'success',
        'messages' => $messages
    ];
    
} catch (PDOException $e) {
    $response = [
        'status' => 'Error',
        'message' => $e->getMessage()
    ];
}


// Envoyer la réponse JSON
echo json_encode($response);




?>