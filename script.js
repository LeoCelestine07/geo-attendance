document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('markAttendance').addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Mark Attendance button clicked");

        const employeeSelect = document.getElementById('employeeName');
        const employeeName = employeeSelect ? employeeSelect.value : null;

        if (!employeeName) {
            console.log("Employee name not selected");
            document.getElementById('status').innerText = 'Please select an employee.';
            return;
        }

        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {
            console.log("Geolocation success");
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude:", latitude, "Longitude:", longitude);

            //office coordinates
            const officeLatitude = 12.91331;
            const officeLongitude = 80.19456;
            console.log("Office Latitude:", officeLatitude, "Office Longitude:", officeLongitude);

            const distance = calculateDistance(latitude, longitude, officeLatitude, officeLongitude);
            console.log("Calculated Distance:", distance);

            if (distance <= 1) { // 1 km radius
                const now = new Date();
                const formattedDateTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                document.getElementById('status').innerText = `${employeeName} marked present on ${formattedDateTime}`;

                // Saving to Firebase
                saveMessages(employeeName, formattedDateTime);
            } else {
                document.getElementById('status').innerText = 'You are not within the required location radius.';
            }
        }

        function error() {
            console.log("Geolocation error");
            alert('Unable to retrieve your location');
        }

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Radius of the Earth in km
            const dLat = degreesToRadians(lat2 - lat1);
            const dLon = degreesToRadians(lon2 - lon1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        }

        function degreesToRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
    });

    function saveMessages(name, time) {
        var newAttendanceForm = firebase.database().ref('attendanceForm').push();
        newAttendanceForm.set({
            name: name,
            time: time,
        });
    }
});