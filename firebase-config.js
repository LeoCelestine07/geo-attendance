// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCh32dr4I9R9nmj-DhXRZHkWwQr3-97Nos",
    authDomain: "geoattendancetkt.firebaseapp.com",
    projectId: "geoattendancetkt",
    storageBucket: "geoattendancetkt.appspot.com",
    messagingSenderId: "906284566686",
    appId: "1:906284566686:web:7dc255cc47626b2552538f",
    measurementId: "G-FMPM3M2E3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
