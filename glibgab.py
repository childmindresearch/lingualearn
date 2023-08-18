#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Spoken and visual twist on the original Mad Lib game.

Use Google text-to-speech and speech-to-text, ChatGPT, and Dall-E.

Ex: python glibgab.py -l 9 -i "Leonardo Da Vinci's painting The Last Supper"

Copyright 2023, Arno Klein, MIT License

'''
import argparse
import ast

from call_gpt import generate_chatgpt_response
#from simplify_text import simplify_reading_level
from speak import text_to_speech
from speak import speech_to_text

#-----------------------------------------------------------------------------                                              
# Command-line arguments                                                                                               
#-----------------------------------------------------------------------------                                              
parser = argparse.ArgumentParser(description="""                                                                            
                     Spoken and visual twist on the original Mad Lib game.""",
                     formatter_class = lambda prog:
                     argparse.HelpFormatter(prog, max_help_position=40))
parser.add_argument("-i", "--input", type=str, help='Input text for demonstration purposes.')
parser.add_argument("-l", "--level", type=int, help="Maximum reading level by grade (default: 6).", default=6)
parser.add_argument("-q", "--quiet", action='store_true', help="Show minimal output on the command line.")
args = parser.parse_args()

input_text = args.input
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


def generate_description(topic="famous artwork", specific_instance=False, 
                         max_reading_level=False, verbose=False):
    '''
    Select a topic and generate a description at the desired grade level.
    
    >>> topic = "famous artwork"
    >>> specific_instance = "Leonardo Da Vinci's painting The Last Supper"
    >>> max_reading_level = 9
    >>> verbose = True
    >>> description = generate_description(topic, specific_instance, max_reading_level, verbose)

        Prompt:
        Create an exciting and evocative, 1-paragraph description 
        of the visible content (such as the appearance and behaviors of the characters, 
        or the scenery) of the following topic:  at no more difficult than reading level 9. 
        Do not include anything like 'The output is:' or enclosing quotation marks; 
        return just the description. 
        The topic is: Leonardo Da Vinci's painting The Last Supper

        Description:
        "Amid an expansive dining room marked by its striking symmetry, Leonardo Da Vinci's masterpiece, 
        The Last Supper, unfurls an intricate tapestry of human emotion and divine revelation. 
        Thirteen figures are seated at an imposing long table, central among whom is Jesus Christ, 
        the contrast of his attire illuminating him as the heart of the tableau. Each disciple, 
        rendered with remarkable attention to detail, is caught in various stages of reaction to Jesus' 
        astonishing proclamation of betrayal, their faces housing expressions of shock, disbelief, 
        and contemplation. To either side of Christ, the disciples are segmented into groups of three, 
        their positions and gestures forming dynamic triangles of action. The emotions surge like a palpable 
        current, against a backdrop of meticulously drawn architectural details and serene, twilight-hued 
        tapestries. The painting extends beyond the confines of the canvas, pulling the viewer into the 
        dramatic narrative, as if an invisible participant in this momentous biblical event."    
    '''

    if max_reading_level:
        input_level = " at no more difficult than reading level {0}".format(max_reading_level)
    else:
        input_level = ""
        

    if specific_instance:
        prompt = """
        Create an exciting and evocative, 1-paragraph description 
        of the visible content (such as the appearance and behaviors of the characters, 
        or the scenery) of the following topic: {0}. 
        Do not include anything like 'The output is:' or enclosing quotation marks; 
        return just the description. 
        The topic is: {1}""".format(input_level, specific_instance)
    else:
        prompt = """
        Randomly select an instance of the following topic: {0}. 
        Create an exciting and evocative, 1-paragraph description 
        of the visible content of the instance, such as the appearance and 
        behaviors of the characters, or the scenery. 
        Do not include anything like 'The output is:'; or enclosing quotation marks; 
        return just the description. 
        The topic is: """.format(topic)
        
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))

    description = generate_chatgpt_response(prompt)

    #if max_reading_level:
    #    description = simplify_reading_level(description, max_reading_level, max_loops=5, verbose)

    if verbose:
        print("Description:\n{0}\n".format(description))

    return description


def generate_madlib(description, select_max_words=5, verbose=False):
    '''
    Generate a Mad Lib from a description.
    
    >>> description = "People are sitting at a table eating and talking."
    >>> select_max_words = 5
    >>> verbose = True
    >>> generate_madlib(description, select_max_words, verbose)

    Prompt:
    Follow the steps below to process the input text: People are sitting at a table eating and talking.
    Do not return the output from Step 1 or Step 2, only the output from Step 3.
    Do not include anything extraneous like 'Step 3:' or 'The output is:'; 
    return just the output itself.
    Step 1: Select up to 5 unique words for replacement in the text. Choose unusual words.
    Step 2: Replace the words in the text with curly brace-enclosed,
    zero-indexed numbers representing the unique list of unique words. 
    If there are multiple instances in the text of one of the words, replace every instance.
    Step 3: Output the list of unique words from Step 1, 
    and the text string with replaced words from Step 2.
    For example, if the original text is the sentence
    'I ate one apple, three bananas, and one cantaloupe.' 
    and the selected words are 'one' and 'three',
    return the list ['one', 'three'] without any enclosing punctuation,
    and return the output sentence: I ate {0} apple, {1} bananas, and {0} cantaloupe.
    
    Unique words and Mad Lib:
    ['People', 'sitting', 'table', 'eating', 'talking'], "{0} are {1} at a {2} {3} and {4}."
    '''

    prompt = """
    Follow the steps below to process the input text: {0}
    Do not return the output from Step 1 or Step 2, only the output from Step 3.
    Do not include anything extraneous like 'Step 3:' or 'The output is:'; 
    return just the output itself.
    Step 1: Select up to {1} unique words for replacement in the text. Choose unusual words.
    Step 2: Replace the words in the text with curly brace-enclosed,
    zero-indexed numbers representing the unique list of unique words. 
    If there are multiple instances in the text of one of the words, replace every instance.
    Step 3: Output the list of unique words from Step 1, 
    and the text string with replaced words from Step 2.
    For example, if the original text is the sentence
    'I ate one apple, three bananas, and one cantaloupe.' 
    and the selected words are 'one' and 'three',
    return the list ['one', 'three'] without any enclosing punctuation,
    and return the output sentence: I ate {{0}} apple, {{1}} bananas, and {{0}} cantaloupe.
    """.format(description, select_max_words) 
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))

    response = generate_chatgpt_response(prompt)
    if verbose:
        print("Unique words and Mad Lib:\n{0}\n".format(response))

    # Preprocess the string to replace single quotes with double quotes

    preprocessed_string = response.replace("'", '"')
    if verbose:
        print("Preprocessed unique words and Mad Lib:\n{0}\n".format(preprocessed_string))

    # Use ast.literal_eval() to safely evaluate the preprocessed string
    string_as_literal = ast.literal_eval(preprocessed_string)
    
    unique_words = string_as_literal[0]
    madlib = string_as_literal[1]

    if verbose:
        print("Unique words:\n{0}\n".format(unique_words))
        print("Mad Lib:\n{0}\n".format(madlib))

    return madlib, unique_words


def generate_madlib_question(word, verbose=False):
    '''
    Generate a Jeopardy!-style question to replace a word in a Mad Lib.

    Use ChatGPT to generate the question.
    
    >>> word = "six"
    >>> verbose = True
    >>> generate_madlib_question(word, verbose)
    
    Prompt:
    Take the following word: six. 
    For this word, generate a Jeopardy!-style question with multiple solutions. 
    For example, if I give you the word 'hands', ask something like: 
    'Say a word for a part of the body.' 
    If the given word is 'looking', ask something like: 
    'Say an action word, like "run". 
    Do not include anything like 'The output is:'.
    Return just the Jeopardy!-style question, without enclosing quotation marks.' 
    The word is: six

    Mad Lib question:
    'Name a number that comes after five.'
    '''

    prompt = """
    Take the following word: {0}. 
    For this word, generate a Jeopardy!-style question with multiple solutions. 
    For example, if I give you the word 'hands', ask something like: 
    'Say a word for a part of the body.' 
    If the given word is 'looking', ask something like: 
    'Say an action word, like \"run\". 
    Do not include anything like 'The output is:'.
    Return just the Jeopardy!-style question, without enclosing quotation marks.' 
    The word is: {0}""".format(word)
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))
    
    madlib_question = generate_chatgpt_response(prompt)

    if verbose:
        print("Mad Lib question:\n{0}\n".format(madlib_question))

    return madlib_question


def fill_madlib(madlib, words, response_duration=1, verbose=False):
    '''
    Prompt user to fill a Mad Lib using their voice.
        
    >>> madlib = "I ate {{0}} apple, {{1}} bananas, and {{0}} cantaloupe."
    >>> words = ['one', 'three']
    >>> response_duration = 3
    >>> verbose = False
    >>> fill_madlib(madlib, words, response_duration, verbose)
    
    Hit the Return button and begin speaking (recording will stop after 1 seconds):
    Hit the Return button and begin speaking (recording will stop after 1 seconds):

    New words:
    ['25', None]

    Filled Mad Lib:
    I ate 25 apple, None bananas, and 25 cantaloupe.
    '''

    new_words = []
    for word in words:

        madlib_question = generate_madlib_question(word, verbose=False)

        # Prompt the user
        text_to_speech(madlib_question)

        # Record and transcribe the user's speech
        user_response = speech_to_text(response_duration)

        check_response = False
        if check_response:
            
            # Loop until user exits, gives a reasonable answer, or reaches ntries                                              
            prompt = """
            I will give you a Jeopardy!-style question and a proposed answer.
            Check to see if the answer is a reasonable response to the question, 
            and return just the number 1 if it is, and the number 0 if it is not.
            If it is not, check to see if any homophone of the answer is correct,
            and if the homophone is correct, return just the number 1.
            The question is: {0} and the proposed answer is {1}.""".format(madlib_question, user_response)
            if verbose:
                print("Prompt:\n{0}\n".format(prompt))

            correct = generate_chatgpt_response(prompt)
            if verbose:
                print("Correct?: {0}\n".format(correct))

            tries = 0
            max_tries = 5
            while correct == False:
                tries += 1
                if max_tries and tries < max_tries:
                    print('\nPlease try again. This is what speech-to-text interpreted from what you said:\n"{0}"'.format(user_response))
                    text_to_speech(madlib_question)
                    user_response = speech_to_text(response_duration)

                    prompt = """
                    I will give you a Jeopardy!-style question and a proposed answer.
                    Check to see if the answer is a reasonable response to the question, 
                    and return just the number 1 if it is, and the number 0 if it is not.
                    If it is not, check to see if any homophone of the answer is correct,
                    and if the homophone is correct, return just the number 1.
                    The question is: {0} and the proposed answer is {1}.""".format(madlib_question, user_response)
                    if verbose:
                        print("Prompt:\n{0}\n".format(prompt))
                    correct = generate_chatgpt_response(prompt)
                    if verbose:
                        print("Correct?: {0}\n".format(correct))
                else:
                    correct = True   
                    print('\nToo many attempts.\n')

            new_word = generate_chatgpt_response(prompt)
            if verbose:
                print("New word: {0}\n".format(new_word))
        
        else:
            new_word = user_response

        new_words.append(new_word)

    filled_madlib = madlib.format(*new_words)

    if verbose:
        print("New words:\n{0}\n".format(new_words))
        print("Filled Mad Lib:\n{0}\n".format(filled_madlib))

    return filled_madlib, new_words


def fix_grammar(input_text, verbose=False):
    '''
    Fix the grammar of some provided text.
    
    >>> input_text = "I ate 25 apple, None bananas, and 25 cantaloupe."
    >>> verbose = True
    >>> fix_grammar(input_text, verbose)
    
    Prompt:
    Use the following input text: I ate three apple, one bananas, and three cantaloupe.
    Fix the grammar only where necessary, to correct verb conjugation, tense, singular vs. plural, etc. 
    Return just the revised text; do not include anything like 'The output is:'

    Fixed text:
    I ate 25 apples, no bananas, and 25 cantaloupes.
    '''

    prompt = """
    Use the following input text: {0}
    Fix the grammar only where necessary, to correct verb conjugation, tense, singular vs. plural, etc. 
    Return just the revised text; do not include anything like 'The output is:'""".format(input_text)
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))

    fixed_text = generate_chatgpt_response(prompt)
    if verbose:
        print("Fixed text:\n{0}\n".format(fixed_text))

    return fixed_text


#-----------------------------------------------------------------------------                                              
# Demo                                                                                                  
#-----------------------------------------------------------------------------                                              
if do_input_text:
    specific_instance = input_text
else:
    specific_instance = False

verbose = True
description = generate_description(topic="famous artwork", 
                                   specific_instance=specific_instance, 
                                   max_reading_level=max_reading_level, 
                                   verbose=verbose)
madlib, unique_words = generate_madlib(description, 
                                       select_max_words=5, 
                                       verbose=verbose)
filled_madlib, new_words = fill_madlib(madlib, 
                                       words=unique_words, 
                                       response_duration=1, 
                                       verbose=verbose)
fixed_madlib = fix_grammar(input_text=filled_madlib, 
                           verbose=verbose)

print(fixed_madlib)