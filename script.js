document.addEventListener('DOMContentLoaded', () => {
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

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();

    const loginForm = document.getElementById('loginForm');
    const attendanceForm = document.getElementById('attendanceForm');
    const loginSection = document.getElementById('loginSection');
    const attendanceSection = document.getElementById('attendanceSection');
    const adminSection = document.getElementById('adminSection');
    const statusDiv = document.getElementById('status');
    const loginStatus = document.getElementById('loginStatus');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                checkUserRole(user.uid);
            })
            .catch(error => {
                loginStatus.innerText = error.message;
            });
    });

    const checkUserRole = (uid) => {
        database.ref('users/' + uid).once('value').then(snapshot => {
            const role = snapshot.val().role;
            const name = snapshot.val().name;
            if (role === 'admin') {
                showAdminDashboard();
            } else {
                showStaffPage(name);
            }
        });
    };

    const showAdminDashboard = () => {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
        fetchAllAttendanceRecords();
    };

    const showStaffPage = (name) => {
        loginSection.style.display = 'none';
        attendanceSection.style.display = 'block';
        document.getElementById('employeeName').value = name;
    };

    const fetchAllAttendanceRecords = () => {
        database.ref('attendanceForm').once('value').then(snapshot => {
            const records = snapshot.val();
            const recordsDiv = document.getElementById('attendanceRecords');
            recordsDiv.innerHTML = '';
            for (let key in records) {
                const record = records[key];
                recordsDiv.innerHTML += `<p>${record.name}: ${record.time}</p>`;
            }
        });
    };

    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('employeeName').value;
        const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        saveMessages(name, time);
        statusDiv.innerText = `${name} marked present on ${time}`;
        attendanceForm.reset();
    });

    const saveMessages = (name, time) => {
        const newAttendanceForm = database.ref('attendanceForm').push();
        newAttendanceForm.set({
            name: name,
            time: time,
        });
    };
});