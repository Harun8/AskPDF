import Stripe from "stripe";

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  const data = await req.json(); // Assuming text data if not form data

  console.log("body", data);
  try {
    const { data: prices } = await stripe.prices.list();
    const plans = [];

    for (const price of prices) {
      const product = await stripe.products.retrieve(price.product);
      plans.push({
        name: product.name,
        id: price.id,
        price: price.unit_amount / 100,
        interval: price.recurring.interval,
      });
    }
    console.log("plans", plans);

    return new Response(JSON.stringify(error), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export { handler as POST };
