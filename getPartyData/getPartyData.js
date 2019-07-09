const { until } = require('../utils');

module.exports = async ({ party, subject }) => {
  await until(() => Object.entries(memberObject).length);

  return new Promise(resolve =>
    subject ? resolve(partyData[party][subject]) : resolve(partyData[party])
  );
};
