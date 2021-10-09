const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');
const {
	crearUserAtr,
	getUsersAtr,
	searchUsersAtr,
	editarUserAtr,
	borrarUserAtr,
} = require('../controllers/atr');

const router = Router();

router.get('/usersatr', getUsersAtr);
router.get('/busqueda/:filtro/:busqueda', searchUsersAtr);
router.delete('/usersatr/:id', borrarUserAtr);
router.post(
	'/usersatr',
	/*   [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("apellido", "el apellido es obligatorio").notEmpty(),
    check("dni", "el dni es obligatorio").notEmpty(),
    check("edad", "la edad es obligatoria").notEmpty(),
    check("telefono", "el telefono es obligatoria").notEmpty(),
    check("calle", "la calle es obligatoria").notEmpty(),
    check("ciudad", "la ciudad es obligatoria").notEmpty(),
    validarCampos,
  ], */
	crearUserAtr
);

router.put('/usersatr', editarUserAtr);

//router.delete("/:id", validarJWT, borrarNoticia);

module.exports = router;
