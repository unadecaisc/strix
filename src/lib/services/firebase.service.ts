import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const FIREBASE_CONFIG = atob(import.meta.env.VITE_FIREBASE_CONFIG);

export function getFirebaseConfig(configKey: string) {
  return JSON.parse(configKey);
}

const app = initializeApp(getFirebaseConfig(FIREBASE_CONFIG));

export function getAuthInstance() {
  return getAuth(app);
}
