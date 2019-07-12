const { db } = require("../db");

const document = db.collection("Pages").doc("data");

module.exports = () => {
  document.onSnapshot(
    docSnapshot => {
      const data = [];

      Object.keys(docSnapshot.data()).forEach(tag => {
        const object = docSnapshot.data()[tag];
        subjectObject[tag] = object;
        object.id = tag;
        data.push(object);
      });

      const sorted = data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      subjectData = sorted;
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Encountered error: ${err}`);
    }
  );
};
