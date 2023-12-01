const auth = require("../middleware/auth");
const express = require("express");

const { getUser, createUser } = require("../controller/register");

const router = express.Router();

router.get("/me", auth, getUser);

router.post("/", createUser);

module.exports = router;
