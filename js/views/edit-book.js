import { fetchData } from "../api.js";

export default async function EditBook() {
    const params = new URLSearchParams(location.hash.split('?') [1]);
    const id = params.get('id');

    const libro = await fetchData (`libros/${id}`);

    document.getElementById('app').innerHTML = `
        <h2>Editar libro</h2>
        <form id="editBookForm">
            <input type="text" name="titulo" placeholder="Titulo" values="${libro.titulo}" required />
            <input type="text" name="autor" placeholder="Autor" values="${libro.autor}" required />
            <label>
                <input type="checkbox" name="disponible" ${libro.disponible ? 'checked' : '' } />
                Disponible
            </label>
            <button>Guardar cambios</button>
        </form>
        <a href="#/dashboard">Volver</a>
    `;
    document.getElementById('editBookForm').addEventListener('submit', async (e) =>{
        e.preventDefault();
        const form = new FormData(e.target);

        await fetchData(`libros/${id}`, 'PATCH', {
            titulo: form.get('titulo'),
            autor: form.get('autor'),
            disponible: form.get('disponible') === 'on'
        });

        alert("Libro actualizado correctamente");
        location.hash = '#/dashboard';
    });
}