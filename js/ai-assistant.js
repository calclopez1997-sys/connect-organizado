document.addEventListener('DOMContentLoaded', () => {
    const fab = document.getElementById('ai-fab');
    const assistant = document.getElementById('ai-assistant');
    const closeBtn = document.getElementById('ai-close-btn');
    const sendBtn = document.querySelector('.ai-send-btn');
    const input = document.querySelector('.ai-input');
    const messageContainer = document.querySelector('.ai-message-container');

    fab.addEventListener('click', () => {
        assistant.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        assistant.style.display = 'none';
    });

    sendBtn.addEventListener('click', () => {
        const userMessage = input.value;
        if (userMessage.trim() !== '') {
            addMessage(userMessage, 'user');
            input.value = '';
            getAIResponse(userMessage);
        }
    });

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('ai-message', `${sender}-message`);
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function getAIResponse(userMessage) {
        let response;
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('hola')) {
            response = '¡Hola! ¿Cómo puedo ayudarte hoy?';
        } else if (lowerCaseMessage.includes('tarea')) {
            response = 'Puedo ayudarte a crear, editar o eliminar tareas. ¿Qué te gustaría hacer?';
        } else if (lowerCaseMessage.includes('nota')) {
            response = 'Puedo ayudarte a crear, editar o eliminar notas. ¿Qué necesitas?';
        } else {
            response = 'Lo siento, no entiendo esa pregunta. Por favor, intenta reformularla.';
        }

        setTimeout(() => {
            addMessage(response, 'ai');
        }, 500);
    }
});