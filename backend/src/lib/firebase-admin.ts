import admin from "firebase-admin";
import credentials from "../firebase-credentials.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

export default admin;
