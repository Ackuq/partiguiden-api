"use strict";
const express = require("express");
const app = express();

const { fetchSubjectDataFromDB, getSubjectData } = require("./getSubjects");

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line node/no-unpublished-require
  require("dotenv").config();
}

// Init listeners
fetchSubjectDataFromDB();

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.get("/subject", (req, res) => {
  res.header().json(getSubjectData());
});

app.listen(process.env.PORT);
