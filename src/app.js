const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

// Global error handler — must be last
app.use(errorHandler);

module.exports = app;
