#!/usr/bin/env python                                                                                                       
'''                                                                                                                         
Prepare a dictionary for use by Linguamorph.
    
Filter the CMU Pronunciation dictionary words and pronunciations
using a second dictionary of common words (such as LanguageTool).

Output for different dictionaries:

    nltk_wordset:      235892
    enable1:           172823
    pyenchant:         ?
    english-words-py:  25487
    popular:           25322
    LanguageTool (LT): ?
    -------------------------------------------------------
    CMU:               133737
    CMU and LT:        54117
    
                                can't    geese    shelves  Thai     thai     e.       bott     bitter   used
            NLTK words corpus:  False    False    False    True     False    False    True     True     True
            enable frequency:   False    True     True     False    False    False    True     True     True
            pyenchant spelling: True     True     True     True     False    True     True     True     True
            english-words-py:   True     True     False    True     False    False    False    False    False
            popular frequency:  False    True     True     False    False    False    False    True     True
            LanguageTool:       True     True     True     True     False    True     False    True     True
            ------------------------------------------------------------------------------------------------
            CMU:                True     True     True     False    True     True     True     True     True
            CMU & LanguageTool: True     True     True     False    False    False    False    True     True
            

Copyright 2021-2023, Arno Klein, MIT License

'''
import pickle
import nltk
import re
import language_tool_python
from io_files import load_object, save_object
from process_phonemes import consonant_list, combine_consonants, separatER

#-----------------------------------------------------------------------------                                              
# Set program to prepare OR test a dictionary for use by Linguamorph                                                                                                   
#-----------------------------------------------------------------------------                                              
do_test_dictionaries = False
if do_test_dictionaries:
    do_prepare_dictionary = False
else:
    do_prepare_dictionary = True

#-----------------------------------------------------------------------------                                              
# Dictionary information                                                                                     
#-----------------------------------------------------------------------------                                              
dictionary_folder = "data/dictionaries/"
filter_dictionary = 'LanguageTool'  #'english_words_py'  #'pyenchant'
filter_words_file = "data/dictionaries/filter_words.txt"
filter_strings = ['.',',']
language_tool_object = language_tool_python.LanguageTool('en-US')


#-----------------------------------------------------------------------------                                              
# Functions                                                                                                  
#-----------------------------------------------------------------------------                                              
def filter_dictionary_words(words, consonants, pronunciations, stresses, 
                            filter_words, filter_strings, filter_dictionary='LanguageTool', 
                            verbose=False):
    '''
    Test filtering (with fake consonants, pronunciations, and stresses).
    Make sure to import the necessary dictionaries (see "do_prepare_dictionary").

    >>> words = ['okay', 'k']
    >>> filter_strings = ['.',',']
    >>> fread_filter = open(filter_words_file, "r")
    >>> filter_words = [x.strip() for x in fread_filter.readlines()]
    >>> filter_dictionary_words(words, consonants=words, pronunciations=words, stresses=words, 
    >>>                         filter_words=filter_words, filter_strings=filter_strings, 
    >>>                         filter_dictionary='LanguageTool', verbose=False)
    (['okay'], ['okay'], ['okay'], ['okay'], [])
    '''
    filtered_words = []
    filtered_consonants = []
    filtered_pronunciations = []
    filtered_stresses = []
    removed_words = []
    for iword, word in enumerate(words):
        if filter_dictionary == 'LanguageTool':
            if (not any([x for x in language_tool_object.check(word) if x.ruleId == 'MORFOLOGIK_RULE_EN_US'])) and \
                (word not in filter_words) and \
                (word not in filtered_words) and \
                all([x not in word for x in filter_strings]):
                    filtered_words.append(word)
                    filtered_consonants.append(consonants[iword])
                    filtered_pronunciations.append(pronunciations[iword])
                    filtered_stresses.append(stresses[iword])
        elif filter_dictionary == 'pyenchant':
            if (enchant_dict.check(word) or enchant_dict.check(word.capitalize())) and \
                (word not in filter_words) and \
                (word not in filtered_words) and \
                all([x not in word for x in filter_strings]):
                    filtered_words.append(word)
                    filtered_consonants.append(consonants[iword])
                    filtered_pronunciations.append(pronunciations[iword])
                    filtered_stresses.append(stresses[iword])
        elif filter_dictionary == 'english_words_py':
            if ((word in english_words_set or \
                    (word[:-1] in english_words_set and word[-1] == 's')) or \
                (word.capitalize() in english_words_set or \
                    (word.capitalize()[:-1] in english_words_set and word.capitalize()[-1] == 's'))
               ) and \
                (word not in filter_words) and \
                (word not in filtered_words) and \
                all([x not in word for x in filter_strings]):
                    filtered_words.append(word)
                    filtered_consonants.append(consonants[iword])
                    filtered_pronunciations.append(pronunciations[iword])
                    filtered_stresses.append(stresses[iword])
        else:
            removed_words.append(word)
    
    if verbose and removed_words != []:
        print('{0} retained words, {1} removed words'.format(len(filtered_words),len(removed_words)))

    return filtered_words, filtered_consonants, filtered_pronunciations, filtered_stresses, removed_words


