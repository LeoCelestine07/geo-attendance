import { initializeApp } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwSh1EQ3rrGrXQCLbW046SacohLgMwgrk",
    authDomain: "geoatkt.firebaseapp.com",
    databaseURL: "https://geoatkt-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "geoatkt",
    storageBucket: "geoatkt.appspot.com",
    messagingSenderId: "410244661766",
    appId: "1:410244661766:web:481cc95b80bcf3a885b987",
    measurementId: "G-C9HSEVJSY5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
