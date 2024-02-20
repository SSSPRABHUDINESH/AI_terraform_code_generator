// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the server when the page is loaded
    fetchData();
  });
  
  async function fetchData() {
    try {
      // Get user input and instruction from the form
      const userInput = document.getElementById("input").value;
      const userInstruction = document.getElementById("instruction").value;
  
      const response = await fetch(`/api/openai?input=${encodeURIComponent(userInput)}&instruction=${encodeURIComponent(userInstruction)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Display the response in the output container
      document.getElementById("output-container").innerHTML = `<pre>${data.choices[0].text}</pre>`;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  