const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let products = [];
const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

//guardar productos en airtable
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

//obtener productos de airtable
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
        id: item.id,
        image: item.fields.image,
        title: item.fields.title,
        autor: item.fields.autor,
        price: item.fields.price,
        gender: item.fields.gender,
        };
    })
    products = productsMaped;
    console.log(productsMaped);
}

const grid=document.querySelector('.product-grid');
const searchInput = document.querySelector('#input-search-products');
const categoryCheckboxes = document.querySelectorAll('.category input[type="checkbox"]'); 
const minPriceInput = document.querySelector('.price-range input[type="number"]:first-of-type');
const maxPriceInput = document.querySelector('.price-range input[type="number"]:last-of-type');
const priceApplyButton = document.querySelector('.price-range button[type="submit"]');
const orderBySelect = document.querySelector('#order-by');

//crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    card.addEventListener('click', () => {
        window.location.href = `./product-description.html?id=${product.id}`;
    });

    const image=document.createElement('img');
    image.src=product.image;  
    image.alt=product.title;

    const title=document.createElement('h3');
    title.textContent=product.title;

    const autor=document.createElement('p');
    autor.textContent=product.autor;

    const price=document.createElement('p');
    price.classList.add('book-price');
    price.textContent=`$${product.price}`;

    const gender=document.createElement('p');
    gender.textContent=product.gender;

    const button=document.createElement('button');
    button.textContent='Agregar al carrito';
    
    const messageCart = document.getElementById('messageCart'); //no funciona
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const exists = cartProducts.find(item => item.title === product.title);
        if (!exists) {
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            messageCart.textContent = 'Agregado al carrito';
        }

    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(autor);
    card.appendChild(price);
    card.appendChild(gender);
    card.appendChild(button);

    return card;
}

function renderProducts(list) {
    grid.innerHTML = '';
    list.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
});
}


// filtro de busqueda
// barra de busqueda
const searchButton = document.querySelector('.search-button');
if (searchButton) {
    searchButton.addEventListener('click', filterProducts);
}
searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });


function filterProducts() {
    let filtered = [...products];
    //por autor o titulo
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (searchTerm) {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.autor.toLowerCase().includes(searchTerm)
        );
    }
    //por genero
    const selectedCategories = Array.from(categoryCheckboxes)
                                    .filter(checkbox => checkbox.checked)
                                    .map(checkbox => checkbox.value.toLowerCase());
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(product => selectedCategories.includes(product.gender.toLowerCase()));
    }
    //por precio
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);

    if (!isNaN(minPrice)) {
        filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
        filtered = filtered.filter(product => product.price <= maxPrice);
    }
    //ordenar productos
    const orderBy = orderBySelect.value;
    switch (orderBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'a-z':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'z-a':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
    renderProducts(filtered);
}
// Filtrar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    getProducts().then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearchTerm = urlParams.get('q');
        if (urlSearchTerm) {
            if (searchInput) {
                searchInput.value = urlSearchTerm;
            }
        }
        filterProducts();
    });

    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryCheckboxes.length > 0) {
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterProducts));
    }
    // El botón "Aplicar" 
    if (priceApplyButton) {
        priceApplyButton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página se recargue al enviar el formulario
            filterProducts();
        });
    }
    if (orderBySelect) orderBySelect.addEventListener('change', filterProducts);
});


// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', (event) => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});