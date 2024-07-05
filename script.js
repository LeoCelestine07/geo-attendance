document.addEventListener('DOMContentLoaded', () => {
    const markAttendanceButton = document.getElementById('markAttendance');

    if (markAttendanceButton) {
        markAttendanceButton.addEventListener('click', () => {
            console.log("Button clicked!");
            document.getElementById('status').innerText = 'Button clicked!';
        });
    } else {
        console.error("Button not found!");
    }
});