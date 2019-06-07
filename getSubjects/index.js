const Firestore = require("@google-cloud/firestore");

const firestore = new Firestore();

const document = firestore.doc("Data/Pages");

let data = null;

const fetchSubjectData = () => {
  document.onSnapshot(
    docSnapshot => {
      data = docSnapshot.data();
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(`Encountered error: ${err}`);
    }
  );
};

module.exports.fetchSubjectDataFromDB = fetchSubjectData;
module.exports.getSubjectData = () => data;
