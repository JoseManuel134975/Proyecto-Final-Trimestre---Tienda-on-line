import { getAPI } from "../utils/getAPI.js";


let currentIndex = 0;
const limit = 8;

const showData = async (productsA) => {
    const products = document.querySelector('.products')
    const data = await productsA

    data.forEach(item => {
        const price = document.createElement('h4');
        const product = document.createElement('article');
        product.classList.add('product');
        const name = document.createElement('h3');
        const img = document.createElement('img');

        price.textContent = item.regularPrice + ' V-Bucks';

        if ("bundle" in item) {
            img.src = item.bundle.image;
            name.textContent = item.bundle.name;
        } else {
            item.brItems.forEach((item) => {
                if ("images" in item) {
                    if ("featured" in item.images) {
                        img.src = item.images.featured;
                    } else if ("icon" in item.images) {
                        img.src = item.images.icon
                    }
                }
                name.textContent = item.name;
            });
        }

        product.appendChild(img);
        product.appendChild(name);
        product.appendChild(price);
        products.appendChild(product);
    });
}

const getData = async () => {
    const shopJSON = await getAPI('https://fortnite-api.com/v2/shop');
    const filterByLimit = shopJSON.data.entries.slice(currentIndex, currentIndex + limit);
    const filterByCurrent = filterByLimit.filter((item) => ("brItems" in item) || ("bundle" in item) || ("brItems" in item && "images" in item.brItems))

    currentIndex += limit;
    return filterByCurrent
};

const getDataByFilter = async (productsA, inputValue) => {
    const data = await productsA
    const filterByCategorie = data.filter((item) => "layout" in item && item.layout.category == inputValue)
    return filterByCategorie
}

const removeDOM = () => {
    const products = document.querySelector('.products')
    products.innerHTML = ''
}

const infiniteScroll = () => {
    let load = false

    window.addEventListener('scroll', async () => {
        if (
            window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000
        ) {
            if (!load) {
                load = true
                const loading = document.createElement('img')
                const products = document.querySelector('.products')
                loading.src = '../assets/img/load-32_256.gif'
                loading.id = 'gif'
                products.appendChild(loading)
                const data = getData()
                await showData(data);
                load = false
                loading.remove()
            }
        }
    });
}

const main = () => {
    const submit = document.getElementById('submit')
    const products = getData()
    showData(products)
    infiniteScroll()

    submit.addEventListener("click", (event) => {
        event.preventDefault()

        const categorie = document.getElementById('categoria').value
        const allFilter = getDataByFilter(products, categorie)

        removeDOM()
        showData(allFilter)
    })
};

document.addEventListener("DOMContentLoaded", main);