// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPJFX9SK_OkDMCvdxgF1Apz1h_lA4-nGo",
  authDomain: "matchplay-6d6b0.firebaseapp.com",
  projectId: "matchplay-6d6b0",
  storageBucket: "matchplay-6d6b0.appspot.com",
  messagingSenderId: "849443985360",
  appId: "1:849443985360:web:41080ddbe56213cbb60bd5",
  measurementId: "G-9JT932M5W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);