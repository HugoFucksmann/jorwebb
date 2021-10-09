const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../../middlewares/validar-campos");
const { validarJWT } = require("../../middlewares/validar-jwt");

const {
  getNoticias,
  crearNoticia,
  eliminarNoticia,
  actualizarNoticia,
} = require("../controllers/prensa");

const router = Router();

router.get("/noticias", getNoticias);
router.post("/noticias", validarJWT, crearNoticia);
router.delete("/noticias/:id", validarJWT, eliminarNoticia);
router.patch("/noticias/:id", validarJWT, actualizarNoticia);

module.exports = router;
