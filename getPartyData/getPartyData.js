module.exports = ({ party, subject }) =>
  new Promise(resolve =>
    subject ? resolve(partyData[party][subject]) : resolve(partyData[party])
  );
