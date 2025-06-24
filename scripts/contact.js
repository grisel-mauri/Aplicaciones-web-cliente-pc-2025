const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'contact';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('responseMessage');
        
        
contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario, no se recargue la página

    try {
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value; 
        });
        const airtableData = { records: [{
            fields: {
                "name": data.name,
                "email": data.email,
                "message": data.message
            }
            }]
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(airtableData)
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.textContent = '¡Mensaje enviado con éxito!';
            contactForm.reset(); // Limpia el formulario después del éxito
        } else {
            console.error('Error de Airtable:', result);
            responseMessage.textContent = 'Hubo un error al enviar el mensaje';
        }
    } catch (error) {
        console.error('Error de red o al procesar la respuesta:', error);
        responseMessage.textContent = 'Error de conexión. Por favor, intenta de nuevo.';
    }
  });
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