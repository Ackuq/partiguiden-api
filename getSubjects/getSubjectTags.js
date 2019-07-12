const { until } = require("../utils");

module.exports = async id => {
  await until(() => subjectData);

  return new Promise(resolve =>
    id ? resolve(subjectObject[id]) : resolve(subjectData)
  );
};
