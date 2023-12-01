const mongoose = require("mongoose");
const Joi = require("joi");

const Customers = mongoose.model(
  "customers",
  new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, minLength: 10, maxLength: 10 },
    isGold: { type: Boolean, default: false },
  })
);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(10).max(10).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

exports.Customer = Customers;
exports.validateCustomer = validateCustomer;
