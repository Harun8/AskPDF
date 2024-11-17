// Import necessary modules using ES syntax
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";
import pdf from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Initialize environment variables
dotenv.config();

// Initialize Supabase and OpenAI clients outside the handler to reuse across invocations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define maximum allowed file size (e.g., 10MB)
// const MAX_ALLOWED_SIZE = 10 * 1024 * 1024;

// Helper functions
async function parsePDF(buffer) {
  return await pdf(buffer);
}

async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ["\n\n", "\n", " ", ""],
    chunkOverlap: 50,
  });
  return await splitter.createDocuments([text]);
}

async function createEmbeddings(documents) {
  const embeddingsPromises = documents.map(async (doc) => {
    let retries = 3;
    //retry logic with exponential backoff for transient failures
    while (retries > 0) {
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: doc.pageContent,
        });
        return response.data[0].embedding;
      } catch (error) {
        if (--retries === 0) throw error;
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  });
  return await Promise.all(embeddingsPromises);
}

async function insertChat(userId) {
  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id: userId }])
    .select();
  if (error) throw error;
  return data[0].id;
}

async function insertDocuments(documents, embeddings, userId, fileId, chatId) {
  const documentsWithForeignKeys = documents.map((doc, index) => ({
    content: doc.pageContent,
    metadata: doc.metadata,
    embedding: embeddings[index],
    user_id: userId,
    file_id: fileId,
    chat_id: chatId,
  }));

  const { data, error } = await supabase
    .from("documents")
    .insert(documentsWithForeignKeys);
  if (error) throw error;
  return data;
}

// Main handler
export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const file_id = data.get("file_id");
    const file_title = data.get("file_title");
    const userId = data.get("userId");

    if (!file || !file_id || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // if (file.size > MAX_ALLOWED_SIZE) {
    //   return NextResponse.json({ message: "File too large" }, { status: 400 });
    // }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await parsePDF(buffer);
    const documents = await splitText(pdfData.text);
    const embeddings = await createEmbeddings(documents);
    const chatId = await insertChat(userId);
    await insertDocuments(documents, embeddings, userId, file_id, chatId);

    return NextResponse.json({
      message: "PDF processed successfully",
      pdfIds: file_id,
      chatId: chatId,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { message: "Failed to process PDF", error: error.message },
      { status: 500 }
    );
  }
}
