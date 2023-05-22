#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Functions to support phoneme processing and conversion.

Copyright 2021-2023, Arno Klein, MIT License

'''
import re
from g2p_en import G2p  # pip install g2p_en
word_to_phonemes = G2p()
from io_files import load_object

#-----------------------------------------------------------------------------                                              
# Load all words, consonants, stresses, phonemes from the CMU dictionary.                                                                                                   
#-----------------------------------------------------------------------------                                              
dictionary_folder = "data/dictionaries/"
filter_dictionary = 'LanguageTool'  #'english_words_py'  #'pyenchant'
all_words = load_object(dictionary_folder + 'words_{0}.pkl'.format(filter_dictionary))
all_consonants = load_object(dictionary_folder + 'consonants_{0}.pkl'.format(filter_dictionary))
all_pronunciations = load_object(dictionary_folder + 'pronunciations_{0}.pkl'.format(filter_dictionary))
all_stresses = load_object(dictionary_folder + 'stresses_{0}.pkl'.format(filter_dictionary))

# Note: vowel 'ER' converted to vowel 'ER' and consonant 'R'
phoneme_list = ['AA','AH','AW','B','D','EH','EY','G','IH','JH','L','N','OW','P','S','T','UH','V','Y','ZH',
                'AE','AO','AY','CH','DH','ER','F','HH','IY','K','M','NG','OY','R','SH','TH','UW','W','Z']
#vowel_list = ['AA','AH','AW','EH','EY','IH','OW','UH','AE','AO','AY','IY','OY','UW','ER']
single_consonants = ['B','D','G','JH','L','N','P','S','T','V','Y','ZH','CH',
                     'DH','F','HH','K','M','NG','R','SH','TH','W','Z']
multiple_consonants = []
for c1 in single_consonants:
    for c2 in single_consonants:
        if c2 != c1:
            multiple_consonants.append(c1 + '+' + c2)
            for c3 in single_consonants:
                if c3 != c2:
                    multiple_consonants.append(c1 + '+' + c2 + '+' + c3)
                    for c4 in single_consonants:
                        if c4 != c3:
                            multiple_consonants.append(c1 + '+' + c2 + '+' + c3 + '+' + c4)
                            #for c5 in single_consonants:
                            #    if c5 != c4:
                            #        multiple_consonants.append(c1 + '+' + c2 + '+' + c3 + '+' + c4 + '+' + c5)

consonant_list = single_consonants + multiple_consonants

#-----------------------------------------------------------------------------                                              
# Code to count syllables
# https://datascience.stackexchange.com/questions/23376/
#         how-to-get-the-number-of-syllables-in-a-word
#-----------------------------------------------------------------------------                                              
syllable_vowel_runs = re.compile("[aeiouy]+", flags=re.I)
syllable_exceptions = re.compile(
    # fixes trailing e issues:
    # smite, scared
    "[^aeiou]e[sd]?$|"
    # fixes adverbs:
    # nicely
    + "[^e]ely$",
    flags=re.I
)
additional_syllables = re.compile(
    # fixes incorrect subtractions from exceptions:
    # smile, scarred, raises, fated
    "[^aeioulr][lr]e[sd]?$|[csgz]es$|[td]ed$|"
    # fixes miscellaneous issues:
    # flying, piano, video, prism, fire, evaluate
    + ".y[aeiou]|ia(?!n$)|eo|ism$|[^aeiou]ire$|[^gq]ua",
    flags=re.I
)


def count_syllables(word, syllable_vowel_runs=syllable_vowel_runs, syllable_exceptions=syllable_exceptions, 
                    additional_syllables=additional_syllables):
    '''
    Count the number of syllables in a word.

    >>> word = 'lovely'
    >>> syllable_vowel_runs = re.compile('[aeiouy]+', re.IGNORECASE)
    >>> syllable_exceptions = re.compile('[^aeiou]e[sd]?$|[^e]ely$', re.IGNORECASE) 
    >>> additional_syllables = re.compile('[^aeioulr][lr]e[sd]?$|[csgz]es$|[td]ed$|.y[aeiou]|ia(?!n$)|eo|ism$|[^aeiou]ire$|[^gq]ua', re.IGNORECASE)
    >>> count_syllables(word)
    2
    '''
    vowel_runs = len(syllable_vowel_runs.findall(word))
    exceptions = len(syllable_exceptions.findall(word))
    additional = len(additional_syllables.findall(word))

    return max(1, vowel_runs - exceptions + additional)


#-----------------------------------------------------------------------------                                              
# Functions to manipulate consonants                                                                                                
#-----------------------------------------------------------------------------                                              
def combine_consonants(phonemes):
    '''
    >>> combine_consonants(['Y','IY','L','D'])
    ['Y', 'IY', 'L+D']    
    '''
    phonemes_with_combined_consonants = []
    P = len(phonemes)
    i = 0
    while i < P:
        loop = True
        while loop:
            p1 = phonemes[i]
            i += 1
            if p1 in single_consonants:
                if P > i:
                    p2 = phonemes[i]
                    i += 1
                    if p2 in single_consonants:
                        if P > i:
                            p3 = phonemes[i]
                            i += 1
                            if p3 in single_consonants:
                                if P > i:
                                    p4 = phonemes[i]
                                    i += 1
                                    if p4 in single_consonants:
                                        phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3 + '+' + p4)
                                        #if P > i:
                                        #    p5 = phonemes[i]
                                        #    i += 1
                                        #    if p5 in single_consonants:
                                        #        phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3 + '+' + p4 + '+' + p5)
                                        #    else:
                                        #        phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3 + '+' + p4)
                                        #        phonemes_with_combined_consonants.append(p5)
                                        #    break                                                
                                        #else:
                                        #    phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3 + '+' + p4)
                                        #    break
                                    else:
                                        phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3)
                                        phonemes_with_combined_consonants.append(p4)
                                    break
                                else:
                                    phonemes_with_combined_consonants.append(p1 + '+' + p2 + '+' + p3)
                                    break
                            else:
                                phonemes_with_combined_consonants.append(p1 + '+' + p2)
                                phonemes_with_combined_consonants.append(p3)
                                break
                        else:
                            phonemes_with_combined_consonants.append(p1 + '+' + p2)
                            break
                    else:
                        phonemes_with_combined_consonants.append(p1)
                        phonemes_with_combined_consonants.append(p2)
                        break
                else:
                    phonemes_with_combined_consonants.append(p1)
                    break
            else:
                phonemes_with_combined_consonants.append(p1)
                break
    
    return phonemes_with_combined_consonants


def separate_consonants(combined_consonants):
    '''
    Split up consonant compounds ("I scream" => "ice cream")?

    English words by number of syllables: 
        https://en.wiktionary.org/wiki/Category:English_words_by_number_of_syllables
        Ex: "Honolulu": 4 syllables, 8 phonemes (with or without combined consonants)
        Ex: "constructs": 2 syllables, 10 phonemes or 5 combined (K, AA, N+S+T+R, UH, K+T+S)

    >>> separate_consonants(['Y', 'IY', 'L+D'])
    ['Y','IY','L','D']   
    '''
    if any(['+' in x for x in combined_consonants]):
        separated_consonants = []
        for c in combined_consonants:
            if '+' in c:
                separated_consonants.extend(c.split('+'))
            else:
                separated_consonants.append(c)
    else:
        separated_consonants = combined_consonants
        
    return separated_consonants


def separatER(phonemes):
    '''
    >>> separatER(['AE1', 'F', 'T', 'ER0'])  # 'after'
    ['AE1', 'F', 'T', 'ER0', 'R']
    '''
    if any(['ER' in x for x in phonemes]):
        new_pronunciation = []
        for p in phonemes:
            new_pronunciation.append(p)
            if 'ER' in p:
                new_pronunciation.append('R')
    else:
        new_pronunciation = phonemes
        
    return new_pronunciation


#-----------------------------------------------------------------------------                                              
# Function to convert text to phonemes (and stresses and number of syllables)                                                                                                
#-----------------------------------------------------------------------------                                              
def words_to_sounds(words, phoneme_list, consonant_list):
    '''
    From a word or list of words, return phonemes, 
    consonants, stresses, and number of syllables.

    Output: phonemes, consonants, stresses, numbers of syllables
    
    >>> sentence1 = 'A witch is itself conscious or without agency.'
    >>> sentence2 = 'Uh, which is it, self-conscious or without agency?'
    >>> words = sentence1.split('-')
    >>> words_to_sounds(words, phoneme_list, consonant_list)
    (['AH','W','IH','CH','IH','Z','IH','T+S','EH','L+F',
      'K','AA','N+SH','AH','S','AO','R','W','IH','TH','AW','T',
      'EY','JH','AH','N+S','IY'],
     ['W','CH','Z','T+S','L+F','K','N+SH','S',
      'R','W','TH','T','JH','N+S'],
     ['0','','1','','1','','0','+','1','+','','1','+',
      '0','','1','','','0','','1','','1','','0','+','0'],
     13)    
    >>> words = sentence2.split('-')
    >>> words_to_sounds(words, phoneme_list, consonant_list)
    (['AH','W','IH','CH','IH','Z','IH','T','S','EH','L+F',
      'K','AA','N+SH','AH','S','AO','R','W','IH','TH','AW','T',
      'EY','JH','AH','N+S','IY'],
     ['W','CH','Z','T','S','L+F','K','N+SH','S',
      'R','W','TH','T','JH','N+S'],
     ['1','','1','','1','','1','','','1','+','','1','+',
      '0','','1','','','0','','1','','1','','0','+','0'],
     13)    
    '''

    phonemes = []
    stresses = []
    nsyllables = 0
    if not isinstance(words, list):
        words = [words]
    for word in words:

        # Extract phonemes per word (choose the first version of the phoneme)
        #     :: multiple pronunciations: pronouncing.phones_for_word(word) 
        phonemes_and_stresses_for_word = word_to_phonemes(word)
        if any(['ER' in x for x in phonemes_and_stresses_for_word]):
            phonemes_and_stresses_for_word = separatER(phonemes_and_stresses_for_word)
        phonemes_and_stresses_for_word = combine_consonants(phonemes_and_stresses_for_word)
        phonemes_for_word = [re.sub(r'\d+', '', x) for x in phonemes_and_stresses_for_word 
                             if re.sub(r'\d+', '', x) in phoneme_list or x in consonant_list]
        stresses_for_word = [re.sub(r"(?:[A-Z])",'', x) for x in phonemes_and_stresses_for_word
                             if re.sub(r'\d+', '', x) in phoneme_list or x in consonant_list]

        phonemes += phonemes_for_word  
        stresses += stresses_for_word
        nsyllables += count_syllables(word)

    consonants = [x for x in phonemes if x in consonant_list] 

    return phonemes, consonants, stresses, nsyllables


#-----------------------------------------------------------------------------                                              
# Functions to convert phonemes to text                                                                                                
#-----------------------------------------------------------------------------                                              
def get_unique_numbers(numbers):
    unique = []
    for number in numbers:
        if number not in unique:
            unique.append(number)
    return unique


def phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, consonant_list, 
                      just_consonants=False, max_phonemes_per_word=25, ignore_words=None):
    '''
    Find all words that sound like each sequence of phonemes from a phoneme list.
    
    Generate a list of words (with start and stop indices) from a sequential list of phonemes,
    by concatenating sequences of the phonemes and searching in CMU's Pronunciation Dictionary.
    
    max_phonemes_per_word:
    n-syllable words without combined consonants <= 5n phonemes
    n-syllable words with combined consonants <= 2n + 1 phonemes
    5-syllable words: <=25 phonemes, <=11 with combined consonants
    
    >>> # input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> # words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> # phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> phonemes = ['AH','W','IH','CH','IH','Z','IH','T','S','EH','L+F',
                    'K','AA','N+SH','AH','S','AO','R','W','IH','TH','AW','T',
                    'EY','JH','AH','N+S','IY']    
    >>> just_consonants = False
    >>> phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, consonant_list, 
                          just_consonants, max_phonemes_per_word=25, ignore_words=None)

    [['a', 0, 0],['uh', 0, 0],['uhh', 0, 0],['which', 1, 3],['witch', 1, 3],["which's", 1, 5],
    ["witch's", 1, 5],['itch', 2, 3],['is', 4, 5],['it', 6, 7],["it's", 6, 8],
    ['its', 6, 8],['itself', 6, 10],['self', 8, 10],['eh', 9, 9],['elf', 9, 10],
    ['conscious', 11, 15],['ah', 12, 12],['ahh', 12, 12],['awe', 12, 12],
    ['uh', 14, 14],['uhh', 14, 14],['us', 14, 15],['saw', 15, 16],['soar', 15, 17],
    ['sore', 15, 17],['aw', 16, 16],['oar', 16, 17],['or', 16, 17],['ore', 16, 17],
    ['withe', 18, 20],['without', 18, 22],['out', 21, 22],['age', 23, 24],
    ['agency', 23, 27],['uh', 25, 25],['uhh', 25, 25]]
     
    >>> just_consonants = True
    >>> phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, consonant_list, 
                          just_consonants, max_phonemes_per_word=25, ignore_words=None)

    [['away', 0, 1],['way', 0, 1],['we', 0, 1],['wee', 0, 1],['weigh', 0, 1],...
     ['which', 0, 3],['witch', 0, 3],['watches', 0, 5],["which's", 0, 5],...
     ['conscious', 11, 15],['ac', 14, 15],['ace', 14, 15],['ass', 14, 15],...
     ['agency', 23, 26],['age', 24, 24],['edge', 24, 24],['edgy', 24, 24],
     ...
    ]]
    '''

    words_starts_stops = []    
    start = 0
    unique_stops = [-1]
    nphonemes = len(phonemes)
    while start < nphonemes:

        # For each subsequence of phonemes
        consonant_subsets = []
        max_stop = min(nphonemes + 1, start + max_phonemes_per_word + 2) 
        for stop in range(start + 1, max_stop):

            phoneme_subset = phonemes[start:stop]
            phoneme_subset = combine_consonants(phoneme_subset)

            # Find words with matching consonants:
            if just_consonants:
                consonant_subset = [x for x in phoneme_subset if x in consonant_list]
                if consonant_subset != [] and consonant_subset not in consonant_subsets:
                    consonant_subsets.append(consonant_subset)
                    try:
                        indices = [i for i,x in enumerate(all_consonants) if x == consonant_subset]
                        for index in indices:
                            words_starts_stops.append([all_words[index], start, stop - 1])
                    except: pass

            # Find words with fully matching pronunciations:
            else:
                try:
                    indices = [i for i,x in enumerate(all_pronunciations) if x == phoneme_subset]
                    for index in indices:
                        words_starts_stops.append([all_words[index], start, stop - 1])
                except: pass

        start += 1
                
    if ignore_words:
        words_starts_stops = [x for x in words_starts_stops if x[0] not in ignore_words]

    return words_starts_stops


#-----------------------------------------------------------------------------                                              
# Functions to construct word sequences 
# with matching phoneme stop and start indices                                                                                              
#-----------------------------------------------------------------------------                                              
def flatten_list(nested_list):
    '''
    Flatten so that there are no tuples or lists within the list.
    
    >>> nested_list = [('e1d1', ('e1d2'), ['e2d1']), 'e3d0', [], ['e5d1']]
    >>> flatten_list(nested_list)
    ['e1d1', 'e1d2', 'e2d1', 'e3d0', 'e5d1']
    '''
    result=[]
    if nested_list != []:
        for element in nested_list:
            if isinstance(element, list) or isinstance(element, tuple):
                result.extend(flatten_list(element))
            else:
                result.append(element)

    return result

            
def flatten_to_sublists_of_strings(nested_list):
    '''
    Flatten list to strings and sublists of strings.

    >>> nested_list = [[[], '0', ('1',11,12), ('2',21,22), ['3',31,32]], [['4',41,42]]]
    >>> flatten_to_sublists_of_strings(nested_list)
    [[], '0', ['1', 11, 12], ['2', 21, 22], ['3', 31, 32], ['4', 41, 42]]
    
    >>> # input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> # words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> # phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> # words_starts_stops = phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, 
        #                                        consonant_list, just_consonants, max_phonemes_per_word, 
        #                                        ignore_words)
    >>> # words_starts_stops = flatten_to_sublists_of_strings(words_starts_stops) 
    >>> # words_by_start, stops, unique_starts, unique_stops, max_start, max_stop = organize_words_by_start(words_starts_stops)

    >>> words_by_start = [['a', 0, 0],['uh', 0, 0],['uhh', 0, 0],['which', 1, 3],['witch', 1, 3],["which's", 1, 5],
     ["witch's", 1, 5],['itch', 2, 3],['is', 4, 5],['it', 6, 7],["it's", 6, 8],
     ['its', 6, 8],['itself', 6, 10],['self', 8, 10],['eh', 9, 9],['elf', 9, 10],
     ['conscious', 11, 15],['ah', 12, 12],['ahh', 12, 12],['awe', 12, 12],
     ['uh', 14, 14],['uhh', 14, 14],['us', 14, 15],['saw', 15, 16],['soar', 15, 17],
     ['sore', 15, 17],['aw', 16, 16],['oar', 16, 17],['or', 16, 17],['ore', 16, 17],
     ['withe', 18, 20],['without', 18, 22],['out', 21, 22],['age', 23, 24],
     ['agency', 23, 27],['uh', 25, 25],['uhh', 25, 25]] 
    
    >>> flatten_to_sublists_of_strings(words_by_start)

    [['a', 0, 0],['uh', 0, 0],['uhh', 0, 0],['which', 1, 3],['witch', 1, 3],
     ["which's", 1, 5],["witch's", 1, 5],['itch', 2, 3],['is', 4, 5],['it', 6, 7],["it's", 6, 8],
     ['its', 6, 8],['itself', 6, 10],['self', 8, 10],['eh', 9, 9],['elf', 9, 10],
     ['conscious', 11, 15],['ah', 12, 12],['ahh', 12, 12],['awe', 12, 12],
     ['uh', 14, 14],['uhh', 14, 14],['us', 14, 15],['saw', 15, 16],['soar', 15, 17],
     ['sore', 15, 17],['aw', 16, 16],['oar', 16, 17],['or', 16, 17],['ore', 16, 17],
     ['withe', 18, 20],['without', 18, 22],['out', 21, 22],['age', 23, 24],
     ['agency', 23, 27],['uh', 25, 25],['uhh', 25, 25]]    
     '''
    
    result=[]
    if nested_list == []:
        result.extend([[]])
    else:
        if not any([isinstance(x, list)  for x in nested_list]) and \
           not any([isinstance(x, tuple) for x in nested_list]):
            y=[]
            for x in nested_list:
                y.append(x)
            result.append(y)
        else:
            for element in nested_list:
                if isinstance(element, str):
                    result.extend(element)
                elif isinstance(element, list) or isinstance(element, tuple):
                    if element == []:
                        result.extend([[]])
                    else:
                        result.extend(flatten_to_sublists_of_strings(element)) 
    
    return result

            
def find_words_with_start_index(word_start_stop_list, start_index):
    '''
    Find words in a word list with start and stop indices that start at index start_index.
    '''
    start_words = []
    starts = []
    stops = []
    for word, start, stop in word_start_stop_list:
        if start == start_index and start != []:
            start_words.append(word)
            starts.append(start)
            stops.append(stop)
            
    return start_words, starts, stops


def organize_words_by_start(words_list):
    '''
    Organize a list of words (and corresponding start and stop indices) by start index.
    Output: words_by_start, stops, unique_starts, x, y, max_stop
    
    >>> # input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> # words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> # phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> # words_starts_stops = phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, 
        #                                        consonant_list, just_consonants, max_phonemes_per_word, 
        #                                        ignore_words)
    >>> # words_starts_stops = flatten_to_sublists_of_strings(words_starts_stops) 

    >>> words_starts_stops = [['a', 0, 0],['uh', 0, 0],['uhh', 0, 0],['which', 1, 3],['witch', 1, 3],
     ["which's", 1, 5],["witch's", 1, 5],['itch', 2, 3],['is', 4, 5],['it', 6, 7],["it's", 6, 8],
     ['its', 6, 8],['itself', 6, 10],['self', 8, 10],['eh', 9, 9],['elf', 9, 10],
     ['conscious', 11, 15],['ah', 12, 12],['ahh', 12, 12],['awe', 12, 12],
     ['uh', 14, 14],['uhh', 14, 14],['us', 14, 15],['saw', 15, 16],['soar', 15, 17],
     ['sore', 15, 17],['aw', 16, 16],['oar', 16, 17],['or', 16, 17],['ore', 16, 17],
     ['withe', 18, 20],['without', 18, 22],['out', 21, 22],['age', 23, 24],
     ['agency', 23, 27],['uh', 25, 25],['uhh', 25, 25]]    

    >>> organize_words_by_start(words_starts_stops)

    ([['a', 'uh', 'uhh'],['which', 'witch', "which's", "witch's"],['itch'],[],['is'],[],
      ['it', "it's", 'its', 'itself'],[],['self'],['eh', 'elf'],[],['conscious'],
      ['ah', 'ahh', 'awe'],[],['uh', 'uhh', 'us'],['saw', 'soar', 'sore'],
      ['aw', 'oar', 'or', 'ore'],[],['withe', 'without'],[],[],['out'],[],
      ['age', 'agency'],[],['uh', 'uhh']],
     [[0, 0, 0],[3, 3, 5, 5],[3],[],[5],[],[7, 8, 8, 10],[],[10],[9, 10],[],
      [15],[12, 12, 12],[],[14, 14, 15],[16, 17, 17],[16, 17, 17, 17],[],
      [20, 22],[],[],[22],[],[24, 27],[],[25, 25]],
     [0, 1, 2, 4, 6, 8, 9, 11, 12, 14, 15, 16, 18, 21, 23, 25],
     [0, 3, 5, 7, 8, 10, 9, 15, 12, 14, 16, 17, 20, 22, 24, 27, 25],
     25,27)    
    
    '''

    if not isinstance(words_list[0], list) and not isinstance(words_list[0], tuple):
        words_list = [words_list]
        
    # Get unique starts and stops, and max start and stop
    words2 = []
    starts2 = []
    stops2 = []
    for word, start, stop in words_list:
        words2.append(word)
        starts2.append(start)
        stops2.append(stop)
    unique_starts = get_unique_numbers(starts2)
    unique_stops = get_unique_numbers(stops2)
    max_start = max(get_unique_numbers(starts2))
    max_stop = max(get_unique_numbers(stops2))

    # Words organized by start index
    words_by_start = []
    stops = []
    for start_index in range(max_start + 1):
        start_words, istarts, istops = find_words_with_start_index(words_list, start_index)
        words_by_start.append(start_words)
        stops.append(istops)        

    return words_by_start, stops, unique_starts, unique_stops, max_start, max_stop


def concatenate_lists(list_of_lists1, list_of_lists2):
    result = []
    for item1, item2 in zip(list_of_lists1, list_of_lists2):
        if isinstance(item1, str) and isinstance(item2, list):
            for element in item2:
                result.append((item1, element))
        elif isinstance(item1, list) and isinstance(item2, list):
            result.append((item1 + item2))
        elif isinstance(item1, tuple) and isinstance(item2, list):
            result.append((list(item1) + item2))
    
    return result


def concatenate_word_pairs(prev_words, prev_stops, words_by_start, stops_by_start, unique_starts):
    '''
    Concatenate word pairs where the stop index of the first word matches the start index of the next word.

    >>> # input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> # words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> # phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> # words_starts_stops = phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, 
        #                                        consonant_list, just_consonants, max_phonemes_per_word, 
        #                                        ignore_words)
    >>> # words_starts_stops = flatten_to_sublists_of_strings(words_starts_stops) 
    >>> # words_by_start, stops_by_start, unique_starts, unique_stops, max_start, max_stop = organize_words_by_start(words_starts_stops)
    >>> prev_words = ['a', 'uh', 'uhh']
    >>> prev_stops = [0, 0, 0]
    >>> words_by_start = [['a', 'uh', 'uhh'],['which', 'witch', "which's", "witch's"],['itch'],[],['is'],[],
      ['it', "it's", 'its', 'itself'],[],['self'],['eh', 'elf'],[],['conscious'],
      ['ah', 'ahh', 'awe'],[],['uh', 'uhh', 'us'],['saw', 'soar', 'sore'],
      ['aw', 'oar', 'or', 'ore'],[],['withe', 'without'],[],[],['out'],[],
      ['age', 'agency'],[],['uh', 'uhh']]
    >>> stops_by_start = [[0, 0, 0],[3, 3, 5, 5],[3],[],[5],[],[7, 8, 8, 10],[],[10],[9, 10],[],[15],[12, 12, 12],[],[14, 14, 15],[16, 17, 17],
                          [16, 17, 17, 17],[],[20, 22],[],[],[22],[],[24, 27],[],[25, 25]]
    >>> unique_starts = [0, 1, 2, 4, 6, 8, 9, 11, 12, 14, 15, 16, 18, 21, 23, 25]
    >>> unique_stops = [0, 3, 5, 7, 8, 10, 9, 15, 12, 14, 16, 17, 20, 22, 24, 27, 25]
    >>> concatenate_word_pairs(prev_words, prev_stops, words_by_start, stops_by_start, unique_starts)

    ([['a', 'which'],['a', 'witch'],['a', "which's"],['a', "witch's"],
      ['uh', 'which'],['uh', 'witch'],['uh', "which's"],['uh', "witch's"],
      ['uhh', 'which'],['uhh', 'witch'],['uhh', "which's"],['uhh', "witch's"]],
     [3, 3, 5, 5, 3, 3, 5, 5, 3, 3, 5, 5])

    '''
    
    # Initialize / format words
    new_words = []
    new_stops = []
    words1 = prev_words
    stops1 = prev_stops

    # For each word that starts at a given index
    for iword1, word1 in enumerate(words1):

        # Find words that start after that word stops
        word1_stop = stops1[iword1]
        word2_start = word1_stop + 1
        if word2_start in unique_starts:
            words2 = words_by_start[word2_start]
            stops2 = stops_by_start[word2_start]

            # Concatenate the first word with each of the second set of words
            word1_copies = []  # Make n copies of word1 so as to pair with n words2
            [word1_copies.extend([word1]) for x in range(len(words2))]
            words2_list = [[x] for x in words2]
            new_words.append(concatenate_lists(word1_copies, words2_list))
            new_stops.append(stops2)

    new_words = flatten_to_sublists_of_strings(new_words)
    new_stops = flatten_list(new_stops)
        
    return new_words, new_stops


def words_stop_to_start(words_by_start, stops_by_start, unique_starts, max_stop, max_count):
    '''
    Create a list of text strings from sequences of words using the words' start and stop indices.

    Output: output_lines

    >>> # input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> # words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> # phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> # words_starts_stops = phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, 
        #                                        consonant_list, just_consonants, max_phonemes_per_word, 
        #                                        ignore_words)
    >>> # words_starts_stops = flatten_to_sublists_of_strings(words_starts_stops) 
    >>> # words_by_start, stops_by_start, unique_starts, unique_stops, max_start, max_stop = organize_words_by_start(words_starts_stops)
    >>> words_by_start = [['a', 'uh', 'uhh'],['which', 'witch', "which's", "witch's"],['itch'],[],['is'],[],
      ['it', "it's", 'its', 'itself'],[],['self'],['eh', 'elf'],[],['conscious'],
      ['ah', 'ahh', 'awe'],[],['uh', 'uhh', 'us'],['saw', 'soar', 'sore'],
      ['aw', 'oar', 'or', 'ore'],[],['withe', 'without'],[],[],['out'],[],
      ['age', 'agency'],[],['uh', 'uhh']]
    >>> stops_by_start = [[0, 0, 0],[3, 3, 5, 5],[3],[],[5],[],[7, 8, 8, 10],[],[10],[9, 10],[],[15],[12, 12, 12],[],[14, 14, 15],[16, 17, 17],
                          [16, 17, 17, 17],[],[20, 22],[],[],[22],[],[24, 27],[],[25, 25]]
    >>> unique_starts = [0, 1, 2, 4, 6, 8, 9, 11, 12, 14, 15, 16, 18, 21, 23, 25]
    >>> max_stop = 27  # number of phonemes + 1
    >>> max_count = 26  # number of phonemes 
    >>> words_stop_to_start(words_by_start, stops_by_start, unique_starts, max_stop, max_count)
                            
    ["a which's itself conscious oar without agency",
     "a which's itself conscious or without agency",
     "a which's itself conscious ore without agency",
     "a witch's itself conscious oar without agency",
     "a witch's itself conscious or without agency",
     "a witch's itself conscious ore without agency",
     "uh which's itself conscious oar without agency",
     "uh which's itself conscious or without agency",
     "uh which's itself conscious ore without agency",
     "uh witch's itself conscious oar without agency",
     "uh witch's itself conscious or without agency",
     "uh witch's itself conscious ore without agency",
     "uhh which's itself conscious oar without agency",
     "uhh which's itself conscious or without agency",
     "uhh which's itself conscious ore without agency",
     "uhh witch's itself conscious oar without agency",
     "uhh witch's itself conscious or without agency",
     "uhh witch's itself conscious ore without agency",
     'a which is itself conscious oar without agency',
     'a which is itself conscious or without agency',
     'a which is itself conscious ore without agency',
     'a witch is itself conscious oar without agency',
     'a witch is itself conscious or without agency',
     ...
     ]

     '''    
    
    # Initialize a list of output text strings 
    output_lines = []

    # Initialize loop to build a text string from the first words to the final words in a word list
    max_words = []
    max_stops = []
    prev_words = words_by_start[0]
    prev_stops = stops_by_start[0]
    for i,x in enumerate(prev_stops):
        if x == max_stop:
            max_stops.append(x)
            max_words.append(prev_words[i])
    count = 1
    run = True
    while(run):
        count += 1

        # Concatenate new words to previous words
        new_words, new_stops = concatenate_word_pairs(prev_words, prev_stops, 
                                                      words_by_start, stops_by_start, unique_starts)

        # Store the words that have reached the maximum stop
        # and prepare to concatenate more words in the next loop
        prev_words = []
        prev_stops = []
        for i,x in enumerate(new_stops):
            if x == max_stop:
                max_stops.append(x)
                max_words.append(new_words[i])
            else:
                prev_stops.append(x)
                prev_words.append(new_words[i])

        # Halt when all stops equal max_stop or until we loop max_count times
        if all([x == max_stop for x in new_stops]) or count == max_count:
            run = False

    # Convert each word list to a text string
    for x in max_words:
        if isinstance(x, list):
            output_lines.append(' '.join(x))
        else:
            output_lines.append(x)

    return output_lines


#-----------------------------------------------------------------------------                                              
# Function to generate homophones (same sounds, different words)   
# or consonances (same consonants and consonant neighbors, different vowels).                                                                                      
#-----------------------------------------------------------------------------                                              
def generate_homophones(phonemes, max_count=26, max_phonemes_per_word=25, just_consonants=False, 
                        do_permute_consonants=False, ignore_words=None, verbose=False):
    '''
    Generate homophone words or sentences (same sounds, different words) from a sequence of phonemes.
    
    If just_consonants is set to True, then generate words or sentences from a sequence of consonants 
    (same consonants and consonant neighbors, different vowels).

    >>> input_sentence = 'Uh, which is it, self-conscious or without agency?'
    >>> words = input_sentence.split('-')  #words = [re.sub(r'[^\'A-Za-z\-]', '', x).lower() for x in words]
    >>> phonemes, consonants, stresses, nsyllables = words_to_sounds(words, phoneme_list, consonant_list)
    >>> phonemes = separate_consonants(phonemes)
    >>> max_count = 26
    >>> max_phonemes_per_word = 25
    >>> just_consonants = False
    >>> do_permute_consonants = False
    >>> ignore_words = None
    >>> verbose = False
    generate_homophones(phonemes, max_count, max_phonemes_per_word, just_consonants, do_permute_consonants, 
                        ignore_words, verbose)
                        
    ["a which's itself conscious oar without agency",
     ...
     'a which is itself conscious or without agency',
     ...
     "uhh which is itself conscious oar without age 'n sci",
     ...]
 
    >>> just_consonants = True
    generate_homophones(phonemes, max_count, max_phonemes_per_word, just_consonants, do_permute_consonants,
                        ignore_words, verbose)
    ['languages continue to evolve',
     'languages continue too evolve',
     'languages continue two evolve']
    '''
    
    # Permute consonants (different sequence of same consonants, different vowels)
    if do_permute_consonants and just_consonants:
        consonants = [x for x in phonemes if x in consonant_list]
        consonant_permutations = [x for x in permutations(consonants)]

        # Loop through every permutation of consonants
        words_starts_stops = []
        for consonant_permutation in consonant_permutations:
            phoneme_permutation = []
            count = 0
            for phoneme in phonemes:
                if phoneme in consonant_list:
                    phoneme_permutation.append(consonant_permutation[count])
                    count += 1
                else:
                    phoneme_permutation.append(phoneme)

            words_starts_stops_permutation = phonemes_to_words(phoneme_permutation, all_words, all_pronunciations, 
                                                               all_consonants, consonant_list, True, 
                                                               max_phonemes_per_word, ignore_words)
            words_starts_stops.extend(words_starts_stops_permutation)
 
    else:
        words_starts_stops = phonemes_to_words(phonemes, all_words, all_pronunciations, all_consonants, 
                                               consonant_list, just_consonants, max_phonemes_per_word, 
                                               ignore_words)
    
    if words_starts_stops:
        #consonants1 = separate_consonants(consonants)
        #phonemes2, consonants2, stresses2, nsyllables2 = words_to_sounds(new_words[istop], 
        #consonants2 = separate_consonants(consonants2)
        #if len(consonants1) != len(consonants2):

        if verbose:
            print('Words: {0}'.format(', '.join([x[0] for x in words_starts_stops])), end='\n')
        words_starts_stops = flatten_to_sublists_of_strings(words_starts_stops) 
        words_by_start, stops, unique_starts, unique_stops, max_start, max_stop = organize_words_by_start(words_starts_stops)

        #print('Words sorted by start index:  {0}'.format(words_by_start), end='\n')
        homophones = words_stop_to_start(words_by_start, stops, unique_starts, max_stop, max_count)
    else:
        homophones = None
    
    return homophones

