const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genres = mongoose.model("genres", genreSchema);

const validateGenre = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

exports.Genre = Genres;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;
