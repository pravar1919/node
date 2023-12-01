const express = require("express");

const {
  getMovies,
  createMovies,
  updateMovies,
  deleteMovie,
  detailMovies,
} = require("../controller/movie");

const router = express.Router();

router.get("/", getMovies);

router.post("/", createMovies);

router.put("/:id", updateMovies);

router.delete("/:id", deleteMovie);

router.get("/:id", detailMovies);

module.exports = router;
