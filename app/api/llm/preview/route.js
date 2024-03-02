// import fs from "fs";
// import pdf from "pdf-parse";
// import { promisify } from "util";
// const { createClient } = require("@supabase/supabase-js");
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"; // defaults to 1000 chars

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// const OpenAI = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // api key
//   dangerouslyAllowBrowser: true, // should be false
// });

// // change to post instead of handler??
// let file_title;
// let userId;
// export default async function handler(req, res) {
//   try {
//     const data = await req.formData();
//     const file = data.get("file");
//     file_title = data.get("file_title");

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const pdfData = await pdf(buffer);

//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 500,
//       separators: ["\n\n", "\n", " ", ""], // how it should split and it should prioritise this
//       chunkOverlap: 50,
//     });

//     const output = await splitter.createDocuments([pdfData.text]);
//     try {
//       // Assuming `documents` is an array of objects where each object has a `pageContent` field.
//       const embeddingsPromises = output.map(async (document) => {
//         // Select the model you want to use for embeddings
//         const model = "text-embedding-3-small";

//         const response = await openai.embeddings.create({
//           model: model,
//           input: document.pageContent,
//         });

//         // Assuming you want the embedding data, adjust according to actual response structure
//         console.log("response", response);
//         return response.data[0].embedding; // This should access the numeric embedding directly
//       });

//       const embeddings = await Promise.all(embeddingsPromises);
//       const numericEmbeddings = embeddings.map(
//         (embeddingObj) => embeddingObj.embedding
//       );

//       console.log("Embeddings:", numericEmbeddings);

//       const documentsWithForeignKeysAndEmbeddings = output.map(
//         (document, index) => ({
//           content: document.pageContent,
//           metadata: document.metadata,
//           embedding: embeddings[index], // Use the correctly formatted embedding
//         })
//       );

//       console.log(
//         "Documents with metadata and embeddings:",
//         documentsWithForeignKeysAndEmbeddings
//       );

//       // Step 2: Insert documents into the Supabase table

//       const { data, error } = await supabase
//         .from("preview")
//         .insert(documentsWithForeignKeysAndEmbeddings);

//       if (error) throw error;

//       console.log("Insertion successful", data);

//       const responseObject = {
//         message: "PDF processed",
//       };

//       const response = new Response(JSON.stringify(responseObject), {
//         status: 200, // Set the status code to 200 (OK)
//         headers: {
//           "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
//         },
//       });

//       return response;
//     } catch (error) {
//       console.error("Error creating embeddings:", error);
//       const responseObject = {
//         message: "PDF failed",
//       };

//       const response = new Response(JSON.stringify(responseObject), {
//         status: 400, // Set the status code to 200 (OK)
//         headers: {
//           "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
//         },
//       });

//       return response;
//     }
//   } catch (error) {
//     const responseObject = {
//       message: "PDF failed",
//     };

//     const response = new Response(JSON.stringify(responseObject), {
//       status: 400, // Set the status code to 200 (OK)
//       headers: {
//         "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
//       },
//     });

//     return response;
//   }
// }

// export { handler as POST };
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ^how to upload document to vector db if u want it changed ^^^^^^^^^^^^^^

import { ChatOpenAI } from "langchain/chat_models/openai";
import { modelChooser } from "@/util/openai/modelChooser";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import combineDocuments from "@/util/combineDocuments";
import formatConvHistory from "@/util/formatConvHistory";
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");

const standAloneQuestionTemplate = `Given some conversation history (if any) and a question, convert it into a standalone question.
conversation history: {conv_history}

question: {question}
standalone question:`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standAloneQuestionTemplate
);

const answerTemplate = `You're a helpful and enthusiastic suppport bot who can answer a given question about the context provided,
and the conversation history.
 Try to find the answer in the context.
 Do not try to make up an answer. Always speak as if you were chatting to a friend.
 context: {context}
 conversation history: {conv_history}
 question: {question}
 answer:
  `;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // api key
});

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 100,
      },
    },
  }
);

const channelB = client.channel("room-1");

export default async function handler(req, res) {
  try {
    const data = await req.json(); // Assuming text data if not form data
    console.log(data);

    const llm = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      streaming: true,
      modelName: "gpt-4-0125-preview",
      //  temperature: 0.5
    });

    console.log("min LLM ER:", llm);

    const standaloneQuestionchain = standaloneQuestionPrompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    const retrieverChain = RunnableSequence.from([
      (prevResult) => prevResult.standalone_question,
      (prevResult) => retriver(prevResult),
      combineDocuments,
    ]);

    const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQuestionchain,
        original_input: new RunnablePassthrough(),
      },
      {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history,
      },
      answerChain,
    ]);

    const response = await chain.stream({
      question: data.messageText,
      conv_history: await formatConvHistory(data.conv_history),
    });
    // channelB.subscribe((status) => {
    //   if (status === "SUBSCRIBED") {
    //     console.log("Successfully subscribed to the channel");
    //   }
    // });
    for await (const chunk of response) {
      console.log("chunk", chunk);
      channelB.send({
        type: "broadcast",
        event: "test",
        payload: { message: chunk },
      });
    }
    client.removeChannel(channelB);

    console.log("chain is", response);

    return new Response(JSON.stringify(response), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 404, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  }
}

export { handler as POST };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function retriver(queryText) {
  console.log("file_id");

  const model = "text-embedding-3-small";
  console.log("queryText", queryText);
  // Generate the embedding vector for the query text
  let queryEmbedding;
  try {
    const embeddingResult = await openai.embeddings.create({
      model: model,
      input: queryText,
    });
    if (embeddingResult.error) {
      console.error("Error generating embeddings:", embeddingResult.error);
      return [];
    }
    console.log("embeddingResult", embeddingResult);
    queryEmbedding = embeddingResult.data[0].embedding; // Adjust this line based on the actual structure of the response
  } catch (error) {
    console.error("Error during embedding generation:", error);
    return [];
  }
  // Now use the generated embedding as query_embedding in the RPC call
  const { data, error } = await supabase.rpc("match_preview", {
    query_embedding: queryEmbedding, // Use the generated embedding here
    // file_id: file_id,
    match_count: 10,
    filter: {},
  });

  console.log("data", data);

  if (error) {
    console.error("Error searching for documents:", error);
    return [];
  }

  return data || [];
}
