var router = require('express').Router();

router.use('/api/usu', require('./routes/usuariosMg'));
router.use('/api/login', require('./routes/auth'));
router.use('/api/talleres', require('./routes/talleres'));
router.use('/api/atr', require('./routes/atr'));
router.use('/api/upload', require('./routes/uploads'));
router.use('/api/telegram', require('./routes/telegram'));
router.use('/api/mercadopago', require('./routes/mercadoPago'));

module.exports = router;
