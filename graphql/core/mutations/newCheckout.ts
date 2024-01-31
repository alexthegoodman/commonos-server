import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../../context";
import Stripe from "stripe";

export const NewCheckoutMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("newCheckout", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context, x) => {
        const stripe = require("stripe")(process.env.STRIPE_KEY) as Stripe;

        const priceId = process.env.STRIPE_PRICE_ID;

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${process.env.WEBAPP_DOMAIN}/launcher?stripeSessionId={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.WEBAPP_DOMAIN}/launcher?subscribeCancelled=true`,
          automatic_tax: { enabled: true },
          client_reference_id: currentUser.id,
        });

        return session.url;
      },
    });
  },
});
