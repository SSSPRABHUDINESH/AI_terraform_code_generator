const submitBtn = document.getElementById("submitBtn");
const responseDiv = document.getElementById("response");
const dotenv = require('dotenv').config()

submitBtn.addEventListener("click", async () => {
    const prompt = document.getElementById("promptInput").value;
    const imageFile = document.getElementById("imageFile").files[0];

    if (!prompt || !imageFile) {
        responseDiv.textContent = "Please enter a prompt and select an image.";
        return;
    }

    // Securely transfer image data and prompt to backend (implementation details pending)
    const imageData = await sendImageToServer(imageFile);

    // Handle API key security (implementation details pending)
//    const apiKey = getApiKey(); // Replace with secure retrieval method
//    const apikey = process.env.API_KEY
    const model = new GoogleGenerativeAI(process.env.API_KEY);
    const imageParts = [{
        inlineData: {
            data: imageData, // Base64-encoded image data
            mimeType: imageFile.type // Image MIME type
        }
    }];

    const result = await model.getGenerativeModel({ model: "gemini-pro-vision" })
        .generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    responseDiv.textContent = text;
});
