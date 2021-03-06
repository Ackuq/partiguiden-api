const admin = require("firebase-admin");

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require
  const serviceAccount = require("../serviceAccountKey.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

module.exports = admin.firestore();
