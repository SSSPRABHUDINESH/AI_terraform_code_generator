const express = require('express');
const multer = require('multer');
const path = require('path');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
const port = 3000;

const vertex_ai = new VertexAI({ project: 'scenic-hydra-410305', location: 'us-central1' });
const model = 'gemini-pro-vision';

const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generation_config: {
        "max_output_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 32
    },
    safety_settings: [],
});

app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/generate-code', upload.single('image'), async (req, res) => {
    try {
        // Extract text from the form data
        const text = req.body.text;

        // Process the image and text as needed
        // ...

        // Call the generative model
        const reqPayload = {
            contents: [{ role: 'user', parts: [{ text: text }] }],
        };

        const streamingResp = await generativeModel.generateContentStream(reqPayload);

        let generatedCode = '';
        for await (const item of streamingResp.stream) {
            generatedCode += item;
        }

        res.status(200).json({ code: generatedCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

