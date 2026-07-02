const { z } = require("zod");

const crearNoticiaSchema = z.object({
  titulo: z.string().trim().min(2, "El título es muy corto").max(200),
  resumen: z.string().trim().min(1, "El resumen es requerido").max(300),
  contenido: z.string().trim().min(1, "El contenido es requerido"),
  autor: z.string().trim().max(100).optional().or(z.literal("")),
  imagenUrl: z.string().trim().url("Debe ser una URL válida").optional().or(z.literal("")),
});

const actualizarNoticiaSchema = crearNoticiaSchema.partial();

module.exports = { crearNoticiaSchema, actualizarNoticiaSchema };
