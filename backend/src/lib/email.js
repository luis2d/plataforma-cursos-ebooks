const resend = require("./resend");

const REMITENTE = "Cursos & Ebooks <onboarding@resend.dev>";

function enviarCorreo({ to, subject, html }) {
  // El SDK de Resend no rechaza la promesa cuando la API devuelve un error
  // (ej. restricción de modo sandbox) — hay que revisar el campo `error` a mano.
  resend.emails
    .send({ from: REMITENTE, to, subject, html })
    .then((resultado) => {
      if (resultado.error) {
        console.error("Error enviando correo:", resultado.error.message);
      }
    })
    .catch((err) => {
      console.error("Error enviando correo:", err.message);
    });
}

function enviarCorreoVerificacion({ to, token }) {
  const link = `${process.env.FRONTEND_URL}/verificar-correo?token=${token}`;
  enviarCorreo({
    to,
    subject: "Verifica tu cuenta",
    html: `<p>Confirma tu correo entrando a este link: <a href="${link}">${link}</a></p>`,
  });
}

function enviarCorreoResetPassword({ to, token }) {
  const link = `${process.env.FRONTEND_URL}/restablecer-password?token=${token}`;
  enviarCorreo({
    to,
    subject: "Restablece tu contraseña",
    html: `<p>Entra a este link para elegir una nueva contraseña: <a href="${link}">${link}</a></p>`,
  });
}

module.exports = { enviarCorreoVerificacion, enviarCorreoResetPassword };
