import admin from "firebase-admin";

// Helper para garantir que todas as variáveis existam
function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value.replace(/\\n/g, "\n"); // To handle line breaks in the private key
}

const decodedPrivateKey = Buffer.from(getEnvVariable("FIREBASE_PRIVATE_KEY"), "base64").toString("utf8");

const credentials = {
  type: getEnvVariable("FIREBASE_TYPE"),
  project_id: getEnvVariable("FIREBASE_PROJECT_ID"),
  private_key_id: getEnvVariable("FIREBASE_PRIVATE_KEY_ID"),
  private_key: decodedPrivateKey.replace(/\\n/g, "\n"),
  client_email: getEnvVariable("FIREBASE_CLIENT_EMAIL"),
  client_id: getEnvVariable("FIREBASE_CLIENT_ID"),
  auth_uri: getEnvVariable("FIREBASE_AUTH_URI"),
  token_uri: getEnvVariable("FIREBASE_TOKEN_URI"),
  auth_provider_x509_cert_url: getEnvVariable("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
  client_x509_cert_url: getEnvVariable("FIREBASE_CLIENT_X509_CERT_URL"),
  universe_domain: getEnvVariable("FIREBASE_UNIVERSE_DOMAIN"),
};

admin.initializeApp({
  credential: admin.credential.cert(credentials as admin.ServiceAccount),
});

export default admin;
