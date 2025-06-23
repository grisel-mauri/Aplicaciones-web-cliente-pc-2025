const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'cart';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

function createProductCartCard(product) {
    const card = document.createElement('article');
    card.classList.add('cart-card');

    const image=document.createElement('img');
    image.src=product.image;  
    image.alt=product.title;

    const title=document.createElement('h3');
    title.textContent=product.title;

    const price=document.createElement('p');
    price.textContent=`$${product.price}`;

    const button=document.createElement('button');
    button.textContent='Eliminar';
    button.addEventListener('click', () => {
        const exists = cartProducts.findIndex(item => item.title === product.title);
        if (exists !== -1) {
            cartProducts.splice(exists, 1);
            localStorage.setItem('cart', JSON.stringify(cartProducts));
            renderCartProducts(cartProducts);
        }
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    return card;
}

function renderCartProducts(list){
    const cartGrid = document.querySelector('.cart-card');
    cartGrid.innerHTML = '';
    
    list.forEach( product => {
        const card = createProductCartCard(product);
        cartGrid.appendChild(card);
    });
}
updateTotalAmount();

function updateTotalAmount() {
    const totalAmountSpan = document.getElementById('total-amount');
    const total = cartProducts.reduce((sum, product) => sum + product.price, 0);
    totalAmountSpan.textContent = total.toFixed(2);
}

renderCartProducts(cartProducts);



/*Formulario de compra*/
const cartForm = document.querySelector('.cart-form');
const messageSubmit = document.getElementById('messageSubmit');

cartForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subscription = document.getElementById('subscription').checked;
    const address = document.getElementById('address').value;
    const totalAmount = document.getElementById('total-amount').textContent;
    const productsInCart = cartProducts.map(product => product.title).join(', ');

    // Datos a enviar a Airtable
    const dataToSend = {
        fields: {
            "name": name,
            "email": email,
            "address": address,
            "subscription": subscription ? "Sí" : "No", 
            "totalAmount": parseFloat (totalAmount), 
            "productsInCart": productsInCart
        }
    };

    try {
        console.log('Datos enviados a Airtable:', JSON.stringify(dataToSend, null, 2));
        const response = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            messageSubmit.textContent = '¡Pedido enviado exitosamente!';
            //Limpiar el carrito y el localStorage después de un envío exitoso
            localStorage.removeItem('cart');
            cartProducts.length = 0; // Vacía el array en memoria
            renderCartProducts(cartProducts); // Vuelve a renderizar el carrito vacío
            cartForm.reset(); // Limpia el formulario
            updateTotalAmount(); // Actualiza el total a 0
        } else {
            const errorData = await response.json();
            console.error('Error al enviar a Airtable:', errorData);
            messageSubmit.textContent = 'Error al enviar el pedido!';
        }
    } catch (error) {
        console.error('Error de red o al enviar la solicitud:', error);
        messageSubmit.textContent = 'Hubo un problema de conexión. Por favor, verifica tu internet o inténtalo más tarde.';
    }
});


// boton newsletter
const newsletterbutton = document.querySelector('#btn-newsletter');
const messageNews = document.getElementById('messageNews');
newsletterbutton.addEventListener('click', () => {
    event.preventDefault(); //para que no recargue la página al hacer click
    messageNews.textContent = ('Gracias por suscribirte a nuestro newsletter!');
});