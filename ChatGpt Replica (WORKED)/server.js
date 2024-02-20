const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI({ apiKey: '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' });

// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/openai-api', async (req, res) => {
  const { userMessage } = req.body;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userMessage }],
    temperature: 0.7,
    max_tokens: 150,
  });

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

