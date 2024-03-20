# [AskPDF](https://askpdfs.io)

<!-- 
What is askPDF
Why did i make askPDF
Technologies used
  Langchain
  Supabase
  Vector DB
  Realtime broadcast for streaming
  Sendgrid email service
  Stripe integration + webhooks
  lscache vs localstorage
-->

## What is AskPDF {Still in draft mode)

For an introduction AskPDF is a website where a user can upload and chat with their PDF's.

### Why did I make AskPDF? 

The reason for me making AskPDF was primarly to delve a bit further in to the NextJS framework. My first project in Nextjs was a simple wordle spinoff game called [numb3r](https://numb3r.vercel.app). And based of that small implementation of the game I enjoyed the framework, so I knew i wanted to make a bigger project. And as we know for the past few years utilizing/incorperating llm's (large language models) into real-world applications seems to be a hot commodity. 

So that is what I did. Jumping into working with LLM's and a bunch of new technologies that I haven't used before. So for the next section I will dive into the different technologies/tools i've used and what i've learned throughout making this application

> [!TIP]
> I have learnt not to use a bunch of new technologies at the same time. The importance of familiarity when working with tools is a massive guide to not run into as many bottlenecks as i maybe did ahaha


# Technologies

## Nextjs

## Openai API

One thing that was really straightforward was using the openai API. However the first intuitive thought was to use the chat completion API. So that is what i did for a good chunk of this project until I ran into some bottlenecks. 

One of them being that my implementation of code. There were sopme downsides into my first implementation:

```  js

async function processChunks(chunks, file_id) {
  for (const chunk of chunks) {
    const response = await chatCompletion(chunk);
    responses.push(response);
    pdfText.push(chunk);
  }
...
}


async function chatCompletion(chunk, text) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: chunk },
    ],
    model: "gpt-3.5-turbo-0301",
  });


  return completion.choices[0].message.content;
}

```

One of them being that i used the chat completion api for both processing my documents and answeing questions. For small sized documents wit only a few pages this seemed to work fine, but once you increase the input then not only would the performace take a huge hit but each question would be really expensive to compute since i was appending the whole document in to the chat completions API and calling it over a loop based on the chunks of the PDF. So if it was a big PDF then i would have a lot of chunks and a lot of calls to the API.

__So how did I do?__

Well I new i had to change direction in some sense, since this didn't seem to be an long term solution so I went to the OpenAI API documentation, read through their different API's and stumbled across their embedding API. Which was a way to measure the relatedness of text strings in a dimensional space, which could have either 1536 dimensions or 3072. So I read more about it and realised this was a quite better solution. And this is where I came across __LangChain__

## Langchain

And langchain is open source framework that makes it easier to set up applications that are build on LLM.

So I used langchain with my OpenAI API, and processed each uploaded PDF as embeddings and stored them in a vector database.


- Few-shot prompting
## Supabase

As a backend as a service i stumbled across supabase which was regarded as a firebase alternative. And after doing some research and reading their documentation, I figured that using supabse could be a smart option so that is what i did. 

My reasoning for choosing supabase what primarly on the fact that their documentation and tutorials was easy to understand and it seemed like they've got a relative big community, so there was

  ### Supabase vector DB

### Supabase realtime broadcast

### Supabase enviorments

## Sendgrid email service

## Stripe

## lscache vs localstorage

# Testing

## End-To-End testing with Cypress

# Diagrams

## Flow diagram showcasing how the interaction between the pdf and chat works behind the scenes

## Entity relationship diagram

# What is next? 

## Upcoming feature I will be working on for the next release

- [ ] Darkmode https://github.com/Harun8/AskPdf/issues/4
- [ ] Heavy Refactoring
- [ ] Reduce response times on some api's
- [ ] Add OCR recognition for PDFs

## Final remarks

### If you made it so far, then thank you for taking your time and reading this. Feel free to star this repo if you've liked it

https://www.allabtai.com/wp-content/uploads/2022/12/big-file-summerize-gpt3.jpg

# NOTE: Right now this readme is only being utilized as notes for myself, which will be changed soon explaining everything about this project

## Note to self


Anything older/weaker than the "gpt-3.5-turbo-0125", seems to be useless, on first test

## table schema

![diagram-export-13 1 2024-12 25 23](https://github.com/Harun8/AskPdf/assets/66841357/9321178c-b706-4dd8-bbdf-c744680a5d2d)

## How I set up my ´To Do Board´ to roll out the first version (beta), so I could get some feedback before opening it up to more users

![image](https://github.com/Harun8/AskPdf/assets/66841357/82900860-52cc-42d3-8e8a-8e226a724e6b)

### General thoughts through my iterations

Version 1: legacy branch

- Used openai chat model
- Had a timecomplexity of O(N), when it came to processing documents, fine for small documents, very bad for massive documents
- ^^ Show code example

Version 2: Current one

- Using openai embddings model via langChain
- Using a vector database
- Trouble with appending user_id, file_id onto langChain supabaseVectorStore, nothing in documentation and i am following normal practice
- Trying to figure out how a user who used a OTP can login without OTP the next time they want to log in.
- Realtime broadcast
- SendGrid/twillio
- Vector database with 1500 + dimensions could go up to 3000+
- Sripe integration (webhooks)
- Fix ER diagram
- Supabase realtime broadcast
- Route 504 timeout from vercel
- lscache vs localstorage

Using UUID's bad for database performance? https://planetscale.com/blog/the-problem-with-using-a-uuid-primary-key-in-mysql


- Streaming responses
- Authentication and authorization
- Flow diagram of the chat part
- sequence diagram
