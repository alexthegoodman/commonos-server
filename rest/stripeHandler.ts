import Stripe from "stripe";
import prisma from "../prisma";

const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription;
  const customerId = session.customer;

  if (!userId || typeof customerId !== "string") {
    console.error("fulfillOrder", "userId or customerId not found");
    return;
  }

  console.info("fulfillOrder", userId, customerId);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeCustomerId: customerId,
      subscription: "STANDARD",
      frequency: "MONTHLY",
    },
  });
};

export const stripeHandler = async (request, response) => {
  const payload = request.body;
  const sig = request.headers["stripe-signature"];

  console.info("begin stripe handler");

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      console.info("checkout.session.completed");
      const session = event.data.object as Stripe.Checkout.Session;
      // Save an order in your database, marked as 'awaiting payment'
      //   createOrder(session);

      // Check if the order is paid (for example, from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        fulfillOrder(session);
      }

      break;
    }

    case "checkout.session.async_payment_succeeded": {
      console.info("checkout.session.async_payment_succeeded");
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session);

      break;
    }

    case "checkout.session.async_payment_failed": {
      console.error("checkout.session.async_payment_failed");
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      //   emailCustomerAboutFailedPayment(session);

      break;
    }
  }

  response.status(200).end();
};
