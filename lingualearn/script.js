// Define global variables
let audioContext;
let analyser;
let microphone;
let isListening = false;
let currentWordIndex = 0;
let maxPitch = 50;
let maxVolume = 350;
let plotWidth = 800; // copied from style.css
let plotHeight = 350; // copied from style.css

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

// Placeholder function for feature extraction
function extractFeatures(dataArray) {
    const pitch = detectPitch(dataArray); // Implement a better pitch detection algorithm
    const volume = calculateRMS(dataArray); // Calculate RMS for volume
    const features = { x: pitch, y: volume };
    console.log(features.x, features.y);
    return features
}

function calculateRMS(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += (data[i] - 128) ** 2; // Data is unsigned byte; 128 is the zero level
    }
    return Math.sqrt(sum / data.length);
}

function detectPitch(dataArray) {
    // Implement a basic pitch detection algorithm
    // This is a placeholder and needs a proper implementation
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    return sum / dataArray.length; // Placeholder calculation
}

function detectVolume(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    return sum / data.length;
}

function detectFrequencySpectrum(data) {
    // Perform a Fourier Transform to convert time-domain data to frequency-domain
    // This is a placeholder - a real implementation is more complex
    return data; // Placeholder array of frequency intensities
}
function detectRhythm(data) {
    // Analyze the waveform to find rhythmic patterns
    // This is a simplified placeholder
    return "rhythm pattern"; // Placeholder string representing the rhythm
}

function analyzeWaveform(data) {
    // Analyze the shape of the waveform
    // Placeholder for waveform analysis
    return "waveform characteristics"; // Placeholder string representing waveform shape
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
    // Normalize x and y values to fit within the plot area
    let normalizedX = normalizeValue(features.x, 0, maxPitch, 0, plotWidth);
    let normalizedY = normalizeValue(features.y, 0, maxVolume, 0, plotHeight);

    // Update marker position (you might need to scale or adjust these values)
    let marker = document.getElementById('red-marker');
    marker.style.left = normalizedX + 'px';
    marker.style.top = normalizedY + 'px';
}

function normalizeValue(value, minInput, maxInput, minOutput, maxOutput) {
    // Normalize a value from one range to another
    return ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;
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
        let position = displayRandomWord();  //displayNextWord();
        initializePlot(position.x, position.y, 0, 0);
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
    initializePlot(position.x, position.y, 0, 0);
    document.getElementById('start-button').addEventListener('click', () => {
        if (!isListening) {
            initAudio();
            document.getElementById('start-button').style.display = 'none';
        }
    });
});