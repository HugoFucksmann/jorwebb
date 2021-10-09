const { mascotaChat, misChats } = require("../controllers/chat");

const { Router } = require("express");

const router = Router();

router.post("/", mascotaChat);
router.get("/mischats", misChats);

module.exports = router;
