import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./firebase-config.json";

const app = initializeApp(config);

export function getAuthInstance() {
  return getAuth(app);
}
