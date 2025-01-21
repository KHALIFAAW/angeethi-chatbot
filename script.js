const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value;
    userInput.value = '';

    addMessageToChat('user', userMessage);

    fetch('https://intense-woodland-59387-2a13a2b3e16f.herokuapp.com//api/chat', { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        const modelResponse = data.response;
        addMessageToChat('model', modelResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChat('model', 'An error occurred. Please try again.');
    });
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'model-message');
    messageElement.textContent = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}
