import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.NEXT_PUBLIC_API_KEY,
});
const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: "documents", // defaults, but good practice
  queryName: "match_documents", // ^^
});

const retriver = vectorStore.asRetriever();

export { retriver };
