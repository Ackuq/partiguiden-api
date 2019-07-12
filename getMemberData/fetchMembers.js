const processMembers = require("./processMembers");

const url = `${riksdagenUrl}/personlista/?utformat=json`;

module.exports = () =>
  fetch(url)
    .then(res => res.json())
    .then(json => {
      processMembers(json);
    });
