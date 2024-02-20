const submitBtn = document.getElementById('submitBtn');
const responseDiv = document.getElementById('response');

submitBtn.addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    const imageFile = document.getElementById('imageFile').files[0];

    if (!prompt || !imageFile) {
        responseDiv.textContent = 'Please enter a prompt and select an image.';
        return;
    }

    // Validate image format and size (add checks as needed)
    if (!imageFile.type.startsWith('image/')) {
        responseDiv.textContent = 'Invalid image format. Please select an image.';
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('prompt', prompt);

    try {
        const response = await fetch('/api/generate-description', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        responseDiv.textContent = data.description;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'An error occurred. Please try again later.';
    }

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
