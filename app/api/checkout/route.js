export default async function handler(req, res) {
  const signature = req.header["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  try {
  } catch (error) {}
}
