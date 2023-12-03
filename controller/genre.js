const { Genre, validate } = require("../models/genre");

async function getGenres(req, res) {
  const genres = await Genre.find().sort("name").select("name");
  res.json(genres);
}

async function detailGenres(req, res) {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
}

async function createGenres(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = Genre({ name: req.body.name });
  genre = await genre.save();
  res.status(201).json(genre);
}

async function updateGenres(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.json(genre);
}

async function deleteGenre(req, res) {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  res.status(204).json("");
}

module.exports = {
  getGenres,
  detailGenres,
  createGenres,
  updateGenres,
  deleteGenre,
};
