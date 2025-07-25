// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_fN7h4qzwciWrX36TcgyW5vKv8qTmRjk",
  authDomain: "krishipatronp.firebaseapp.com",
  databaseURL: "https://krishipatronp-default-rtdb.firebaseio.com",
  projectId: "krishipatronp",
  storageBucket: "krishipatronp.firebasestorage.app",
  messagingSenderId: "875477129836",
  appId: "1:875477129836:web:bbae5f8fd4039c7306d649",
  measurementId: "G-MJR08JG976"
};

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Prevent initializing more than once
const auth = getAuth(app); // Example service

export { app, auth };
