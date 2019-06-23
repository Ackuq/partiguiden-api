const { db } = require("../db");
const collection = db.collection("Parties");

module.exports = () => {
  collection.onSnapshot(colSnapshot => {
    colSnapshot.docs.forEach(doc => {
      partyData[doc.id] = doc.data();
    });
  });
};
