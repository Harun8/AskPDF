import { SITE_URL } from "@/util/endpoints";
import { stripe } from "@/util/stripe/stripe";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { priceId } = req.query;
    
        try {
          const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: price_1OdUr0BzVPtG7eO2qrV6Zn89, quantity: 1 }],
            success_url: `${SITE_URL}/success`,
            cancel_url: `${SITE_URL}/pricing`,
          });
    
          res.status(200).json({ id: session.id });
        } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: error.message });
        }
      } else {
        // Handle any non-POST methods if needed
        res.setHeader('Allow', 'POST');
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }

