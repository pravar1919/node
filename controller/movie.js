const { Genre } = require("../models/genre");
const { Movie, validate } = require("../models/movie");

async function getMovies(req, res) {
  const genres = await Movie.find().sort("title");
  res.json(genres);
}

async function detailMovies(req, res) {
  const genre = await Movie.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
}

async function createMovies(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name },
    numberInStock: req.body.numberInStock,
    dailtRentalRate: req.body.dailtRentalRate,
  });
  await movie.save();
  res.status(201).json(movie);
}

async function updateMovies(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailtRentalRate: req.body.dailtRentalRate,
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.json(movie);
}

async function deleteMovie(req, res) {
  const genre = await Movie.findByIdAndRemove(req.params.id);
  res.status(204).json("");
}

module.exports = {
  getMovies,
  detailMovies,
  createMovies,
  updateMovies,
  deleteMovie,
};
