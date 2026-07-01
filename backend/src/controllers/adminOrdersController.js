const prisma = require("../lib/prisma");

async function listar(req, res, next) {
  try {
    const ordenes = await prisma.order.findMany({
      include: { product: true, user: true },
      orderBy: { fechaCreacion: "desc" },
    });

    const respuesta = ordenes.map((orden) => ({
      id: orden.id,
      estadoPago: orden.estadoPago,
      stripePaymentId: orden.stripePaymentId,
      fechaCreacion: orden.fechaCreacion,
      usuario: { nombre: orden.user.nombre, correo: orden.user.correo },
      producto: { nombre: orden.product.nombre, precioCentavos: orden.product.precioCentavos },
    }));

    res.json({ ordenes: respuesta });
  } catch (err) {
    next(err);
  }
}

module.exports = { listar };
