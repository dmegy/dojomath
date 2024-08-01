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


# - - - - - 2. minify bundle.css - - - -

# Définir les chemins des fichiers
input_css="css/bundle.css"
output_css="css/bundle.min.css"


# Supprimer tous les sauts de ligne du fichier CSS

tr -d '\n' < "$input_css" > "$output_css"

echo "Le fichier $input_css a été compressé et écrit dans $output_css."




# - - - - - - - - - - - - - - - - - - - - - - - - - -
# - - - - -  BUILD INDEX.HTML   - - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - - - -

# Nom du fichier source
input_file="index-dev.html"

# Nom du nouveau fichier
output_file="index.html"




# Lire le fichier source et remplacer les occurrences
awk '{
    while (match($0, /\.js"><\/script>/)) {
        srand()
        random_num = int(rand() * 1000000)
        $0 = substr($0, 1, RSTART-1) ".js?unique=" random_num "\"></script>" substr($0, RSTART + RLENGTH)
    }
    gsub(/href="css\/style.css"/, "href=\"css\/bundle.min.css\"")
    print
}' "$input_file" > "$output_file"

echo "Identifiants uniques rajoutés dans le fichier $output_file."





# - - - - - - - - - - - - - - - - - - - - - - - -
#- - - - - -  INLINE STYLE IN HTML - - - - - - -
# - - - - - - - - - - - - - - - - - - - - - - - -

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

# plus tard : bundler le js, séparer les styles et le js critiques pour first paint etc, 
# mais c'est du premature optimization pour l'instant


