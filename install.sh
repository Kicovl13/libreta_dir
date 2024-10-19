#!/bin/bash

# Habilitar el modo para salir al encontrar errores
set -e

# Función para mostrar mensajes
info () {
    echo -e "\n[INFO] $1\n"
}

# 1. Instalación de dependencias de backend
info "Instalando dependencias de Laravel..."
cd backend
composer install

# 2. Configuración del archivo .env de Laravel
info "Configurando archivo .env de Laravel..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    php artisan key:generate
fi

# 3. Configuración de la base de datos
info "Ejecutando migraciones y seeders de la base de datos..."
php artisan migrate --seed

# 4. Levantar servidor de Laravel
info "Levantando servidor de Laravel en http://localhost:8000..."
php artisan serve 

# Regresar al directorio raíz
cd ..

# 5. Instalación de dependencias de frontend
info "Instalando dependencias de Angular..."
cd frontend
npm install

# 6. Levantar servidor de Angular
info "Levantando servidor de Angular en http://localhost:4200..."
npm start 

info "Instalación completa. La aplicación está corriendo en http://localhost:4200 y el servidor en http://localhost:8000."
