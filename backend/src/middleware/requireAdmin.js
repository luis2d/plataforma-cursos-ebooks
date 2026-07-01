const prisma = require("../lib/prisma");

async function requireAdmin(req, res, next) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user?.esAdmin) {
    return res.status(403).json({ error: "No tienes permisos de administrador" });
  }

  next();
}

module.exports = requireAdmin;
