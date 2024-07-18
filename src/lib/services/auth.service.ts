import {
  signInWithEmailAndPassword,
  type User,
  type UserCredential,
} from "firebase/auth";
import { getAuthInstance } from "./firebase.service";

export async function authenticateUser(
  email: string,
  password: string,
): Promise<Boolean> {
  const auth = getAuthInstance();

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("uuid", userCredential.user.uid);

      userCredential.user.getIdToken().then((token) => {
        console.log("token:", token);
        localStorage.setItem("token", token);
      });

      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      localStorage.clear();
      return false;
    });
}

export function getCurrentUser(): User | null {
  const auth = getAuthInstance();

  return auth.currentUser;
}

export async function logoutUser(): Promise<void> {
  const auth = getAuthInstance();
  localStorage.clear();
  return auth.signOut();
}
