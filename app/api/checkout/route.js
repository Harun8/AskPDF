import { stripe } from "@/util/stripe/stripe";
import { headers } from "next/headers";
import getRawBody from "raw-body";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const headersList = headers();

  console.log("Webhook called", req.body);
  const body = await req.json();
  console.log("body", body);

  const signature = headersList.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  try {
    const rawbody = await getRawBody(req);
    stripe.webhooks.constructEvent(rawbody, signature, signingSecret);
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
