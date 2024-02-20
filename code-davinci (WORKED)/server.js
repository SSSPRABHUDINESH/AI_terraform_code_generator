// server.js

const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey:  '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' ,
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.get("/api/openai", async (req, res) => {
  try {
    const userInput = req.query.input || "";
    const userInstruction = req.query.instruction || "";

    const response = await openai.edits.create({
      model: "code-davinci-edit-001",
      input: userInput,
      instruction: userInstruction,
      temperature: 0,
      top_p: 1,
    });

    res.json(response);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
