const stripe = require("../lib/stripe");
const prisma = require("../lib/prisma");

async function stripeWebhook(req, res) {
  const firma = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, firma, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Firma de webhook inválida:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      await prisma.order.updateMany({
        where: { stripePaymentId: session.id },
        data: { estadoPago: "PAGADO" },
      });
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      await prisma.order.updateMany({
        where: { stripePaymentId: session.id },
        data: { estadoPago: "FALLIDO" },
      });
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
}

module.exports = { stripeWebhook };
