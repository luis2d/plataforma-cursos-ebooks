const { Router } = require("express");

const { listar, obtener } = require("../controllers/noticiasController");

const router = Router();

router.get("/", listar);
router.get("/:id", obtener);

module.exports = router;
