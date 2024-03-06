import { SITE_URL } from "@/util/endpoints";
import Stripe from "stripe";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SupabaseClient from "@supabase/auth-helpers-nextjs";
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  const user = await req.json(); // Assuming text data if not form data

  console.log("req.body", user);

  // Proceed with your logic now that you have the user
  const { data: profile, error } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  console.log("profile", profile);

  if (error) {
    return new Response(
      JSON.stringify({ msg: "retrieval of profile row failed.." }),
      {
        status: 404, // Set the status code to 200 (OK)
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
        },
      }
    );
  }

  console.log("data from profile table", profile);

  // Your existing Stripe session creation logic...
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${SITE_URL}`,
  });

  console.log("session", session);
  return new Response(JSON.stringify({ url: session.url }), {
    status: 200, // Set the status code to 200 (OK)
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
    },
  });
}

export { handler as POST };
