// features.js
// First Formant (F1): 
//     This usually lies in the range of 300 to 800 Hz. 
//     It is associated with vowel height (openness).
// Second Formant (F2): 
//     This typically ranges from 800 to 2200 Hz. 
//     It is related to vowel backness (front vs. back).

function extractFormants(dataArray, sampleRate) {
    const fftSize = 2048; // Example size, can be adjusted
    analyser.fftSize = fftSize;
    analyser.getFloatFrequencyData(dataArray);
    //console.log("dataArray", dataArray)

    // Identify peaks in the dataArray here
    const peaks = findPeaks(dataArray);
    //console.log("peaks", peaks)

    // Map peaks to formants (F1, F2, F3, etc.)
    const formants = mapPeaksToFormants(peaks, sampleRate, fftSize);
    //console.log("formants", formants)

    return formants;
  }
  
  function findPeaks(dataArray, threshold = -60) {
    let peaks = [];
    for (let i = 1; i < dataArray.length - 1; i++) {
        if (dataArray[i] > threshold && dataArray[i] > dataArray[i - 1] && dataArray[i] > dataArray[i + 1]) {
            peaks.push({ position: i, value: dataArray[i] });
        }
    }
    return peaks;
  }
  
  function mapPeaksToFormants(peaks, sampleRate, fftSize) {
    // Convert peak positions to frequencies
    let formants = peaks.map(peak => {
        const frequency = (peak.position * sampleRate) / (fftSize);
        return { frequency: frequency, value: peak.value };
    });

    // Sort formants by frequency
    formants.sort((a, b) => a.frequency - b.frequency);

    // Filter to find the first and second formants
    let F1 = formants.find(f => f.frequency >= 300 && f.frequency <= 800);
    let F2 = formants.find(f => f.frequency >= 800 && f.frequency <= 2200);

    // Check if F1 and F2 are undefined and handle accordingly
    F1 = F1 || { frequency: null, value: null };
    F2 = F2 || { frequency: null, value: null };

    return { F1, F2 };
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

