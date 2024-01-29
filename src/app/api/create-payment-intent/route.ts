
const stripe = require("stripe")(process.env.STRIPE_SECRET, {
    apiVersion: "2022-08-01",
  });
export const POST = async (request: any) => {

    try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "EUR",
          amount: 1999,
          automatic_payment_methods: { enabled: false },
        });
    
        // Send publishable key and PaymentIntent details to client
        return Response.json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (e) {
           console.log("api error")
      }

}