#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Functions to support text-to-speech.

Copyright 2023, Arno Klein, MIT License

'''
from gtts import gTTS
import os

#-----------------------------------------------------------------------------                                              
# Functions to turn text to speech                                                                                                
#-----------------------------------------------------------------------------                                              
def text_to_speech(text, output_file="tmp/output.mp3"):
    '''
    >>> text = 'Test the next best text'
    >>> text_to_speech(text)
    '''
    tts = gTTS(text)
    tts.save(output_file)

    # Play the audio file 
    os.system("afplay {0}".format(output_file))  # macOS
