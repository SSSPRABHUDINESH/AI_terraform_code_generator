const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendMessage() {
  const userMessage = userInput.value;
  if (!userMessage) return;

  displayMessage('user', userMessage);

  const response = await getOpenAIResponse(userMessage);
  displayMessage('chatbot', response.choices[0].message.content);

  userInput.value = '';
}

function displayMessage(role, content) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(role === 'user' ? 'user-message' : 'chatbot-message');
  messageElement.textContent = content;

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

async function getOpenAIResponse(userMessage) {
  const response = await fetch('/openai-api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userMessage }),
  });

  return response.json();
}
