var router = require("express").Router();

router.use("/api/prensa", require("./routes/prensa"));
router.use("/api/proyectos", require("./routes/proyectos"));
router.use("/api/login", require("./routes/auth"));
router.use("/api/upload", require("./routes/uploads"));
router.use("/api/sumate", require("./routes/sumate"));
router.use("/api/vacunas", require("./routes/vacunas"));

module.exports = router;
