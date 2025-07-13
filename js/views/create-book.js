import { fetchData } from "../api.js";

export default function CreateBook() {
    document.getElementById("app").innerHTML = `
        <h2>Agregar nuevo libro</h2>
        <form id="createBookForm">
            <input type="text" name ="titulo" placeholder="Titulo" required />
            <input type="text" name ="autor" placeholder="Autor" required />
            <button>Guardar libro</button>
        </form>
        <button id="volverBtn">Volver</button>
    `;

    //boton para volver
    const volverBtn = document.getElementById('volverBtn');
    volverBtn.addEventListener('click', () => {
        location.hash = '#/dashboard';
    });

    //guardar nuevo libro
    document.getElementById("createBookForm").addEventListener("submit", async (e) =>{
        e.preventDefault();
        const form = new FormData(e.target);
        const nuevoLibro = {
            titulo: form.get("titulo"),
            autor: form.get("autor"),
            disponible: true
        };

        try{
            await fetchData("libros", "POST", nuevoLibro);
            alert("Libro agregado correctamente");
            location.hash = "#/dashboard";
        } catch (error) {
            console.error("Error al agregar libros: ", error);
            alert("No se pudo agregar el libro.");
        }
    });
}