const { Router } = require("express");
const prisma = require("../lib/prisma");

const router = Router();

router.get("/", async (req, res) => {
  res.json({ status: "ok" });
});

router.get("/db", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
