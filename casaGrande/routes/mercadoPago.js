const { Router } = require('express');
const { buildCompra } = require('../controllers/mercadopago');
const router = Router();

router.get('/:taller', buildCompra);

module.exports = router;
