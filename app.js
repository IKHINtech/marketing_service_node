const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./route");
const { jwtStrategy } = require("./config/passport");
const passport = require("passport");

const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./helper/ApiError");

process.env.PWD = process.cwd();

const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Congratulations! API is working!" });
});

app.use("/s1mkt", routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const db = require("./models");

// db.sequelize.sync({ alter: true });
module.exports = app;
