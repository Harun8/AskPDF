const OpenAI = require("openai");
const pdf = require("../public/pdf.pdf");
require("dotenv").config();

console.log(process.env.OPENAI_SECRET_KEY);
const openai = new OpenAI({
  apiKey: "", // api key
  dangerouslyAllowBrowser: true, // should be false
});

async function sendFileToOpenAi(pdf) {
  const file = await openai.files.create({
    file: pdf,
    purpose: "search", // The purpose might differ based on the API's current specifications
  });

  console.log(file);
}

module.exports = sendFileToOpenAi;
