// Define global variables
let audioContext;
let analyser;
let microphone;
let isListening = false;
let currentWordIndex = 0;
// Words
const words = [
    { word: "beet", position: { x: 50, y: 50 } }, 
    { word: "boot", position: { x: 750, y: 50 } },
    { word: "bit", position: { x: 200, y: 100 } }, 
    { word: "book", position: { x: 550, y: 100 } },
    { word: "but", position: { x: 450, y: 150 } },
    { word: "bet", position: { x: 250, y: 200 } },
    { word: "bought", position: { x: 750, y: 200 } }, 
    { word: "bat", position: { x: 300, y: 250 } },
    { word: "bot", position: { x: 350, y: 300 } } 
];

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
        displayNextWord();
        //displayRandomWord();
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
    document.getElementById('word-display').textContent = words[currentWordIndex].word;
    return words[currentWordIndex].position; // Return the position of the new word
}

// Function to display a random word
function displayRandomWord() {
    let randomWordIndex = Math.floor(Math.random() * words.length);
    document.getElementById('word-display').textContent = words[randomWordIndex].word;
    return words[randomWordIndex].position; // Return the position of the new word
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    let position = displayRandomWord();  //displayNextWord();
    //let position = displayNextWord();  //displayNextWord();
    initializePlot(position.x, position.y, 0, 0);
    document.getElementById('start-button').addEventListener('click', () => {
        if (!isListening) {
            initAudio();
            document.getElementById('start-button').style.display = 'none';
        }
    });
});