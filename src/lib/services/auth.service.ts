import {
  signInWithEmailAndPassword,
  type User,
  type UserCredential,
} from "firebase/auth";
import { getAuthInstance } from "./firebase.service";

export async function authenticateUser(
  email: string,
  password: string,
): Promise<UserCredential | null> {
  const auth = getAuthInstance();

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      localStorage.setItem("uuid", userCredential.user.uid);
      localStorage.setItem("refresh", userCredential.user.refreshToken);
      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return null;
    });
}

export async function logoutUser(): Promise<void> {
  const auth = getAuthInstance();

  return auth.signOut();
}
