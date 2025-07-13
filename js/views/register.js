import { fetchData } from "../api.js";

export default function Register() {
    try {
        const app = document.getElementById('app');
        if (!app) {
            throw new Error("No se encontro el contenedor #app");
        }

        app.innerHTML = `
        <h2>Registro</h2>
        <form id="registerForm"> 
            <input type="text" name="nombre" placeholder="Nombre completo" required />
            <input type="email" name="email" placeholder="Correo electronico" required />
            <input type="password" name="password" placeholder="Contraseña" required />

            
            <select name="rol" required> 
                <option value="">Selecciona un rol</option>
                <option value="visitante">Visitante</option>
                <option value="bibliotecario">Bibliotecario</option>
            </select>
            <button>Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta? <a class="inicio-sesion" href="#/login">Inicia sesion</a></p>
        `;

        const form = document.getElementById('registerForm');
        if (!form) {
            throw new Error("Formulario no encontado");
        }
        
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(form);
            const nuevoUsuario = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                password: formData.get('password'),
                rol: formData.get('rol')
            };

            try{
                await fetchData('usuarios', 'POST', nuevoUsuario);
                alert('Usuario registrado correctamente');
                location.hash = '#/login';  
            } catch (error) {
                console.error('error al registrar: ', error);
                alert('no se pudo registrar el usuario. verifica la conexion con el servidor');
            }
        });
    } catch (error) {
        console.error("Error al renderizar Register.js: ", error);
        const fallback = document.getElementById('app');
        if (fallback) {
            fallback.innerHTML = "<p style='color:red;'>Error al mostrar el formulario de registro</p>";
        }
    }
}