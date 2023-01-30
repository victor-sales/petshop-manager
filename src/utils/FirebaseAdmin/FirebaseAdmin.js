import { cert } from "firebase-admin/app";

const admin = require("firebase-admin");

if (!admin.apps.length) {

    const private_key = new Buffer.from(process.env.NEXT_PUBLIC_SERVICE_ACCOUNT_ENC, 'base64').toString('ascii');

    try {
      admin.initializeApp({
        credential: cert(JSON.parse(private_key))
      });
    } catch (error) {
      console.log('Firebase admin initialization error', error.stack);
    }
}

export default admin;