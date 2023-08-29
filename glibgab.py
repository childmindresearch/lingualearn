#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Spoken and visual twist on the original Mad Lib game.

Use Google text-to-speech and speech-to-text, GPT-4, and Dall-E.

Ex: python glibgab.py -l 1 -w 5 -i "da Vinci's painting of the Mona Lisa"

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


def generate_description(topic="famous artwork", example=False, 
                         max_reading_level=False, verbose=False):
    '''
    Select a topic and generate a description at the desired grade level.
    
    >>> topic = "famous artwork"
    >>> example = "da Vinci's painting of the Mona Lisa"
    >>> max_reading_level = 1
    >>> verbose = True
    >>> description = generate_description(topic, example, max_reading_level, verbose)

    Prompt:
    Create an evocative, 1-paragraph description of the visible content 
    (such as the appearance and behaviors of the characters, or the scenery) 
    of the following topic: 
    da Vinci's painting of the Mona Lisa, at a reading level no more difficult than grade 1. 
    Mention the topic, but do not include anything like 'The output is:' 
    or enclosing quotation marks; return just the description.

    Description:
    The painting of the Mona Lisa, made by the artist Leonardo da Vinci, 
    shows a pretty lady named Mona Lisa. She is sitting with a small smile 
    on her face and her fingers crossed in her lap. She wears a dark colored 
    dress and veil. There's a winding road and a peaceful, soft blue sky 
    with mountains in the background. Her eyes seem to follow you wherever 
    you move. The colors are soft and gentle. It gives a warm, quiet, and 
    mysterious feeling.

    '''

    if max_reading_level:
        input_level = ", at a reading level no more difficult than grade {0}".format(max_reading_level)
    else:
        input_level = ""
        

    if example:
        prompt = """
        Create an evocative, 1-paragraph description of the visible content 
        (such as the appearance and behaviors of the characters, or the scenery) 
        of the following topic: 
        {0}{1}. 
        Mention the topic, but do not include anything like 'The output is:' 
        or enclosing quotation marks; return just the description.
        """.format(example, input_level)
    else:
        prompt = """
        Randomly select an example of the following topic: 
        {0}{1}.  
        Create an evocative, 1-paragraph description 
        of the visible content of the example, such as the appearance and 
        behaviors of the characters, or the scenery. 
        Mention the topic, but do not include anything like 'The output is:'; 
        or enclosing quotation marks; return just the description.
        """.format(topic, input_level)
        
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
    
    >>> description = "Sam's friends are playing with other friends."
    >>> select_max_words = 5
    >>> verbose = True
    >>> generate_madlib(description, select_max_words, verbose)

    Prompt:
    Follow the instructions below to process the following input text: 
    The painting of the Mona Lisa, made by the artist Leonardo da Vinci, 
    shows a pretty lady named Mona Lisa. She is sitting with a small smile 
    on her face and her fingers crossed in her lap. She wears a dark colored 
    dress and veil. There's a winding road and a peaceful, soft blue sky with 
    mountains in the background. Her eyes seem to follow you wherever you move. 
    The colors are soft and gentle. It gives a warm, quiet, and mysterious 
    feeling.
    
    Instructions:
    Select up to 5 unique words (the least common nouns or verbs) 
    in the above input text, and don't include single quotes or apostrophes.
    Wherever these words occur in the text, 
    replace them with curly brace-enclosed, zero-indexed numbers 
    representing the list of unique words. 
    If there are multiple instances in the text of one of the words, 
    replace every instance.
    
    For example, if the original text is the sentence
    "I ate one gala apple, three fuji apples, and one cantaloupe's flesh." 
    and the selected words are 'apple' and 'cantaloupe' 
    (note that "cantaloupe" does not include the apostrophe),
    return the following two things without anything else
    (no extra text or enclosing punctuation):
    just the list of unique words and text string with replaced words:
    ['apple', 'cantaloupe'], 'I ate one gala {0}, three fuji {0}s, and one {1}\'s flesh.'
    
    Unique words:
    ['Sam', 'friends', 'playing']

    Mad Lib:
    {0}'s {1} are {2} with other {1}.


    Using the output from the generate_description() example above:

    Unique words:
    ['painting', 'fingers', 'veil', 'mountains', 'colors']

    Mad Lib:
    The {0} of the Mona Lisa, made by the artist Leonardo da Vinci, 
    shows a pretty lady named Mona Lisa. She is sitting with a small smile 
    on her face and her {1} crossed in her lap. 
    She wears a dark colored dress and {2}. There's a winding road 
    and a peaceful, soft blue sky with {3} in the background. 
    Mona Lisas eyes seem to follow you wherever you move. The {4} are soft and gentle. 
    It gives a warm, quiet, and mysterious feeling.

    '''

    prompt = """
    Follow the instructions below to process the following input text: 
    {0}
    
    Instructions:
    Select up to {1} unique words (the least common nouns or verbs) 
    in the above input text, and don't include single quotes or apostrophes.
    Wherever these words occur in the text, 
    replace them with curly brace-enclosed, zero-indexed numbers 
    representing the list of unique words. 
    If there are multiple instances in the text of one of the words, 
    replace every instance.
    
    For example, if the original text is the sentence
    "I ate one gala apple, three fuji apples, and one cantaloupe's flesh." 
    and the selected words are 'apple' and 'cantaloupe' 
    (note that "cantaloupe" does not include the apostrophe),
    return the following two things without anything else
    (no extra text or enclosing punctuation):
    just the list of unique words and text string with replaced words
    (note that any single quotation marks or apostrophes are preceded
    with a backslash):
    ['apple', 'cantaloupe'], 'I ate one gala {{0}}, three fuji {{0}}s, and one {{1}}\\'s flesh.'
    
    """.format(description, select_max_words) 
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))

    response = generate_chatgpt_response(prompt)
    #if verbose:
    #    print("Unique words and Mad Lib:\n{0}\n".format(response))

    # Preprocess the string to replace single quotes with double quotes
    #response = response.replace("'", '"')
    #if verbose:
    #    print("Preprocessed unique words and Mad Lib:\n{0}\n".format(response))

    # Use ast.literal_eval() to safely evaluate the preprocessed string
    string_as_literal = ast.literal_eval(response)
    
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

    For this word, return a Jeopardy!-style question with many possible answers. 
    For example, if I give you the word 'hands', return something like: 
    'Say a word for a part of the body.' 
    If the given word is 'looking', return something like: 
    'Say an action word, like "run". 
    Return just the Jeopardy!-style question, and do not include anything else
    (no enclosing punctuation or extraneous text like 'The output is:').

    Mad Lib question:
    'Name a number that comes after five.'

    '''

    prompt = """
    Take the following word: {0}.

    For this word, return a Jeopardy!-style question with many possible answers. 
    For example, if I give you the word 'hands', return something like: 
    'Say a word for a part of the body.' 
    If the given word is 'looking', return something like: 
    'Say an action word, like \"run\".' 
    Return just the Jeopardy!-style question, and do not include anything else
    (no enclosing punctuation or extraneous text like 'The output is:').
    """.format(word)
    if verbose:
        print("Prompt:\n{0}\n".format(prompt))
    
    madlib_question = generate_chatgpt_response(prompt)

    if verbose:
        print("Mad Lib question:\n{0}\n".format(madlib_question))

    return madlib_question


