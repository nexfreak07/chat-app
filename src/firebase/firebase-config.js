// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// -- The Above Line is used to configure firestore

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// --- The above code is used for authentication, as we have chosen the sign-in providers as Google

// -- getAuth - It is used whenever you wnat Authentication in your project
// -- GoogleAuthProvider will tell firebase that you want to handle the authentication using google

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// -- Export auth is basically to tell you want to have authentication in the instance app
export const auth = getAuth(app);

// -- As GoogleAuthProvider is a class we are creating a object of it
export const provider = new GoogleAuthProvider();

// -- Exporting the configuration of Firestore as Database

export const db = getFirestore(app);
