document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Elements
    const registerBioAuthButton = document.getElementById('registerBioAuth');
    const attendanceForm = document.getElementById('attendanceForm');
    const markAttendanceButton = document.getElementById('markAttendance');

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('User logged in:', user.email);
            registerBioAuthButton.style.display = 'block';
            attendanceForm.style.display = 'block';
        } else {
            console.log('No user logged in');
            registerBioAuthButton.style.display = 'none';
            attendanceForm.style.display = 'none';
        }
    });

    registerBioAuthButton.addEventListener('click', () => {
        registerBiometricAuth();
    });

    markAttendanceButton.addEventListener('click', (e) => {
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

            const officeLatitude = 12.913278;
            const officeLongitude = 80.194500;
            console.log("Office Latitude:", officeLatitude, "Office Longitude:", officeLongitude);

            const distance = calculateDistance(latitude, longitude, officeLatitude, officeLongitude);
            console.log("Calculated Distance:", distance);

            if (distance <= 1) {
                verifyBiometricAuth(employeeName);
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

    function registerBiometricAuth() {
        navigator.credentials.create({
            publicKey: {
                challenge: new Uint8Array(26),
                rp: {
                    name: "Knockturn Geo Attendance"
                },
                user: {
                    id: new Uint8Array(26),
                    name: auth.currentUser.email,
                    displayName: auth.currentUser.displayName || auth.currentUser.email
                },
                pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required"
                },
                timeout: 60000,
                attestation: "direct"
            }
        }).then(credential => {
            console.log('Credential created:', credential);
            saveCredential(credential);
        }).catch(error => {
            console.error('Error during credential creation:', error);
        });
    }

    function saveCredential(credential) {
        const credentialData = {
            id: credential.id,
            rawId: arrayBufferToBase64(credential.rawId),
            response: {
                attestationObject: arrayBufferToBase64(credential.response.attestationObject),
                clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON)
            },
            type: credential.type
        };

        firebase.database().ref('credentials/' + auth.currentUser.uid).set(credentialData)
            .then(() => {
                console.log('Credential saved successfully');
            })
            .catch(error => {
                console.error('Error saving credential:', error);
            });
    }

    function verifyBiometricAuth(employeeName) {
        firebase.database().ref('credentials/' + auth.currentUser.uid).once('value')
            .then(snapshot => {
                const credentialData = snapshot.val();
                if (!credentialData) {
                    document.getElementById('status').innerText = 'Biometric credential not registered.';
                    return;
                }

                navigator.credentials.get({
                    publicKey: {
                        challenge: new Uint8Array(26), // replace with your own challenge from the server
                        allowCredentials: [{
                            id: base64ToArrayBuffer(credentialData.rawId),
                            type: 'public-key'
                        }],
                        timeout: 60000,
                        userVerification: 'required'
                    }
                }).then(assertion => {
                    console.log('Assertion received:', assertion);
                    const now = new Date();
                    const formattedDateTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                    document.getElementById('status').innerText = `${employeeName} marked present on ${formattedDateTime}`;

                    // Save to Firebase
                    saveMessages(employeeName, formattedDateTime);
                }).catch(error => {
                    console.error('Error during assertion:', error);
                    document.getElementById('status').innerText = 'Biometric verification failed.';
                });
            }).catch(error => {
                console.error('Error retrieving credential:', error);
                document.getElementById('status').innerText = 'Error retrieving biometric credential.';
            });
    }

    function saveMessages(name, time) {
        var newAttendanceForm = firebase.database().ref('attendanceForm').push();
        newAttendanceForm.set({
            name: name,
            time: time,
        });
    }

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    function base64ToArrayBuffer(base64) {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
});