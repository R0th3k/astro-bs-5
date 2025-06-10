#!/bin/bash

# Validar si lftp está instalado
if ! command -v lftp &> /dev/null; then
    echo "⚠️ lftp no está instalado. Intentando instalarlo..."
    sudo apt update && sudo apt install -y lftp

    if ! command -v lftp &> /dev/null; then
        echo "❌ No se pudo instalar lftp. Aborta el script."
        exit 1
    fi
fi

# Ejecutar npm run build y esperar 3 segundos
echo "🏗️ Ejecutando npm run build..."
npm run build

echo "⏳ Esperando 3 segundos..."
sleep 3

CONFIG_FILE="ftp.config"

if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "❌ No se encontró el archivo ftp.config"
    exit 1
fi

source "$CONFIG_FILE"

if [[ -z "$HOST" || -z "$USER" || -z "$PASS" || -z "$LOCAL_PATH" ]]; then 
    echo "❌ Faltan datos en ftp.config (HOST, USER, PASS, LOCAL_PATH)"
    exit 1
fi

if [[ ! -d "$LOCAL_PATH" ]]; then
    echo "❌ La ruta local '$LOCAL_PATH' no existe."
    exit 1
fi

echo "🚀 Conectando a ftp://$HOST y subiendo archivos desde $LOCAL_PATH a /public_html/desarrollo.azulcentral.com/zamurai..."

lftp -u "$USER","$PASS" -p 21 "$HOST" <<EOF
set ftp:ssl-allow yes
set ssl:verify-certificate no
set net:timeout 20
set net:max-retries 2
set net:reconnect-interval-base 5
mirror -R --verbose --parallel=2 "$LOCAL_PATH" /
bye
EOF

if [[ $? -eq 0 ]]; then
    echo "✅ Subida completada."
else
    echo "❌ Error durante la subida."
fi
