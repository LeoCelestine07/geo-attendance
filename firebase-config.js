// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9wEGqEBhvqtYIaJL-BeOxIRdWlq908PM",
    authDomain: "geov6-attendance.firebaseapp.com",
    projectId: "geov6-attendance",
    storageBucket: "geov6-attendance.appspot.com",
    messagingSenderId: "302976092344",
    appId: "1:302976092344:web:8be79ebf2635c429d30c4d",
    measurementId: "G-Y5WM5JVVQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);