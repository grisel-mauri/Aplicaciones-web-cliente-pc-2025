const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

function createDescription(product) {
    const detail = document.createElement('article');
    detail.classList.add('product-description');

    const bookDetails = document.createElement('article');
    bookDetails.classList.add('book-details');

    const title=document.createElement('p');
    title.classList.add('book-title');
    title.textContent = product.title;

    const autor=document.createElement('p');
    autor.classList.add('book-autor');
    autor.textContent = product.autor;

    const gender=document.createElement('p');
    gender.classList.add('book-gender');
    gender.textContent = product.gender;

    const price=document.createElement('p');
    price.classList.add('book-price');
    price.textContent =`$${product.price}`;

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

    bookDetails.appendChild(title);
    bookDetails.appendChild(autor);
    bookDetails.appendChild(gender);
    bookDetails.appendChild(price);
    bookDetails.appendChild(addToCartButton);

    const bookSinopsis = document.createElement('article');
    bookSinopsis.classList.add('sinopsis');

    const sinopsis = document.createElement('p');
    sinopsis.classList.add('book-sinopsis');
    sinopsis.textContent = product.sinopsis;

    bookSinopsis.appendChild(sinopsis);

    const bookImage = document.createElement('article');
    bookImage.classList.add('book-image');

    const image=document.createElement('img');
    image.src = product.image;
    image.alt = product.title;

    bookImage.appendChild(image);

    detail.appendChild(bookDetails);
    detail.appendChild(bookSinopsis);
    detail.appendChild(bookImage);

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


// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', () => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});