import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // api key
  dangerouslyAllowBrowser: true, // should be false
});

const supabase = createClientComponentClient();

const model = "text-embedding-ada-002";

export default async function handler(req, res) {
  const data = await req.json(); // Assuming text data if not form data

  try {
    const response = await retriver(data.queryText, data.file_id);
    console.log("response", response);
    return new Response(JSON.stringify(response), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ error: "could not retrieve document vectors" }),
      {
        status: 404, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      }
    );
  }
}
export { handler as POST };

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
    file_id: file_id,
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

export { retriver };
