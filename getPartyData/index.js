const { db } = require("../db");

const collection = db.collection("Parties");

let data = {};

const fetchPartyData = () => {
  collection.onSnapshot(colSnapshot => {
    colSnapshot.docs.forEach(doc => {
      data[doc.id] = doc.data();
    });
  });
};

module.exports.getPartyData = ({ party, subject }) =>
  subject ? data[party][subject] : data[party];
module.exports.fetchPartyData = fetchPartyData;
