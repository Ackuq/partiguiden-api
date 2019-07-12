const { until } = require("../utils");

module.exports = async ({ party, search }) => {
  await until(() => memberArray.length > 0);

  const filterArray = arr =>
    arr.filter(el => el.namn.toLowerCase().includes(search.toLowerCase()));

  return new Promise(resolve => {
    if (!party) {
      if (search) {
        resolve(filterArray(memberArray));
      }
      resolve(memberArray);
    }

    if (Array.isArray(party)) {
      let res = [];
      party.forEach(p => {
        res.push(...partyMembers[p]);
      });
      if (search) {
        res = filterArray(res);
      }
      resolve(res);
    } else {
      const arr = partyMembers[party.toLowerCase()];
      if (search) {
        resolve(filterArray(arr));
      }
      resolve(arr);
    }
  });
};
