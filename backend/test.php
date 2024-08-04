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
// récupération du domaine du client
$host = gethostbyaddr($ip);

// récupération du navigateur et de l'OS du client
$navigateur = $_SERVER['HTTP_USER_AGENT'];
$referer = $_SERVER['HTTP_REFERER'];


// -  - - -

$user=json_decode($_POST["user"],true);
$historique=json_decode($_POST["historique"],true);



// - - - - - - - - - - - -

$bon_referer = (strpos($referer, 'dojomath.fr') !== false);


// rajouter &&!$triche
if ( $bon_referer ) {

  $userId = $user['userId'];
  $userName = $user['userName'];
  $areaCode=$user['areaCode'];

  $themeId = $quiz['id'];
  $quizFinalGrade = $quiz['finalGrade'];
  $userPoints = $user['points'];



  $ligne = $date_courante.";".$ip.";".$userId.";".$userName.";".$themeId.";".$quizFinalGrade.";".$userPoints."\n";
  
  $data = $ligne.file_get_contents('test_logs.txt');
  
  file_put_contents('test_logs.txt', $data_tres_court);
}
?>