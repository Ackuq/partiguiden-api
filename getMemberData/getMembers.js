module.exports = parties =>
  new Promise(resolve => {
    if (Array.isArray(parties)) {
      const res = [];
      parties.forEach(party => {
        res.push(...partyMembers[party]);
      });
      resolve(res);
    } else resolve(partyMembers[parties]);
  });
