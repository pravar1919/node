const { Customer, validateCustomer } = require("../models/customer");

async function getCustomers(req, res) {
  const customers = await Customer.find().sort("name").select("name");
  res.json(customers);
}

async function detailCustomers(req, res) {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
}

async function createCustomers(req, res) {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.status(201).json(customer);
}

async function updateCustomers(req, res) {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body?.isGold,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.json(customer);
}

async function deleteCustomers(req, res) {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  res.status(204).json("");
}

module.exports = {
  getCustomers,
  detailCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers,
};
