const { Router } = require('express');
const { login, verificarToken } = require('../controllers/auth');
const { crearUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
	'/',
	/* [
		check('usuario', 'El usuario es obligatorio che').isEmail(),
		check('password', 'El password es obligatorio che').notEmpty(),
		validarCampos,
	], */
	login
);

router.post('/verify', validarJWT, verificarToken);

router.post('/s', crearUsuario);

module.exports = router;
