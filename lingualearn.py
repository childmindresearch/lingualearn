#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Functions to test a user to match sounds with text.

Copyright 2023, Arno Klein, MIT License

'''
import random

from process_phonemes import phoneme_list, consonant_list, words_to_sounds, separate_consonants, generate_homophones
from speak import text_to_speech
from call_gpt import generate_chatgpt_response
from speak import speech_to_text


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
    >>> select_text_to_match_spoken_text(input_text, nchoices, ntries, max_phonemes_per_word, ignore_inputs, verbose)
    '''

    print('\nListen...')

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

    # Prompt the user for their choice
    text_to_speech(input_text)
    print('\nWhich one sounds the same as what you just heard?')

    # Loop until user exits, types in the correct answer, or reaches ntries                                              
    score = 0
    tries = 0
    correct = False
    while correct == False:

        random.shuffle(morphs)

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
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else:
            tries += 1
            if int(nchoice) - 1 == icorrect:
                score += 1
                correct = True
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            elif ntries and tries < ntries:
                print('\nTry again!\n')
                text_to_speech(input_text)

        if correct == False and ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


def type_text_to_match_spoken_text(input_text, max_phonemes_per_word=25, ntries=None, verbose=False):
    '''
    Function for a user to type text to match spoken text.

    >>> input_text = 'Test'
    >>> max_phonemes_per_word = 25
    >>> ntries = None 
    >>> verbose = False
    >>> type_text_to_match_spoken_text(input_text, ntries, verbose)
    '''

    print('\nListen...')

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
 
    # Homophones with any number of words or syllables
    homophones = generate_homophones(phonemes, max_phonemes, max_phonemes_per_word, False, False, None, None, nwords, nsyllables, None)

    #--------------------------------------------------------------------------                                              
    # Speak and prompt
    #--------------------------------------------------------------------------                                              
    # Say the text
    text_to_speech(input_text)

    # Prompt the user for text
    entered_text = input('\nType what you heard (or Return to exit): ')

    # Loop until user exits, types in the correct answer, or reaches ntries
    score = 0
    tries = 0
    correct = False
    while correct == False:

        # Feedback
        if not entered_text:
            correct = True
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else:
            tries += 1
            if entered_text.strip().lower() in homophones:
                score += 1
                correct = True
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            elif ntries and tries < ntries:
                text_to_speech(input_text)
                entered_text = input('\nTry again: ')

        if correct == False and ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


def type_word_to_match_context(word, context='definition', ntries=None, verbose=False):
    '''
    Function for a user to type a word to match a definition, synonym, antonym, or Jeopardy!-style description.

    >>> word = 'Test'
    >>> context = 'definition'
    >>> ntries = None 
    >>> verbose = False
    >>> type_word_to_match_definition(word, ntries, verbose)
    '''

    if context == 'definition':
        # Get a ChatGPT-generated definition for the word
        prompt = "Return a brief definition for the following word without using the word (or number, if relevant) in the definition: '{0}'".format(word)
        response = generate_chatgpt_response(prompt)
        print("\nChatGPT-generated definition:\n{0}".format(response))
        entered_word = input('\nType a word that matches this definition: ')
    elif context == 'synonym':
        # Get ChatGPT-generated synonyms for the word
        prompt = "List synonyms for the following word without using the word (or number, if relevant) at all: '{0}'".format(word)
        response = generate_chatgpt_response(prompt)
        print("\nChatGPT-generated synonyms:\n{0}".format(response))
        entered_word = input('\nType a word that is similar in meaning as these words: ')
    elif context == 'antonym':
        # Get ChatGPT-generated antonyms for the word
        prompt = "List antonyms for the following word without using the word (or number, if relevant) at all: '{0}'".format(word)
        response = generate_chatgpt_response(prompt)
        print("\nChatGPT-generated antonyms:\n{0}".format(response))
        entered_word = input('\nType a word that means the opposite of these words: ')
    elif context == 'jeopardy':
        # Get ChatGPT-generated Jeopardy!-style description referring to the word
        prompt = "Return a very brief Jeopardy!-style description related to the following word without using the word (or number, if relevant) at all: '{0}'".format(word)
        response = generate_chatgpt_response(prompt)
        print("\nChatGPT-generated Jeopardy-style description:\n{0}".format(response))
        entered_word = input('\nType a word that matches this description: ')

    # Loop until user exits, types in the correct word, or reaches ntries
    score = 0
    tries = 0
    correct = False
    while correct == False:

        # Feedback
        if not entered_word:
            correct = True
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else:
            tries += 1
            if entered_word.strip().lower() == word.strip().lower():
                score += 1
                correct = True
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            elif ntries and tries < ntries:
                entered_word = input('\nTry again: ')

        if correct == False and ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


