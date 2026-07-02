const prisma = require("../lib/prisma");
const { crearNoticiaSchema, actualizarNoticiaSchema } = require("../validation/noticiaSchemas");

async function crear(req, res, next) {
  try {
    const datos = crearNoticiaSchema.parse(req.body);
    const noticia = await prisma.noticia.create({ data: datos });
    res.status(201).json({ noticia });
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    const datos = actualizarNoticiaSchema.parse(req.body);
    const noticia = await prisma.noticia.update({
      where: { id: req.params.id },
      data: datos,
    });
    res.json({ noticia });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    await prisma.noticia.delete({ where: { id: req.params.id } });
    res.json({ mensaje: "Noticia eliminada" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    next(err);
  }
}

module.exports = { crear, actualizar, eliminar };
