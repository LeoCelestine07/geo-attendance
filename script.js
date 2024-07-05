import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config.js";

document.addEventListener('DOMContentLoaded', () => {
    const markAttendanceButton = document.getElementById('markAttendance');

    if (markAttendanceButton) {
        markAttendanceButton.addEventListener('click', () => {
            console.log("Button clicked!");

            const employeeSelect = document.getElementById('employee');
            const employeeName = employeeSelect.value;

            if (!employeeName) {
                document.getElementById('status').innerText = 'Please select an employee.';
                return;
            }

            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser');
                return;
            }

            navigator.geolocation.getCurrentPosition(success, error);

            async function success(position) {
                console.log("Geolocation success");

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const officeLatitude = 12.913278;
                const officeLongitude = 80.194500;

                const distance = calculateDistance(latitude, longitude, officeLatitude, officeLongitude);

                if (distance <= 1) {
                    const now = new Date();
                    const formattedDateTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                    document.getElementById('status').innerText = `${employeeName} marked present on ${formattedDateTime}`;

                    try {
                        const docRef = await addDoc(collection(db, "attendance"), {
                            name: employeeName,
                            timestamp: now,
                            latitude: latitude,
                            longitude: longitude
                        });
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                } else {
                    document.getElementById('status').innerText = 'You are not within the required location radius.';
                }
            }

            function error() {
                console.log("Geolocation error");
                alert('Unable to retrieve your location');
            }

            function calculateDistance(lat1, lon1, lat2, lon2) {
                const R = 6371;
                const dLat = degreesToRadians(lat2 - lat1);
                const dLon = degreesToRadians(lat2 - lon1);
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
    } else {
        console.error("Button not found!");
    }
});