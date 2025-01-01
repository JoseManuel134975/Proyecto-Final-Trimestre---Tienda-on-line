import { getAPI } from "../utils/getAPI.js";



let currentPage = 1
const limit = 8
let loading = false

const nextPage = () => {
    currentPage++
    renderData(getNextData())
}

const filterByCategory = (promise, value) => {
    value = value.toLowerCase().replace(/\s+/g, '')
    console.log(value);
    const filter = promise.then((arr) => {
        return arr.filter((item) => "layout" in item && "category" in item.layout && item.layout.category.toLowerCase().replace(/\s+/g, '') === value)
    })
    return filter
}

const eventSubmit = () => {
    document.getElementById('submit').addEventListener("click", (event) => {
        event.preventDefault()

        const categoryValue = document.getElementById('categoria').value
        const sliceShop = getNextData()
        const newArr = filterByCategory(sliceShop, categoryValue)
        renderData(newArr)
    })
}

const beforePage = () => {
    currentPage--
    renderData(getNextData())
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
        if (currentPage === result) {
            document.getElementById('next').setAttribute("disabled", true);
        } else {
            document.getElementById('next').removeAttribute("disabled");
        }
    })
}

const renderData = (promise) => {
    document.querySelector('.products').innerHTML = ''

    let cont = 0
    loading = true
    // const sliceShop = getNextData()
    const fragment = document.createDocumentFragment()

    manageBtn()

    promise.then((data) => {
        data.forEach((item) => {
            console.log(item);
            const product = document.createElement('article')
            product.className = 'product'
            product.style.backgroundColor = 'transparent'
            product.style.boxShadow = 'none'

            const img = document.createElement('img')
            const name = document.createElement('h3')
            const price = document.createElement('h4')
            const id = document.createElement('p')

            img.style.opacity = 0;
            name.style.opacity = 0;
            price.style.opacity = 0;
            id.style.opacity = 0;

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

            if (loading) {
                const gif = document.createElement('img')
                gif.src = '../assets/img/load-32_256.gif'
                gif.id = 'load'

                product.appendChild(gif)

                const processing = setTimeout(function () {
                    gif.remove()
                    product.style.backgroundColor = 'lightgray'
                    product.style.boxShadow = '0 0 15px white'
                    img.style.opacity = 1;
                    name.style.opacity = 1;
                    price.style.opacity = 1;
                    id.style.opacity = 1;
                }, 1000)
            }

            document.querySelector('.products').appendChild(fragment)

            cont++
        })

        loading = false
    })
}

const eventPages = () => {
    document.getElementById('next').addEventListener("click", nextPage)
    document.getElementById('before').addEventListener("click", beforePage)
}

const readData = () => {
    renderData(getNextData())
}

const main = () => {
    readData()
    eventPages()
    eventSubmit()
}

document.addEventListener("DOMContentLoaded", main)