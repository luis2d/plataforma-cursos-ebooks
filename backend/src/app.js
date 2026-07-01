const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const checkoutRouter = require("./routes/checkout");
const { stripeWebhook } = require("./controllers/webhookController");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// El webhook de Stripe necesita el body crudo para poder verificar la firma,
// por eso se monta antes del parser de JSON global.
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhook);

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/checkout", checkoutRouter);

app.use(errorHandler);

module.exports = app;
