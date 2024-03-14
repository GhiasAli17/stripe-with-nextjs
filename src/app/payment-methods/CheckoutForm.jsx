import { CardNumberElement, CardCvcElement, CardExpiryElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const CheckoutForm = () => {
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
      billing_details:{
        name:'nazim',
        email:'nazim@gmail.com'
      }
  
    });

    console.log("paytment",paymentMethod)

    if (paymentMethodError) {
      setMessage(paymentMethodError.message);
      setIsProcessing(false);
      return;
    }
    else{

      // create customer with payment id
      const res = await fetch("/api/create-payment-methods", {
        method: "POST",
        body: JSON.stringify({id:paymentMethod.id}),
      })

      console.log("customer",res)
      setMessage("Success")
    }

    setIsProcessing(false);
  };

  const onClickRetrieve = async () => {
    
  
  const list = await  fetch("/api/create-payment-methods")
  console.log("list",list)
  }
  const onClickUpdate = async () => {
    
  
    const update = await  fetch("/api/create-payment-methods",{
      method:"PUT",
      body:JSON.stringify({})
    })
    console.log("update frontEnd",update)
    }

    const onClickDelete = async () => {
    
  
      const update = await  fetch("/api/create-payment-methods",{
        method:"DELETE",
        body:JSON.stringify({})
      })
      console.log("Dlete frontEnd",update)
      }

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
      <button onClick={onClickRetrieve}>Retrieve Methods</button>
      <button onClick={onClickUpdate}>Update</button>
      <button onClick={onClickDelete}>Delete</button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
