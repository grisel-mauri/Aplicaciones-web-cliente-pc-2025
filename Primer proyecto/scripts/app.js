const products = [
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562789202i/1950540.jpg",
        title: "Cronicas marcianas",
        autor: "Ray Bradbury",
        price: 1000
    },
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562789202i/1950540.jpg",
        title: "Cronicas marcianas",
        autor: "Ray Bradbury",
        price: 1000
    },
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562789202i/1950540.jpg",
        title: "Cronicas marcianas",
        autor: "Ray Bradbury",
        price: 1000
    },
    {
        image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1562789202i/1950540.jpg",
        title: "Cronicas marcianas",
        autor: "Ray Bradbury",
        price: 1000
    }

];

const grid=document.querySelector('.product-grid');

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');

    const img=document.createElement('img');
    img.src=product.image;  
    img.alt=product.name;

    const title=document.createElement('h3');
    title.textContent=product.name;

    const autor=document.createElement('p');
    autor.textContent=product.autor;

    const price=document.createElement('p');
    price.textContent=`$${product.price}`;

    const button=document.createElement('button');
    button.textContent='Comprar';

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(autor);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

products.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
});


// boton newsletter
const newsletterbutton = document.querySelector('#newsletter-form');

newsletterbutton.addEventListener('click', () => {
    alert ('Gracias por suscribirte a nuestro newsletter!');
});