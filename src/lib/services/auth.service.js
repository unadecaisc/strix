import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthInstance } from "./firebase.service";
export async function authenticateUser(email, password) {
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
//# sourceMappingURL=auth.service.js.map
