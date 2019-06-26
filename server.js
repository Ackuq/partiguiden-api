"use strict";
const express = require("express");
const path = require("path");
const app = express();
require("./global");

const { until } = require("./utils");
const { fetchSubjectData } = require("./getSubjects");
const { fetchPartyData, getPartyData } = require("./getPartyData");
const { fetchMembers, getMembers, getMember } = require("./getMemberData");

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line node/no-unpublished-require
  require("dotenv").config();
}

// Init listeners
fetchSubjectData();
fetchPartyData();
fetchMembers();

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname + "/index.html"));
});

app.get("/party", async (req, res) => {
  const { party, subject } = req.query;
  const data = await getPartyData({ party: party.toLowerCase(), subject });
  res.header("Access-Control-Allow-Origin", "*").json(data);
});

app.get("/subject", async (req, res) => {
  const { id } = req.query;
  await until(() => subjectData !== null);
  res
    .header("Access-Control-Allow-Origin", "*")
    .json(id ? subjectObject[id] : subjectData);
});

app.get("/member", async (req, res) => {
  const { id } = req.query;
  const member = await getMember(id);
  res.header("Access-Control-Allow-Origin", "*").json(member);
});

app.get("/members", async (req, res) => {
  await until(() => memberArray.length > 0);
  const { party } = req.query;
  const members = party ? await getMembers(party) : memberArray;
  res.header("Access-Control-Allow-Origin", "*").json(members);
});

app.listen(process.env.PORT);
