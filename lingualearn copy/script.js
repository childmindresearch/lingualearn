// Define global variables
let audioContext;
let analyser;
let microphone;
let isListening = false;
let currentWordIndex = 0;
let initX = -25;
let initY = 0;
let minX = 0;
let maxX = -60;
let minY = 0;
let maxY = -60;
let markerRadius = 10; // copied from style.css
let plotWidth = 800; // copied from style.css
let plotHeight = 350; // copied from style.css

// Words
/*const words = [
    { word: "beet", position: { x: 50, y: 50 } }, 
    { word: "boot", position: { x: 750, y: 50 } },
    { word: "bit", position: { x: 200, y: 100 } }, 
    { word: "book", position: { x: 550, y: 100 } },
    { word: "but", position: { x: 450, y: 150 } },
    { word: "bet", position: { x: 250, y: 200 } },
    { word: "bought", position: { x: 750, y: 200 } }, 
    { word: "bat", position: { x: 300, y: 250 } },
    { word: "bot", position: { x: 350, y: 300 } } 
];*/
const words = [
    { word: "beet", position: { x: 650, y: 0 } }, 
    { word: "boot", position: { x: 500, y: 300 } },
    { word: "bit", position: { x: 600, y: 0 } }, 
    { word: "book", position: { x: 650, y: 350 } },
    { word: "but", position: { x: 700, y: 300 } },
    { word: "bet", position: { x: 600, y: 0 } },
    { word: "bought", position: { x: 700, y: 300 } }, 
    { word: "bat", position: { x: 700, y: 300 } },
    { word: "bot", position: { x: 700, y: 300 } } 
];

// Function to initialize audio processing
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sampleRate = audioContext.sampleRate;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    microphone.connect(analyser);
    isListening = true;
    processAudio();
}

// Function to process audio data
function processAudio() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    //console.log(dataArray)

    //const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const process = () => {
        if (!isListening) return; // Stop processing if not listening
        requestAnimationFrame(process);
        analyser.getFloatFrequencyData(dataArray);
        //analyser.getByteFrequencyData(dataArray);

        const features = extractFeatures(dataArray);
        updateMarkerPosition(features);
        checkProximity();
    };
    process();
}

// Feature extraction
function extractFeatures(dataArray) {
    const formants = extractFormants(dataArray, sampleRate); // formants
    //console.log("F1: ", formants.F1.value)
    //console.log("F2: ", formants.F2.value)    
    const features = { x: formants.F1.value, y: formants.F2.value };
    //console.log(features.x, features.y);
    return features
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

    // Clear existing elements in the plot area
    while (plotArea.firstChild) {
        plotArea.removeChild(plotArea.firstChild);
    }

    drawGrid();
    addAxisLabels();

    let targetCircle = createCircle('target-circle', 'circle', { x: target_x, y: target_y });
    let redMarker = createCircle('red-marker', 'circle marker', { x: marker_x, y: marker_y });

    plotArea.appendChild(targetCircle);
    plotArea.appendChild(redMarker);
}

// Function to update the marker position
function updateMarkerPosition(features) {
    // Normalize x and y values to fit within the plot area
    let normalizedX = normalizeValue(features.x, minX, maxX, 0, plotWidth);
    let normalizedY = normalizeValue(features.y, minY, maxY, 0, plotHeight);
    //console.log("normalizedX: ", normalizedX)
    //console.log("normalizedY: ", normalizedY)

    // Update marker position (you might need to scale or adjust these values)
    let marker = document.getElementById('red-marker');
    marker.style.left = (normalizedX) + 'px';
    marker.style.top = (normalizedY) + 'px';
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
        initializePlot(position.x - markerWidth, position.y - markerWidth, initX, initY);
        isListening = true; // Restart audio processing
        processAudio();
    }, 1000); // Adjust the delay as needed
}

// Function to display a celebratory message
function displayCelebratoryMessage() {
    // Display your celebratory message
    alert('Great pronunciation!');
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

function drawGrid() {
    let plotArea = document.getElementById('plot-area');
    let numberOfVerticalLines = 16;
    let numberOfHorizontalLines = 7;
    let xSpacing = plotWidth / numberOfVerticalLines;
    let ySpacing = plotHeight / numberOfHorizontalLines;

    // Draw vertical lines
    for (let i = 0; i <= numberOfVerticalLines; i++) {
        let line = document.createElement('div');
        line.className = 'grid-line vertical';
        line.style.left = i * xSpacing + 'px';
        plotArea.appendChild(line);
    }

    // Draw horizontal lines
    for (let i = 0; i <= numberOfHorizontalLines; i++) {
        let line = document.createElement('div');
        line.className = 'grid-line horizontal';
        line.style.top = i * ySpacing + 'px';
        plotArea.appendChild(line);
    }
}

function addAxisLabels() {
    let plotArea = document.getElementById('plot-area');

    let yAxisLabelUpperLeft = document.createElement('div');
    yAxisLabelUpperLeft.className = 'axis-label';
    yAxisLabelUpperLeft.textContent = 'front & closed';
    yAxisLabelUpperLeft.style.top = '0';
    plotArea.appendChild(yAxisLabelUpperLeft);
    let yAxisLabelLowerLeft = document.createElement('div');
    yAxisLabelLowerLeft.className = 'axis-label';
    yAxisLabelLowerLeft.textContent = 'front & open';
    yAxisLabelLowerLeft.style.bottom = '0';
    plotArea.appendChild(yAxisLabelLowerLeft);
    let xAxisLabelUpperRight = document.createElement('div');
    xAxisLabelUpperRight.className = 'axis-label';
    xAxisLabelUpperRight.textContent = 'back & closed';
    xAxisLabelUpperRight.style.right = '0';
    plotArea.appendChild(xAxisLabelUpperRight);
    let xAxisLabelLowerRight = document.createElement('div');
    xAxisLabelLowerRight.className = 'axis-label';
    xAxisLabelLowerRight.textContent = 'back & open';
    xAxisLabelLowerRight.style.right = '0';
    xAxisLabelLowerRight.style.bottom = '0';
    plotArea.appendChild(xAxisLabelLowerRight);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    let position = displayRandomWord();  //displayNextWord();
    initializePlot(position.x - markerRadius, position.y - markerRadius, initX, initY);
    document.getElementById('start-button').addEventListener('click', () => {
        if (!isListening) {
            initAudio();
            document.getElementById('start-button').style.display = 'none';
        }
    });
});