// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCh326r4IgR9nmj-DhXRZHkwWqr3-97Nos",
    authDomain: "geoattendancekt.firebaseapp.com",
    projectId: "geoattendancekt",
    storageBucket: "geoattendancekt.appspot.com",
    messagingSenderId: "906284566686",
    appId: "1:906284566686:web:7dc255cc47626b2552538f",
    measurementId: "G-FMPM3M2E3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);