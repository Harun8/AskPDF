export default async function handler(req, res) {
  //   const { id } = req.query; // Uncomment this
  // Perform operations with `id` here...
  const textData = await req.json(); // Assuming text data if not form data

  const responseObject = {
    message: "YO MAIIIN",
  };
  const response = new Response(JSON.stringify(responseObject), {
    status: 200, // Set the status code to 200 (OK)
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
    },
  });

  return response;
}

export { handler as POST };
