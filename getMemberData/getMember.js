const { until } = require('../utils');

module.exports = async id => {
  await until(() => Object.entries(memberObject).length);

  new Promise(resolve => resolve(memberObject[id]));
};
