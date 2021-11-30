const { Router } = require("express");
const { saveDriveFiles } = require("../controllers/drive");
const router = Router();

router.post("/atr/:proyecto", saveDriveFiles);

module.exports = router;
