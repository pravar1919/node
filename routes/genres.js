const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getGenres,
  createGenres,
  updateGenres,
  deleteGenre,
  detailGenres,
} = require("../controller/genre");

const router = express.Router();

router.get("/", auth, getGenres);

router.post("/", createGenres);

router.put("/:id", updateGenres);

router.delete("/:id", auth, admin, deleteGenre);

router.get("/:id", detailGenres);

module.exports = router;
