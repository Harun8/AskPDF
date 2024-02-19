async function retriver(queryText, file_id) {
  try {
    console.log("called", called);
    const response = await fetch("/api/llm/retriever", {
      method: "POST",
      body: JSON.stringify({
        queryText: queryText,
        file_id: file_id,
      }),
    });

    const data = await response.json();
    console.log("data in retriever file", data);
  } catch (error) {
    console.error(error);
  }
  return data || [];
}

export { retriver };
