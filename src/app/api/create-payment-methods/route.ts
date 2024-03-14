const stripe = require("stripe")(process.env.STRIPE_SECRET, {
    apiVersion: "2022-08-01",
  });
export const POST = async (request: any) => {
       const {id} = await request.json()
       console.log("API id",id)
    try {
        const customer = await stripe.customers.create({
            payment_method:id
        });
    
        return Response.json({
          customer: customer.id,
        });
      } catch (e) {
           console.log("api error")
      }

}


export const GET = async (request: any) => {
    const paymentMethods = await stripe.customers.listPaymentMethods(
        'cus_PjfG8I7OAIEHZy',
        {
          limit: 3,
        }
      );
      console.log("paymethod API",JSON.parse(paymentMethods),"---")
      // const data = await paymentMethods.json()
      return Response.json({
        nothing:'non'
      });

}

export const PUT = async (request: any) => {
    
 try {
    const paymentMethod = await stripe.paymentMethods.update(
        'pm_1OuBw1H2g5fObnyUfdkMeUNY',
        // {
        //   metadata: {
        //     order_id: '6735',
        //   },
        // }
      );
 
     console.log('update API',paymentMethod)
     return Response.json({
       paymentMethod: paymentMethod,
     });
   } catch (e) {
        console.log("api error")
   }

}

export const DELETE = async (request: any) => {
    
    try {
       const paymentMethod = await stripe.paymentMethods.detach(
           'pm_1OuBw1H2g5fObnyUfdkMeUNY',
         );
    
        console.log('detach API API',paymentMethod)
        return Response.json({
          paymentMethod: paymentMethod,
        });
      } catch (e) {
           console.log("api error")
      }
   
   }