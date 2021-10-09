const { Router } = require("express");

const { validarJWT } = require("../../middlewares/validar-jwt");
const { fileUploads, retornaImagen, createBucket, readBucket } = require("../controllers/uploads");

const router = Router();

//router.put("/:tipo/:id", validarJWT, fileUploads);

router.get("/:tipo/:nombre", retornaImagen);
//router.get("/:mid", readBucket);

router.put("/:tipo/:mid", validarJWT, createBucket);

module.exports = router;