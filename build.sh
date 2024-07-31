#!/bin/bash

# - - - - - - - - - - - - - - - - - - -
# - - - - 1. CSS bundler - - - - - - -
# - - - - - - - - - - - - - - - - - - -

# Chemin du dossier CSS
css_dir="css"
# Nom du fichier de sortie
css_output_file="css/bundle.css"

# Concaténer tous les fichiers sauf ceux qui commencent par _ et le fichier style.css
for file in "$css_dir"/*; do
    filename=$(basename "$file")

    if [[ ! "$filename" =~ ^_ && "$filename" != "style.css" && "$filename" != "bundle.css" && "$filename" != "bundle-with-Nunito.css" && -f "$file" ]]; then
        cat "$file" >> "$css_output_file"
        echo >> "$css_output_file"  # Ajouter une nouvelle ligne pour séparer les fichiers
    fi
done

echo "Tous les fichiers de style ont été bundlés dans $css_output_file."

# - - - - - - - - - - - - - - - - - - - - - - - - - -
# - - - 2. INLINER LA FONT dans le bundle précédent, 
# écrire dans un fichier bundle-with-Nunito.css
# - - - - - - - - - - - - - - - - - - - - - - - - - -

# Nom des fichiers
input_file="css/bundle.css"
replacement_file="assets/fonts/Nunito.dataURL.txt"
output_file="css/bundle-with-Nunito.css"
search_string='"../assets/fonts/Nunito.woff2"'

# Vérifier que le fichier d'entrée existe
if [ ! -f "$input_file" ]; then
    echo "Le fichier $input_file n'existe pas."
    exit 1
fi

# Vérifier que le fichier de remplacement existe
if [ ! -f "$replacement_file" ]; then
    echo "Le fichier $replacement_file n'existe pas."
    exit 1
fi

# Lire le contenu du fichier de remplacement
replacement=$(<"$replacement_file")

# Remplacer la première occurrence de la chaîne et écrire le résultat dans le fichier de sortie
awk -v search="$search_string" -v replace="$replacement" '
{
    if (!replaced && match($0, search)) {
        sub(search, replace)
        replaced = 1
    }
    print
}' "$input_file" > "$output_file"

# Vérifier que le remplacement a eu lieu
if [ -s "$output_file" ]; then
    echo "La chaîne a été remplacée avec succès dans $output_file."
else
    echo "Erreur lors du remplacement de la chaîne dans $output_file."
    rm -f "$output_file"
fi



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
    gsub(/href="css\/style.css"/, "href=\"css\/bundle-with-Nunito.css\"")
    print
}' "$input_file" > "$output_file"

echo "Identifiants uniques rajoutés dans le fichier $output_file."


