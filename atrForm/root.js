var router = require("express").Router();

router.use("/api/auth", require("./routes/auth"));
router.use("/api/sheet", require("./routes/sheet"));
router.use("/api/drive", require("./routes/drive"));

module.exports = router;
