const express = require("express");

const { loginUser } = require("../controller/auth");

const router = express.Router();

router.post("/", loginUser);

module.exports = router;
