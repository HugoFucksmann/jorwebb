const { Router } = require("express");

const { validarJWT } = require("../../middlewares/validar-jwt");
const {
  fileUploads,
  retornaImagen,
  createBucket,
  readBucket,
  driveUpload,
} = require("../controllers/uploads");

const router = Router();

router.get("/:tipo/:nombre", retornaImagen);

router.put("/:tipo/:mid", validarJWT, driveUpload);

module.exports = router;
