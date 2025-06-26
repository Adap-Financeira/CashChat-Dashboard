// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics only on the client side
export let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
