<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// récupération de l'heure courante
$date_courante = date("Y-m-d H:i:s");

// récupération de l'adresse IP du client (on cherche d'abord à savoir si il est derrière un proxy)
if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
}
elseif(isset($_SERVER['HTTP_CLIENT_IP'])) {
  $ip  = $_SERVER['HTTP_CLIENT_IP'];
}
else {
  $ip = $_SERVER['REMOTE_ADDR'];
}



// -  - - -

$user=json_decode($_POST["user"],true);
$quiz=json_decode($_POST["quiz"],true);



// - - - - - - - - - - - -


$referer = $_SERVER['HTTP_REFERER'];
$bon_referer = (strpos($referer, 'dojomath.fr') !== false);

if ( $bon_referer ) {

  $userId = $user['userId'];
  $userName = $user['userName'];
  $areaCode=$user['areaCode'];

  $themeId = $quiz['id'];
  $quizFinalGrade = $quiz['finalGrade'];
  $userPoints = $user['points'];



  $ligne = $date_courante.";".$ip.";".$userId.";".$userName.";".$themeId.";".$quizFinalGrade.";".$userPoints."\n";
  
  $data = $ligne.file_get_contents('data/test_logs.txt');
  
  file_put_contents('data/test_logs.txt', $data);
}
?>