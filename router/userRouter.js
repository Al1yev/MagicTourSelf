const express = require("express");

const userRouter = express.Router();

userRouter
  .route("/")
  .get((req, res) => res.json("Ishlamayapti"))
  .post((req, res) => res.json("Ishlamayapti"));

userRouter.route("/:id").get((req, res) => res.json("No"));

module.exports = userRouter;
