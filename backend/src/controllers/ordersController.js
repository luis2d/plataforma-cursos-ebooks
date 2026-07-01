const prisma = require("../lib/prisma");

async function misOrdenes(req, res, next) {
  try {
    const ordenes = await prisma.order.findMany({
      where: { userId: req.userId },
      include: { product: true },
      orderBy: { fechaCreacion: "desc" },
    });

    const respuesta = ordenes.map((orden) => ({
      id: orden.id,
      estadoPago: orden.estadoPago,
      fechaCreacion: orden.fechaCreacion,
      producto: {
        id: orden.product.id,
        nombre: orden.product.nombre,
        precioCentavos: orden.product.precioCentavos,
        // El link de contenido solo se entrega si el pago fue confirmado
        contenidoUrl: orden.estadoPago === "PAGADO" ? orden.product.contenidoUrl : null,
      },
    }));

    res.json({ ordenes: respuesta });
  } catch (err) {
    next(err);
  }
}

module.exports = { misOrdenes };
