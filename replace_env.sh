#!/bin/bash

#Do bash replace_env.sh inputFile outPutfile to create/update a .env.example file

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 fichier_source fichier_destination"
  exit 1
fi

input_file="$1"
output_file="$2"

if [ ! -f "$input_file" ]; then
  echo "Fichier source '$input_file' introuvable."
  exit 1
fi

sed 's/=.*/=changeme/' "$input_file" > "$output_file"
echo "Fichier '$output_file' créé avec les valeurs remplacées."
