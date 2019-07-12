/* eslint-disable camelcase */
const getVoteAbsence = require("./getVoteAbsence");

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
  const sorted = person.sort((a, b) => {
    if (a.tilltalsnamn < b.tilltalsnamn) {
      return -1;
    }
    if (a.tilltalsnamn > b.tilltalsnamn) {
      return 1;
    }
    return 0;
  });
  sorted.forEach(data => {
    const {
      intressent_id,
      tilltalsnamn,
      fodd_ar,
      efternamn,
      bild_url_192,
      personuppgift,
      personuppdrag,
      parti,
      valkrets,
      status
    } = data;

    const uppgifter = personuppgift.uppgift.filter(
      el => !notAcceptedCodes.includes(el.kod)
    );
    const isLeader = personuppdrag.uppdrag.find(
      el => el.roll_kod === "Partiledare" && !el.tom
    );
    const age = year - fodd_ar;

    const member = {
      id: intressent_id,
      name: `${tilltalsnamn} ${efternamn}`,
      picture: bild_url_192.replace("http", "https"),
      age,
      party: parti,
      constituency: valkrets,
      status
    };

    if (isLeader) {
      member.isLeader = true;
    }

    const party = parti.toLowerCase();

    memberArray.push(member);
    if (partyMembers[party]) {
      partyMembers[party].push(member);
    } else {
      partyMembers[party] = [member];
    }

    getVoteAbsence(intressent_id).then(absence => {
      memberObject[intressent_id] = Object.assign(
        {},
        member,
        { missions: uppgifter },
        { absence }
      );
    });
  });
};
