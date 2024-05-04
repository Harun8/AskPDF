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
  lscache vs localstorage.
-->

## What is AskPDF { Stable draft mode)

For an introduction AskPDF is a website where a user can upload and chat with their PDF's

### Why did I make AskPDF? 

The reason for me making AskPDF was primarly to delve a bit further in to the NextJS framework. My first project in Nextjs was a simple wordle spinoff game called [numb3r](https://numb3r.vercel.app). And based of that small implementation of the game I enjoyed the framework, so I knew i wanted to make a bigger project. And as we know for the past few years utilizing/incorperating llm's (large language models) into real-world applications seems to be a hot commodity. 

So that is what I did. Jumping into working with LLM's and a bunch of new technologies that I haven't used before. So for the next section I will dive into the different technologies/tools i've used and what i've learned throughout making this application

> [!TIP]
> I have learnt not to use a bunch of new technologies at the same time. The importance of familiarity when working with tools is a massive guide to not run into as many bottlenecks as i maybe did 


# Technologies

## Nextjs

## Openai API

One thing that was really straightforward was using the openai API. However the first intuitive thought was to use the chat completion API. So that is what i did for a good chunk of this project until I ran into some bottlenecks. 

One of them being that my implementation of code. There were some downsides into my first implementation:

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

Well I new i had to change direction in some sense, since this didn't seem to be an long term solution so I went to the OpenAI API documentation, read through their different API's and stumbled across their embedding API. Which was a way to measure the relatedness of text strings in a dimensional space, which could have either 1536 dimensions or 3072. So I read more about it and realised this was a quite better solution. And this is where I came across __LangChain__.

## Langchain

And langchain is open source framework that makes it easier to set up applications that are built on LLM. So I used langchain with my OpenAI API, and processed each uploaded PDF as embeddings and stored them in a vector database. The reason for using langchain was to simplify the interaction with an LLM. The benefits of using LangChain is that it is model agnostic, meaning that you can quite easily switch out your preferred LLM, which I liked since I at some point want to do some benchmark testing on which LLM performs the best.


- Few-shot prompting
## Supabase

As a backend as a service I stumbled across supabase which was regarded as a firebase alternative. And after doing some research and reading their documentation, I figured that using supabse could be a smart option so that is what i did. My reasoning for choosing supabase whas primarly on the fact that their documentation and tutorials was easy to understand and it seemed like they've got a relative big community. Looking back at the implementation with supabase, it was a easy implementation and a really readable documentation. However for future projects I would probably like to have more control over my backend, and being able to switch database if nessecary. So even though my experience with supabase was pretty good, I just like having full control over my API

  ### Supabase vector DB

  Since each documents get's processeds as embeddings, they need to be stored correctly. And this is done via using a vector databse, initally I looked at Pinecone DB, which is a tailored vector database. However I looked into the supabase documentation and found that supabase it self (or more postgres) supported vector databases.

### Supabase realtime broadcast

Since this application inccorperated a chat element, it was important that we could brodcast realtime changes to the client. OpenAI makes streaming of words possible where each letter and/or word (token) get's streamed one by one to give a more nice look, instead of dumping the answer in one big response. In order to achieve this you'll need to be able to broadcast constant changes from the server side code to the client side, which was done with supabases realtime broadcast. Looking outside of supabase you could also solve this with socket.io. 

### Supabase enviorments

## Sendgrid email service

I use sendgrid as my email providing service, came across it doing my internship and it was pretty easy to setup. 

## Stripe



## lscache vs localstorage

I use lscache to limit request to the API on demo version (where user login isn't required), to control amount of request 

```  js

  const index = lscache.get("questions");
    lscache.set("questions", index + 1, 1440);
    if (counter == 10 || lscache.get("questions") > 10) {
      showToast(
        "Free daily questions limit reached",
        "Login to start asking more questions! :)"
      );
      return;
    }

```
The reason why I use lscache is that because you can set a "validation" time, so once that time runs out the specific cache get's removed

# Testing

## End-To-End testing with Cypress
I tend to do end to end test with cypress

# Diagrams

## Flow diagram showcasing how the interaction between the pdf and chat works behind the scenes.

## Entity relationship diagram

# What is next? 

## Upcoming feature I will be working on for the next release

- [x] Darkmode
- [ ] Heavy Refactoring
- [x] Reduce response times on some api's
- [ ] Add OCR recognition for PDFs
- [ ] Learn TypeScript and rewrite some modules


## How I set up my ´To Do Board´ to roll out the first version (beta), so I could get some feedback before opening it up to more users

![image](https://github.com/Harun8/AskPdf/assets/66841357/82900860-52cc-42d3-8e8a-8e226a724e6b)


## Final remarks

### If you made it so far, then thank you for taking your time and reading this. Feel free to star this repo if you've liked it, and feel free to msg me if there's anything :)
