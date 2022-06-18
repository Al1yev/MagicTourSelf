const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app.js");

const DB = process.env.DB_LINK.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB, {}, console.log("DB is connected"));

app.listen(process.env.PORT, process.env.URL, console.log("Server is running"));
