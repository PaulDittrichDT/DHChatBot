// Function to send user input to the server
async function sendToServer(userInput) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_input=${encodeURIComponent(userInput)}`,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}

// Function to handle user's message submission
async function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    const chatbox = document.getElementById("chatbox");

    // Display user's message in the chatbox
    chatbox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        // Send user's message to the server
        const response = await sendToServer(userInput);

        // Display bot's response
        receiveMessage(response);
    } catch (error) {
        console.error('Error:', error);
        // Display an error message
        receiveMessage('An error occurred. Please try again.');
    }

    // Clear the input field
    document.getElementById("userInput").value = '';
}

// Function to receive and display bot's response
function receiveMessage(response) {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Example usage:
// receiveMessage("Hello! How can I help you?");
