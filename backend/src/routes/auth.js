const { Router } = require("express");

const { authLimiter } = require("../middleware/rateLimiter");
const requireAuth = require("../middleware/requireAuth");
const {
  registro,
  verificarCorreo,
  login,
  logout,
  me,
  olvideContrasena,
  resetearContrasena,
} = require("../controllers/authController");

const router = Router();

router.post("/registro", authLimiter, registro);
router.post("/verificar-correo", verificarCorreo);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.post("/olvide-password", authLimiter, olvideContrasena);
router.post("/resetear-password", authLimiter, resetearContrasena);

module.exports = router;
