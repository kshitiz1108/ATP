// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChOyxoHqdvbGRpLBLDFVs8DiHw_GfBiWE",
  authDomain: "gsits-28907.firebaseapp.com",
  projectId: "gsits-28907",
  storageBucket: "gsits-28907.appspot.com",
  messagingSenderId: "152891343003",
  appId: "1:152891343003:web:dc80460d0e9a3ce6e8c63e",
  measurementId: "G-K4BHKRRVSV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);