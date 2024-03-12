
"use client"
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
  
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
     console.log("loadStripe",loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY))
  }, []);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
        
      var { clientSecret } = await result.json();
      console.log("inside 2nd Effect", clientSecret)
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1> Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret}/>
        </Elements>
      )}
    </>
  );
}

export default Payment;