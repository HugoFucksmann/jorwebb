const { Router } = require('express');
const { sendMsj } = require('../controllers/telegram');
const router = Router();

router.post('/', sendMsj);

module.exports = router;
