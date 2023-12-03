const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  password: { type: String, required: true, minLength: 5, maxLength: 1024 },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin, email: this.email },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("users", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;
