#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Functions to test a user to match sounds with text.

Copyright 2023, Arno Klein, MIT License

'''
import random

from process_phonemes import phoneme_list, consonant_list, words_to_sounds, separate_consonants, generate_homophones
from speak import text_to_speech


#-----------------------------------------------------------------------------                                              
# Functions                                                                                                  
#-----------------------------------------------------------------------------                                              
def select_text_to_match_spoken_text(input_text, nchoices=3, ntries=None, 
        max_phonemes_per_word=25, ignore_inputs=None, verbose=False):
    '''
    Function for a user to select text to match spoken text.

    >>> input_text = 'Test'
    >>> nchoices = 3
    >>> ntries = None 
    >>> max_phonemes_per_word = 25
    >>> ignore_inputs = None
    >>> verbose = False
    >>> select_text_to_match_spoken_text(input_text, nchoices, nloops, max_phonemes_per_word, ignore_inputs, verbose)
    '''
    #--------------------------------------------------------------------------                                              
    # Process input text
    #--------------------------------------------------------------------------                                              
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

    #--------------------------------------------------------------------------                                              
    # Convert input text to homophones, consonances, or swap-consonances
    #--------------------------------------------------------------------------                                              
    morphs = [input_text]

    # Homophones with any number of words or syllables
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

    # Include only the specified number of response selections
    morphs = [x for i, x in enumerate(morphs) if i < nchoices]

    #--------------------------------------------------------------------------                                              
    # Loop until the user chooses the correct answer or until reaches ntries 
    #--------------------------------------------------------------------------                                              
    score = 0
    tries = 0
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
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else:
            if int(nchoice) - 1 == icorrect:
                score += 1
                tries += 1
                correct = True
                loop = False
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            else:
                tries += 1
                print('\nTry again. Score: {0}/{1}'.format(score, tries))

        if ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


def type_text_to_match_spoken_text(input_text, nchoices=3, nloops=None, verbose=False):
    '''
    Function for a user to type text to match spoken text.

    >>> input_text = 'Test'
    >>> nchoices = 3
    >>> ntries = None 
    >>> verbose = False
    >>> type_text_to_match_spoken_text(input_text, nchoices, nloops, verbose)
    '''
    #--------------------------------------------------------------------------                                              
    # Loop until user exits or until reaches ntries
    #--------------------------------------------------------------------------                                             
    score = 0
    tries = 0
    correct = False
    while correct == False:

        # Say the text
        text_to_speech(input_text)

        # Prompt the user for text
        entered_text = input('\nType what you heard (or Return to exit): ')

        # Feedback
        if not entered_text:
            correct = True
            loop = False
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else:
            if entered_text.strip().lower() == input_text.strip().lower():
                score += 1
                tries += 1
                correct = True
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            else:
                tries += 1
                print('\nTry again. Score: {0}/{1}'.format(score, tries))

        if ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


#-----------------------------------------------------------------------------                                              
# Demo                                                                                                  
#-----------------------------------------------------------------------------                                              
input_text = 'Test'
nchoices = 3
ntries = None 
max_phonemes_per_word = 25
ignore_inputs = None
verbose = False
select_text_to_match_spoken_text(input_text, nchoices, ntries, max_phonemes_per_word, ignore_inputs, verbose)
type_text_to_match_spoken_text(input_text, nchoices, ntries, verbose)
