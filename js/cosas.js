const limit = 8
let currentPage = 1
let loading = false
const productsSec = document.querySelector('.products')


const showCurrentShop = (arr) => {
    const shop = arr
    const sectionDOM = dom
    let cont = 0
    
    shop.data.entries.forEach(item => {
        const fragment = document.createDocumentFragment()
        
        const product = document.createElement('article')
        product.className = 'product'

        const img = document.createElement('img')
        const name = document.createElement('h3')
        const price = document.createElement('h4')
        const id = document.createElement('p')

        if ("bundle" in item) {
            img.src = item.bundle.image;
            name.textContent = item.bundle.name;
        } else if("brItems" in item) {
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
        } else if("tracks" in item) {
            item.tracks.forEach((item) => {
                if("albumArt" in item) {
                    img.src = item.albumArt
                }
                name.textContent = item.title
            })
        } else if("instruments" in item) {
            item.instruments.forEach((item) => {
                if("images" in item) {
                    img.src = item.images.large
                }
                name.textContent = item.name
            })
        }

        price.textContent = item.regularPrice + ' V-Bucks'
        id.textContent = cont

        fragment.appendChild(img)
        fragment.appendChild(name)
        fragment.appendChild(price)
        fragment.appendChild(id)
        product.appendChild(fragment)
        sectionDOM.appendChild(product)

        cont++
    });
}

const renderCurrentShop = async () => {
    const shop = await getAPI('https://fortnite-api.com/v2/shop')
    const shopLimited = getNextData(currentPage, shop)
    showCurrentShop(shopLimited, productsSec)
}

const getNextData = (page, arr) => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const allShop = arr
    return allShop.data.entries.slice(startIndex, endIndex)
}
    
// window.addEventListener('scroll', async () => {
//     if (
//         window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000
//     ) {
//         if(loading) {
//             return
//         }

//         currentPage++
        
//         loading = true
//         const currentShop = await getAPI();
//         loading = false

//         const newProducts = getNextData(currentPage, currentShop.shop)

//         if(newProducts.length > 0) {
//             showCurrentShop(newProducts, productsSec)
//         } else {
//             console.log('Se acabó');
//         }

//     }
// });    

document.addEventListener("DOMContentLoaded", renderCurrentShop)


// // const main = () => {
// //     showCurrentShop(currentShop.shop, productsSec)
// // }

// document.addEventListener("DOMContentLoaded", async () => {
//     try {
//         // Llamada a la API
//         loading = true
//         const currentShop = await getAPI(url, apiKey);
//         loading = false

//         // Mostrar los productos
//         const productsSec = document.querySelector('.products');
//         const limitProducts = getNextData(currentPage, currentShop.shop)
//         currentPage++
//         showCurrentShop(limitProducts, productsSec);
//     } catch (error) {
//         console.error("Error al cargar la tienda:", error);
//     }
// });


















// const loadData = async () => {
//     const json = await getAPI('../json/fortnite.json')
//     console.log(json);
//     const limit = 8
//     let currentPage = 1
//     let loading = false
    
//     const showShop = (arr) => {
//         const productsDOM = document.querySelector('.products')
    
//         arr.forEach(item => {
//             const price = document.createElement('h4');
    
//             const product = document.createElement('article');
//             product.classList.add('product');
    
//             const name = document.createElement('h3');
//             const img = document.createElement('img');
    
//             price.textContent = item.regularPrice + ' V-Bucks';
    
            // if ("bundle" in item) {
            //     img.src = item.bundle.image;
            //     name.textContent = item.bundle.name;
            // } else if("brItems" in item) {
            //     item.brItems.forEach((item) => {
            //         if ("images" in item) {
            //             if ("featured" in item.images) {
            //                 img.src = item.images.featured;
            //             } else if ("icon" in item.images) {
            //                 img.src = item.images.icon
            //             }
            //         }
            //         name.textContent = item.name;
            //     });
            // }
    
