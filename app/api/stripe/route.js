import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const dynamic = "force-dynamic";

export default async function handler(req, res) {
  //   const data = await req.json(); // Assuming text data if not form data

  try {
    const { data: prices } = await stripe.prices.list();
    const plans = [];
    console.log("prices", prices);

    for (const price of prices) {
      // const product = await stripe.products.retrieve(price.product);
      plans.push({
        // name: product.name,
        id: price.id,
        price: price.unit_amount / 100,
        interval: price.recurring.interval,
      });
    }

    return new Response(JSON.stringify(plans), {
      status: 200, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ err: "could not get prices" }), {
      status: 404, // Set the status code to 200 (OK)
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to 'application/json'
      },
    });
  }
}

export { handler as GET };