def prepare_dictionary(filter_dictionary, filter_words_file, filter_strings, dictionary_folder, consonant_list):
    '''
    Filter CMU Pronunciation dictionary words and pronunciations.
    Use a second dictionary of common words (example below from LanguageTool).
    Make sure to import the necessary dictionaries (see "do_prepare_dictionary").

    >>> index=48792
    >>> print(all_words[index], all_consonants[index])
    thirty ['TH','ER','R+D','IY'] 
    
    Check dictionary entry:
    >>> inword = 'ill-behaved' #'thirty'
    >>> inpron = ['TH','ER','R+D','IY']
    >>> print('{0}'.format(inword in all_words))
    >>> print('{0}'.format(inpron in all_pronunciations))
    >>> all_pronunciations[all_words.index('thirty')]
    '''
    cmu_entries = nltk.corpus.cmudict.entries()
    cmu_words = []
    cmu_consonants = []
    cmu_pronunciations = []
    cmu_pronunciations_stress = []
    cmu_stresses = []
    for cmu_word, cmu_pronunciation_stress in cmu_entries:
        if cmu_word not in cmu_words:
            cmu_words.append(cmu_word.strip())
            if any(['ER' in x for x in cmu_pronunciation_stress]):
                cmu_pronunciation_stress = separatER(cmu_pronunciation_stress)
            cmu_pronunciation_stress = combine_consonants(cmu_pronunciation_stress)
            cmu_pronunciation_no_stress = [re.sub(r'\d+', '', x) for x in cmu_pronunciation_stress]
            cmu_pronunciations.append(cmu_pronunciation_no_stress)
            cmu_consonants.append([x for x in cmu_pronunciation_no_stress if x in consonant_list])
            cmu_stresses.append([re.sub(r'[A-Za-z\+]', '', x) for x in cmu_pronunciation_stress])         
            #print(cmu_word, cmu_pronunciation_no_stress)

    print('Filter the CMU dictionary...')

    # Load filter words
    fread_filter = open(filter_words_file, "r")
    filter_words = [x.strip() for x in fread_filter.readlines()]

    all_words, all_consonants, all_pronunciations, all_stresses, nonwords = filter_dictionary_words(cmu_words, 
        cmu_consonants, cmu_pronunciations, cmu_stresses, 
        filter_words, filter_strings, filter_dictionary, verbose=False)    

    save_object(all_words, dictionary_folder + 'words_{0}.pkl'.format(filter_dictionary))
    save_object(all_consonants, dictionary_folder + 'consonants_{0}.pkl'.format(filter_dictionary))
    save_object(all_pronunciations, dictionary_folder + 'pronunciations_{0}.pkl'.format(filter_dictionary))
    save_object(all_stresses, dictionary_folder + 'stresses_{0}.pkl'.format(filter_dictionary))


