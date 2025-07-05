# Task Manager App

Aplicación full-stack para gestión de tareas con autenticación JWT.

## 🛠️ Tecnologías
- **Frontend**: React, Redux, Bootstrap, Vite
- **Backend**: Django REST Framework
- **Base de datos**: PostgreSQL

## 📋 Prerrequisitos
- Python 3.9+
- PostgreSQL
- Node.js 16+ (para Vite)
- pip (gestor de paquetes de Python)
- npm (gestor de paquetes de JavaScript)

## 🚀 Instalación

### 1. Clonar repositorio
```bash
git clone [URL_DEL_REPOSITORIO]
cd proyecto/
```

### 2. Configurar Backend
### 2.1.- Crear y activar entorno virtual (Recomendado):
```bash
cd backend/
python -m venv venv          # Crear entorno virtual
source venv/bin/activate    # Linux/Mac
venv\Scripts\activate      # Windows
```
### 2.2.- Instalar dependencias
```bash
pip install -r requirements.txt
```
### 2.3 - Crear archivo .env en la carpeta backend con:
```bash
SECRET_KEY=tu_clave_secreta_django
DEBUG=True

# Configuración de PostgreSQL
DB_NAME=tasks_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
```

### 3.- Configurar base de datos PostgreSQL
### 3.1. Crear la base de datos:
```bash
sudo -u postgres psql
CREATE DATABASE tasks_db;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE tasks_db TO myuser;
\q
```
### 3.2.- Migraciones
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4.- Configurar frontend
```bash
cd ../frontend/
npm install
```
## ▶️ Ejecución
Backend (en terminal 1):
```bash
cd backend/
python manage.py runserver
```
Frontend (en terminal 2):
```bash
cd ../frontend/
npm run dev
```






