const express = require("express");

const {
  getCustomers,
  createCustomers,
  updateCustomers,
  deleteCustomers,
  detailCustomers,
} = require("../controller/customers");

const router = express.Router();

router.get("/", getCustomers);

router.post("/", createCustomers);

router.put("/:id", updateCustomers);

router.delete("/:id", deleteCustomers);

router.get("/:id", detailCustomers);

module.exports = router;
