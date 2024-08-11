<?php

session_start();

if (isset($_SESSION["user_id"])) {
    
    include 'database.php';
    
    $sql = "SELECT * FROM instructors WHERE id = :user_id";
    
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':user_id', $_SESSION["user_id"], PDO::PARAM_INT);
    
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
}

?>
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DojoMath Enseignants</title>
    <link rel="stylesheet" href="styles-enseignants.css">
</head>
<body>
    <div class="body-container">
    <header>
          <h2><a target="_blank" href="https://www.dojomath.fr">DojoMath</a> > Enseignants </h2>
      </header>
        <main>
        
        <?php if (!isset($user)): ?>
        

            <p>Vous n'êtes pas connecté(e).</p>
            <p>Si vous possédez un compte enseignant, vous pouvez vous <a href="login.php">connecter</a>.<br>
            Sinon, vous pouvez <a href="signup.html">créer un compte enseignant</a>.
            C'est gratuit, il suffit d'un email professionnel d'une académie.
            </p>
            <h3>Présentation des fonctionnalités du compte enseignant</h3>

            <h4>Catalogues</h4>
            
            <ul>
                <li>Liste détaillée des chapitres et thèmes avec les questions qu'ils contiennent.</li>
                <li>Liste de toutes les questions avec réponses, tri et filtrage possible</li>
                <li>Liens et QRCodes directs vers les thèmes, ainsi que vers les départs de Quiz sur un thème donné.</li>
            </ul>

            Il se peut néanmoins que les thèmes prédéfinis dans l'application ne conviennent pas parfaitement à vos besoins, que vous souhaitiez enlever certaines questions, ou mélanger plusieurs thèmes.<br>

            <h4>Création de Quiz personnalisées</h4>

            <ul>
                <li>Page de création de Quiz personnalisé.
                    La page affiche le catalogue général et permet de cocher ou décocher des questions, qui s'affichent progressivement dans un "panier".</li>

                <li>Export des quiz personnalisés au format pdf, latex (standard ou AutoMultipleChoice pour impression et correction automatique), csv ou json.</li>
                <li>Lien ou QR Code pour envoyé le Quiz personnalisé aux élèves. Le lien démarre automatiquement un Quiz sur les questions choisies par l'enseignant, en les mélangeant ou pas. Si l'élève rate le Quiz, il a la possibilité de recommencer.</li>
                <li>Page spéciale pour visualiser en direct les résultats des élèves aux quiz qu'on leur a envoyé.</li>
                <li>Enregistrement des quiz créés dans le compte pour réutilisation future (titre, liste des questions, commentaires etc). Maximum 5 quiz pour l'instant pour limiter les frais d'hébergement.</li>
            </ul>
            
            
        <?php else: ?>

            <p>Vous êtes connecté(e). Bienvenue, <?= htmlspecialchars($user["name"]) ?>.
            Se <a href="logout.php">déconnecter</a>.</p>
            <p>Attention, la page est en construction !</p>
            
            <h3>Pour naviguer dans le contenu : catalogues</h3>
            <ul>
                
              <li><a href="catalogue-questions-des-chapitres.php">Toutes les questions du site, triables et filtrables par chapitre et thème, numéro, mot(s)-clé.</a>.</li>
              <li><a href="catalogue-questions.php">Toutes les questions</a> en vrac. 
              Ceci inclut potentiellement des questions qui sont dans la base de données, mais qui ne sont pas utilisées dans les thèmes par défaut du site.</li>
              <li>La liste de <a href="catalogue-themes.php">tous les thèmes</a> avec possibilité d'afficher/masquer la liste des questions de chaque thème.</li>
        </ul>

            <h3>Pour envoyer aux élèves : liens directs vers chapitres, thèmes et quiz</h3>
            <ul>
              <li>Lien envoyant directement vers la liste des chapitres et thèmes : 
                <a href="https://www.dojomath.fr/?section=Chapters" target="_blank">https://www.dojomath.fr/?section=Chapters</a>.
              </li>
              <li>Lien vers un thème standard : https://www.dojomath.fr/?section=Theme&id=[themeId].<br>
                Exemple :  <a href="https://www.dojomath.fr/?section=Theme&id=quadrilateres" target="_blank">https://www.dojomath.fr/?section=Theme&id=quadrilateres</a>.
                Les identifiants des thèmes sont visibles dans les catalogues.</li>
              <li>Lien vers un départ de quiz sur un thème standard : https://www.dojomath.fr/?section=Quiz&id=[themeId].<br>
              Exemple :  <a href="https://www.dojomath.fr/?section=Quiz&id=quadrilateres" target="_blank">https://www.dojomath.fr/?section=Quiz&id=quadrilateres</a>.</li>
              <li>Lien vers un départ de quiz sur un thème personnalisé : https://www.dojomath.fr/?section=Quiz&id=[customId].<br>
                  Les ID personnalisés sont simplement des suites de numéros de questions séparés par des virgules.
                  Exemple : <a href="https://www.dojomath.fr/?section=Quiz&id=1,2,30,1456,2178" target="_blank">https://www.dojomath.fr/?section=Quiz&id=1,2,30,1456,2178</a>
              lance un Quiz sur les questions 1,2,30,1456,2178.</li>
            </ul>

            <h3>Pour monitorer les résultats des élèves</h3>

            <p>La page https://www.dojomath.fr/enseignants/resultats.php?id=IDENTIFIANT 
          affiche la liste des personnes ayant fini un quiz sur le thème 'IDENTIFIANT', ou 'IDENTIFIANT' est l'identifiant personnalisé, par exemple '1,2,30,1456,2178'.
        Par exemple, la page <a href="resultats.php?id=1,2,30,1456,2178" target="_blank">https://www.dojomath.fr/enseignants/resultats.php?id=1,2,30,1456,2178</a>
         montre toutes les personnes ayant fini un quiz sur le thème personnalisé "1,2,30,1456,2178".</p>

        <?php endif; ?>
        </main>
    </div>
    
</body>
</html>