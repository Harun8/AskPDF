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
//         return response.data[0].embedding; // This should access the numeric embedding directly
//       });

//       const embeddings = await Promise.all(embeddingsPromises);
//       const numericEmbeddings = embeddings.map(
//         (embeddingObj) => embeddingObj.embedding
//       );

//       const documentsWithForeignKeysAndEmbeddings = output.map(
//         (document, index) => ({
//           content: document.pageContent,
//           metadata: document.metadata,
//           embedding: embeddings[index], // Use the correctly formatted embedding
//         })
//       );

//

//       // Step 2: Insert documents into the Supabase table

//       const { data, error } = await supabase
//         .from("preview")
//         .insert(documentsWithForeignKeysAndEmbeddings);

//       if (error) throw error;

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

import { ChatOpenAI } from "@langchain/openai";
import { modelChooser } from "@/util/openai/modelChooser";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
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
  apiKey: process.env.OPENAI_API_KEY, // api key
});

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    config: {
      broadcast: { ack: true },
    },
  }
);
export const maxDuration = 60;
// export const dynamic = "force-dynamic";

export default async function handler(req, res) {


  try {
    setTimeout(() => {
      console.log('Function executed after 15 seconds' )
    }, 15000); // 15,000 milliseconds = 15 seconds
  
    const data = await req.json(); // Assuming text data if not form data

    const channelB = client.channel(`session-${data.sessionId}`);

    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      streaming: true,
      modelName: "gpt-4-0125-preview",
      //  temperature: 0.5
    });

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

    for await (const chunk of response) {
      await channelB.send({
        type: "broadcast",
        event: "acknowledge",
        payload: { message: chunk },
      });
    }
    client.removeChannel(channelB);

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
  const model = "text-embedding-3-small";
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

  if (error) {
    console.error("Error searching for documents:", error);
    return [];
  }

  return data || [];
}
