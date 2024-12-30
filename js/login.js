import { getAPI } from "../utils/getAPI.js"


const validateUser = async (db, u, g) => {
    if (db.usuarios.find((item) => item.nombre == u && item.correo == g)) {
        location.href = '../views/products.html'
    } else {
        alert('No existe ese usuario.')
    }
}

const eventSubmit = () => {
    document.getElementById('submit').addEventListener("click", (event) => {
        event.preventDefault()

        getAPI('../json/dbclientes.json').then((data) => {
            validateUser(data, document.getElementById('user').value, document.getElementById('gmail').value)
        })
    })
}

const main = () => {
    eventSubmit()
}

document.addEventListener("DOMContentLoaded", main)