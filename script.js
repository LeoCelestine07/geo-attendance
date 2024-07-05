document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('testButton');

    if (testButton) {
        testButton.addEventListener('click', () => {
            console.log("Button clicked!");
            document.getElementById('status').innerText = 'Button clicked!';
        });
    } else {
        console.error("Button not found!");
    }
});