const path = require("path");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const knex = require("./db/connection");

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");


const app = express();

app.set("db", knex);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
