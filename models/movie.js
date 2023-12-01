const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const Joi = require("joi");

const Movie = mongoose.model(
  "movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 255,
    },
    numberInStock: { type: Number, default: 0, minLength: 0 },
    dailtRentalRate: { type: Number, default: 0, minLength: 0 },
    genre: { type: genreSchema, required: true },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    numberInStock: Joi.number().min(0),
    dailtRentalRate: Joi.number().min(0),
    genreId: Joi.objectId().required(),
  });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validate = validateMovie;
