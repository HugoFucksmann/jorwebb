const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { crearSumate, getSumate } = require("../controllers/sumate");

const router = Router();

router.get("/", validarJWT, getSumate);
router.post("/", crearSumate);

module.exports = router;
