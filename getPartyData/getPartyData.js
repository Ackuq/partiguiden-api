const { until } = require("../utils");

module.exports = async ({ party, subject }) => {
  await until(() => partyData[party]);

  return new Promise(resolve =>
    subject ? resolve(partyData[party][subject]) : resolve(partyData[party])
  );
};
