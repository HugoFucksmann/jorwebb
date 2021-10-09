const { Router } = require('express');
const {
	getMascotaAdop,
	crearMascotaAdop,
	actualizarMascotaAdop,
	borrarMascotaAdop,
	adoptar,
} = require('../controllers/mascotasAdop');
const { validarJWT } = require('../../middlewares/validar-jwt');
const router = Router();

router.get('/', getMascotaAdop);
router.post('/crear', validarJWT, crearMascotaAdop);

router.put('/:id', validarJWT, actualizarMascotaAdop);

router.post('/adoptar/:mid/:uid', validarJWT, adoptar);

router.delete('/:id', validarJWT, borrarMascotaAdop);

module.exports = router;
