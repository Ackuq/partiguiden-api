const url = id =>
  riksdagenUrl + `/voteringlista/?iid=${id}&utformat=JSON&gruppering=namn`;

module.exports = id =>
  fetch(url(id))
    .then(res => res.json())
    .then(json => {
      const data = json.voteringlista.votering;
      const total =
        (parseInt(data.Ja, 10) || 0) +
        (parseInt(data.Nej, 10) || 0) +
        (parseInt(data.Frånvarande, 10) || 0) +
        (parseInt(data.Avstår, 10) || 0);
      return (
        Math.round((1 - (parseInt(data.Frånvarande, 10) || 0) / total) * 1000) /
        10
      );
    });
