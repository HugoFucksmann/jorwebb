const { Router } = require('express');
const { login, renewToken, googleSignIn2 } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();

router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password es obligatorio').notEmpty(),
		validarCampos,
	],
	login
);

router.post('/google', googleSignIn2);

router.post('/renew', renewToken);

module.exports = router;
