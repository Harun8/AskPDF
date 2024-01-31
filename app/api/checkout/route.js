import { stripe } from "@/util/stripe/stripe";
import { headers } from "next/headers";
import getRawBody from "raw-body";
const { createClient } = require("@supabase/supabase-js");

export const config = {
  api: {
    bodyParser: false,
  },
};
const service_role_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdGxyaGpmYWJ0YXZ0Y2R0dnVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzI1ODA3NCwiZXhwIjoyMDE4ODM0MDc0fQ.l7D2kxoNeR03gvcMdl4TqqUgcC80lZ-2ISYgcia9TDw";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  service_role_key,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Access auth admin api
const adminAuthClient = supabase.auth.admin;

export default async function handler(req, res) {
  const headersList = headers();

  const signature = headersList.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  try {
    // const rawbody = await getRawBody(req);
    const rawbody = await req.text();
    event = stripe.webhooks.constructEvent(rawbody, signature, signingSecret);
  } catch (error) {
    console.log("error in webhooks", error);

    const responseObject = {
      success: false,
    };
    const response = new Response(JSON.stringify(responseObject), {
      status: 303, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });

    return response;
  }

  console.log("event", event);

  try {
    switch (event.type) {
      case "customer.subscription.updated":
        await updateSubscription(event);
        break;
      case "customer.subscription.deleted":
        await deleteSubscription(event);
        break;
    }

    const responseObject = {
      success: true,
    };
    const response = new Response(JSON.stringify(responseObject), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });

    return response;
  } catch (error) {
    console.log("error", error);
  }

  const responseObject = {
    success: true,
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

export async function updateSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("stripe_customer_id", stripe_customer_id)
    .single();

  if (profile) {
    const updatedSubscription = {
      subscription_status,
      price,
    };
    await supabase
      .from("profile")
      .update(updatedSubscription)
      .eq("stripe_customer_id", stripe_customer_id);
  } else {
    const customer = await stripe.customers.retrieve(stripe_customer_id);
    const name = customer.name;
    const email = customer.email;
    console.log("customer", customer);
    console.log("name", name);

    const newProfile = {
      name: name,
      email: email,
      stripe_customer_id: stripe_customer_id,
      subscription_status: subscription_status,
      price: price,
    };
    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile,
    });
  }
}

export async function deleteSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const deletedSubscription = {
    subscription_status,
    price: null,
  };
  await supabase
    .from("profile")
    .update(deletedSubscription)
    .eq("stripe_customer_id", stripe_customer_id);
}
