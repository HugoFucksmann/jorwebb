const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
//const { validarJWT } = require("../../middlewares/validar-jwt");
const {
	crearTaller,
	getUserTalleres,
	getTalleres,
	getUserPorTaller,
	searchAll,
	eliminarInscriptoTaller,
} = require('../controllers/talleres');

const router = Router();

router.get('/user', getUserTalleres);
router.get('/', getTalleres);
router.get('/taller/:taller', getUserPorTaller);
router.get('/busqueda/:filtro/:busqueda', searchAll);
//router.get("/desde/:desde", getNoticiasPaginadas);
router.delete('/inscriptos/:id', eliminarInscriptoTaller);

router.post(
	'/',
	[
		check('nombre', 'el nombre es obligatorio').notEmpty(),
		check('apellido', 'el apellido es obligatorio').notEmpty(),
		check('dni', 'el dni es obligatorio').notEmpty(),
		check('edad', 'la edad es obligatoria').notEmpty(),
		check('telefono', 'el telefono es obligatoria').notEmpty(),
		check('calle', 'la calle es obligatoria').notEmpty(),
		check('ciudad', 'la ciudad es obligatoria').notEmpty(),
		validarCampos,
	],
	crearTaller
);

//router.put("/:id", validarJWT, actualizarNoticia);

//router.delete("/:id", validarJWT, borrarNoticia);

module.exports = router;
