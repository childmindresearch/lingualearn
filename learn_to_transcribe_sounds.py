#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Main program for a user to learn how to transcribe sounds to text.

Copyright 2023, Arno Klein, MIT License

'''
import argparse
import random

from process_phonemes import phoneme_list, consonant_list, words_to_sounds, separate_consonants, generate_homophones
from speak import text_to_speech

#-----------------------------------------------------------------------------                                              
# Command-line arguments                                                                                               
#-----------------------------------------------------------------------------                                              
parser = argparse.ArgumentParser(description="""                                                                            
                     Main program for a user to learn how to transcribe sounds to text.""",
                     formatter_class = lambda prog:
                     argparse.HelpFormatter(prog, max_help_position=40))
parser.add_argument('text', type=str, help='Enter a string of text')
parser.add_argument("-c", "--choices", type=int, help="Number of choices per question (default = 3)", default=3)
args = parser.parse_args()

input_text = args.text
nchoices = args.choices
verbose = True

#-----------------------------------------------------------------------------                                              
# Settings
#-----------------------------------------------------------------------------                                              
ignore_inputs = []  # Don't use any of these words
max_phonemes_per_word = 25

#-----------------------------------------------------------------------------                                              
# Loop until user exits
# ----------------------------------------------------------------------------                                              
score = 0
tries = 0
loop = True
while loop == True:

    #---------------------------------------------------------------------                                              
    # Process input text
    #---------------------------------------------------------------------                                              
    if ' ' in input_text.strip():
        words = input_text.split()
        nwords = len(words)
    else:
        words = input_text
        nwords = 1

    max_phonemes = nwords * max_phonemes_per_word

    # Convert words to phonemes
    phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)

    # Split up consonant compounds ("I scream" => "ice cream")
    phonemes = separate_consonants(phonemes)

    #---------------------------------------------------------------------                                              
    # Convert input text to homophones, consonances, or swap-consonances
    #---------------------------------------------------------------------                                              
    morphs = [input_text]

    # Homophones with any number of words or syllables
    #generate_homophones(phonemes, max_count=26, max_phonemes_per_word=25, 
    #                    just_consonants=False, do_permute_consonants=False, 
    #                    consonant_list=None, limit=None, nwords=None, 
    #                    nsyllables=None, ignore_words=None, verbose=False):
    ignore_words = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, False, False, None, None, nwords, nsyllables, morphs)

    # Consonances with same number of words and syllables
    consonances = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, False, consonant_list, 'both', nwords, nsyllables, ignore_words)
    [morphs.append(x) for x in consonances if x not in morphs]

    # Consonances with same number of words and any number of syllables
    if len(morphs) < nchoices:
        consonances = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, False, consonant_list, 'words', None, ignore_words)
        [morphs.append(x) for x in consonances if x not in morphs]
        
        # Swap-consonances with same number of words and syllables
        if len(morphs) < nchoices:
            swap_consonants = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, True, consonant_list, 'both', nwords, nsyllables, ignore_words)
            [morphs.append(x) for x in swap_consonants if x not in morphs]

            # Swap-consonances with same number of words and any number of syllables
            if len(morphs) < nchoices:
                swap_consonants = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, True, consonant_list, 'words', None, ignore_words)
                [morphs.append(x) for x in swap_consonants if x not in morphs]

                # Any number of words and syllables
                if len(morphs) < nchoices:
                    #homophones = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, False, False, None, None, nwords, nsyllables, False)
                    #[morphs.append(x) for x in homophones]
                    consonances = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, False, consonant_list, None, None, ignore_words)
                    [morphs.append(x) for x in consonances if x not in morphs]
                    if len(morphs) < nchoices:
                        swap_consonants = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, True, True, consonant_list, None, None, ignore_words)
                        [morphs.append(x) for x in swap_consonants if x not in morphs]

    #---------------------------------------------------------------------                                              
    # Include only the specified number of response selections
    #---------------------------------------------------------------------                                              
    morphs = [x for i, x in enumerate(morphs) if i < nchoices]

    #-------------------------------------------------------------------------                                              
    # Loop until the user chooses the correct answer 
    # ------------------------------------------------------------------------                                              
    correct = False
    while correct == False:

        random.shuffle(morphs)

        # Prompt the user for their choice
        text_to_speech(input_text)
        print('\nWhich one sounds the same?')
        ichoice = 0
        while ichoice < len(morphs):
            print('({0}) {1}'.format(ichoice + 1, morphs[ichoice]))
            if morphs[ichoice] == input_text:
                icorrect = ichoice
            ichoice += 1
        nchoice = input('\nEnter the number (or Return to exit): ')

        # Feedback
        if not nchoice:
            correct = True
            loop = False
            print('\nThank you and see you again soon! Score: {0}/{1}\n'.format(score, tries))
        else:
            if int(nchoice) - 1 == icorrect:
                score += 1
                tries += 1
                correct = True
                print('\nCorrect! Score: {0}/{1}'.format(score, tries))
                input_text = input('\nEnter new text: ')
                if not input_text:
                    loop = False
                    print('\nThank you and see you again soon! Score: {0}/{1}\n'.format(score, tries))
            else:
                tries += 1
                print('\nTry again. Score: {0}/{1}'.format(score, tries))
