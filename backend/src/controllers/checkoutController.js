const stripe = require("../lib/stripe");
const prisma = require("../lib/prisma");
const { crearSesionSchema } = require("../validation/checkoutSchemas");

async function crearSesion(req, res, next) {
  try {
    const { productoIds } = crearSesionSchema.parse(req.body);

    const productos = await prisma.product.findMany({
      where: { id: { in: productoIds } },
    });
    if (productos.length !== productoIds.length) {
      return res.status(404).json({ error: "Alguno de los productos no existe" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: req.userId,
      metadata: { userId: req.userId },
      line_items: productos.map((producto) => ({
        price_data: {
          currency: "usd",
          product_data: { name: producto.nombre },
          unit_amount: producto.precioCentavos,
        },
        quantity: 1,
      })),
      success_url: `${process.env.FRONTEND_URL}/compra-exitosa?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/compra-cancelada`,
    });

    await prisma.order.createMany({
      data: productos.map((producto) => ({
        userId: req.userId,
        productId: producto.id,
        stripePaymentId: session.id,
      })),
    });

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
}

module.exports = { crearSesion };
