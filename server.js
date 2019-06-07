"use strict";
const express = require("express");
const path = require("path");
const app = express();

const { fetchSubjectDataFromDB, getSubjectData } = require("./getSubjects");
const { fetchPartyData, getPartyData } = require("./getPartyData");

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line node/no-unpublished-require
  require("dotenv").config();
}

// Init listeners
fetchSubjectDataFromDB();
fetchPartyData();

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.get("/party", (req, res) => {
  const { party, subject } = req.query;
  res
    .header("Access-Control-Allow-Origin", "*")
    .json(getPartyData({ party, subject }));
});

app.get("/subject", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*").json(getSubjectData());
});

app.listen(process.env.PORT);
