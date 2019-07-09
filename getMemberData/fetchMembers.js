const url = riksdagenUrl + '/personlista/?utformat=json';

module.exports = () =>
  fetch(url)
    .then(res => res.json())
    .then(json => require('./processMember')(json));
