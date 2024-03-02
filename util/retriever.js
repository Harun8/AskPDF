// const { createClient } = require("@supabase/supabase-js");

// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // api key
//   dangerouslyAllowBrowser: "true",
// });

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default async function retriver(queryText, file_id) {
//   //   console.log("file_id", file_id);

//   const model = "text-embedding-3-small";
//   //   console.log("queryText", queryText);
//   // Generate the embedding vector for the query text
//   let queryEmbedding;
//   try {
//     const embeddingResult = await openai.embeddings.create({
//       model: model,
//       input: queryText,
//     });
//     if (embeddingResult.error) {
//       console.error("Error generating embeddings:", embeddingResult.error);
//       return [];
//     }
//     // console.log("embeddingResult", embeddingResult);
//     queryEmbedding = embeddingResult.data[0].embedding; // Adjust this line based on the actual structure of the response
//   } catch (error) {
//     console.error("Error during embedding generation:", error);
//     return [];
//   }
//   // Now use the generated embedding as query_embedding in the RPC call
//   const { data, error } = await supabase.rpc("match_documents", {
//     query_embedding: queryEmbedding, // Use the generated embedding here
//     file_id: file_id,
//     match_count: 10,
//     filter: {},
//   });

//   //   console.log("data", data);

//   if (error) {
//     console.error("Error searching for documents:", error);
//     return [];
//   }

//   return data || [];
// }
