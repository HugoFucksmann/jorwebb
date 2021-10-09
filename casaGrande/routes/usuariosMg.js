const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, getMyUsuario } = require('../controllers/usuariosMg');
const { validarCampos } = require('../../middlewares/validar-campos');
const { validarJWT } = require('../../middlewares/validar-jwt');

const router = Router();

router.post(
	'/',
	[
		check('password', 'El password es obligatorio').notEmpty(),
		check('email', 'El usuario es obligatorio').notEmpty(),
		check('nombre', 'El nombre es obligatorio').notEmpty(),
		validarCampos,
	],
	crearUsuario
);

router.get('/', validarJWT, getMyUsuario);

module.exports = router;
