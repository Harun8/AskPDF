import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY, // api key
  dangerouslyAllowBrowser: true, // should be false
});

const supabase = createClientComponentClient();

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.NEXT_PUBLIC_API_KEY,
});
// const vectorStore = new SupabaseVectorStore(embeddings, {
//   client: supabase,
//   tableName: "documents", // defaults, but good practice
//   queryName: "match_documents", // ^^
// });
const model = "text-embedding-ada-002";

async function retriver(queryText, file_id) {
  console.log("file_id", file_id);

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
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding, // Use the generated embedding here
    file_id: "01ed09d3-158c-4170-b6fd-5e0af3267563",
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

// const retriver = vectorStore.asRetriever();

export { retriver };
