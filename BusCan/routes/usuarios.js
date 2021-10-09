const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validar-jwt');
const {
	getUsuarios,
	getAllNotificationTokens,
	crearUsuario,
	ActualizarNotificationToken,
	borrarUsuario,
	actLocation,
} = require('../controllers/usuarios');
const router = Router();

router.get('/todos', validarJWT, getUsuarios);
router.get('/notifications', validarJWT, getAllNotificationTokens);
router.post('/', crearUsuario);
router.put('/location', actLocation);
router.delete('/', validarJWT, borrarUsuario);
router.put('/notifications', validarJWT, ActualizarNotificationToken);
module.exports = router;
