const prisma = require("../lib/prisma");

async function listar(req, res, next) {
  try {
    const productos = await prisma.product.findMany({
      orderBy: { fechaCreacion: "desc" },
    });
    res.json({ productos });
  } catch (err) {
    next(err);
  }
}

async function populares(req, res, next) {
  try {
    const limite = Math.min(Number(req.query.limite) || 3, 10);

    const conteos = await prisma.order.groupBy({
      by: ["productId"],
      where: { estadoPago: "PAGADO" },
      _count: { productId: true },
      orderBy: { _count: { productId: "desc" } },
      take: limite,
    });

    const productos = await prisma.product.findMany({
      where: { id: { in: conteos.map((c) => c.productId) } },
    });
    const productoPorId = new Map(productos.map((p) => [p.id, p]));

    const ordenados = conteos
      .map((c) => {
        const producto = productoPorId.get(c.productId);
        return producto && { ...producto, ventas: c._count.productId };
      })
      .filter(Boolean);

    res.json({ productos: ordenados });
  } catch (err) {
    next(err);
  }
}

async function obtener(req, res, next) {
  try {
    const producto = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ producto });
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener, populares };
