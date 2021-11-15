const { Router } = require('express');
//const { check } = require("express-validator");
//const fileUpload = require("express-fileupload");

const {
	getMascota,
	crearMascota,
	crearMascotaf,
	actualizarMascota,
	borrarMascota,
	borrarMascotaf,
	addReport,
	getMascota2,
	recargarMascota,
} = require('../controllers/mascotas');
//const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../../middlewares/validar-jwt');
const { driveUpload } = require('../controllers/uploads');
const router = Router();

router.get('/:idUser', getMascota);
router.get('/', getMascota2);
router.post('/crear', validarJWT, crearMascota);
router.post('/crearf/:tipo' /* , validarJWT */, crearMascotaf);
router.put('/report', validarJWT, addReport);

router.put('/actualizar/:id', validarJWT, actualizarMascota);
router.put('/recargar/:mid', recargarMascota);
router.delete('/:id', validarJWT, borrarMascotaf);

module.exports = router;
