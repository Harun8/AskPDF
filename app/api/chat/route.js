import fs from "fs";
import pdf from "pdf-parse";
import { promisify } from "util";
const readFileAsync = promisify(fs.readFile);
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://hjtlrhjfabtavtcdtvuf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdGxyaGpmYWJ0YXZ0Y2R0dnVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNTgwNzQsImV4cCI6MjAxODgzNDA3NH0.AO_McXBnZ5ifxBko66NXN4OdWAs8536SS6W4DtpdG2s";

const supabase = createClient(supabaseUrl, supabaseKey);

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: "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", // api key
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

      const splitData = await processChunks(splitIntoChunks(pdfData.text));
      console.log("split data....", splitData);

      // console.log(
      //   "RESPONSEE ",
      //   new Response({
      //     message: "PDF processed",
      //     pdfIds: splitData.pdfIds,
      //   })
      // );

      // refactor this to one return
      const responseObject = {
        message: "PDF processed",
        pdfIds: splitData.pdfIds,
        chatId: splitData.chatId,
      };

      const response = new Response(JSON.stringify(responseObject), {
        status: 200, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      });

      return response;

      // return new Response({
      //   message: "PDF processed",
      //   pdfIds: splitData.pdfIds,
      // });

      // return res.status(200).json({

      // });

      // splitIntoChunks(pdfData.text);

      // return res
      //   .status(200)
      //   .json({ message: "PDF processed", text: pdfData.text });
    } else {
      console.log("SHIT AINT A FILE MFF");
    }
  } catch (error) {
    console.error("Error processing form data:", error.message);
    return res.status(500).json({ error: error });

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
  // processChunks(chunks); // Reason for my chunk being saved in the db twice
  // console.log("chunks", chunks);

  return chunks;
}

async function chatCompletion(chunk, text) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: chunk },
      // {
      //   role: "user",
      //   content: text,
      // }, // checker that it got all chunks
    ],
    model: "gpt-3.5-turbo-0301",
  });

  console.log("GPT RESPONSE", completion.choices[0].message.content);

  return completion.choices[0].message.content;
}
async function processChunks(chunks) {
  const pdfText = [];
  const responses = [];
  const pdfIds = [];
  let chatId;

  for (const chunk of chunks) {
    const response = await chatCompletion(chunk);
    responses.push(response);
    pdfText.push(chunk);
  }

  try {
    const { data: chatData, error: chatError } = await supabase
      .from("chats")
      .insert([{}]) // Replace with actual data if necessary
      .select();

    if (chatError) {
      console.error("Error inserting chat:", chatError);
      return; // Exit if there's an error
    }

    // console.log("chatData", chatData);

    // Save the chat completion response

    // Database insertion for each chunk

    chatId = chatData[0].id;

    const { data, error } = await supabase
      .from("pdfs")
      .insert([
        {
          text: pdfText,
          userId: "50b570bd-0f1d-4c00-aeeb-49cb082f89f6",
          chatId: chatId,
        },
      ]) // FIXXX HARDCODED USERID
      .select();

    if (error) {
      throw error;
    }

    // Assuming the response contains the ID of the inserted record
    console.log("Inserted data", data);
    const insertedPdfId = data[0].id;
    pdfIds.push(insertedPdfId);
  } catch (error) {
    console.error("Error in processing chunk: ", error);
  }

  return { pdfIds, chatId };
}

export { handler as POST };
