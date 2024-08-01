#!/bin/bash


# - -- - - - - -- - - - -- -
#- - - - - -  INLINE STYLE IN HTML

# Définir les chemins des fichiers
index_file="index.html"
css_file="css/bundle.min.css"

# Vérifier si les fichiers existent
if [[ ! -f "$index_file" ]]; then
  echo "Erreur : le fichier $index_file n'existe pas."
  exit 1
fi

if [[ ! -f "$css_file" ]]; then
  echo "Erreur : le fichier $css_file n'existe pas."
  exit 1
fi

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
sed -i '' '/<link rel="stylesheet" href="css\/bundle\.min\.css" \/>/d' "$index_file"

# Remplacer la chaîne /* INLINE STYLES HERE */ par le contenu du CSS
#perl -i -pe "s/\/\* INLINE STYLES HERE \*\//${escaped_css_content}/g" "$index_file"
# remplace mais problème avec le caractère spécial @ qui est transformé en -.

sed -i '' -e "s/\/\* INLINE STYLES HERE \*\//${escaped_css_content}/g" "$index_file" # BSD sed


echo "Le fichier $index_file a été mis à jour avec le contenu de $css_file et la chaîne de lien a été supprimée."
