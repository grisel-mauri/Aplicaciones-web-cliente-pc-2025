

//home cambio de imagen
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const titleLinks = document.querySelectorAll('#titles a');
    titleLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            const newImageSrc = link.dataset.image;
            if (newImageSrc) { 
                mainImage.src = newImageSrc;
            }
        }); 
    });
    
});

const searchInput = document.querySelector('#input-search-products');
const searchButton = document.querySelector('.search-button'); // Usamos la clase del botón

const performSearch = () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Codifica el término de búsqueda para que sea seguro en una URL
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        // Redirige al catálogo con el término de búsqueda como parámetro 'q'
        window.location.href = `./cataloge.html?q=${encodedSearchTerm}`;
    } else {
        // Si el campo de búsqueda está vacío, redirige al catálogo sin filtro
        window.location.href = './cataloge.html';
    }
};

if (searchButton) {
    searchButton.addEventListener('click', performSearch);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
}
    // --- Fin de la lógica de búsqueda en el home ---



// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');

newsletterbutton.addEventListener('click', () => {
    alert ('Gracias por suscribirte a nuestro newsletter!');
});



