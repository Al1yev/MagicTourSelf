const express = require("express");
const bodyParser = require("body-parser");

const tourRouter = require("./router/tourRouter.js");
const userRouter = require("./router/userRouter.js");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
