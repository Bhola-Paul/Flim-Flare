import stripe from 'stripe'
import Booking from '../models/booking.js';

export const stripeWebhooks=async (request,response) => {
    console.log('Hello');
    
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);
    const sig=request.headers["stripe-signature"];
    let event;
    try {
        event=stripeInstance.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return  response.status(400).send(`Webhook error: ${error.message}`);
    }
    try {
        console.log(event.type);
        
        switch (event.type) {
            case "payment_intent_succeeded":{
                const paymentIntent=event.data.object
                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent:paymentIntent.id
                })
                const session=sessionList.data[0];
                const {bookingId}=session.metadata;
                await Booking.findByIdAndUpdate(bookingId,{
                    isPaid:true,
                    paymentLink: ""
                });
                break;
            }
            default:
                console.log('Unhandled error',event.type);
                break;
        }
        response.json({
            recieved:true
        })
    } catch (error) {
        console.log("Webhook processing error",error);
        response.status(500).send("Internal Server Error");
    }
}