#-----------------------------------------------------------------------------                                              
# Prepare or load dictionary
#-----------------------------------------------------------------------------                                              
if do_prepare_dictionary:
    if filter_dictionary == 'pyenchant':
        import enchant
        enchant_dict = enchant.Dict("en_US")
    elif filter_dictionary == 'english_words_py':
        from english_words import english_words_set
    prepare_dictionary(filter_dictionary, filter_words_file, filter_strings, dictionary_folder, consonant_list)    
else:
    all_words = load_object(dictionary_folder + 'words_{0}.pkl'.format(filter_dictionary))
    all_consonants = load_object(dictionary_folder + 'consonants_{0}.pkl'.format(filter_dictionary))
    all_pronunciations = load_object(dictionary_folder + 'pronunciations_{0}.pkl'.format(filter_dictionary))
    all_stresses = load_object(dictionary_folder + 'stresses_{0}.pkl'.format(filter_dictionary))
    

#-----------------------------------------------------------------------------                                              
# Test different dictionaries
#-----------------------------------------------------------------------------                                              
if do_test_dictionaries:

    cmu_entries = nltk.corpus.cmudict.entries()

    import enchant
    enchant_dict = enchant.Dict("en_US")
    #pip install cmudict
    #nltk.download('cmudict')
    #pip install pyenchant

    # english-words-py (https://pypi.org/project/english-words/)
    # "Contains sets of English words from svnweb.freebsd.org/csrg/share/dict/. 
    # This is up to date with revision 61569 of their words list."
    from english_words import english_words_set

    # Most Common English Words (https://github.com/dolph/dictionary)
    # "enable1.txt (172,819), the more verbose version of the Official Scrabble Player's Dictionary 
    # (which is limited to words of 8 letters or less)"
    # "popular.txt (25,322) represents the common subset of words found in both enable1.txt and Wiktionary's 
    # word frequency lists, which are in turn compiled by statistically analyzing a sample of 29 million 
    # words used in English TV and movie scripts."
    enable1 = [line.rstrip() for line in open('data/dictionaries/enable1.txt')]
    popular = [line.rstrip() for line in open('data/dictionaries/popular.txt')]

    # NLTK words corpus:
    #nltk.download('words')
    from nltk.corpus import words
    nltk_wordset = set(words.words())

    # Wiktionary Word Frequency_lists (https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#English)
    #https://gist.github.com/h3xx/1976236
    
    print('nltk_wordset:      {0}'.format(len(nltk_wordset)))
    print('enable1:           {0}'.format(len(enable1)))
    print('pyenchant:         {0}'.format('?')) #len(enchant_dict.values())))
    print('english-words-py:  {0}'.format(len(english_words_set)))
    print('popular:           {0}'.format(len(popular)))
    print('LanguageTool (LT): {0}'.format('?'))
    print('-------------------------------------------------------')
    print('CMU:               {0}'.format(len(cmu_entries)))
    print('CMU and LT:        {0}'.format(len(all_words)))
    print()
    test_words = ["can't", 'geese', 'shelves', 'Thai', 'thai', 'e.', 'bott', 'bitter', 'used']
    for test_word in test_words:
        print(test_word)
        print('        NLTK words corpus:  {0}'.format(test_word in nltk_wordset))
        print('        enable frequency:   {0}'.format(test_word in enable1))
        print('        pyenchant spelling: {0}'.format(enchant_dict.check(test_word)))
        print('        english-words-py:   {0}'.format(test_word in english_words_set))
        print('        popular frequency:  {0}'.format(test_word in popular))
        print('        LanguageTool:       {0}'.format(not any([x for x in language_tool_object.check(test_word) if x.ruleId == 'MORFOLOGIK_RULE_EN_US'])))
        print('-------------------------------------------------------')
        print('        CMU:                {0}'.format(any([x for x,y in cmu_entries if test_word == x])))
        print('        CMU and LT:         {0}'.format(test_word in all_words))
        print()