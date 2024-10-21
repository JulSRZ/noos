// import firebase from 'firebase/app';
import { auth } from "../../firebase/init";
import { onAuthStateChanged } from "firebase/auth";

export function isAuthenticated() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
}