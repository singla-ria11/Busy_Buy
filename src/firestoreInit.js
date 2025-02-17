// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPDqLDRxmoR8aj-VRcvKnudnh1Gwnp228",
  authDomain: "busy-buy-a184d.firebaseapp.com",
  projectId: "busy-buy-a184d",
  storageBucket: "busy-buy-a184d.firebasestorage.app",
  messagingSenderId: "436015685838",
  appId: "1:436015685838:web:d62a83f74ccf75d170f09f",
  measurementId: "G-97NB9H254J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
