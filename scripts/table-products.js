const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const grid =  document.querySelector('#product-list');

function createProductRow(product) {
    const row = document.createElement('tr');

    const title = document.createElement('td');
    title.textContent = product.title;

    const price = document.createElement('td');
    price.textContent = `$${product.price}`;

    const autor = document.createElement('td');
    autor.textContent = product.autor;

    const actions = document.createElement('td');
   
    const button = document.createElement('button');
    button.textContent = 'Modificar';
    button.classList.add('edit-button');
    button.addEventListener('click', () => {
        window.location.href = `./edit-product.html?id=${product.id}`;
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', async () => {
        const productIdToDelete = product.id;
        try {
            const response = await fetch(`${API_URL}/${productIdToDelete}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });
            if (response.ok) {
                row.remove(); // Elimina la fila de la tabla
                console.log('Producto eliminado con éxito');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    });



    actions.appendChild(button);
    actions.appendChild(deleteButton);
    row.appendChild(title);
    row.appendChild(price);
    row.appendChild(autor);
    row.appendChild(actions);

    return row;
}
const products = [];
const getProducts = async () => {
    try {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log('data', data);

    const productsMaped = data.records.map(item => {
        return {
            id: item.id,
            title: item.fields.title,
            autor: item.fields.autor,
            price: item.fields.price
        };
    })
    console.log(productsMaped);

    renderProducts(productsMaped);
    } catch (error) { 
        console.error('Error al obtener o procesar los productos:', error);
    }
};

function renderProducts(list){
    list.forEach( product => {
        const row = createProductRow(product);
        grid.appendChild(row);
    });
}

getProducts();

//hamburger menu
const hamburgerButton = document.getElementById('hamburger-menu');
const navBar = document.getElementById('navbar'); 
hamburgerButton.addEventListener('click', () => {
    navBar.classList.toggle('visible'); 
});

// Filtro de búsqueda
const searchInput = document.querySelector('#input-search-products');
const searchButton = document.querySelector('.search-button');

const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        const encodedSearchTerm = encodeURIComponent(searchTerm); //transforma el término de búsqueda para que sea incrustado en la URL
        window.location.href = `./cataloge.html?q=${encodedSearchTerm}`;// Redirige al catálogo con el término de búsqueda como parámetro 'q'
    } else {
        window.location.href = './cataloge.html';// Si el campo de búsqueda está vacío, redirige al catálogo sin filtro
    }
};
//boton de búsqueda
if (searchButton) {
    searchButton.addEventListener('click', performSearch);
}
//tecla enter para buscar
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}

// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', (event) => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});