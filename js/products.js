import { getAPI } from "../utils/getAPI.js";


let currentIndex = 0;
const limit = 8;

const getData = async () => {
    const shopJSON = await getAPI('https://fortnite-api.com/v2/shop');
    const products = document.querySelector('.products');
    const filterByLimit = shopJSON.data.entries.slice(currentIndex, currentIndex + limit);
    const filterByAll = filterByLimit.filter((item) => ("brItems" in item) || ("bundle" in item) || ("brItems" in item && "images" in item.brItems))
    console.log(filterByAll);

    filterByAll.forEach(item => {
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
                    img.src = item.images.featured || item.images.icon;
                }
                name.textContent = item.name;
            });
        }

        product.appendChild(img);
        product.appendChild(name);
        product.appendChild(price);
        products.appendChild(product);
    });

    currentIndex += limit;
};


const main = () => {
    getData();
};

document.addEventListener("DOMContentLoaded", main);