const { Router } = require("express");
const { getDatosForm } = require("../controllers/sheet");
const router = Router();

router.post("/getuser/:umail", getDatosForm);
router.post("/saverow/:umail", getDatosForm);

module.exports = router;
