document.getElementById('markAttendance').addEventListener('click', () => {
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

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Office coordinates
        const officeLatitude = 12.913278;
        const officeLongitude = 80.194500;

        const distance = calculateDistance(latitude, longitude, officeLatitude, officeLongitude);

        if (distance <= 1) { // 1 km radius
            const now = new Date();
            const formattedDateTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            document.getElementById('status').innerText = `${employeeName} marked present on ${formattedDateTime}`;
        } else {
            document.getElementById('status').innerText = 'You are not within the required location radius.';
        }
    }

    function error() {
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

