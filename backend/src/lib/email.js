function enviarCorreo({ to, subject, body }) {
  console.log("\n--- 📧 Correo simulado ---");
  console.log(`Para: ${to}`);
  console.log(`Asunto: ${subject}`);
  console.log(body);
  console.log("--------------------------\n");
}

function enviarCorreoVerificacion({ to, token }) {
  const link = `${process.env.FRONTEND_URL}/verificar-correo?token=${token}`;
  enviarCorreo({
    to,
    subject: "Verifica tu cuenta",
    body: `Confirma tu correo entrando a este link: ${link}`,
  });
}

function enviarCorreoResetPassword({ to, token }) {
  const link = `${process.env.FRONTEND_URL}/restablecer-password?token=${token}`;
  enviarCorreo({
    to,
    subject: "Restablece tu contraseña",
    body: `Entra a este link para elegir una nueva contraseña: ${link}`,
  });
}

module.exports = { enviarCorreoVerificacion, enviarCorreoResetPassword };
