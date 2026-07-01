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

module.exports = { listar, obtener };
