// script.js

// Function to generate response using OpenAI GPT
async function generateResponse() {
    const input = document.getElementById("inputText").value;
    const instruction = document.getElementById("instructionText").value;
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "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", // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "code-davinci-edit-001",
        input: input || null,
        instruction: instruction || null,
        temperature: 0,
        top_p: 1,
      }),
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/edits", requestOptions);
      const data = await response.json();
  
      // Display the response
      document.getElementById("response").innerText = data.choices[0]?.text || "No response";
    } catch (error) {
      console.error("Error:", error);
    }
  }
  