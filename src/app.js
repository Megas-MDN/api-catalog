require("express-async-errors");
const express = require("express");
const cors = require("cors");
const logs = require("./middlewares/logs");
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static("public"));
app.use(logs);

module.exports = { app };
