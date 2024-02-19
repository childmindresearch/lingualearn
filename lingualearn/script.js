// Define global variables
let audioContext;
let analyser;
let microphone;
let isListening = false;
let currentWordIndex = 0;
let words = ["bot", "bat", "but", "bought", "bet", "bit", "beet", "book", "boot"];
let phonemes = ["bot", "bat", "but", "bought", "bet", "bit", "beet", "book", "boot"];

// Function to initialize audio processing
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    microphone.connect(analyser);
    isListening = true;
    processAudio();
}

// Function to process audio data
function processAudio() {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const process = () => {
        if (!isListening) return; // Stop processing if not listening
        requestAnimationFrame(process);
        analyser.getByteFrequencyData(dataArray);
        const features = extractFeatures(dataArray);
        updateMarkerPosition(features);
        checkProximity();
    };
    process();
}

// Function to create a circle
function createCircle(id, className, position) {
    let circle = document.createElement('div');
    circle.id = id;
    circle.className = className;
    if (position) {
        circle.style.left = position.x + 'px';
        circle.style.top = position.y + 'px';
    }
    return circle;
}

// Function to initialize the plot with target and marker
function initializePlot(target_x, target_y, marker_x, marker_y) {
    let plotArea = document.getElementById('plot-area');
    let targetCircle = createCircle('target-circle', 'circle', { x: target_x, y: target_y });
    let redMarker = createCircle('red-marker', 'circle marker', { x: marker_x, y: marker_y });

    plotArea.appendChild(targetCircle);
    plotArea.appendChild(redMarker);
}

// Function to update the marker position
function updateMarkerPosition(features) {
    let marker = document.getElementById('red-marker');
    marker.style.left = features.x + 'px';
    marker.style.top = features.y + 'px';
}

// Placeholder function for feature extraction
function extractFeatures(dataArray) {
    // Implement feature extraction logic
    // For demonstration, let's use a simple frequency-based placeholder
    const maxIndex = dataArray.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    return {
        x: maxIndex, // placeholder for horizontal axis
        y: dataArray[maxIndex] // placeholder for vertical axis
    };
}

// Define a function to calculate the distance between two points
function calculateDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

// Modify the checkProximity function to include pausing and message display
function checkProximity() {
    let marker = document.getElementById('red-marker');
    let target = document.getElementById('target-circle');
    let markerPos = { x: parseInt(marker.style.left, 10), y: parseInt(marker.style.top, 10) };
    let targetPos = { x: parseInt(target.style.left, 10), y: parseInt(target.style.top, 10) };
    let distance = calculateDistance(markerPos, targetPos);
    let proximityRadius = 20; // Adjust this radius as needed

    if (distance <= proximityRadius) {
        celebrateSuccess();
    }
}

// Modify the celebrateSuccess function
function celebrateSuccess() {
    isListening = false; // Stop audio processing
    displayCelebratoryMessage();
    setTimeout(() => {
        displayRandomWord();
        isListening = true; // Restart audio processing
        processAudio();
    }, 2000); // Adjust the delay as needed
}

// Function to display a celebratory message
function displayCelebratoryMessage() {
    // Display your celebratory message
    alert('Great job!'); // Placeholder
}

// Function to display the next word
function displayNextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    document.getElementById('word-display').textContent = words[currentWordIndex];
    updateTargetPosition(); // Update the position of the gray circle for the new word
}

// Function to display a random word
function displayRandomWord() {
    document.getElementById('word-display').textContent = words[Math.floor(Math.random() * words.length)];
    updateTargetPosition(); // Update the position of the gray circle for the new word
}

// Function to update the target position based on the current word
function updateTargetPosition() {
    // Logic to update the position of the gray circle based on the current word
    // This is a placeholder; replace it with your actual positioning logic
    //let targetCircle = document.getElementById('target-circle');
    //targetCircle.style.left = '100px'; // Example position
    //targetCircle.style.top = '50px';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayRandomWord();  //displayNextWord();
    initializePlot(20, 250, 0, 0);
    document.getElementById('start-button').addEventListener('click', () => {
        if (!isListening) {
            initAudio();
            document.getElementById('start-button').style.display = 'none';
        }
    });
});