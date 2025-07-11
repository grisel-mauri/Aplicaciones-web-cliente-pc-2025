const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form'); // Selecciona el formulario
    const messageProductForm = document.createElement('p');
    addProductForm.parentNode.insertBefore(messageProductForm, addProductForm.nextSibling); // Insertar después del formulario

    if (addProductForm) {
        addProductForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita que la página se recargue

            const title = document.getElementById('product-title').value;
            const autor = document.getElementById('product-autor').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const gender = document.getElementById('product-gender').value;
            const sinopsis = document.getElementById('product-sinopsis').value || ''; // Si está vacío, se envía cadena vacía
            const image = document.getElementById('product-image-upload').value; // Usamos el input con URL

            // Validaciones básicas
            if (!title || !autor || isNaN(price) || price < 0 || !gender || !image) {
                messageProductForm.textContent = 'Por favor, completa todos los campos requeridos';
                return; 
            }

            const dataToSend = {
                fields: {
                    "title": title,
                    "autor": autor,
                    "price": price,
                    "gender": gender,
                    "image": image,
                    "sinopsis": sinopsis
                }
            };

            // enviar los datos a Airtable
            try {
                const response = await fetch(API_URL, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_TOKEN}`
                    },
                    body: JSON.stringify(dataToSend)
                });

                if (response.ok) {
                    const result = await response.json();
                    messageProductForm.textContent = '¡Producto agregado con éxito!';
                    addProductForm.reset(); 

                } else {
                    const errorData = await response.json();
                    console.error('Error al agregar el producto a Airtable:', errorData);
                    messageProductForm.textContent = `Error al agregar producto`;
                }

            } catch (error) {
                console.error('Error de red o al enviar la solicitud:', error);
                messageProductForm.textContent = 'Hubo un problema de conexión. Por favor, verifica tu conexión a internet o inténtalo más tarde.';
            }
        });
    }

});

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



