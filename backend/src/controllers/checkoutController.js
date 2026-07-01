const stripe = require("../lib/stripe");
const prisma = require("../lib/prisma");

async function crearSesion(req, res, next) {
  try {
    const { productId } = req.params;

    const producto = await prisma.product.findUnique({ where: { id: productId } });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: req.userId,
      metadata: { userId: req.userId, productId: producto.id },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: producto.nombre },
            unit_amount: producto.precioCentavos,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/compra-cancelada`,
    });

    await prisma.order.create({
      data: {
        userId: req.userId,
        productId: producto.id,
        stripePaymentId: session.id,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
}

module.exports = { crearSesion };
