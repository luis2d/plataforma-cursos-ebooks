const prisma = require("../lib/prisma");

async function listar(req, res, next) {
  try {
    const noticias = await prisma.noticia.findMany({
      orderBy: { fechaCreacion: "desc" },
    });
    res.json({ noticias });
  } catch (err) {
    next(err);
  }
}

async function obtener(req, res, next) {
  try {
    const noticia = await prisma.noticia.findUnique({
      where: { id: req.params.id },
    });

    if (!noticia) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    res.json({ noticia });
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, obtener };
