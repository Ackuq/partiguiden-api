const { until } = require('../utils');

module.exports = async parties => {
  await until(() => memberArray.length > 0);

  return new Promise(resolve => {
    if (!parties) {
      resolve(memberArray);
    }

    if (Array.isArray(parties)) {
      const res = [];
      parties.forEach(party => {
        res.push(...partyMembers[party]);
      });
      resolve(res);
    } else resolve(partyMembers[parties]);
  });
};
