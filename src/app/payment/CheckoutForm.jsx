import { CardNumberElement, CardCvcElement, CardExpiryElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
