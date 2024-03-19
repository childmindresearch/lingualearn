import os
import numpy as np

# live_spectrogram
import pyaudio
import matplotlib.pyplot as plt
from scipy.signal import spectrogram
from IPython.display import display, clear_output
import threading

# audio_file_to_spectrogram
from scipy.io import wavfile 

# text_to_spectrogram
import tempfile
from gtts import gTTS
from speak import text_to_mp3

# audio_file_to_spectrogram
from scipy.fft import rfft
from pydub import AudioSegment

# resize_spectrogram
from scipy.ndimage import zoom


def live_spectrogram():

    # Initialize PyAudio and Set Parameters
    p = pyaudio.PyAudio()
    sample_rate = 44100
    chunk_size = 1024

    # Initialize Figure and Axes
    fig, ax = plt.subplots()

    # Initialize variables for spectrogram
    f, t, Sxx = [], [], []

    def update_spectrogram():
        global f, t, Sxx
        while True:
            try:
                audio_data = np.frombuffer(stream.read(chunk_size, exception_on_overflow=False), dtype=np.int16)
                f, t, Sxx = spectrogram(audio_data, fs=sample_rate)
                ax.clear()
                ax.pcolormesh(t, f, 10 * np.log10(Sxx), shading='gouraud')
                ax.set_ylabel('Frequency [Hz]')
                ax.set_xlabel('Time [sec]')
                ax.set_ylim(0, 3000)  # Adjust ylim as needed
                clear_output(wait=True)
                display(fig)
                plt.pause(0.01)
            except Exception as e:
                print(f"Error in audio stream: {e}")

    # Create and Start the Stream
    stream = p.open(format=pyaudio.paInt16,
                    channels=1,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk_size)

    # Create a thread for audio streaming
    audio_thread = threading.Thread(target=update_spectrogram)
    audio_thread.daemon = True
    audio_thread.start()


def text_to_spectrogram(text):
    '''
    >>> spec, sample_rate = text_to_spectrogram('ice cream')
    '''
    def text_to_mp3(text, output_file):
        tts = gTTS(text, lang='en')
        tts.save(output_file)

    output_file = 'tmp/tmp.mp3'  
    text_to_mp3(text, output_file)

    # Create spectrogram
    spec, sample_rate = audio_file_to_spectrogram(output_file) 
  
    return spec, sample_rate


def audio_file_to_spectrogram(audio_file):
    '''
    >>> spec, sample_rate = text_to_spectrogram('ice cream')
    >>> output_file = 'tmp/tmp.mp3'
    >>> spec, sample_rate = audio_file_to_spectrogram(audio_file=output_file)
    '''
    # Load audio
    if audio_file.endswith(".wav"):
        sample_rate, audio_data = wavfile.read(audio_file)
    elif audio_file.endswith(".mp3"):
        audio = AudioSegment.from_file(audio_file, format="mp3")
        sample_rate = audio.frame_rate
        audio_data = np.array(audio.get_array_of_samples(), dtype=np.int16)

    # Take FFTs
    nfft = 2048
    window = np.hanning(nfft)
    max_chunks = len(audio_data) // nfft
    spec = rfft(audio_data[:nfft])

    for i in range(nfft//2, max_chunks*nfft, nfft//2):
        chunk = audio_data[i:i+nfft] * window
        spec = np.vstack((spec, rfft(chunk)))

    return spec, sample_rate


def resize_spectrogram(spec, target_shape):
    '''
    >>> spec1, sample_rate1 = text_to_spectrogram('ice cream')
    >>> spec2, sample_rate2 = text_to_spectrogram('I scream')
    >>> spec2_resized = resize_spectrogram(spec2, spec1.shape)
    '''
    return zoom(spec, (target_shape[0]/spec.shape[0], target_shape[1]/spec.shape[1]))


def normalize_spectrogram(spec, max_value=1):
    spec_abs = np.abs(spec)
    spec_normalized = max_value * spec_abs / np.max(spec_abs)
    
    return spec_normalized

def normalize_spectrogram(spec, max_value=100, min_value=1):
    spec_abs = np.abs(spec)
    min_spec_value = np.min(spec_abs)
    max_spec_value = np.max(spec_abs)
    spec_shifted = spec_abs - min_spec_value
    spec_normalized = (spec_shifted / (max_spec_value - min_spec_value)) * max_value

    return spec_normalized


# Subtract (even different-shaped) spectrograms
def subtract_spectrograms(spec1, spec2):
    '''
    >>> spec1, sample_rate1 = text_to_spectrogram('ice cream')
    >>> spec2, sample_rate2 = text_to_spectrogram('I scream')
    >>> difference_spectrogram = subtract_spectrograms(spec1, spec2)
    '''
    # Assuming spec1 and spec2 have different shapes
    spec2 = resize_spectrogram(spec2, spec1.shape)
    spec1 = normalize_spectrogram(spec1, 100)
    spec2 = normalize_spectrogram(spec2, 100)

    difference_spectrogram = spec1 - spec2
    
    return difference_spectrogram


# Plot spectrogram  
def plot_spectrogram(spec, sample_rate, do_norm=False, cmap='viridis'):
    '''
    >>> spec, sample_rate = text_to_spectrogram('ice cream')
    >>> plot_spectrogram(spec, sample_rate, cmap='viridis')
    '''
    fig, ax = plt.subplots()
    if do_norm == False:
        im = ax.imshow(10 * np.log10(spec + 1), aspect='auto', origin='lower',
                extent=[0, len(spec[0])/sample_rate, 0, sample_rate/2], cmap=cmap)
    else:
        im = ax.imshow(10 * np.log10(normalize_spectrogram(spec, 100)), aspect='auto', origin='lower',
                extent=[0, len(spec[0])/sample_rate, 0, sample_rate/2], cmap=cmap)
    ax.set_xlabel('Time [s]')
    ax.set_ylabel('Frequency [Hz]')
    plt.colorbar(im)
    plt.show()