<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$gotoSignup=" Retourner à la <a href='signup.html'>page d'inscription</a>.";



if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $password_confirmation = $_POST['password_confirmation'];

    if (empty($name)) {
        echo "Le nom est requis.";
        echo $gotoSignup;
        exit();
    }

    if ( ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email invalide.";
        echo $gotoSignup;
        exit();
    }else {
        // Extraction du domaine de l'email
        list(, $domain) = explode('@', $email, 2);

        // Vérification si le domaine est dans la liste des domaines acceptés
        $valid_domains = [
            'univ-lorraine.fr', 
            'ac-clermont.fr',
            'ac-grenoble.fr',
            'ac-lyon.fr',
            'ac-besancon.fr',
            'ac-dijon.fr',
            'ac-rennes.fr',
            'ac-orleans-tours.fr',
            'ac-corse.fr',
            'ac-nancy-metz.fr',
            'ac-reims.fr',
            'ac-strasbourg.fr',
            'ac-guadeloupe.fr',
            'ac-guyane.fr',
            'ac-amiens.fr',
            'ac-lille.fr',
            'ac-creteil.fr',
            'ac-paris.fr', 
            'ac-versailles.fr',
            'ac-martinique.fr',
            'ac-normandie.fr',
            'ac-bordeaux.fr',
            'ac-limoges.fr',
            'ac-poitiers.fr',
            'ac-montpellier.fr',
            'ac-toulouse.fr',
            'ac-nantes.fr',
            'ac-aix-marseille.fr',
            'ac-nice.fr',
            'ac-reunion.fr',
            'ac-mayotte.fr'
        ];
        if (!in_array($domain, $valid_domains)) {
            echo "Le mail doit être un email professionnel d'une académie, ou de l'université de Lorraine.";
            echo $gotoSignup;
            exit();
        }
    }

    if (strlen($password) < 8) {
        echo "Le mot de passe doit faire au moins 8 caractères.";
        echo $gotoSignup;
        exit();
    }

    //if ( ! preg_match("/[a-z]/i", $_POST["password"])) {
    //    die("Password must contain at least one letter");
    //}

    //if ( ! preg_match("/[0-9]/", $_POST["password"])) {
    //    die("Password must contain at least one number");
    //}

    if ($password !== $password_confirmation) {
        echo "Erreur de confirmation du mot de passe.";
        echo $gotoSignup;
        exit();
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);


    include 'database.php';


    // Vérifier si l'email existe déjà dans la base de données
    $sql = "SELECT * FROM instructors WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "Un compte avec cet email existe déjà.";
        echo $gotoSignup;
        exit;
    }

    // Hashage du mot de passe
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Obtenir l'adresse IP de l'utilisateur
    $first_ip_address = $_SERVER['REMOTE_ADDR'];

    // Insertion des données dans la base de données
    $sql = "INSERT INTO instructors (name, email, password_hash, creation_time, last_active_time, first_ip_address) 
            VALUES (:name, :email, :password_hash, :creation_time, :last_active_time, :first_ip_address)";
    $stmt = $pdo->prepare($sql);

    $creation_time = time();
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password_hash', $password_hash, PDO::PARAM_STR);
    $stmt->bindParam(':creation_time', $creation_time, PDO::PARAM_INT);
    $stmt->bindParam(':last_active_time', $creation_time, PDO::PARAM_INT);
    $stmt->bindParam(':first_ip_address', $first_ip_address, PDO::PARAM_STR);

    if ($stmt->execute()) {
        // Redirection après une inscription réussie
        session_start();
        $_SESSION["user_id"] = $pdo->lastInsertId();
        header("Location: signup-success.html");
        exit;
    } else {
        echo "Erreur d'execution.";
        echo $gotoSignup;
        exit;
    }
}
