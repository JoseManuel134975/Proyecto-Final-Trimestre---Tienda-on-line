import { getAPI } from "../utils/getAPI.js"


const validateUser = async (u, g) => {
    const dbClientesJSON = await getAPI('../json/dbclientes.json')

    const found = dbClientesJSON.usuarios.find((item) => item.nombre == u && item.correo == g)
    if (found) {
        location.href = '../views/products.html'
    } else {
        alert('No existe ese usuario.')
    }
}

// const getToken = async (username, gmail) => {
//     const response = await getAPI('../json/dbclientes.json', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, gmail })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         localStorage.setItem('token', data.token);
//         alert('Inicio de sesión exitoso');
//     } else {
//         alert('Error: ' + data.message);
//     }
// }

const main = () => {
    const submit = document.getElementById('submit')
    submit.addEventListener("click", (event) => {
        event.preventDefault()
        const user = document.getElementById('user').value
        const gmail = document.getElementById('gmail').value
        validateUser(user, gmail)
    })
}

document.addEventListener("DOMContentLoaded", main)