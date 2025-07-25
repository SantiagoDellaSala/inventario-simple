# Inventario Simple - React + Node.js + MySQL + Sequelize

Proyecto básico para mostrar un sistema completo de inventario con autenticación, backend en Node.js y frontend en React (Vite), usando MySQL y Sequelize ORM.  
Incluye registro/login con JWT, CRUD protegido de productos y panel administrativo.

---

## 📋 Tecnologías

- **Frontend:** React, Vite, React Router, Axios, Bootstrap  
- **Backend:** Node.js, Express, Sequelize, MySQL, bcrypt, jsonwebtoken  
- **Base de datos:** MySQL  
- **Autenticación:** JWT (JSON Web Tokens)  
- **Gestión de estado:** React Context API

---

## 🚀 Instalación y ejecución

### Requisitos

- Node.js instalado  
- MySQL instalado y configurado  

---

### Configuración del backend

1. Entrar a la carpeta `backend`:

   ```bash
   cd backend

### Crear archivo .env con tus credenciales MySQL y JWT:

DB_NAME=inventario_db
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=una_clave_secreta_para_jwt

### Instalar dependencias:

npm install

### Crear base de datos (asegurate que MySQL esté corriendo):

npx sequelize-cli db:create

### Ejecutar migraciones:

npx sequelize-cli db:migrate

### Iniciar el servidor:

node server.js

### En la raíz del proyecto (donde está package.json del frontend o en src según estructura):

npm install
npm run dev