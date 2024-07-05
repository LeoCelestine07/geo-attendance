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

// initialize firebase
firebase.initializeApp(firebaseConfig);
//reference for database
var attendanceFormDB = firebase.database().ref('attendanceForm')

document.getElementById("attendanceForm").addEventListener("submit", submitForm);


function submitForm(e) {
    e.preventDefault();

    var name = getElementVal('employeeName');
    var time = getElementVal('formattedDateTime');


    console.log(name, time);

}


const getElementVal = (id) => {
    return document.getElementById(id).ariaValueMax;

}