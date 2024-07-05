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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
