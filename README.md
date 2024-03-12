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
