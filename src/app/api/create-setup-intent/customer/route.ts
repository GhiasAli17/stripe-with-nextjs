
const stripe = require("stripe")(process.env.STRIPE_SECRET, {
    apiVersion: "2022-08-01",
  });
export const POST = async (request: any) => {

    try {
        const customer = await stripe.customers.create({
          email:'basit@gmail.com',
          name:'basit'
        });
    
        // Send publishable key and PaymentIntent details to client
        
        if(customer && customer?.id){
            const s = await stripe.setupIntents.create({
                customer:customer.id,
                automatic_payment_methods: {enabled: true},   
            })

            

            return Response.json({
                clientSecret: s.client_secret,
                customerId:customer.id
              });
            // console.log("s",s)
            // if(s && s?.id){
            //     const si = await stripe.setupIntents.retrieve(s.id)
            //     console.log("si",si)
            // }
        }
        return Response.json({
          customer: customer.id,
        });
      } catch (e) {
           console.log("api error")
      }

}

export const PUT = async(req:any) => {
    const {paymentMethodId,customerId} = await req.json()
    //console.log('rrreq',await req.json())
   const p = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
    console.log("pe", p)
      // Set the new payment method as the default for the customer (optional)
    const update =  await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      console.log("update",update)
      return Response.json({
        success: true,
      });
}

// create payment without using below card number,just use the previous save detail

export const PATCH = async (request: any) => {
    const { paymentMethodId, customerId } = await request.json()
    console.log("paymentmethod",paymentMethodId,'customerId',customerId)
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount:80,
            currency:'USD',
            payment_method: "pm_1OtZq7H2g5fObnyU9DwiINH7",
            customer: "cus_Pj1te4jD40eZbD",
            confirm: true,
        
        });
    
        // Send publishable key and PaymentIntent details to client
        return Response.json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (e) {
           console.log("api error")
           return Response.json({
            error: e,
          });
      }
      

}