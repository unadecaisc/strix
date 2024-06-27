import { writable } from "svelte/store";
import { authenticateUser, logoutUser } from "../lib/services/auth.service";
import {
  type UserCredential,
  type User as FirebaseUser,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuthInstance } from "../lib/services";

export type User = {
  firebaseUser?: FirebaseUser | null;
};

const initialUser: User = { firebaseUser: null };
const userStore = writable<User>(initialUser);

onAuthStateChanged(getAuthInstance(), (firebaseUser) => {
  userStore.set({ firebaseUser });
  setPersistence(getAuthInstance(), browserSessionPersistence);
});

async function authenticate(email: string, password: string): Promise<boolean> {
  try {
    const userCredential: UserCredential | null = await authenticateUser(
      email,
      password,
    );
    if (!userCredential) {
      return false;
    }

    userStore.set({
      firebaseUser: userCredential.user,
    });

    return true;
  } catch (error) {
    return false;
  }
}

async function logOut() {
  userStore.set(initialUser);
  await logoutUser();
}

export { userStore, authenticate, logOut };
