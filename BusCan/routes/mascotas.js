const { Router } = require('express');

const {
	getMascota,
	crearMascota,
	crearMascotaf,
	actualizarMascota,
	borrarMascotaf,
	addReport,
	getMascota2,
	recargarMascota,
} = require('../controllers/mascotas');

const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();

router.get('/:idUser', getMascota);
router.get('/', getMascota2);
router.post('/crear', validarJWT, crearMascota);
router.post('/crearf/:tipo', validarJWT, crearMascotaf);
router.put('/report', validarJWT, addReport);
router.put('/actualizar/:id', validarJWT, actualizarMascota);
router.put('/recargar/:mid', recargarMascota);
router.delete('/:id', validarJWT, borrarMascotaf);

module.exports = router;
