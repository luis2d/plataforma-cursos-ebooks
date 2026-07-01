const { Router } = require("express");

const requireAuth = require("../middleware/requireAuth");
const { checkoutLimiter } = require("../middleware/rateLimiter");
const { crearSesion } = require("../controllers/checkoutController");

const router = Router();

router.post("/:productId", checkoutLimiter, requireAuth, crearSesion);

module.exports = router;
