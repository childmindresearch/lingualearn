#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Functions to support text-to-speech and speech-to-text.

Copyright 2023, Arno Klein, MIT License

'''
from gtts import gTTS
import os
import sounddevice as sd
import soundfile as sf
import speech_recognition as sr

import pyaudio as pa 
import matplotlib.pyplot as plt 


#-----------------------------------------------------------------------------                                              
# Functions                                                                                              
#-----------------------------------------------------------------------------                                              
def record_audio(duration=5, output_file="tmp/output.wav", verbose=False):
    '''
    Record audio for a given duration in seconds.

    >>> duration = 5
    >>> record_speech(duration, output_file)
    '''
    sample_rate = 44100  # audio sample rate
    channels = 1  # number of audio channels

    # Start recording
    response = input("\nHit the Return button and begin speaking (recording will stop after {0} seconds):".format(duration))
    if not response:
        audio_data = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=channels)
        sd.wait()  # Wait for the recording to complete

        # Save the recorded audio to a file
        sf.write(output_file, audio_data, sample_rate)

        if verbose:
            print("\nRecording saved to: ", output_file)


def play_audio(output_file):
    os.system("afplay {0}".format(output_file))  # macOS


def text_to_mp3(text, output_file="tmp/output.mp3"):
    '''
    >>> text = 'Test the next best text'
    >>> text_to_mp3(text)
    '''
    tts = gTTS(text)
    tts.save(output_file)


def text_to_speech(text, output_file="tmp/output.mp3"):
    '''
    >>> text = 'Test the next best text'
    >>> text_to_speech(text)
    '''
    text_to_mp3(text, output_file)

    # Play the audio file 
    play_audio(output_file)


def wav_to_text(audio_source="tmp/output.wav", verbose=False):
    '''
    SpeechRecognition for speech-to-text conversion.

    >>> audio_source = "tmp/output.wav"
    >>> output_text = wav_to_text(audio_source)
    '''
    output_text = None

    # Create a recognizer instance
    r = sr.Recognizer()

    # Load the audio file
    with sr.AudioFile(audio_source) as source:
        # Read the entire audio file
        audio = r.record(source)

    try:
        # Perform speech recognition
        output_text = r.recognize_google(audio)  # You can use other recognition engines as well

    except sr.UnknownValueError:
        if verbose:
            print("\nSpeech recognition could not understand audio.")
    except sr.RequestError as e:
        if verbose:
            print("\nCould not request results from speech recognition service; {0}".format(e))

    return output_text


def speech_to_text(duration=5, output_audio="tmp/output.wav", verbose=False):
    '''
    Record speech for a given duration (in seconds), and convert to text.

    >>> output_audio = "tmp/output.wav"
    >>> output_text = speech_to_text(duration, output_audio)
    '''
    # Record speech
    record_audio(duration, output_audio, verbose)
    
    # Convert audio file to text
    output_text = wav_to_text(output_audio, verbose)

    return output_text
