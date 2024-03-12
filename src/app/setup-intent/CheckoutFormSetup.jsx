import { CardNumberElement, CardCvcElement, CardExpiryElement, Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutFormSetup = ({ clientSecret,customerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  console.log("clientSecret",clientSecret,'customerId',customerId)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const {error: submitError} = await elements.submit();
    if (submitError) {
      console.log("submitError",submitError)
      return;
    }

   // Create the SetupIntent and obtain clientSecret
  //  const res = await fetch("/create-intent", {
  //   method: "POST",
  // });

  // const {client_secret: clientSecret} = await res.json();

  // Confirm the SetupIntent using the details collected by the Payment Element


  const {setupIntent,error} = await stripe.confirmCardSetup(clientSecret, {
    payment_method: {
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: 'test',
      },
    },
  });

  console.log("setupIntent",setupIntent)

  if (error) {
    // This point is only reached if there's an immediate error when
    // confirming the setup. Show the error to your customer (for example, payment details incomplete)
    console.log("error",error)
    setIsProcessing(false)
    setMessage(error?.message)
  } else {
    // Your customer is redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer is redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
    const res= await fetch("/api/create-setup-intent/customer", {
      method: "PUT",
      body: JSON.stringify({paymentMethodId:setupIntent.payment_method,customerId}),
    })
   
    if(res.ok){
      setIsProcessing(false)
    }
    // now you can create payment intent using payment method id, customerId
    //call the patch API inside /api/create-setup-intent/customer
  }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardCvcElement />
      <CardExpiryElement />
      <div><label>Card Holder name</label>
      <input type="tex" /></div>
      <button disabled={isProcessing || !stripe || !elements} id="submit" className="btn btn-primay" style={{ margin: '15px 0' }}>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutFormSetup;
