const { Router } = require("express");
const { getDatosForm } = require("../controllers/sheet");
const router = Router();

router.get("/getuser/:umail", getDatosForm);
router.get("/saverow/:umail", getDatosForm);

module.exports = router;
