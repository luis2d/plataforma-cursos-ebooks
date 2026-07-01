const prisma = require("../lib/prisma");
const { crearProductoSchema, actualizarProductoSchema } = require("../validation/productSchemas");

async function crear(req, res, next) {
  try {
    const datos = crearProductoSchema.parse(req.body);
    const producto = await prisma.product.create({ data: datos });
    res.status(201).json({ producto });
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    const datos = actualizarProductoSchema.parse(req.body);
    const producto = await prisma.product.update({
      where: { id: req.params.id },
      data: datos,
    });
    res.json({ producto });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    next(err);
  }
}

module.exports = { crear, actualizar, eliminar };
