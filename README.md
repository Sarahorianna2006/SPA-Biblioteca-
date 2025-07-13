# SPA - Biblioteca

**SPA - Biblioteca**, una aplicación web de biblioteca desarrollada como ejercicio práctico para aprender sobre Single Page Applications (SPA), operaciones CRUD, manejo de rutas y autenticación con roles.

---

## Funcionalidades principales

- Registro e inicio de sesión de usuarios
- Autenticación basada en roles:
  - **Bibliotecario**: puede agregar, editar, ver y eliminar libros
  - **Visitante**: puede ver y reservar libros disponibles
- Operaciones **CRUD** completas sobre libros (crear, leer, actualizar, eliminar)
- **SPA** con HTML, CSS y JavaScript puro
- Datos persistidos localmente usando **JSON Server**

---

## ¿Cómo correr el proyecto?

### 1. Instalar dependencias (solo necesitas JSON Server)

Si aún no lo tienes instalado, ejecuta:

```bash
npm install -g json-server
```
### 2. Levantar el servidor de datos
```bash
json-server --watch db.json --port 3000
```
**Esto iniciará la API REST falsa en http://localhost:3000**

### 3. Abrir la aplicación
Abre el archivo **index.html** con **Live Server**.

Recomendado:

- En VS Code, clic derecho sobre index.html → "Open with Live Server"

- Abre en tu navegador: http://127.0.0.1:5500/index.html#/login

---
## Usuarios y roles
Puedes registrarte como:

- **Visitante:** solo puede ver y reservar libros disponibles.

- **Bibliotecario:** tiene permisos completos de gestión de libros.

Los datos del usuario se almacenan en localStorage después de iniciar sesión.

---
##  Tecnologías utilizadas
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **JSON Server**

