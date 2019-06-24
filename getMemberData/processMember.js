const notAcceptedCodes = [
  "sv",
  "en",
  "KandiderarINastaVal",
  "Officiell e-postadress",
  "Föräldrar",
  "Tjänstetelefon"
];
module.exports = json => {
  const year = new Date().getFullYear();
  const { person } = json.personlista;
  person.forEach(data => {
    const {
      intressent_id,
      tilltalsnamn,
      fodd_ar,
      efternamn,
      bild_url_192,
      personuppgift,
      parti,
      valkrets,
      status
    } = data;

    const uppgifter = personuppgift.uppgift.filter(
      el => !notAcceptedCodes.includes(el.kod)
    );

    const alder = year - fodd_ar;

    const member = {
      id: intressent_id,
      namn: `${tilltalsnamn} ${efternamn}`,
      bild_url: bild_url_192.replace("http", "https"),
      alder,
      parti,
      valkrets,
      status
    };

    memberArray.push(member);

    partyMembers[parti]
      ? partyMembers[parti].push(member)
      : (partyMembers[parti] = [member]);

    require("./getVoteAbsence")(intressent_id).then(
      absence =>
        (memberObject[intressent_id] = Object.assign(
          {},
          member,
          { uppgifter },
          { absence }
        ))
    );
  });
};
