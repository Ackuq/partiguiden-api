const { db } = require("../db");

const collection = db.collection("Parties");

const parties = [
  { name: "Socialdemokraterna", letter: "s" },
  { name: "Moderaterna", letter: "m" },
  { name: "Sverigedemokraterna", letter: "sd" },
  { name: "Centerpartiet", letter: "c" },
  { name: "Vänsterpartiet", letter: "v" },
  { name: "Kristdemokraterna", letter: "kd" },
  { name: "Liberalerna", letter: "l" },
  { name: "Miljöpartiet", letter: "mp" }
];

module.exports = () => {
  collection.onSnapshot(colSnapshot => {
    colSnapshot.docs.forEach(doc => {
      partyData[
        parties.find(party => party.name === doc.id).letter
      ] = doc.data();
    });
  });
};
