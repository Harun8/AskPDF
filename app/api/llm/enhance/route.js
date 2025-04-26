import { NextResponse } from "next/server";

import OpenAI from "openai";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const enhancePromptTemplate = PromptTemplate.fromTemplate(`
You are a professional prompt rewriter. 
Your job is to improve prompts to make them clearer and more effective without asking questions. 
If anything is unclear, assume a reasonable meaning and complete the prompt properly. 
Never ask the user for clarification. 
Here is the prompt to improve: "{prompt}"
Return the improved prompt directly.
`);


// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
export async function POST(req, res) {
  try {
    console.log("got in here")

    const data = await req.json(); // Assuming text data if not form data

    console.log("data is", data.prompt)
    const enhancePromptChain = enhancePromptTemplate
  .pipe(new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4.1-nano", // or "gpt-4", "gpt-3.5-turbo"
    temperature: 0.7,  // More creative
  }))
  .pipe(new StringOutputParser());

// Then you can use:
const result = await enhancePromptChain.invoke({ prompt: data.prompt });

console.log(result); // the enhanced prompt!



    // const completion = await client.chat.completions.create({
    //     model: "gpt-4.1-nano",
    //     messages: [
    //         {
    //             role: "user",
    //             content: `You are an assistant that improves user prompts. Your job is to rewrite the following prompt to be clearer, more detailed, and more effective. 
    //             If any part is unclear, make a reasonable assumption about what was meant. 
    //             Do not ask for clarification. Never say "could you clarify" or anything similar. 
    //             Just produce the improved version directly. Here is the prompt: ${data.prompt}`
    //                           },
    //     ],
    // });
    
    // console.log(completion)

    // console.log(completion.choices[0].message.content)
    // const answer = completion.choices[0].message.content

    return NextResponse.json({ data: result});


  } catch (error) {
    return NextResponse.json(error);

  }
}