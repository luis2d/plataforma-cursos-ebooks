const { z } = require("zod");

const crearSesionSchema = z.object({
  productoIds: z.array(z.string().min(1)).min(1, "El carrito está vacío"),
});

module.exports = { crearSesionSchema };