def fill_madlib(madlib, words, response_duration=2, verbose=False):
    '''
    Prompt user to fill a Mad Lib using their voice.

    >>> madlib = "I ate one gala {0}, three fuji {0}s, and one {1}'s flesh."
    >>> words = ['apple', 'cantaloupe']
    >>> response_duration = 2
    >>> verbose = True
    >>> filled_madlib, new_words = fill_madlib(madlib, words, response_duration, verbose)
    
    Hit the Return button and begin speaking (recording will stop after 1 seconds):
    
    New words:
    ['strawberry', 'honeydew']

    Filled Mad Lib:
    I ate one gala strawberry, three fuji strawberrys, and one honeydew's flesh.


    Using the output from the generate_madlib() example above:

    New words:
    ['video game', 'elephant', 'turban', 'volcano', 'x-rays']

    Filled Mad Lib:
    The video game of the Mona Lisa, made by the artist Leonardo da Vinci, 
    shows a pretty lady named Mona Lisa. She is sitting with a small smile 
    on her face and her elephant crossed in her lap. She wears a dark colored 
    dress and turban. There's a winding road and a peaceful, soft blue sky 
    with volcano in the background. Mona Lisas eyes seem to follow you wherever you 
    move. The x-rays are soft and gentle. It gives a warm, quiet, and 
    mysterious feeling.

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
    
    >>> input_text = "I ate one gala strawberry, three fuji strawberrys, and one honeydew's flesh."
    >>> verbose = True
    >>> fix_grammar(input_text, verbose)
    
    Prompt:

    Use the following input text: 
    I ate one gala strawberry, three fuji strawberrys, and one honeydew's flesh.    
    
    Fix only grammatical mistakes, such as mistakes in verb conjugation, 
    verb tense, plural vs. singular, etc. Do not change anything to correct 
    semantic mistakes, even if the text does not make any sense.
    Return just the text, revised or not; do not include any enclosing 
    punctuation or extraneous text like 'The output is:'

    For example, if given "Their five orange is Apple's best deaf ice.", 
    return: "Their five oranges are Apple's best deaf ice."
    
    Fixed text:
    I ate one gala strawberry, three fuji strawberries, and the flesh of one honeydew.

    
    Using the output from the fill_madlib() example above:

    Fixed text:
    The video game of the Mona Lisa, made by the artist Leonardo da Vinci, 
    shows a pretty lady named Mona Lisa. She is sitting with a small smile 
    on her face and her elephants crossed in her lap. She wears a dark colored 
    dress and turban. There's a winding road and a peaceful, soft blue sky 
    with a volcano in the background. Mona Lisa's eyes seem to follow you wherever you 
    move. The x-rays are soft and gentle. They give a warm, quiet, and 
    mysterious feeling.

    '''

    prompt = """
    Use the following input text: 
    {0}
    
    Fix only grammatical mistakes, such as mistakes in verb conjugation, 
    verb tense, plural vs. singular, etc. Do not change anything to correct 
    semantic mistakes, even if the text does not make any sense.
    Return just the text, revised or not; do not include any enclosing 
    punctuation or extraneous text like 'The output is:'

    For example, if given "Their five orange is Apple's best deaf ice.", 
    return: "Their five oranges are Apple's best deaf ice."
    """.format(input_text)
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
    example = input_text
else:
    example = False

verbose = True #False
description = generate_description(topic="famous artwork", 
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