var router = require("express").Router();

router.use("/api/login", require("./routes/auth"));
router.use("/api/usuarios", require("./routes/usuarios"));
router.use("/api/mascotas", require("./routes/mascotas"));
router.use("/api/upload", require("./routes/uploads"));
router.use("/api/chat", require("./routes/chat"));
router.use("/api/mascotasAdop", require("./routes/mascotasAdop"));

module.exports = router;
