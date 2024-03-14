import { CardNumberElement, CardCvcElement, CardExpiryElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    // Collect card details and create a PaymentMethod
    const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details:{
        name:'mashpoor'
      }
  
    });

    if (paymentMethodError) {
      setMessage(paymentMethodError.message);
      setIsProcessing(false);
      return;
    }

    // Now that you have a PaymentMethod, confirm the payment
    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
        
      }
    );

    if (confirmError) {
      setMessage(confirmError.message);
    } else {
      setMessage("Payment confirmed successfully!");
      // Handle successful payment confirmation
    }

    setIsProcessing(false);
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

export default CheckoutForm;
