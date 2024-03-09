import { headers } from "next/headers";
import getRawBody from "raw-body";
import Stripe from "stripe";
const { createClient } = require("@supabase/supabase-js");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SERVICE_KEY_ROLE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Access auth admin api
const adminAuthClient = supabase.auth.admin;
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  const headersList = headers();

  const signature = headersList.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  let pID;
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
  console.log("UpdatedSub called");
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;

  // Case: 1, they buy a plan before logging in
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
    const { data, error } = await supabase
      .from("profile")
      .update(updatedSubscription)
      .eq("stripe_customer_id", stripe_customer_id);
  } else {
    console.log("user is not a preivous customer");
    const customer = await stripe.customers.retrieve(stripe_customer_id);
    const name = customer.name;
    const email = customer.email;
    // console.log("customer", customer);
    // console.log("name", name);

    // check if they've created a profile with no stripe_id
    // Case 2: They've logged in first

    const updatedSubscription = {
      name,
      stripe_customer_id,
      subscription_status,
      price,
    };
    const { data, error } = await supabase
      .from("profile")
      .update(updatedSubscription)
      .eq("email", email);

    console.log("data", data);
    // if (!error) return;

    if (data != null) {
      // apparently null is not treated as an error and gave me a headache for days

      return;
    }
    console.log("tried to update a user with no customer id in their profile");
    console.log("I am creating a new user");
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
