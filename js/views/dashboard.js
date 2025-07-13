import { getUserFromStorage, clearUserFromStorage } from "../auth.js";
import { fetchData } from "../api.js";

export default async function Dashboard() {
    try{
        const user = getUserFromStorage();
        if (!user) {
            location.hash = '#/login';
            return;
        }

        let content = `<h2>Bienvenido, ${user.nombre} (${user.rol})</h2>
        <button id="logout">Cerrar sesion</button>`;

        //si es bibliotecario, muestra los botones para crear y ver libros
        if(user.rol === 'bibliotecario') {
            content += `
            <button id="agregarLibroBtn">Agregar libro</button><br><br>
            <button id="verLibrosBtn">Ver libros disponibles (GET)</button>
            <div id="librosContainer"></div>
            `;
        } else {
            const libros = await fetchData('libros');
            content += `
            <h3>Catalogo de libros</h3>
            <ul>
                ${libros.map(libro => `
                    <li>
                        <strong>${libro.titulo}</strong> - ${libro.autor}
                        ${libro.disponible
                            ? `<button  type="button" data-id="${libro.id}" class="reservar-btn">Reservar</button>`
                            : `<span>(No disponible)</span>`}
                    </li>
                `).join('')}
            </ul> 
            `;
        }
 
        document.getElementById('app').innerHTML = content;

        //boton para cerrar sesion
        const logoutBtn = document.getElementById('logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () =>{
                clearUserFromStorage();
                location.hash = '#/login';
            });
        }

        //boton "agregar libro"
        const agregarLibroBtn = document.getElementById('agregarLibroBtn');
            if (agregarLibroBtn) {
                agregarLibroBtn.addEventListener('click', () =>{
                    location.hash = '#/dashboard/books/create';
                });
            }
        
        //funcionalidad de "ver libros" solo para bibliotecario
        const verLibrosBtn = document.getElementById('verLibrosBtn');
        if (verLibrosBtn) {
            verLibrosBtn.addEventListener('click', async () =>{
                const libros = await fetchData('libros');
                const librosHTML = libros.map(libro => `
                    <li>
                        <div class="buttons-eliminar-editar">
                            <strong>${libro.titulo}</strong> - ${libro.autor}
                            (${libro.disponible ? 'Disponible' : 'No disponible'})
                            <div class="editar-eliminar">
                                <button class="editar-btn" data-id="${libro.id}">Editar</button>
                                <button class="eliminar-btn" data-id="${libro.id}">Eliminar</button>
                            </div>
                        <div/>
                    </li> 
                    `).join('');

                    document.getElementById('librosContainer').innerHTML = `
                    <h3>Libros disponibles</h3>
                    <ul>${librosHTML}</ul>
                    `;
                    
                //eventos eliminar libro
                document.querySelectorAll('.eliminar-btn').forEach(btn => {
                    btn.addEventListener('click', async () =>{
                        const libroId = btn.getAttribute('data-id');
                        const confirmar = confirm("¿Estas seguro de eliminar este libro?");
                        if(confirmar) {
                            try {
                                await fetchData(`libros/${libroId}`, 'DELETE');
                                alert("Libro eliminado correctamente");
            
                                //recargar la lista despues de eliminar
                                btn.closest('li').remove();
                            } catch (error) {
                                console.error("Error al eliminar libro: ", error);
                                alert("No se pudo eliminar el libro");
                            }
                        } 
                    });
                });

                //evento de editar libro
                document.querySelectorAll('.editar-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const libroId = btn.getAttribute('data-id');
                        location.hash = `#/dashboard/books/edit?id=${libroId}`;
                    });
                });
            });
        }


        //reservar libro (visitante)
        if (user.rol === 'visitante') {
            document.querySelectorAll('.reservar-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const libroId = btn.getAttribute('data-id');
                    const confirmando = confirm('¿Deseas reservar este libro?')
                    if (confirmando) {
                        await fetchData('reservas', 'POST', {
                            usuarioId: user.id,
                            libroId,
                            fecha: new Date().toISOString()
                        });

                        await fetchData(`libros/${libroId}`, `PATCH`, {disponible: false});
                        alert('Reserva realizada con exito!');
                        location.reload();
                    
                    }
                });
            });
        }
    } catch (error) {
        console.error("Error en Dashboard: ", error);
        document.getElementById('app').innerHTML = `<p style="color: red;">No se pudo cargar el dashboard</p>`;
    }
}