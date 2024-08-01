#!/bin/bash

# - - - - - - - - - - - - - - - - - - -
# - - - - 1. CSS bundler - - - - - - -
# - - - - - - - - - - - - - - - - - - -

# Chemin du dossier CSS
css_dir="css"
# Nom du fichier de sortie
css_output_file="css/bundle.css"

# Vider le fichier de sortie s'il existe déjà
echo " " > "$css_output_file"

# Concaténer tous les fichiers sauf ceux qui commencent par _ et le fichier style.css, ainsi que le bundle.css lui-même
for file in "$css_dir"/*; do
    filename=$(basename "$file")

    if [[ ! "$filename" =~ ^_ && "$filename" != "style.css" && "$filename" != "bundle.css" && "$filename" != "bundle.min.css" && -f "$file" ]]; then
        cat "$file" >> "$css_output_file"
        echo >> "$css_output_file"  # Ajouter une nouvelle ligne pour séparer les fichiers
    fi
done

echo "Tous les fichiers de style ont été bundlés dans $css_output_file."

# - - - - - - - - - - - - - - - - - - -
# - - - - - 1bis. "MINIFY" bundle.css - - - -
# - - - - - - - - - - - - - - - - - - -

# Définir les chemins des fichiers
input_css="css/bundle.css"
output_css="css/bundle.min.css"

# Supprimer tous les sauts de ligne du fichier CSS, ça aidera pour inliner le css

tr -d '\n' < "$input_css" > "$output_css"

echo "Le fichier $input_css a été compressé et écrit dans $output_css."




# - - - - - - - - - - - - - - - - - - -
# - - - - 2. JS bundler  - - -
# - - - - - - - - - - - - - - - - - - -

# Chemin du dossier JS
js_dir="js"
# Nom du fichier de sortie
js_output_file="js/bundle.js"

# Vider le fichier de sortie s'il existe déjà
echo " " > "$js_output_file"

# Concaténer tous les fichiers sauf ceux qui commencent par - et le fichier style.css, ainsi que le bundle.css lui-même (et bundle.min.js)
for file in "$js_dir"/*; do
    filename=$(basename "$file")

    if [[ ! "$filename" =~ ^-  && "$filename" != "index.js" && "$filename" != "bundle.js" && "$filename" != "bundle.min.js" && -f "$file" ]]; then
        cat "$file" >> "$js_output_file"
        echo >> "$js_output_file"  # Ajouter une nouvelle ligne pour séparer les fichiers
    fi
done

echo "Tous les fichiers de js ont été bundlés dans $js_output_file."



# - - - - - - - - - - - - - - - - - - -
# - - - - 2bis. JS bundle  minification- - -
# - - - - - - - - - - - - - - - - - - -

echo " " > js/bundle.min.js
# enlève uniquement les commentaires qui sont seuls sur leur ligne (espaces puis commentaire) 

grep -v "^\s*//" js/bundle.js > js/bundle.min.js

# nouvelle façon : enlever tous les commentaires : 

cc -undef -E -P -xc js/bundle.js > tmp && mv tmp js/bundle.min.js

# attention pour ce qui suit, il faut avoir enlevé tous les commentaires !!
# enlève les sauts de ligne

tr -d '\n' < js/bundle.min.js > tmp && mv tmp js/bundle.min.js # premier type de saut de ligne enlevé, 
tr -d '\r' < js/bundle.min.js > tmp && mv tmp js/bundle.min.js # 2ème type


# !! NE PAS FAIRE CE QUI SUIT !!
# Raison :  prettier qui reformate parfois en allant à la ligne après le 'console.log('
# enlever les lignes avec juste un console.log ?
#grep -v "^\s*console.log(" js/bundle.js > tmp && mv tmp js/bundle.js



# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# - - - - -  3. BUILD INDEX.HTML from index-dev.html  - - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# création d'index.html, à partir de index-dev.html (écrase)
cp index-dev.html index.html


index_file="index.html"



# Supprimer toutes les lignes contenant la chaîne '<script defer src="'
# le js va être soit linké, soit inliné
sed -i '' -e '/<script defer src="/d' "$index_file"


# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# - - - - CHOIX 1:
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# rajout du js bundle et du preload avec le même identifiant unique

# commenter les trois prochaines (ligne+comment) si on veut plutôt inliner le js

# Générer un identifiant unique basé sur la date et l'heure
#unique_id=$(date +%Y%m%d%H%M%S)
# Remplacer la chaîne <!-- INSERT PRELOADER HERE --> par <link rel="preload" href="js/bundle.min.js etc avec identifiant unique
#sed -i '' -e "s/<!-- INSERT PRELOADER HERE -->/<link rel='preload' href='js\/bundle.min.js?unique=${unique_id}' as='script'>/g" "$index_file"
# Remplacer la chaîne <!-- INSERT SCRIPT TAG HERE --> par <script src="js/bundle.min.js?unique=[UNIQUE_ID]" defer></script>
#sed -i '' -e "s/<!-- INSERT SCRIPT TAG HERE -->/<script src='js\/bundle.min.js?unique=${unique_id}' defer><\/script>/g" "$index_file"




# - - - - - - - - - - - - - - - - - - - - - - - -
#- - - - - -  INLINE STYLE IN HTML - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - -

# Définir les chemins des fichiers
index_file="index.html"
css_file="css/bundle.min.css"

# Lire le contenu du fichier CSS
css_content=$(<"$css_file")
#echo "Contenu du CSS :"
#echo "$css_content "

# Remplacer les chemins '../assets' par './assets'
new_css_content=$(printf '%s' "$css_content" | sed -e 's/\.\.\/assets/assets/g')
#echo "Contenu du CSS après remplacement de ../assets par ./assets:"
#echo "$new_css_content "

# Échapper les barres obliques et les caractères spéciaux
escaped_css_content=$(printf '%s' "$new_css_content" | sed -e 's/[\/&]/\\&/g')
#echo "Contenu du CSS après échappement des caractères spéciaux:"
#echo "$escaped_css_content "


# Supprimer la chaîne <link rel="stylesheet" href="css/bundle.min.css" />
sed -i '' '/<link rel="stylesheet" href="css\/style\.css" \/>/d' "$index_file"

# Remplacer /* INLINE STYLES HERE */ par le CSS. Ne *pas* utiliser perl à cause des '@'
sed -i '' -e "s/\/\* INLINE STYLES HERE \*\//${escaped_css_content}/g" "$index_file" # BSD sed


echo "Le fichier $css_file a été inliné dans $index_file"



# - - - - - - - - - - - - - - - - - - - - - - - - - - - 
#- - - - - -  CHOIX 2 : INLINE JAVASCRIPT  BUNDLE - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Définir les chemins des fichiers
index_file="index.html"
js_file="js/bundle.min.js" # on a enlevé les sauts de ligne

# Lire le contenu du fichier JS
js_content=$(<"$js_file")

# Échapper les barres obliques et les caractères spéciaux
escaped_js_content=$(printf '%s' "$js_content" | sed -e 's/[\/&]/\\&/g')
# Remplacer /* INLINE JAVASCRIPT HERE */ par le JS. Ne *pas* utiliser perl à cause des '@'
sed -i '' -e "s/\/\* INLINE JAVASCRIPT HERE \*\//${escaped_js_content}/g" "$index_file" # BSD sed




