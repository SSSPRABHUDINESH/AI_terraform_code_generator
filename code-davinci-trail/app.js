const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 3000;

const openai = new OpenAI({ apiKey: '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' });

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/generate-response", async (req, res) => {
  const input = req.body.input || "";
  const instruction = req.body.instruction || "I need a terraform code for a vpc in gcp";

  try {
    const response = await openai.edits.create({
      model: "code-davinci-edit-001",
      input,
      instruction,
      temperature: 0,
      top_p: 1,
    });

    console.log("OpenAI API Response:", response);

    const choices = response.data && response.data.choices ? response.data.choices : [];
    const text = choices.length > 0 ? choices[0].text.trim() : "No response from OpenAI.";

    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
