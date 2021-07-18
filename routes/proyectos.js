const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
	getProyectos,
	crearProyecto,
	eliminarProyecto,
	actualizarProyecto,
} = require('../controllers/proyectos');

const router = Router();

router.get('/proyectos', getProyectos);
router.post('/proyectos', validarJWT, crearProyecto);
router.delete('/proyectos/:id', validarJWT, eliminarProyecto);
router.patch('/proyectos/:id', validarJWT, actualizarProyecto);

module.exports = router;
