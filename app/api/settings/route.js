import { SITE_URL } from "@/util/endpoints";
import { stripe } from "@/util/stripe/stripe";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import SupabaseClient from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  // Initialize server-side Supabase client
  const supabaseServerClient = createServerSupabaseClient({ req, res });
  // Retrieve the current user session from the server-side client

  //   const { user } = await supabase.auth.api.getUserByCookie(req);

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
  }
  console.log("data", user);

  // Proceed with your logic now that you have the user
  const { data: profile, error } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    .eq("userid", user.id)
    .single();

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
    return_url: "http://localhost:3000",
  });

  console.log("session", session);
  return new Response(JSON.stringify({ url: session.url }), {
    status: 200, // Set the status code to 200 (OK)
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
    },
  });
}

export { handler as GET };
