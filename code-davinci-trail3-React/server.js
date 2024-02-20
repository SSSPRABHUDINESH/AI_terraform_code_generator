const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: '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',
});

app.post('/generate-response', async (req, res) => {
  try {
    const { input, instruction } = req.body;

    const response = await openai.edits.create({
      model: 'code-davinci-edit-001',
      input: input || '',
      instruction: instruction || '',
      temperature: 0,
      top_p: 1,
    });

    res.json(response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
