import { getAPI } from "../utils/getAPI.js";


let currentIndex = 0;
const limit = 24;
let allDataLoaded = false; 

const getData = async () => {
    if (allDataLoaded) return;  

    const shopJSON = await getAPI('https://fortnite-api.com/v2/shop');
    const products = document.querySelector('.products');
    
    const shopWithLimit = shopJSON.data.entries.slice(currentIndex, currentIndex + limit);

    if (shopWithLimit.length === 0) {
        allDataLoaded = true;
        observer.disconnect();
        return;
    }

    shopWithLimit.forEach(item => {
        if ("brItems" in item) {
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
        }
    });

    currentIndex += limit;
};

let observer;

function createObserver() {
    const products = document.querySelector('.products');
    const observerDOM = document.createElement('div')
    products.appendChild(observerDOM)
    const boxElement = document.querySelector('#observer')

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,  
    };

    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement);
}

const handleIntersect = (entries) => {
    if (entries[0].isIntersecting && !allDataLoaded) {
        getData();
    }
};

const main = () => {
    getData();  
    createObserver();  
};

document.addEventListener("DOMContentLoaded", main);