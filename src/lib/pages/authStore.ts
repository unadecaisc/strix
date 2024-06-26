import { writable } from 'svelte/store';

interface User {
  username: string;
  password: string;
}

const hardcodedUser: User = {
  username: 'admin',
  password: 'password123',
};

const isAuthenticated = writable(false);

function login(username: string, password: string) {
  console.log(`Trying to login with username: ${username} and password: ${password}`);
  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    console.log("Login successful!");
    isAuthenticated.set(true);
    return true;
  } else {
    console.log("Login failed!");
    return false;
  }
}

function logout() {
  isAuthenticated.set(false);
}

export { isAuthenticated, login, logout };