def type_word_in_a_sentence(word, ntries=None, verbose=False):
    '''
    Function for a user to type a word in a sentence.

    >>> word = 'Test'
    >>> ntries = None 
    >>> verbose = False
    >>> type_word_in_a_sentence(word, ntries, verbose)
    '''

    entered_text = input('\nType a sentence containing the word "{0}": '.format(word))

    # Loop until user exits, types in the correct word, or reaches ntries
    score = 0
    tries = 0
    correct = False
    while correct == False:

        if not entered_text:
            correct = True
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else: 
            tries += 1
           
            # Check word usage using ChatGPT
            prompt = 'Return just the number 1 if SENTENCE uses the word "{0}" appropriately, or just the number 0 if it does not. If SENTENCE uses the word in a trivial manner, like "{0} is a word with {1} letters." return just the number 2. SENTENCE is: "{2}"'.format(word, len(word), entered_text)
            response = generate_chatgpt_response(prompt)
            if response == '1':
                correct = True
                score += 1
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            elif response == '2' and ntries and tries < ntries:
                entered_text = input('\nPlease try again, using the word in a way that conveys its meaning: ')
            elif ntries and tries < ntries:
                entered_text = input('\nTry again: ')

        if correct == False and ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


def imitate_spoken_text(input_text, duration=5, output_audio="tmp/output.wav", 
                        ntries=None, verbose=False):
    '''
    Function for a user to imitate spoken text.

    >>> input_text = 'Test'
    >>> ntries = None 
    >>> verbose = False
    >>> imitate_spoken_text(input_text, ntries, verbose)
    '''
    # Play spoken text
    print('\nListen...')
    text_to_speech(input_text)
    print('\nRepeat exactly what you just heard as you record the audio below...')

    # Record and transcribe the user's speech
    output_text = speech_to_text(duration, output_audio)

    # Loop until user exits, says the correct answer, or reaches ntries                                              
    score = 0
    tries = 0
    correct = False
    while correct == False:

        if not output_text:
            correct = True
            print('\nScore: {0}/{1}\n'.format(score, tries))
        else: 
            tries += 1
        
            # Check imitation using speech-to-text
            if output_text == input_text:
                correct = True
                score += 1
                print('\nCorrect! Score: {0}/{1}\n'.format(score, tries))
            elif ntries and tries < ntries:
                print('\nTry again. This is what speech-to-text interpreted from what you said:\n"{0}"'.format(output_text))
                text_to_speech(input_text)
                output_text = speech_to_text(duration, output_audio)

        if correct == False and ntries and tries == ntries:
            correct = True   
            print('\nToo many attempts. Score: {0}/{1}\n'.format(score, tries))


#-----------------------------------------------------------------------------                                              
# Demo                                                                                                  
#-----------------------------------------------------------------------------                                              
test1 = 'one'
test2 = 'two'
test3 = 'bicycle'
test4 = 'thin'
test5 = 'deep'
test6 = 'six'
test7 = 'gigantic'
test8 = 'wash rinse and repeat'
nchoices = 5
ntries = 3
duration = 3
output_audio = 'tmp/output.wav'
demo_all = True
if demo_all:
    print('\n==============================================================================================')
    print('select_text_to_match_spoken_text', end='\n')
    print('==============================================================================================')
    select_text_to_match_spoken_text(test1, nchoices, ntries, 25, None)
    print('\n==============================================================================================')
    print('type_text_to_match_spoken_text', end='\n')
    print('==============================================================================================')
    type_text_to_match_spoken_text(test2, 25, ntries)
    print('\n==============================================================================================')
    print('type_word_to_match_context', end='\n')
    print('==============================================================================================')
    type_word_to_match_context(test3, 'definition', ntries)
    print('\n==============================================================================================')
    print('type_word_to_match_context', end='\n')
    print('==============================================================================================')
    type_word_to_match_context(test4, 'synonym', ntries)
    print('\n==============================================================================================')
    print('type_word_to_match_context', end='\n')
    print('==============================================================================================')
    type_word_to_match_context(test5, 'antonym', ntries)
    print('\n==============================================================================================')
    print('type_word_to_match_context', end='\n')
    print('==============================================================================================')
    type_word_to_match_context(test6, 'jeopardy', ntries)
    print('\n==============================================================================================')
    print('type_word_in_a_sentence', end='\n')
    print('==============================================================================================')
    type_word_in_a_sentence(test7, ntries)
    print('\n==============================================================================================')
    print('imitate_spoken_text', end='\n')
    print('==============================================================================================')
    imitate_spoken_text(test8, duration, output_audio, ntries)
