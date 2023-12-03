require("dotenv").config();
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const registerUser = require("./routes/register");
const auth = require("./routes/auth");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

console.log(process.env); // remove this after you've confirmed it is working
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: JWT private key is not defined.");
  process.exit(1);
}
mongoose
  .connect("mongodb://localhost/vidley")
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on http://localhost:${port}`)
    );
  })
  .catch((err) => console.log("Error in MongoDB connection...", err));

app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customer", customers);
app.use("/api/movie", movies);
app.use("/api/users", registerUser);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
