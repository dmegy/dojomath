#!/bin/bash


# - - - - - - - - - - - - - - - - - - -
# - - - - 2. JS bundler  - - -
# - - - - - - - - - - - - - - - - - - -

# Chemin du dossier JS
js_dir="js"
# Nom du fichier de sortie
js_output_file="js/bundle.js"

# Vider le fichier de sortie s'il existe déjà
echo " " > "$js_output_file"

# Concaténer tous les fichiers sauf ceux qui commencent par '-' et le fichier style.css, ainsi que le bundle.css lui-même (et bundle.min.js)
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

# enlève les sauts de ligne (licite car commentaires enlevés!)

tr -d '\n' < js/bundle.min.js > tmp && mv tmp js/bundle.min.js # premier type de saut de ligne enlevé, 
tr -d '\r' < js/bundle.min.js > tmp && mv tmp js/bundle.min.js # 2ème type

echo "js/bundle.js a été minifié dans js/bundle.min.js"
