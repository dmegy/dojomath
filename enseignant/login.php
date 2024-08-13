<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    include_once 'database.php';

    $email = $_POST['email'];
    
    // Validation de l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $is_invalid = true;
    } else {
        $sql = "SELECT * FROM instructors WHERE email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($_POST["password"], $user["password_hash"])) {
            session_start();
            session_regenerate_id();
            $_SESSION["user_id"] = $user["id"];
            header("Location: index.php");
            exit;
        }
    }
    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="UTF-8">
    <title>DojoMath Enseignants : Login</title>
    <link rel="stylesheet" href="styles-enseignants.css">
</head>
<body>
    <div class="body-container">
        <?php include "header-body.php"; ?>
        <main>
            <h3>Connexion</h3>
            
            <?php if ($is_invalid): ?>
                <em>Erreur de connexion</em>
            <?php endif; ?>
            
            <form method="post">
                <label for="email">email</label>
                <input type="email" name="email" id="email"
                    value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">
                
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
                
                <button>Log in</button>
            </form>
            <p>Si vous ne possédez pas encore de compte enseignant, vous pouvez <a href="signup.html">en créer un</a>.</p>
            <p>Il suffit de fournir un email professionnel d'académie, du type "nom@ac-???.fr", ou un email de l'université de Lorraine.</p>
        </main>
    </div>
</body>
</html>








