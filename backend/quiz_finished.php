<?php

include_once 'database/db_config.php';

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Définir le header pour la réponse JSON
header("Content-Type: application/json");

// récupération de l'heure courante
$date = date("Y-m-d H:i:s");
// bientôt deprecated : 
$dateTime = round(microtime(true) * 1000);// attention millisecondes !

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
$userStreak = $user['lastStreak']; //attention

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
if (!is_string($userName) || strlen($userName) > 60) {
    // normalement 10 caractères mais on autorise 5 emojis.
    // or un émoji est potentiellement composé de deux caractères unicode:
    // exemple : \mathbb T qui est  \ud835\udd4b
    $errors[] = "Invalid userName : " . $userName ;
}
// validation numéro de département
$validAreaCodes = ["Aucun","","Autre","AEFE","986","987","988"];
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
    $stmt = $pdo->prepare("INSERT INTO FinishedQuizzes (DateTime, UserIP, UserId, UserName, UserAreaCode, QuizThemeId, Grade, PointsEarned, UserPoints, UserStreak, UserCombo, Date) VALUES (:dateTime, :userIP, :userId, :userName, :userAreaCode, :quizThemeId, :grade, :pointsEarned, :userPoints, :userStreak, :userCombo, :date)");
    
    // Liaison des paramètres
    $stmt->bindParam(':date', $date, PDO::PARAM_STR);
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




    // update or create user
    // - - - - -

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM Users WHERE userId = :userId");
    $stmt->bindParam(':userId', $user['userId'], PDO::PARAM_STR);
    $stmt->execute();
    $userExists = $stmt->fetchColumn() > 0;

    if ($userExists) {
        // Mettre à jour les données existantes de l'utilisateur
        $stmt = $pdo->prepare("
            UPDATE Users 
            SET 
            userName = :userName,
            areaCode = :areaCode,
            points = :points,
            combo = :combo,
            longestCombo = :longestCombo,
            lastActiveTime = :lastActiveTime,
            lastStreak = :lastStreak,
            longestStreak = :longestStreak,
            nbQuestionsViewed = :nbQuestionsViewed,
            nbQuestionsFailed = :nbQuestionsFailed,
            nbQuestionsSkipped  = :nbQuestionsSkipped,
            nbQuestionsSuccessful = :nbQuestionsSuccessful,
            nbQuizStarted = :nbQuizStarted,
            nbQuizAborted = :nbQuizAborted,
            nbQuizFinished = :nbQuizFinished,
            nbQuizPerfect = :nbQuizPerfect,
            modificationDate = :modificationDate
            WHERE userId = :userId
        ");
        $stmt->bindParam(':userId', $user['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':userName', $user['userName'], PDO::PARAM_STR);
        $stmt->bindParam(':areaCode', $user['areaCode'], PDO::PARAM_STR);
        $stmt->bindParam(':points', $user['points'], PDO::PARAM_INT);
        $stmt->bindParam(':combo', $user['combo'], PDO::PARAM_INT);
        $stmt->bindParam(':longestCombo', $user['longestCombo'], PDO::PARAM_INT);
        $stmt->bindParam(':lastActiveTime', $user['lastActiveTime'], PDO::PARAM_INT);
        $stmt->bindParam(':lastStreak', $user['lastStreak'], PDO::PARAM_INT);
        $stmt->bindParam(':longestStreak', $user['longestStreak'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsViewed', $user['nbQuestionsViewed'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsFailed', $user['nbQuestionsFailed'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsSkipped', $user['nbQuestionsSkipped'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsSuccessful', $user['nbQuestionsSuccessful'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizStarted', $user['nbQuizStarted'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizAborted', $user['nbQuizAborted'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizFinished', $user['nbQuizFinished'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizPerfect', $user['nbQuizPerfect'], PDO::PARAM_INT);
        $stmt->bindParam(':modificationDate', date("Y-m-d H:i:s"), PDO::PARAM_STR);

        $stmt->execute();

    } else {
        // Insérer un nouvel utilisateur, et récompenser le referrer en lui ajoutant un cadeau et en incrémentant le compteur.
        $stmt = $pdo->prepare("
            INSERT INTO Users (
                userId,
                userName,
                referrerId,
                areaCode,
                points,
                combo,
                longestCombo,
                firstConnectionTime,
                lastActiveTime,
                lastStreak,
                longestStreak,
                nbQuestionsViewed,
                nbQuestionsFailed,
                nbQuestionsSkipped,
                nbQuestionsSuccessful,
                nbQuizStarted,
                nbQuizAborted,
                nbQuizFinished,
                nbQuizPerfect,
                creationDate,
                modificationDate)
            VALUES (
                :userId,
                :userName,
                :referrerId,
                :areaCode,
                :points,
                :combo,
                :longestCombo,
                :firstConnectionTime,
                :lastActiveTime,
                :lastStreak,
                :longestStreak,
                :nbQuestionsViewed,
                :nbQuestionsFailed,
                :nbQuestionsSkipped,
                :nbQuestionsSuccessful,
                :nbQuizStarted,
                :nbQuizAborted,
                :nbQuizFinished,
                :nbQuizPerfect,
                :creationDate,
                :modificationDate)
        ");
        $stmt->bindParam(':userId', $user['userId'], PDO::PARAM_STR);
        $stmt->bindParam(':userName', $user['userName'], PDO::PARAM_STR);
        $stmt->bindParam(':referrerId', $user['referrerId'], PDO::PARAM_STR);
        $stmt->bindParam(':areaCode', $user['areaCode'], PDO::PARAM_STR);
        $stmt->bindParam(':points', $user['points'], PDO::PARAM_INT);
        $stmt->bindParam(':combo', $user['combo'], PDO::PARAM_INT);
        $stmt->bindParam(':longestCombo', $user['longestCombo'], PDO::PARAM_INT);
        $stmt->bindParam(':firstConnectionTime', $user['firstConnectionTime'], PDO::PARAM_INT);
        $stmt->bindParam(':lastActiveTime', $user['lastActiveTime'], PDO::PARAM_INT);
        $stmt->bindParam(':lastStreak', $user['lastStreak'], PDO::PARAM_INT);
        $stmt->bindParam(':longestStreak', $user['longestStreak'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsViewed', $user['nbQuestionsViewed'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsFailed', $user['nbQuestionsFailed'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsSkipped', $user['nbQuestionsSkipped'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuestionsSuccessful', $user['nbQuestionsSuccessful'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizStarted', $user['nbQuizStarted'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizAborted', $user['nbQuizAborted'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizFinished', $user['nbQuizFinished'], PDO::PARAM_INT);
        $stmt->bindParam(':nbQuizPerfect', $user['nbQuizPerfect'], PDO::PARAM_INT);
        $stmt->bindParam(':creationDate', date("Y-m-d H:i:s"), PDO::PARAM_STR);
        $stmt->bindParam(':modificationDate', date("Y-m-d H:i:s"), PDO::PARAM_STR);

        $stmt->execute();

        // - - - - - - - - - - - - - - - - - -
        // récompense du referrer s'il existe

        

        if(!empty($user['referrerId'])){
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM Users WHERE userId = :userId");
            $stmt->bindParam(':userId', $user['referrerId'], PDO::PARAM_STR);
            $stmt->execute();
            $referrerExists = $stmt->fetchColumn() > 0;

            $giftMessage = "Filleul(s) activé(s) !";

            if ($referrerExists) {
                $stmt = $pdo->prepare("
                    UPDATE Users 
                    SET 
                    nbActivatedReferees = nbActivatedReferees + 1,
                    giftAmount = giftAmount+50,
                    giftMessage = :giftMessage,
                    modificationDate = :modificationDate
                    WHERE userId = :userId
                ");
                $stmt->bindParam(':userId', $user['referrerId'], PDO::PARAM_STR);
                $stmt->bindParam(':giftMessage', $giftMessage, PDO::PARAM_STR);
                $stmt->bindParam(':modificationDate', date("Y-m-d H:i:s"), PDO::PARAM_STR);

                $stmt->execute();
            }
        }

        // - - - - - - - - - - - - - - -
        // - - - -récupération des cadeaux
    }




    // - - - -  response ?

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

include('build_list_best_players.php');

include('build_list_recent_players.php');

include('build_list_recent_games.php');



// Envoyer la réponse JSON
echo json_encode($response);

?>
