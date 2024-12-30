import { getAPI } from "../utils/getAPI.js";



let currentPage = 1
const limit = 8

const nextPage = () => {
    currentPage++
    renderData()
}

const beforePage = () => {
    currentPage--
    renderData()
}

const getNextData = () => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const data = getAPI('https://fortnite-api.com/v2/shop')
    return data.then((items) => {
        return items.data.entries.slice(startIndex, endIndex)
    })
}

const getPages = () => getAPI('https://fortnite-api.com/v2/shop').then((data) => Math.ceil(data.data.entries.length / limit));

const manageBtn = () => {
	if (currentPage === 1) {
		document.getElementById('before').setAttribute("disabled", true);
	} else {
		document.getElementById('before').removeAttribute("disabled");
	}

    const promise = getPages()
    promise.then((result) => {
        if(currentPage === result) {
            document.getElementById('next').setAttribute("disabled", true);
        } else {
            document.getElementById('next').removeAttribute("disabled");
        }
    })
}

const renderData = () => {
    document.querySelector('.products').innerHTML = ''

    const sliceShop = getNextData()
    manageBtn()

    let cont = 0

    const fragment = document.createDocumentFragment()

    sliceShop.then((data) => {
        data.forEach((item) => {
            const product = document.createElement('article')
            product.className = 'product'
        
            const img = document.createElement('img')
            const name = document.createElement('h3')
            const price = document.createElement('h4')
            const id = document.createElement('p')
        
            if ("bundle" in item) {
                img.src = item.bundle.image;
                name.textContent = item.bundle.name;
            } else if ("brItems" in item) {
                item.brItems.forEach((item) => {
                    if ("images" in item) {
                        if ("featured" in item.images) {
                            img.src = item.images.featured;
                        } else if ("icon" in item.images) {
                            img.src = item.images.icon
                        }
                        name.textContent = item.name
                    }
                });
            } else if ("tracks" in item) {
                item.tracks.forEach((item) => {
                    if ("albumArt" in item) {
                        img.src = item.albumArt
                    }
                    name.textContent = item.title
                })
            } else if ("instruments" in item) {
                item.instruments.forEach((item) => {
                    if ("images" in item) {
                        img.src = item.images.large
                    }
                    name.textContent = item.name
                })
            }
        
            price.textContent = item.regularPrice + ' V-Bucks'
            id.textContent = cont
        
            product.appendChild(img)
            product.appendChild(name)
            product.appendChild(price)
            product.appendChild(id)
        
            fragment.appendChild(product)
        
            document.querySelector('.products').appendChild(fragment)
        
            cont++
        })
    })

}

const eventPages = () => {
    document.getElementById('next').addEventListener("click", nextPage)
    document.getElementById('before').addEventListener("click", beforePage)
}

const readData = () => {
    renderData()
}

const main = () => {
    readData()
    eventPages()
}

document.addEventListener("DOMContentLoaded", main)