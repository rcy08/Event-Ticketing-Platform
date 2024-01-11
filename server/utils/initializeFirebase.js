const admin = require('firebase-admin');
const serviceAccount = require('../ticketvibe-firebase-adminsdk-qys38-42702b043e.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = bucket;