const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


// Cargar producto al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if(productId) {
        fetch(`${API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.error) {
                document.querySelector('#product-title').value = data.fields.title || '';
                document.querySelector('#product-price').value = data.fields.price || '';
                document.querySelector('#product-gender').value = data.fields.gender || '';
                document.querySelector('#product-autor').value = data.fields.autor || '';
                document.querySelector('#product-sinopsis').value = data.fields.sinopsis || '';
                document.querySelector('#product-image').value = data.fields.image || '';
            }
        })
        .catch(error => console.error('Error cargando producto:', error));
    }

});

function updateSubmit(event){
    event.preventDefault();
    
    // Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if(!productId) {
        alert('No se especificó ID de producto');
        return;
    }

    // Validar campos requeridos
    const title = document.querySelector('#product-title').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const gender = document.querySelector('#product-gender').value.trim();
    const autor = document.querySelector('#product-autor').value.trim();
    const sinopsis = document.querySelector('#product-sinopsis').value.trim();
    const image = document.querySelector('#product-image').value.trim();

    if(!title || isNaN(price)) {
        alert('Título y precio son campos requeridos. El precio debe ser numérico.');
        return;
    }

    const product = {
        title: title,
        price: price,
        gender: gender,
        autor: autor,
        sinopsis: sinopsis,
        image: image
    };

    const itemAirtable = {
        fields: product
    };

    fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers:{
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirtable)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            console.error('Error detallado:', data);
            alert(`Error al actualizar (${data.error.type}): ${data.error.message}`);
        } else {
            alert('Producto actualizado correctamente');
            window.location.href = './table-products.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al actualizar el producto');
    });
}

// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', () => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});