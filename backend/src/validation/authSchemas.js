const { z } = require("zod");

const registroSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es muy corto").max(100),
  correo: z.string().trim().toLowerCase().email("Correo inválido"),
  contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const loginSchema = z.object({
  correo: z.string().trim().toLowerCase().email("Correo inválido"),
  contrasena: z.string().min(1, "La contraseña es requerida"),
});

const olvideContrasenaSchema = z.object({
  correo: z.string().trim().toLowerCase().email("Correo inválido"),
});

const resetContrasenaSchema = z.object({
  token: z.string().min(1, "Token requerido"),
  contrasena: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

module.exports = {
  registroSchema,
  loginSchema,
  olvideContrasenaSchema,
  resetContrasenaSchema,
};
