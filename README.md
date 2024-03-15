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

## What is AskPDF

For an introduction AskPDF is a website where a user can upload and chat with their PDF's.

### Why did I make AskPDF? 

The reason for me making AskPDF was primarly to delve a bit further in to the NextJS framework. My first project in Nextjs was a simple wordle spinoff game called [numb3r](https://numb3r.vercel.app). And based of that small implementation of the game I enjoyed the framework, so I knew i wanted to make a bigger project. And as we know 2022-2024 utilizing/incorperating llm's (large language models) into real-world applications seems to be a hot commodity. 

So that is what I did. Jumping into working with LLM's and a bunch of new technologies that I haven't used before. So for the next section I will dive into the different technologies/tools i've used and what i've learned throughout making this application

> [!TIP]
> I have learnt not to use a bunch of new technologies at the same time. The importance of familiarity when working with tools is a massive guide to not run into as many bottlenecks as i maybe did ahaha


# Technologies

## Nextjs

## Langchain

## Supabase

  ### Supabase vector DB

### Supabase realtime broadcast

## Sendgrid email service

## Stripe

## lscache vs localstorage


# Diagrams

## Flow diagram showcasing how the interaction between the pdf and chat works behind the scenes

## Entity relationship diagram

# What is next? 

## Upcoming feature I will be working on for the next release

- [ ] https://github.com/Harun8/AskPdf/issues/4
- [ ] #18

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


- Streaming responses
- Authentication and authorization
- Flow diagram of the chat part
- sequence diagram
