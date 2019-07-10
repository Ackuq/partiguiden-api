'use strict';
const express = require('express');
const path = require('path');
const app = express();
require('./global');

const { fetchSubjectData, getSubjectTags } = require('./getSubjects');
const { fetchPartyData, getPartyData } = require('./getPartyData');
const { fetchMembers, getMembers, getMember } = require('./getMemberData');

const allowedOrigins = [
  'https://beta.partiguiden.nu',
  'https://partiguiden.nu',
  'http://localhost:3000',
];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line node/no-unpublished-require
  require('dotenv').config();
}

// Init listeners
fetchSubjectData();
fetchPartyData();
fetchMembers();

const setHeaders = ({ res, req }) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  res.set({
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Cache-Control': 'public,max-age=21600',
  });
};

app.get('/', (req, res) => {
  setHeaders({ res, req });
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

app.get('/party/:party', (req, res) => {
  setHeaders({ res, req });
  const party = req.params.party.toLowerCase();
  getPartyData({ party }).then(data => res.json(data));
});

app.get('/party/:party/:subject', (req, res) => {
  setHeaders({ res, req });
  const { subject } = req.params;
  const party = req.params.party.toLowerCase();
  getPartyData({ party: party.toLowerCase(), subject }).then(data => res.json(data));
});

app.get('/subject', async (req, res) => {
  setHeaders({ res, req });
  getSubjectTags().then(data => res.json(data));
});

app.get('/subject/:id', async (req, res) => {
  setHeaders({ res, req });
  const { id } = req.params;
  getSubjectTags(id).then(data => res.json(data));
});

app.get('/member/:id', async (req, res) => {
  setHeaders({ res, req });
  const { id } = req.params;

  getMember(id).then(data => res.json(data));
});

app.get('/members', async (req, res) => {
  setHeaders({ res, req });
  const { party } = req.query;
  getMembers(party).then(data => res.json(data));
});

app.listen(process.env.PORT);
