const { db } = require("../db");

const document = db.collection("Pages").doc("data");

let data = null;

const fetchSubjectData = () => {
  document.onSnapshot(
    docSnapshot => {
      let sorted = [];
      for (let tag in docSnapshot.data()) {
        let object = docSnapshot.data()[tag];
        object.id = tag;
        sorted.push(object);
      }
      data = sorted.sort((a, b) => {
        if (a.name.charAt(0) > b.name.charAt(0)) return 1;
        if (a.name.charAt(0) < b.name.charAt(0)) return -1;
        return 0;
      });
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Encountered error: ${err}`);
    }
  );
};

module.exports.fetchSubjectDataFromDB = fetchSubjectData;
module.exports.getSubjectData = () => data;
