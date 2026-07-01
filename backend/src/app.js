const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const checkoutRouter = require("./routes/checkout");
const ordersRouter = require("./routes/orders");
const adminRouter = require("./routes/admin");
const { stripeWebhook } = require("./controllers/webhookController");
const { generalLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

if (process.env.NODE_ENV === "production") {
  // Necesario detrás de un proxy (Railway/Render/Vercel) para que
  // express-rate-limit y las cookies "secure" vean la IP/protocolo reales.
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(generalLimiter);

// El webhook de Stripe necesita el body crudo para poder verificar la firma,
// por eso se monta antes del parser de JSON global.
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/checkout", checkoutRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);

module.exports = app;
