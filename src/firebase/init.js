/*eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBndjrAHPNhUurelzrCc4tn-ffEkeQry4c',
  authDomain: 'noos-41838.firebaseapp.com',
  projectId: 'noos-41838',
  storageBucket: 'noos-41838.appspot.com',
  messagingSenderId: '891022936300',
  appId: '1:891022936300:web:ed5e00b77125cd281f3dc9',
  measurementId: 'G-TGH1XVXR5D'
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
//const analytics = getAnalytics(app);