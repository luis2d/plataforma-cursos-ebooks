const crypto = require("crypto");

function generarTokenSeguro() {
  return crypto.randomBytes(32).toString("hex");
}

module.exports = { generarTokenSeguro };
