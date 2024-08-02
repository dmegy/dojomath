#!/bin/bash

# - - - - - - - - - - - - - - - - - - -
# - - - - 1. CSS bundler - - - - - - -
# - - - - - - - - - - - - - - - - - - -

# PREREQUIS : le fichier css/styles.css contient des directives @import "file.css";


# Chemin du dossier CSS
css_dir="css"
# Nom du fichier de sortie
css_output_file="css/bundle.css"

# Vider le fichier de sortie s'il existe déjà
echo " " > "$css_output_file"

# Concaténer tous les fichiers sauf style.css, bundle.css, bundle.min.css
# sauf aussi ceux qui commencent par '_' 
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



