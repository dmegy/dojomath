<?php
include 'cors_headers.php';

include_once 'databases/db_config.php';

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);





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
if (!isset($data['sender']) ||  !isset($data['recipientId'])|| !isset($data['content'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing data'
    ]);
    exit;
}

// Décoder les données 'user'
$sender = json_decode($data['sender'], true);

// Vérifier la validité des données décodées
if (json_last_error() !== JSON_ERROR_NONE || !$sender) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid sender data'
    ]);
    exit;
}






// VALIDATION ! ! ! !

// si erreur ou triche, on exit.


// $senderIp définie plus haut
$senderId = $sender['userId'];
$senderName = $sender['userName'];
$senderPoints = $sender['points'];
$content = $data['content'];
$recipientId = $data['recipientId'];


if(trim($senderName)===""){
    $senderName = $senderId;
}



// - - - validation
$errors = [];

if($senderPoints < 100){
    $errors[] = "Invalid sender points : " . $senderPoints;
}

if (!isset($senderId) || !is_string($senderId) || strlen($senderId) > 16) {
    $errors[] = "Invalid senderId : " . $senderId;
}
if (!is_string($senderName) || strlen($senderName) > 60) {
    // normalement 10 caractères mais on autorise 5 emojis.
    // or un émoji est potentiellement composé de deux caractères unicode:
    // exemple : \mathbb T qui est  \ud835\udd4b
    $errors[] = "Invalid senderName : " . $senderName ;
}
if (!isset($recipientId) || !is_string($recipientId) || strlen($recipientId) > 16) {
    $errors[] = "Invalid recipientId : " . $recipientId;
}


// plus de validation !
// i lfaudrait vérifier qu'il y a effectivement un quiz fini à ce nom dans la database, pour l'expéditeur et le destinataire ?

if (!is_string($content) || strlen($content) > 10) {
    // un émoji, donc deux caractères unicode, donc 10
    $errors[] = "Invalid content : " . $content ;
}


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
    $pdo = new PDO(DB_MESSAGES_DSN);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prépare une requête d'insertion
    $stmt = $pdo->prepare("INSERT INTO messages (date, sender_ip, sender_id, sender_name, recipient_id, content) VALUES (:date, :sender_ip, :sender_id, :sender_name, :recipient_id, :content)");
    
    // Liaison des paramètres
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
    $stmt->bindParam(':sender_ip', $senderIp, PDO::PARAM_STR);
    $stmt->bindParam(':sender_id', $senderId, PDO::PARAM_STR);
    $stmt->bindParam(':sender_name', $senderName, PDO::PARAM_STR);
    $stmt->bindParam(':recipient_id', $recipientId, PDO::PARAM_STR);
    $stmt->bindParam(':content', $content, PDO::PARAM_STR);
    
    // Exécute la requête
    $stmt->execute();

    $response = [
        'status' => 'success',
        'message' => 'Message envoyé!'
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
