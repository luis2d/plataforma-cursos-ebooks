const { Router } = require("express");

const requireAuth = require("../middleware/requireAuth");
const { misOrdenes } = require("../controllers/ordersController");

const router = Router();

router.get("/mine", requireAuth, misOrdenes);

module.exports = router;
