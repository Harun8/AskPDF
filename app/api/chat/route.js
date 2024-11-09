import fs from "fs";
import pdf from "pdf-parse";
import { promisify } from "util";
const { createClient } = require("@supabase/supabase-js");
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"; // defaults to 1000 chars
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // api key
});

let userId;
export async function POST(req, res) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const file_id = data.get("file_id");
    let file_title = data.get("file_title");
    userId = data.get("userId");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfData = await pdf(buffer);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      separators: ["\n\n", "\n", " ", ""], // how it should split and it should prioritise this
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([pdfData.text]);
    try {
      // Assuming `documents` is an array of objects where each object has a `pageContent` field.
      const embeddingsPromises = output.map(async (document) => {
        // Select the model you want to use for embeddings
        const model = "text-embedding-3-small";

        const response = await openai.embeddings.create({
          model: model,
          input: document.pageContent,
        });

        // Assuming you want the embedding data, adjust according to actual response structure
        return response.data[0].embedding; // This should access the numeric embedding directly
      });

      const embeddings = await Promise.all(embeddingsPromises);
      const numericEmbeddings = embeddings.map(
        (embeddingObj) => embeddingObj.embedding
      );
      const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert([{ user_id: userId }]) // Replace with actual data if necessary
        .select();

      if (chatError) {
        console.error("Error inserting chat:", chatError);
        return; // Exit if there's an error
      }

      // Save the chat completion response

      // Database insertion for each chunk

      let chatId = chatData[0].id;

      console.log(userId, file_id, chatId);

      const documentsWithForeignKeysAndEmbeddings = output.map(
        (document, index) => ({
          content: document.pageContent,
          metadata: document.metadata,
          embedding: embeddings[index], // Use the correctly formatted embedding
          user_id: userId, // Assuming userId is available in your context
          file_id: file_id, // Assuming fileId is available in your context
          chat_id: chatId,
        })
      );

      // Step 2: Insert documents into the Supabase table

      const { data, error } = await supabase
        .from("documents")
        .insert(documentsWithForeignKeysAndEmbeddings);

      if (error) throw error;

      console.log(
        "inserted this into documents table",
        documentsWithForeignKeysAndEmbeddings
      );

      const responseObject = {
        message: "PDF processed",
        pdfIds: file_id,
        chatId: chatId,
      };

      return NextResponse.json(responseObject);

      const response = new Response(JSON.stringify(responseObject), {
        status: 200, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      });

      return response;
    } catch (error) {
      console.error("Error creating embeddings:", error);
      const responseObject = {
        message: "PDF failed",
        error: error.message, // Include error message
        stack: error.stack, // Include stack trace if needed
      };

      return NextResponse.json(responseObject);

      const response = new Response(JSON.stringify(responseObject), {
        status: 400, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      });

      return response;
    }
  } catch (error) {
    const responseObject = {
      message: "PDF failed",
      error: error.message, // Include error message
      stack: error.stack, // Include stack trace if needed
    };
    return NextResponse.json(responseObject);

    const response = new Response(JSON.stringify(responseObject), {
      status: 400, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });

    return response;
  }
}
