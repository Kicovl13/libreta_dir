# Libreta de Direcciones - Instrucciones de Instalación y Uso

## Descripción
La Libreta de Direcciones es una aplicación web que permite a los usuarios gestionar contactos con información adicional, realizar búsquedas avanzadas y tener un registro organizado de nombres, teléfonos, direcciones, correos electrónicos y otros datos relevantes. El frontend está desarrollado en **Angular**, y el backend en **Laravel**, utilizando **MySQL** como base de datos.

## Características
- **Gestión de Contactos**: Crear, editar, eliminar y ver contactos con múltiples números de teléfono, emails y direcciones.
- **Búsqueda Avanzada**: Filtra contactos por nombre, teléfono, dirección, email, cumpleaños y más.
- **Paginación**: Navega fácilmente a través de grandes listas de contactos.
- **Interfaz Responsiva**: Adaptada para funcionar en dispositivos móviles, tabletas y escritorios.
  
## Tecnologías Utilizadas
- **Angular (v18)** - Frontend.
- **Laravel (v11)** - Backend.
- **MySQL** - Base de datos.
- **Node.js (v20.x)** y **NPM** - Gestión de dependencias frontend.
- **Composer** - Gestión de dependencias backend.
- **PHP (v8.x)** - Lenguaje backend.
  
## Requisitos Previos
Asegúrate de tener los siguientes componentes instalados en tu máquina:
- **PHP (v8.x o superior)**: Para el servidor backend (Laravel).
- **Composer (v2.x o superior)**: Para gestionar las dependencias de Laravel.
- **Node.js (v20.x o superior)** y **NPM**: Para gestionar las dependencias de Angular.
- **MySQL**: Base de datos para almacenar contactos.
- **Git**: Para clonar el repositorio y gestionar el código.

## Instalación Automática con `install.sh`

Este proyecto incluye un script automatizado (`install.sh`) para configurar todo el entorno.

### 1. Clonar el Repositorio y Ejecutar el Script

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio

2. **Haz ejecutable el script de instalación:**

    chmod +x install.sh

3. **Ejecuta el script de instalación:**
./install.sh

## El script se encargará de lo siguiente:

Instalar las dependencias de Laravel usando composer install.
Crear y configurar el archivo .env para el backend.
Ejecutar las migraciones y poblar la base de datos con datos de prueba (php artisan migrate --seed).
Instalar las dependencias de Angular (npm install).
Iniciar los servidores de desarrollo tanto para Laravel (en http://localhost:8000) como para Angular (en http://localhost:4200).

Nota: Si necesitas personalizar el archivo .env para la conexión a tu base de datos, asegúrate de configurarlo correctamente antes de ejecutar el script.






