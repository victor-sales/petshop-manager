const admin = require("firebase-admin");
const serviceAccount = require("./petshop-manager-firebase-adminsdk-y7nuh-f44983a9e3.json");

if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } catch (error) {
      console.log('Firebase admin initialization error', error.stack);
    }
}

export default admin;