function generateCode() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);

    fetch('/generate-code', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Generated Code:', data.code);
        // Handle the generated code as needed (display, etc.)
        const codeContainer = document.getElementById('codeContainer');
        codeContainer.innerText = data.code; // assuming you have a container to display the code
    })
    .catch(error => console.error('Error:', error));
}

