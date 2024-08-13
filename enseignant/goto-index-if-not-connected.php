<?php

if (isset($_SESSION["user_id"])) {
    include 'database.php';
    $sql = "SELECT * FROM instructors WHERE id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $_SESSION["user_id"], PDO::PARAM_INT);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
}

if (!isset($user)){
  session_destroy();
  header("Location: index.php");
  exit;
}