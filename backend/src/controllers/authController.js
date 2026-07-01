const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ms = require("ms");

const prisma = require("../lib/prisma");
const { generarTokenSeguro } = require("../utils/tokens");
const { enviarCorreoVerificacion, enviarCorreoResetPassword } = require("../lib/email");
const {
  registroSchema,
  loginSchema,
  olvideContrasenaSchema,
  resetContrasenaSchema,
} = require("../validation/authSchemas");

const SALT_ROUNDS = 12;
const VERIFICACION_HORAS = 24;
const RESET_PASSWORD_HORAS = 1;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: ms(process.env.JWT_EXPIRES_IN || "7d"),
};

function usuarioPublico(user) {
  return {
    id: user.id,
    nombre: user.nombre,
    correo: user.correo,
    correoVerificado: user.correoVerificado,
    esAdmin: user.esAdmin,
  };
}

function crearJwt(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

async function registro(req, res, next) {
  try {
    const { nombre, correo, contrasena } = registroSchema.parse(req.body);

    const existente = await prisma.user.findUnique({ where: { correo } });
    if (existente) {
      return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, SALT_ROUNDS);
    const tokenVerificacion = generarTokenSeguro();
    const tokenVerificacionExpira = new Date(Date.now() + VERIFICACION_HORAS * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        nombre,
        correo,
        contrasenaHash,
        tokenVerificacion,
        tokenVerificacionExpira,
      },
    });

    enviarCorreoVerificacion({ to: user.correo, token: tokenVerificacion });

    res.status(201).json({ usuario: usuarioPublico(user) });
  } catch (err) {
    next(err);
  }
}

async function verificarCorreo(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token requerido" });
    }

    const user = await prisma.user.findUnique({ where: { tokenVerificacion: token } });

    if (!user || user.tokenVerificacionExpira < new Date()) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        correoVerificado: true,
        tokenVerificacion: null,
        tokenVerificacionExpira: null,
      },
    });

    res.json({ mensaje: "Correo verificado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { correo, contrasena } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { correo } });
    const credencialesInvalidas = () =>
      res.status(401).json({ error: "Correo o contraseña incorrectos" });

    if (!user) return credencialesInvalidas();

    const contrasenaValida = await bcrypt.compare(contrasena, user.contrasenaHash);
    if (!contrasenaValida) return credencialesInvalidas();

    if (!user.correoVerificado) {
      return res.status(403).json({ error: "Debes verificar tu correo antes de iniciar sesión" });
    }

    const token = crearJwt(user.id);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ usuario: usuarioPublico(user) });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie("token", { ...COOKIE_OPTIONS, maxAge: undefined });
  res.json({ mensaje: "Sesión cerrada" });
}

async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ usuario: usuarioPublico(user) });
  } catch (err) {
    next(err);
  }
}

async function olvideContrasena(req, res, next) {
  try {
    const { correo } = olvideContrasenaSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { correo } });

    if (user) {
      const tokenResetPassword = generarTokenSeguro();
      const tokenResetPasswordExpira = new Date(Date.now() + RESET_PASSWORD_HORAS * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: user.id },
        data: { tokenResetPassword, tokenResetPasswordExpira },
      });

      enviarCorreoResetPassword({ to: user.correo, token: tokenResetPassword });
    }

    res.json({ mensaje: "Si el correo existe, se envió un enlace para restablecer la contraseña" });
  } catch (err) {
    next(err);
  }
}

async function resetearContrasena(req, res, next) {
  try {
    const { token, contrasena } = resetContrasenaSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { tokenResetPassword: token } });

    if (!user || user.tokenResetPasswordExpira < new Date()) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    const contrasenaHash = await bcrypt.hash(contrasena, SALT_ROUNDS);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        contrasenaHash,
        tokenResetPassword: null,
        tokenResetPasswordExpira: null,
      },
    });

    res.json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registro,
  verificarCorreo,
  login,
  logout,
  me,
  olvideContrasena,
  resetearContrasena,
};
