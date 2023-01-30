const admin = require("firebase-admin");

if (!admin.apps.length) {

    const private_key = new Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'base64').toString('ascii')

    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(private_key))
      });
    } catch (error) {
      console.log('Firebase admin initialization error', error.stack);
    }
}

export default admin;