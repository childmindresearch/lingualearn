#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Spoken and visual twist on the original Mad Lib game.

Use Google text-to-speech and speech-to-text, GPT-4, and Dall-E.

Ex: python glibgab.py -l 1 -w 5 -i "Leonardo Da Vinci's painting The Last Supper"

Copyright 2023, Arno Klein, MIT License

'''
import argparse

#-----------------------------------------------------------------------------                                              
# Command-line arguments                                                                                               
#-----------------------------------------------------------------------------                                              
parser = argparse.ArgumentParser(description="""                                                                            
                    Spoken and visual twist on the original Mad Lib game.
                    Secretly generates a description of an artwork at a given reading level, 
                    audibly prompts the user to replace words by speaking, 
                    and presents madlib output either as text or as a generated image.
                    This uses Google text-to-speech and speech-to-text, GPT-4, and Dall-E.
                    Ex: python glibgab.py -l 1 -w 5 -i \"Leonardo Da Vinci's painting The Last Supper\"
""",
                     formatter_class = lambda prog:
                     argparse.HelpFormatter(prog, max_help_position=40))
parser.add_argument("-i", "--input", type=str, help="Input text for demonstration purposes.")
parser.add_argument("-w", "--words", type=int, help="Maximum number of words to replace (default: 5).", default=5)
parser.add_argument("-l", "--level", type=int, help="Maximum reading level by grade.")
parser.add_argument("-q", "--quiet", action='store_true', help="Show minimal output on the command line.")
args = parser.parse_args()

input_text = args.input
select_max_words = args.words
max_reading_level = args.level
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
from generate_text_images import generate_description, generate_madlib
from generate_text_images import fill_madlib, fix_grammar
from generate_text_images import generate_image
from io_files import display_image

#-----------------------------------------------------------------------------                                              
# Demo                                                                                                  
#-----------------------------------------------------------------------------                                              
use_preset = False
if do_input_text:
    if input_text == "Leonardo Da Vinci's painting The Last Supper":
        use_preset = True
        description = "In the center of a long table, a man with shoulder-length hair, softly parted in the middle, and a trim beard turns slightly towards the viewer, though his face appears calm and tranquil amid the animated expressions of the twelve men surrounding him. Clad in a red tunic and blue robe, this central figure reaches towards bread and wine on the table while the men on either side of him react with differing degrees of surprise, curiosity, and consternation. Some of these men gesture dramatically, while others converse in small groups; a few gaze directly at the central figure, riveted by his calm demeanor. The table, laden with plates and glasses, is set against a mural-adorned wall under semi-circular arches that reveal a tranquil blue sky beyond."
    else:
        example = input_text
else:
    example = False

verbose = True
if not use_preset:
    description, example = generate_description(topic="famous artwork", 
                                                example=example, 
                                                max_reading_level=max_reading_level, 
                                                verbose=verbose)
madlib, unique_words = generate_madlib(description, 
                                       select_max_words=select_max_words, 
                                       verbose=verbose)
filled_madlib, new_words = fill_madlib(madlib, 
                                       words=unique_words, 
                                       response_duration=2, 
                                       verbose=verbose)
fixed_madlib = fix_grammar(input_text=filled_madlib, 
                           verbose=verbose)

print(fixed_madlib)

png_file = generate_image(prompt=fixed_madlib, size='256x256', output_format='png', output_dir='tmp', verbose=verbose)
display_image(png_file)