//             product.appendChild(img);
//             product.appendChild(name);
//             product.appendChild(price);
//             productsDOM.appendChild(product);
//         });
//     }
    
//     const getNextData = (page) => {
//         const startIndex = (page - 1) * limit
//         const endIndex = startIndex + limit
//         return json.data.entries.slice(startIndex, endIndex)
//     }

//     showShop(getNextData(currentPage))
    
//     window.addEventListener('scroll', () => {
//         if (
//             window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000
//         ) {
//             if(!loading) {
//                 loading = true
//                 currentPage++
//                 const newProducts = getNextData(currentPage)
        
//                 if(newProducts.length > 0) {
//                     showShop(newProducts)
//                 } else {
//                     console.log('Se acabó');
//                 }
//                 loading = false
//             }
//         }
//     });    
// }


// document.addEventListener("DOMContentLoaded", loadData)





// let currentIndex = 0;
// const limit = 8;

// const showData = async (productsA) => {
//     const products = document.querySelector('.products')
//     const data = await productsA

//     data.forEach(item => {
//         const price = document.createElement('h4');
//         const product = document.createElement('article');
//         product.classList.add('product');
//         const name = document.createElement('h3');
//         const img = document.createElement('img');

//         price.textContent = item.regularPrice + ' V-Bucks';

//         if ("bundle" in item) {
//             img.src = item.bundle.image;
//             name.textContent = item.bundle.name;
//         } else {
//             item.brItems.forEach((item) => {
//                 if ("images" in item) {
//                     if ("featured" in item.images) {
//                         img.src = item.images.featured;
//                     } else if ("icon" in item.images) {
//                         img.src = item.images.icon
//                     }
//                 }
//                 name.textContent = item.name;
//             });
//         }

//         product.appendChild(img);
//         product.appendChild(name);
//         product.appendChild(price);
//         products.appendChild(product);
//     });
// }

// const getData = async () => {
//     const shopJSON = await getAPI('https://fortnite-api.com/v2/shop');
//     const filterByLimit = shopJSON.data.entries.slice(currentIndex, currentIndex + limit);
//     const filterByCurrent = filterByLimit.filter((item) => ("brItems" in item) || ("bundle" in item) || ("brItems" in item && "images" in item.brItems))

//     currentIndex += limit;
//     return filterByCurrent
// };

// const getDataByFilter = async (productsA, inputValue) => {
//     const data = await productsA
//     const filterByCategorie = data.filter((item) => "layout" in item && item.layout.category == inputValue)
//     return filterByCategorie
// }

// const removeDOM = () => {
//     const products = document.querySelector('.products')
//     products.innerHTML = ''
// }

// const infiniteScroll = () => {
//     let load = false

//     window.addEventListener('scroll', async () => {
//         if (
//             window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000
//         ) {
//             if (!load) {
//                 load = true
//                 const loading = document.createElement('img')
//                 const products = document.querySelector('.products')
//                 loading.src = '../assets/img/load-32_256.gif'
//                 loading.id = 'gif'
//                 products.appendChild(loading)
//                 const data = getData()
//                 const dataFiltered = getDataByFilter(data)
//                 const submit = document.getElementById('submit')

//                 submit.onclick = async function() {
//                     const inputValue = document.getElementById('categoria').value
//                     await showData(dataFiltered, inputValue);
//                 };
                
//                 await showData(data)
//                 load = false
//                 loading.remove()
//             }
//         }
//     });
// }

// const main = () => {
//     const submit = document.getElementById('submit')
//     const products = getData()
//     showData(products)
//     infiniteScroll()

//     submit.addEventListener("click", async (event) => {
//         event.preventDefault()

//         const inputValue = document.getElementById('categoria').value
//         const allFilter = await getDataByFilter(products, inputValue)
//         console.log(allFilter);

//         removeDOM()
//         showData(allFilter)
//     })
// };

// document.addEventListener("DOMContentLoaded", main);