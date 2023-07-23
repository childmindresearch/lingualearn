#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Main program to check and simplify the readability of input text.

Use ChatGPT and textstat to simplify and estimate reading level in a loop.

Ex: python simplify_text.py -l 5 -n 5 -i "The sartorial maestro utilizes quotidien phraseology."

Copyright 2023, Arno Klein, MIT License

'''
import argparse
import textstat

from call_gpt import generate_chatgpt_response
from io_files import display_header

#-----------------------------------------------------------------------------                                              
# Command-line arguments                                                                                               
#-----------------------------------------------------------------------------                                              
parser = argparse.ArgumentParser(description="""                                                                            
                     Main program to check and simplify the readability of input text.""",
                     formatter_class = lambda prog:
                     argparse.HelpFormatter(prog, max_help_position=40))
parser.add_argument("-i", "--input", type=str, help='Input text for demonstration purposes.')
parser.add_argument("-n", "--number", type=int, help="Maximum number of loops (default: 10).", default=10)
parser.add_argument("-l", "--level", type=int, help="Maximum reading level by grade (default: 6).", default=6)
parser.add_argument("-q", "--quiet", action='store_true', help="Show minimal output on the command line.")
args = parser.parse_args()

input_text = args.input
max_loops = args.number
max_level = args.level
quiet = args.quiet

do_input_text = False
verbose = True
if input_text:
    do_input_text = True
if quiet:
    verbose = False

#-----------------------------------------------------------------------------                                              
# Functions                                                                                                  
#-----------------------------------------------------------------------------                                              
def check_reading_level(input_text, verbose=False):
    '''
    Check what the reading level is for input text.
    
    >>> input_text = "The sartorial maestro utilizes quotidien phraseology."
    >>> verbose = True
    >>> check_reading_level(input_text, verbose)
    Flesch-Kincaid Grade Level: 19.8
    '''

    # Calculate the Flesch-Kincaid Grade Level
    reading_level = textstat.flesch_kincaid_grade(input_text)

    if verbose:
        print("Flesch-Kincaid Grade Level: {0}".format(reading_level))

    return reading_level


def simplify_reading_level(input_text, max_level="6", max_loops=5, verbose=False):
    '''
    Simplify the reading level of input text to a specified reading level.

    Use ChatGPT and textstat to simplify and estimate reading level in a loop.
    
    >>> input_text = "The sartorial maestro utilizes quotidien phraseology."
    >>> max_level = 5
    >>> max_loops = 5
    >>> verbose = True
    >>> simplify_reading_level(input_text, max_level, max_loops, verbose)
    Flesch-Kincaid Grade Level: 19.8
    The clothing master uses everyday words.
    Flesch-Kincaid Grade Level: 8.0
    The person who makes clothes uses simple words.
    Flesch-Kincaid Grade Level: 4.1
    '''

    # Check reading level
    level = check_reading_level(input_text, verbose)

    # Loop to simplify reading level
    iloop = 0
    response = input_text
    too_complex = True
    while too_complex:
        iloop += 1
        if iloop == max:
            too_complex = False
            if verbose:
                print("Maximum number of loops reached.")
        elif level <= max_level:
            too_complex = False
            #if verbose:
            #    print("The reading level is at or below grade {0}.".format(max_level))
        else:
            prompt = "Return a simplified version of the following text that is at or below a reading level of school grade {0}: '{1}'".format(max_level, response)
            response = generate_chatgpt_response(prompt)
            if verbose:
                print("{0}".format(response))
            level = check_reading_level(response, verbose)

#-----------------------------------------------------------------------------                                              
# Demo                                                                                                  
#-----------------------------------------------------------------------------                                              
if verbose:
    display_header('Simplify text to be at or below reading level grade {0}.'.format(max_level))
    print(input_text)
if not do_input_text:
    input_text = "The sartorial maestro utilizes quotidien phraseology."
simplify_reading_level(input_text, max_level, max_loops, verbose)
