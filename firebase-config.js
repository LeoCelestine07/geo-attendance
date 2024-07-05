// Your web app's Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference for database
var attendanceFormDB = firebase.database().ref('attendanceForm');

document.getElementById("attendanceForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal('employeeName');
    var time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log(name, time);

    saveMessages(name, time);

    // Show alert (if you have a div with class 'alert', otherwise skip this)
    // document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds (if you have a div with class 'alert', otherwise skip this)
    // setTimeout(() => {
    //     document.querySelector('.alert').style.display = 'none';
    // }, 3000);

    // Clear form
    document.getElementById("attendanceForm").reset();
}

const saveMessages = (name, time) => {
    var newAttendanceForm = attendanceFormDB.push();
    newAttendanceForm.set({
        name: name,
        time: time,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};