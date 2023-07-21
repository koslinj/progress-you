// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRNy3QbN_O73IamAXzmY4iiAj1IL0h8-I",
  authDomain: "progress-you.firebaseapp.com",
  projectId: "progress-you",
  storageBucket: "progress-you.appspot.com",
  messagingSenderId: "395712681508",
  appId: "1:395712681508:web:b46bdab3adbb27d93deab1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const AUTH_ERRORS: Record<string, string> = {
  'auth/user-not-found': 'There is no such user!',
  'auth/wrong-password': 'Wrong password!',
  'auth/weak-password': 'Password must have at least 6 characters!',
  'auth/invalid-email': 'Wrong email!',
  'auth/email-already-in-use': 'Email already in use!',
};