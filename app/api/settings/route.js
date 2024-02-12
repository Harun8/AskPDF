import { SITE_URL } from "@/util/endpoints";
import { stripe } from "@/util/stripe/stripe";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function handler(req, res) {
  console.log("SETTINGS BTN ROUTE I AM HERE");
  const supabaseServerClient = createServerComponentClient({
    req,
    res,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) res.status(401).send("not logged in");

  const { data: profile } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    .eq("userid", user.id)
    .single();

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: "/",
  });

  res.send({ url: session.return_url });
}

export { handler as GET };
