function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ZodError") {
    return res.status(400).json({ error: "Datos inválidos", detalles: err.issues });
  }

  const status = err.status || 500;
  const esErrorInesperado = status === 500 && process.env.NODE_ENV === "production";
  const mensaje = esErrorInesperado ? "Error interno del servidor" : err.message || "Error interno del servidor";

  res.status(status).json({ error: mensaje });
}

module.exports = errorHandler;
