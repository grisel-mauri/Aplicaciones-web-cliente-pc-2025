const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

function createDescription(product) {
    const detail = document.createElement('article');
    detail.classList.add('product-card');

    const image=document.createElement('img');
    image.src = product.image;
    image.alt = product.title;

    const title=document.createElement('p');
    title.textContent = product.title;

    const autor=document.createElement('p');
    autor.textContent = product.autor;

    const price=document.createElement('p');
    price.textContent =`$${product.price}`;

    const sinopsis=document.createElement('p');
    sinopsis.textContent = product.sinopsis;

    const gender=document.createElement('p');
    gender.textContent = product.gender;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Agregar al carrito';
    addToCartButton.addEventListener('click', () => {
        const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cartProducts.find(item => item.id === product.id);
        if (!exists) {
            cartProducts.push(product);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    });

    detail.appendChild(image);
    detail.appendChild(title);
    detail.appendChild(autor);
    detail.appendChild(price);
    detail.appendChild(sinopsis);
    detail.appendChild(gender);
    detail.appendChild(addToCartButton);

    return detail;
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDescription = document.getElementById('product-description');

    if (productId) {
        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            // 3. Mostrar los detalles del producto en la página
            if (data.fields) {
                const product = {
                    id: data.id,
                    image: data.fields.image,
                    title: data.fields.title,
                    autor: data.fields.autor,
                    price: data.fields.price,
                    gender: data.fields.gender,
                    sinopsis: data.fields.sinopsis || 'No hay descripción disponible.', 
                };

            // Llama a la función y agrega el resultado al DOM
            const descriptionElement = createDescription(product);
            productDescription.appendChild(descriptionElement);
        }
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            productDescription.innerHTML = '<p>Hubo un error al cargar los detalles del producto.</p>';
        }
    }
});