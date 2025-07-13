const API_URL = 'http://localhost:3000';

export async function fetchData(endpoint, method = 'GET', data) {
    const options = {
        method,
        headers: {
            'Content-Type' : 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }


    //elimina cualquier / al inicio del endpoint para evitar doble slash
    const cleanEndpoint = endpoint.replace(/^\/+/, '');

    const res = await fetch(`${API_URL}/${cleanEndpoint}`, options);
    if (!res.ok) throw new Error('Error en la solicitud');
    return res.json();
}