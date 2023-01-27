
const admin = require("firebase-admin");

if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT))
      });
    } catch (error) {
      console.log('Firebase admin initialization error', error.stack);
    }
}

export default admin;