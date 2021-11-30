const { Router } = require("express");
const { renewToken, googleSignIn2 } = require("../controllers/auth");

const router = Router();

router.post("/google", googleSignIn2);

router.post("/renew", renewToken);

module.exports = router;
