const { Router } = require("express");

const requireAuth = require("../middleware/requireAuth");
const { crearSesion } = require("../controllers/checkoutController");

const router = Router();

router.post("/:productId", requireAuth, crearSesion);

module.exports = router;
