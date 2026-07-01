const { Router } = require("express");

const { listar, obtener } = require("../controllers/productsController");

const router = Router();

router.get("/", listar);
router.get("/:id", obtener);

module.exports = router;
