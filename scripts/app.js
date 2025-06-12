const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const products = [];
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

const addToAirtable = async (product) => {
    const itemAirtable = {
        fields: product
    };
    fetch (API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    }).then(data => console.log(data));
}


const getProducts = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log('data', data);
    
    const productsMaped = data.records.map(item => {
        return {
        image: item.fields.image,
        title: item.fields.title,
        autor: item.fields.autor,
        price: item.fields.price,
        salePrice: item.fields.salePrice,
        };
    })
    console.log(productsMaped);
    renderProducts(productsMaped);
}

getProducts();

const grid=document.querySelector('.product-grid');
const searchInput = document.querySelector('#input-search-products');
const salePrice = document.querySelector('#sale-price');

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const image=document.createElement('img');
    image.src=product.image;  
    image.alt=product.name;

    const title=document.createElement('h3');
    title.textContent=product.title;

    const autor=document.createElement('p');
    autor.textContent=product.autor;

    const price=document.createElement('p');
    price.textContent=`$${product.price}`;

    const button=document.createElement('button');
    button.textContent='Agregar al carrito';
    button.addEventListener('click', () => {
        const exists = cartProducts.find(item => item.title === product.title);
        if (!exists) {
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            console.log('Producto agregado al carrito');
        }

    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(autor);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function renderProducts(list) {
    list.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
});
}


// filtro de busqueda
function filterProducts(text) {
    const filteredProducts = products.filter(product => {
        return (
            product.title.toLowerCase().includes(text.toLowerCase()) ||
            product.autor.toLowerCase().includes(text.toLowerCase())
        );
    });
    grid.innerHTML = '';
    renderProducts(filteredProducts);
    } 
searchInput.addEventListener('input', (e) => {
filterProducts(e.target.value);
});


//home cambio de imagen
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const titleLinks = document.querySelectorAll('#titles a');
    const initialImageSrc = mainImage.src;
    titleLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            const newImageSrc = link.dataset.image;
            if (newImageSrc) { 
                mainImage.src = newImageSrc;
            }
        }); 
    });
});

renderProducts(products);


// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');

newsletterbutton.addEventListener('click', () => {
    alert ('Gracias por suscribirte a nuestro newsletter!');
});



