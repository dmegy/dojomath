<?php

include 'database.php';

// Vérifier si l'email existe déjà dans la base de données
$sql = "SELECT * FROM instructors WHERE email = :email";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->fetch(PDO::FETCH_ASSOC)) {
    $is_available = false;
} else{
    $is_available = false;
}

header("Content-Type: application/json");

echo json_encode(["available" => $is_available]);


