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

// Helper functions
async function parsePDF(buffer) {
  return await pdf(buffer);
}

async function splitText(text, chunkSize, chunkOverlap) {
  console.log("inserting chunksize: ", chunkSize);
  console.log("inserting chunkoverlap: ", chunkOverlap);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    separators: ["\n\n", "\n", " ", ""],
    chunkOverlap: chunkOverlap,
  });
  const result = await splitter.createDocuments([text]);

  if (result.length === 0) {
    return null;
  }
  return result;
}

function getChunkSettings(pageCount) {
  if (pageCount <= 10) {
    return { chunkSize: 500, chunkOverlap: 50 };
  } else if (pageCount <= 50) {
    return { chunkSize: 1000, chunkOverlap: 100 };
  } else {
    return { chunkSize: 2000, chunkOverlap: 200 };
  }
}

const BATCH_SIZE = 100; // Adjust as needed

async function createEmbeddings(documents) {
  if (!documents || documents.length === 0) {
    return [];
  }

  const parallelEmbeddings = [];

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batchDocs = documents.slice(i, i + BATCH_SIZE);
    parallelEmbeddings.push(
      openai.embeddings.create({
        model: "text-embedding-3-small",
        input: batchDocs.map((doc) => doc.pageContent),
      })
    );
  }

  // Run all embedding requests in parallel
  const results = await Promise.all(parallelEmbeddings);

  // Flatten all results into a single array of embeddings
  const allEmbeddings = results.flatMap((result) =>
    result.data.map((item) => item.embedding)
  );

  return allEmbeddings;
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
export const maxDuration = 60;

async function getPageCount(buffer) {
  const pdfData = await pdf(buffer);
  return pdfData.numpages;
}

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

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await parsePDF(buffer);
    const pageCount = await getPageCount(buffer);
    const { chunkSize, chunkOverlap } = getChunkSettings(pageCount);

    console.log("pageCount", pageCount);

    // Split PDF text into documents (chunks)
    const documents = await splitText(pdfData.text, chunkSize, chunkOverlap);
    if (!documents) {
      return NextResponse.json(
        { message: "No embedding created" },
        { status: 400 }
      );
    }

    // Create embeddings in batches
    const embeddings = await createEmbeddings(documents);

    // Insert a new chat row
    const chatId = await insertChat(userId);

    // Insert documents and embeddings into the database
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
