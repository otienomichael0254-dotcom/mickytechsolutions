// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQp3ftFa4OC4N22GrVOaxMEXHpGL9xFpA",
  authDomain: "portfolio-3feb2.firebaseapp.com",
  projectId: "portfolio-3feb2",
  storageBucket: "portfolio-3feb2.firebasestorage.app",
  messagingSenderId: "1076426264946",
  appId: "1:1076426264946:web:f13e2651934efbd4e04deb",
  measurementId: "G-6MK1BQD1HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);