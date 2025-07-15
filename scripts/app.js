
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

//hamburger menu
const hamburgerButton = document.getElementById('hamburger-menu');
const navBar = document.getElementById('navbar'); 
hamburgerButton.addEventListener('click', () => {
    navBar.classList.toggle('visible'); 
});

// Filtro de búsqueda
const searchInput = document.getElementById('input-search-products');
const searchButton = document.querySelector('.search-button');

const performSearch = () => {
    const searchTerm = searchInput.value.trim(); //accede al texto, trim elimina espacios en blanco
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
const newsletterbutton = document.getElementById('btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', (event) => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});



