const { db } = require('../db');

const document = db.collection('Pages').doc('data');

module.exports = () => {
  document.onSnapshot(
    docSnapshot => {
      let data = [];

      for (let tag in docSnapshot.data()) {
        let object = docSnapshot.data()[tag];
        subjectObject[tag] = object;
        object.id = tag;
        data.push(object);
      }

      subjectData = data.sort();
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Encountered error: ${err}`);
    }
  );
};
