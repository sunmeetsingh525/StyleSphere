const createHttpError = require("http-errors");
const Stripe = require("stripe");

const stripe = Stripe(
  "sk_test_51Ol8OMSCVzQJWDR2vfDdS9nNJFiHRkQxq1rWj9zsSZyl8StRrMaggsccrM2wUjBuY17vIohJ7Lrji3ykfrKQDYDQ00seDa2PVK"
);

// import user model
const { ObjectId } = require("mongoose").Types;

const createClientSecret = async (req, res, next) => {
  try {
    const { amount, name } = req.body;
    if (!name) {
      throw createHttpError.BadRequest("Please enter a name");
    }
    const customer = await stripe.customers.create({
      name: name,
      address: {
        line1: "Demo",
        postal_code: "22222",
        city: "Demo",
        state: "Demo",
        country: "IN",
      },
    });
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2022-11-15" }
    );
    const paymentData = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "inr",
      payment_method_types: ["card"],
      metadata: { name },
      description: "Payment",
      customer: customer.id,
    });

    const clientSecret = paymentData.client_secret;

    res.status(200).json({
      success: true,
      message: "Payment Initiated",
      clientSecret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (err) {
    console.log(err);

    next(err);
  }
};

module.exports = createClientSecret;
