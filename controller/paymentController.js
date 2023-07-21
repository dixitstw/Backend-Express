const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// send stripe key to frontend
exports.sendStripeKey = async (req, res)=> {
    res.send({stripeAPIkey: process.env.STRIPE_API_KEY})
}
//for processing payment
exports.processPayment = async(req, res)=> {
    const myPaymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'npr',
        metadata: {
            integration_check: "accept a payment"
        }
    })
    res.send({
        client_secret: myPaymentIntent.client_secret
    })
}