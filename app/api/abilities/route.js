const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
import { headers } from "next/headers";
import { userAgent } from "next/server";

export default async function handler(req, res) {
  const user = await req.json(); // Assuming text data if not form data

  console.log("user", user.user_id);
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("price")
      .eq("user_id", user.user_id);
    console.log("data", data);

    return new Response(JSON.stringify(data), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ msg: error }), {
      status: 404, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  }
}

export { handler as POST };
