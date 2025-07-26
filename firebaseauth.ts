// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import './envConfig.ts'


const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_DATABASE,
  projectId: process.env.FIRE_PROJECT_ID,
  storageBucket: process.env.FIRE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRE_MESSAGINGSENDERID,
  appId: process.env.FIRE_APP_ID,
  measurementId: process.env.FIRE_MEASUREMENT_ID
};

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// Prevent initializing more than once
const auth = getAuth(app); // Example service

export { app, auth };
