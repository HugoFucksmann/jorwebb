const { Router } = require("express");
const fileUpload = require("express-fileupload");
const { validarJWT } = require("../../middlewares/validar-jwt");

const router = Router();

router.use(fileUpload());

//router.put("/:tipo/:id", validarJWT, fileUploads);

module.exports = router;
