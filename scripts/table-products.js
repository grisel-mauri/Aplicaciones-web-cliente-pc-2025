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
    button.addEventListener('click', () => {
        window.location.href = `./edit-product.html?id=${product.id}`;
    });

    actions.appendChild(button);
    row.appendChild(title);
    row.appendChild(price);
    row.appendChild(autor);
    row.appendChild(actions);

    return row;
}
const products = [];
const getProducts = async () => {
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
}

function renderProducts(list){
    list.forEach( product => {
        const row = createProductRow(product);
        grid.appendChild(row);
    });
}

getProducts();

// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', () => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});