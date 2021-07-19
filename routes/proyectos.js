const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getProyectos,
  crearProyecto,
  eliminarProyecto,
  actualizarProyecto,
} = require("../controllers/proyectos");

const router = Router();

router.get("/", getProyectos);
router.post("/", validarJWT, crearProyecto);
router.delete("/:id", validarJWT, eliminarProyecto);
router.patch("/:id", validarJWT, actualizarProyecto);

module.exports = router;
