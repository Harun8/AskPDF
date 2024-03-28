import { SITE_URL } from "@/util/endpoints";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
export default async function handler(req, res) {
  const body = await req.json();

  try {
    // Initialize the session creation object with properties that are always needed
    let sessionConfig = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: body.priceId, quantity: 1 }],
      success_url: `${SITE_URL}/success`,
      cancel_url: `${SITE_URL}/pricing`,
    };

    // Conditionally add subscription_data if the priceId is the specific one
    if (body.priceId === "price_1OpYlBBzVPtG7eO2D4il1zcz") {
      sessionConfig.subscription_data = {
        trial_period_days: 7,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    const responseObject = {
      id: session.id,
    };
    const response = new Response(JSON.stringify(responseObject), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error.message);

    const responseObject = {
      message: error.message,
    };
    const response = new Response(JSON.stringify(responseObject), {
      status: 404, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });

    return response;
  }
}
export { handler as POST };
