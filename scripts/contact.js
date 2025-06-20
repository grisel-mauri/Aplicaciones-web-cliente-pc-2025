const API_TOKEN= 'patoSHfjQKBj2XWMH.8dbaf7fd7849167a531bf1664ffbea0c781033fefdb77aa60095c90e47ad0642';
const BASE_ID= 'appefYnUgC93kCHAG';
const TABLE_NAME = 'contact';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const responseMessage = document.getElementById('responseMessage');
        
        
contactForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario, no se recargue la página
    responseMessage.textContent = 'Enviando mensaje...';

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
                'Authorization': `Bearer ${API_TOKEN}` // Aquí se envía el token directamente
            },
            body: JSON.stringify(airtableData)
        });

        const result = await response.json();

        if (response.ok) {
            responseMessage.textContent = '¡Mensaje enviado con éxito a Airtable!';
            responseMessage.style.color = 'green';
            contactForm.reset(); // Limpia el formulario después del éxito
        } else {
            console.error('Error de Airtable:', result);
            // Muestra un mensaje de error más específico si Airtable lo proporciona
            responseMessage.textContent = `Hubo un error al enviar el mensaje: ${result.error?.message || 'Error desconocido'}`;
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error de red o al procesar la respuesta:', error);
        responseMessage.textContent = 'Error de conexión. Por favor, intenta de nuevo.';
        responseMessage.style.color = 'red';
    }
  });
});