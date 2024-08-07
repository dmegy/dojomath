#!/bin/bash


# TODO : version embedded avec absolument tout dans le html : fontes, questions


/bin/zsh bundle_minify_css.sh

/bin/zsh bundle_minify_js.sh



# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# - - - - -  3. BUILD INDEX.HTML from index-dev.html  - - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# création d'index.html, à partir de index-dev.html (écrase)
cp index-dev.html index.html


index_file="index.html"



# Supprimer toutes les lignes contenant la chaîne '<script defer src="'
# le js va être soit linké, soit inliné
sed -i '' -e '/<script defer src="/d' "$index_file"
sed -i '' -e '/<script src="/d' "$index_file"
# note : les lignes commençant par <script defer src=... seront conservées
# Attention car ils ont peut-être étés bundlés aussi avec l'autre script
# solution : les scripts async devraient commencer par "-" (ou "-async") pour ne pas être bundlés.




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



# - - - - - - - - - - - - - - - - - - - - - - - - - - - 
#- - - - - -  CHOIX 2 : INLINE JAVASCRIPT  BUNDLE - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - - - - -
# avantage : le js arrive  plus vite, du contenu s'affiche. 
# Mais avant que les fontes soient là... glich sur les fontes
# il faudrait inliner les fontes, dans ce cas
# bon cela dit, sur firefox et chrome mobile sur le téléphone ça semble instantané
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# Définir les chemins des fichiers
index_file="index.html"
js_file="js/bundle.min.js" # on a enlevé les sauts de ligne

# Lire le contenu du fichier JS
js_content=$(<"$js_file")

# Échapper les barres obliques et les caractères spéciaux
escaped_js_content=$(printf '%s' "$js_content" | sed -e 's/[\/&]/\\&/g')
# Remplacer /* INLINE JAVASCRIPT HERE */ par le JS. Ne *pas* utiliser perl à cause des '@'
sed -i '' -e "s/\/\* INLINE JAVASCRIPT HERE \*\//${escaped_js_content}/g" "$index_file" # BSD sed


# - - - - - - - -- - - - - -
# pour déployer une version de test, avant d'uploader index.html
cp index.html index-stage.html
#
# inutile pour l'instant : 
gzip < questions.json > questions.json.gz

