
"use client"
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
 

  useEffect(() => {
  
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
     console.log("loadStripe",loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY))
  }, []);

 

  return (
    <>
      <h1> Stripe and the Payment Element</h1>
     { stripePromise && (

        <Elements stripe={stripePromise} >
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;