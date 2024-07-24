import {
  signInWithEmailAndPassword,
  type User,
  type UserCredential,
} from "firebase/auth";
import { getAuthInstance } from "./firebase.service";
import { getUser } from "./user.service";

export async function authenticateUser(
  email: string,
  password: string,
): Promise<void> {
  const auth = getAuthInstance();

  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  localStorage.setItem("uuid", userCredential.user.uid);

  const user = await getUser(userCredential.user.uid);

  sessionStorage.setItem("user", JSON.stringify(user));

  const token = await userCredential.user.getIdToken();

  localStorage.setItem("token", token);
  console.log("token:", token);
}

export function getCurrentUser(): User | null {
  const auth = getAuthInstance();

  return auth.currentUser;
}

export async function logoutUser(): Promise<void> {
  const auth = getAuthInstance();
  localStorage.clear();
  sessionStorage.clear();
  return auth.signOut();
}
