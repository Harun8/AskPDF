"use server"; // move
const fs = require("fs");
const pdf = require("pdf-parse");
const { OpenAIApi, Configuration } = require("openai");

let dataBuffer = fs.readFileSync("path to PDF file...");

function pdfParser(file) {
  pdf(file).then(function (data) {
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text);
  });
}

module.exports = pdfParser;

/*
async function readPdf(filePath) {
  let dataBuffer = fs.readFileSync(filePath);
  return pdf(dataBuffer); // returns a promise
}

function splitIntoChunks(text, maxChars = 3000) {
  let chunks = [];
  let currentChunk = "";

  text.split(/\s+/).forEach((word) => {
    if (currentChunk.length + word.length > maxChars) {
      chunks.push(currentChunk);
      currentChunk = word;
    } else {
      currentChunk += ` ${word}`;
    }
  });

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

async function queryOpenAI(chunk, apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  const openai = new OpenAIApi(configuration);

  let response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: chunk }],
  });

  return response.data.choices[0].message.content;
}

async function processPdf(filePath, apiKey) {
  try {
    const data = await readPdf(filePath);
    const chunks = splitIntoChunks(data.text);
    const responses = [];

    for (const chunk of chunks) {
      const response = await queryOpenAI(chunk, apiKey);
      responses.push(response);
    }

    return responses;
  } catch (error) {
    console.error("Error processing PDF:", error);
  }
}

// Example usage
const filePath = "path/to/your/pdf.pdf";
const apiKey = "your-openai-api-key";

processPdf(filePath, apiKey).then((responses) => {
  console.log(responses);
});

*/
