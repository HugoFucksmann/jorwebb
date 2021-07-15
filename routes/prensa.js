const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getNoticias,
  crearNoticia,
  eliminarNoticia,
  actualizarNoticia,
} = require("../controllers/prensa");

const router = Router();

router.get("/noticias", getNoticias);
router.post("/noticias", crearNoticia);
router.delete("/noticias", eliminarNoticia);
router.patch("/noticias", actualizarNoticia);

/* router.get('/usersatr', getUsersAtr);
router.get('/busqueda/:filtro/:busqueda', searchUsersAtr);
router.delete('/usersatr/:id', borrarUserAtr);
router.post(
	'/usersatr',
	
	crearUserAtr
); */

//router.delete("/:id", validarJWT, borrarNoticia);

module.exports = router;
