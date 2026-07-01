const { z } = require("zod");

const crearProductoSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es muy corto").max(200),
  descripcion: z.string().trim().min(1, "La descripción es requerida"),
  precioCentavos: z.number().int().positive("El precio debe ser mayor a 0"),
  contenidoUrl: z.string().trim().url("Debe ser una URL válida"),
  imagenUrl: z.string().trim().url("Debe ser una URL válida").optional().or(z.literal("")),
});

const actualizarProductoSchema = crearProductoSchema.partial();

module.exports = { crearProductoSchema, actualizarProductoSchema };
