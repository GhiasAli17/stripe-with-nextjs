
"use client"
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutFormSetup";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFormSetup from "./CheckoutFormSetup";

function PaymentSetup() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState("")

  useEffect(() => {
  
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
     console.log("loadStripe",loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY))
  }, []);

  useEffect(() => {
    fetch("/api/create-setup-intent/customer", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
        
      var { clientSecret,customerId } = await result.json();
      console.log("inside 2nd Effect", clientSecret,'res',result)
      setClientSecret(clientSecret);
      setCustomerId(customerId)
    });
  }, []);

  return (
    <>
      <h1> Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutFormSetup clientSecret={clientSecret} customerId={customerId}/>
        </Elements>
      )}
    </>
  );
}

export default PaymentSetup;