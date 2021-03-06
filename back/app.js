const express = require("express");
const { get } = require("http");

const usersRoutes = require("./routes/userRoutes");
const booksRoutes = require("./routes/booksRoutes");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.options("/:id/:subID", cors());

app.use(express.json());


app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/books", booksRoutes);

module.exports = app;
