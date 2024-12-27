import { getAPI } from "../utils/getAPI.js"


const main = async () => {
    const shopJSON = await getAPI('https://fortnite-api.com/v2/shop')
    const products = document.querySelector('.products')
    shopJSON.data.entries.forEach(item => {
        if ("brItems" in item) {
            console.log(item);
            const price = document.createElement('h4')
            const product = document.createElement('article')
            product.classList.add('product')
            const name = document.createElement('h3')
            const img = document.createElement('img')

            price.textContent = item.regularPrice + ' V-Bucks'

            if ("bundle" in item) {
                img.src = item.bundle.image
                name.textContent = item.bundle.name
            } else {
                item.brItems.forEach((item) => {
                    if("images" in item) {
                        if("bean" in item.images) {
                            img.src = item.images.featured || item.images.icon
                        } else {
                            img.src = item.images.smallIcon
                        }
                    }
                    name.textContent = item.name
                })
            }

            product.appendChild(img)
            product.appendChild(name)
            product.appendChild(price)
            products.appendChild(product)
        }
    });
}

document.addEventListener("DOMContentLoaded", main)