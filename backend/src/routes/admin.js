const { Router } = require("express");

const requireAuth = require("../middleware/requireAuth");
const requireAdmin = require("../middleware/requireAdmin");
const { crear, actualizar, eliminar } = require("../controllers/adminProductsController");
const { listar: listarOrdenes } = require("../controllers/adminOrdersController");
const {
  crear: crearNoticia,
  actualizar: actualizarNoticia,
  eliminar: eliminarNoticia,
} = require("../controllers/adminNoticiasController");

const router = Router();

router.use(requireAuth, requireAdmin);

router.post("/products", crear);
router.put("/products/:id", actualizar);
router.delete("/products/:id", eliminar);

router.get("/orders", listarOrdenes);

router.post("/news", crearNoticia);
router.put("/news/:id", actualizarNoticia);
router.delete("/news/:id", eliminarNoticia);

module.exports = router;
