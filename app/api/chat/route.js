import fs from "fs";
import pdf from "pdf-parse";
import { promisify } from "util";
const readFileAsync = promisify(fs.readFile);

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: "", // api key
  dangerouslyAllowBrowser: true, // should be false
});

// change to post instead of handler??
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Attempt to parse as form data
    const data = await req.formData();
    const file = data.get("file");

    if (file) {
      // Handle file processing
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const pdfData = await pdf(buffer);
      console.log("PDF text", pdfData.text);
      splitIntoChunks(pdfData.text);
      return res
        .status(200)
        .json({ message: "PDF processed", text: pdfData.text });
    } else {
      console.log("SHIT AINT A FILE MFF");
    }
  } catch (error) {
    console.error("Error processing form data:", error.message);
    // If form data parsing fails, proceed to handle as text input
  }

  // Handle as text input
  try {
    const textData = await req.json(); // Assuming text data if not form data
    console.log("Received text data:", textData);

    chatCompletion(textData.message);

    res.status(200).json({ message: "Text processed", data: textData });
  } catch (innerError) {
    console.error("Error processing text data:", innerError.message);
    res.status(500).json({ error: innerError.message });
  }
}

// Error Handling in Chunking: Add error handling in the splitIntoChunks function to manage any unexpected scenarios.
function splitIntoChunks(text, maxChars = 2000) {
  // https://chatgptdetector.co/chatgpt-character-limit/
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

  // call openapi chat completion here
  processChunks(chunks);
  console.log("chunks", chunks);

  return chunks;
}

async function chatCompletion(chunk, text) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: chunk },
      {
        role: "user",
        content: text,
      }, // checker that it got all chunks
    ],
    model: "gpt-3.5-turbo-0301",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

async function processChunks(chunks) {
  const responses = [];

  for (const chunk of chunks) {
    try {
      const response = await chatCompletion(chunk);
      responses.push(response);
    } catch (error) {
      console.error("Error in processing chunk: ", error);
      // Handle the error (e.g., break the loop, skip this chunk, etc.)
    }
  }

  return responses;
}

export { handler as POST };
