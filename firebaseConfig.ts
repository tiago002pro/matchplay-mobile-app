import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPJFX9SK_OkDMCvdxgF1Apz1h_lA4-nGo",
  authDomain: "matchplay-6d6b0.firebaseapp.com",
  projectId: "matchplay-6d6b0",
  storageBucket: "matchplay-6d6b0.appspot.com",
  messagingSenderId: "849443985360",
  appId: "1:849443985360:web:41080ddbe56213cbb60bd5",
  measurementId: "G-9JT932M5W2"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };