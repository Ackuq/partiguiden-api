const { until } = require("../utils");

module.exports = async id => {
  await until(() => memberObject[id]);

  return new Promise(resolve => resolve(memberObject[id]));
};
