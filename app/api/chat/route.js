import fs from "fs";
import pdf from "pdf-parse";
import { promisify } from "util";
const { createClient } = require("@supabase/supabase-js");
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"; // defaults to 1000 chars

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // api key
});

// change to post instead of handler??
let file_title;
let userId;
export default async function handler(req, res) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const file_id = data.get("file_id");
    file_title = data.get("file_title");
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
        console.log("response", response);
        return response.data[0].embedding; // This should access the numeric embedding directly
      });

      const embeddings = await Promise.all(embeddingsPromises);
      const numericEmbeddings = embeddings.map(
        (embeddingObj) => embeddingObj.embedding
      );

      console.log("Embeddings:", numericEmbeddings);

      const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert([{}]) // Replace with actual data if necessary
        .select();

      if (chatError) {
        console.error("Error inserting chat:", chatError);
        return; // Exit if there's an error
      }

      console.log("chatData", chatData);

      // Save the chat completion response

      // Database insertion for each chunk

      let chatId = chatData[0].id;

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

      console.log(
        "Documents with metadata and embeddings:",
        documentsWithForeignKeysAndEmbeddings
      );

      // Step 2: Insert documents into the Supabase table

      const { data, error } = await supabase
        .from("documents")
        .insert(documentsWithForeignKeysAndEmbeddings);

      if (error) throw error;

      console.log("Insertion successful", data);

      const responseObject = {
        message: "PDF processed",
        pdfIds: file_id,
        chatId: chatId,
      };

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
      };

      const response = new Response(JSON.stringify(responseObject), {
        status: 400, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      });

      return response;
    }

    // console.log("output", output);

    // const documentsWithForeignKeys = output.map((document) => ({
    //   ...document,
    //   user_id: userId, // Assuming userId is defined elsewhere in your code
    //   file_id: file_id, // Assuming file_id is defined elsewhere in your code
    // }));
    // console.log("each row", documentsWithForeignKeys);

    // await SupabaseVectorStore.fromDocuments(
    //   documentsWithForeignKeys,
    //   new OpenAIEmbeddings({
    //     openAIApiKey: process.env.NEXT_PUBLIC_API_KEY,
    //   }),
    //   {
    //     client: supabase,
    //     tableName: "documents",
    //   }
    // )
    //   .then((data) => {
    //     console.log("Insertion successful", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error inserting documents:", error);
    //   });
    // const responseObject = {
    //   message: "PDF processed",
    // };

    //   const response = new Response(JSON.stringify(responseObject), {
    //     status: 200, // Set the status code to 200 (OK)
    //     headers: {
    //       "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
    //     },
    //   });

    //   return response;
  } catch (error) {
    const responseObject = {
      message: "PDF failed",
    };

    const response = new Response(JSON.stringify(responseObject), {
      status: 400, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });

    return response;
  }

  //   const response = new Response(JSON.stringify(responseObject), {
  //     status: 404, // Set the status code to 200 (OK)
  //     headers: {
  //       "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
  //     },
  //   });

  //   return response;
  // }
}

// // Error Handling in Chunking: Add error handling in the splitIntoChunks function to manage any unexpected scenarios.
// function splitIntoChunks(text, file_id, maxChars = 2000) {
//   // https://chatgptdetector.co/chatgpt-character-limit/
//   let chunks = [];
//   let currentChunk = "";

//   text.split(/\s+/).forEach((word) => {
//     if (currentChunk.length + word.length > maxChars) {
//       chunks.push(currentChunk);
//       currentChunk = word;
//     } else {
//       currentChunk += ` ${word}`;
//     }
//   });

//   if (currentChunk) {
//     chunks.push(currentChunk);
//   }

//   return { chunks, file_id };
// }

// async function chatCompletion(chunk, text) {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: chunk },
//     ],
//     model: "gpt-3.5-turbo-0301",
//   });

//   // console.log("GPT RESPONSE", completion.choices[0].message.content);

//   return completion.choices[0].message.content;
// }
// async function processChunks(chunks, file_id) {
//   console.log("file_id", file_id);
//   const pdfText = [];
//   const responses = [];
//   const pdfIds = [];
//   let chatId;

//   for (const chunk of chunks) {
//     const response = await chatCompletion(chunk);
//     responses.push(response);
//     pdfText.push(chunk);
//   }

//   try {
//     const { data: chatData, error: chatError } = await supabase
//       .from("chats")
//       .insert([{}]) // Replace with actual data if necessary
//       .select();

//     if (chatError) {
//       console.error("Error inserting chat:", chatError);
//       return; // Exit if there's an error
//     }

//     // console.log("chatData", chatData);

//     // Save the chat completion response

//     // Database insertion for each chunk

//     chatId = chatData[0].id;

//     const { data, error } = await supabase
//       .from("pdfs")
//       .insert([
//         {
//           text: pdfText,
//           userId: userId,
//           chatId: chatId,
//           file_id: file_id,
//           pdf_title: file_title,
//         },
//       ]) // FIXXX HARDCODED USERID
//       .select();

//     if (error) {
//       throw error;
//     }

//     // Assuming the response contains the ID of the inserted record
//     // console.log("Inserted data", data);
//     const insertedPdfId = data[0].id;
//     pdfIds.push(insertedPdfId);
//   } catch (error) {
//     console.error("Error in processing chunk: ", error);
//   }

//   return { pdfIds, chatId };
// }

export { handler as POST };
