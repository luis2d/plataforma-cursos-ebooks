const { Router } = require("express");

const { listar, obtener, populares } = require("../controllers/productsController");

const router = Router();

router.get("/", listar);
router.get("/populares", populares);
router.get("/:id", obtener);

module.exports = router;
