import { signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import { getAuthInstance } from "./firebase.service";

export async function authenticateUser(email: string, password: string) {
  const auth = getAuthInstance();

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return null;
    });
}
