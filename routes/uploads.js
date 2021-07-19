const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
	createBucket,
	readBucket,
} = require('../controllers/uploads');

const router = Router();

router.use(fileUpload());

//router.put("/:tipo/:id", validarJWT, fileUploads);

router.get('/:id', readBucket);

router.put('/:id', validarJWT, createBucket);

module.exports = router;
