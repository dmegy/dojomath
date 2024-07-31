#!/bin/bash

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
