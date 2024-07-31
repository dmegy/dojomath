#!/bin/bash

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
    gsub(/href="css\/style.css"/, "href=\"bundle.css\"")
    print
}' "$input_file" > "$output_file"

echo "Identifiants uniques rajoutés dans le fichier $output_file."

# - - - - CSS bundler - - - - - - -

# Chemin du dossier CSS
css_dir="css"
# Nom du fichier de sortie
css_output_file="bundle.css"

# Concaténer tous les fichiers sauf ceux qui commencent par _ et le fichier style.css
for file in "$css_dir"/*; do
    if [[ ! "$(basename "$file")" =~ ^_ && "$(basename "$file")" != "style.css" && -f "$file" ]]; then
        cat "$file" >> "$css_output_file"
        echo >> "$css_output_file"  # Ajouter une nouvelle ligne pour séparer les fichiers
    fi
done

echo "Tous les fichiers de style ont été bundlés dans $css_output_file."
