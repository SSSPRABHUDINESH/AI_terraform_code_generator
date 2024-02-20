document.addEventListener("DOMContentLoaded", function () {
    // Function to generate a response from OpenAI
    async function generateResponse() {
      const form = document.getElementById("openaiForm");
      const formData = new FormData(form);
  
      // Ensure 'instruction' is set to a default value if not provided by the user
      if (!formData.get("instruction")) {
        formData.set("instruction", "I need a terraform code for a vpc in gcp");
      }
  
      try {
        const response = await fetch("/generate-response", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        console.log("Frontend Response Data:", data);
  
        // Display the response directly without additional checks
        document.getElementById("response").innerText = data.response;
      } catch (error) {
        console.error("Error fetching or parsing JSON:", error.message);
        document.getElementById("response").innerText =
          "Error fetching or parsing the response.";
      }
    }
  
    // Attach the generateResponse function to a button click event
    const button = document.getElementById("generateButton");
    button.addEventListener("click", generateResponse);
  
    // Additional functions or code can be placed here
  
    // End of the DOMContentLoaded event listener
  });
  