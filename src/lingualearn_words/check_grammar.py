#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Software to the check grammar of an input sentence.

Tools used for checking grammar:

    - ChatGPT API (slow, greater specificity than Caribe or LanguageTool)
    - Caribe (greater specificity than LanguageTool): https://pypi.org/project/Caribe/
    - LanguageTool (basic checks): https://github.com/jxmorris12/language_tool_python

Some tools are too permissive as grammar checkers, so we can optionally check 
a sentence's grammar again with a second tool if it passes the first test.                                                                                                  

Copyright 2023, Arno Klein, MIT License

'''
import string 
from call_gpt import get_gpt_response

#-----------------------------------------------------------------------------                                              
# Set the tool(s) to check grammar. 
# Some tools are too permissive as grammar checkers, so optionally check 
# a sentence's grammar again with a 2nd tool if it passes the first test.                                                                                                  
#-----------------------------------------------------------------------------                                              
grammar_tool = "caribe"
#grammar_tool = "language_tool"
#grammar_tool = "chatgpt"
do_check_grammar_again = True  
grammar_tool2 = "chatgpt"

#-----------------------------------------------------------------------------                                              
# Load the selected grammar tool(s)                                                                                     
#-----------------------------------------------------------------------------                                              
if grammar_tool == "caribe" or (do_check_grammar_again and grammar_tool2=="caribe"):
    import Caribe as cb    
if grammar_tool == "language_tool" or (do_check_grammar_again and grammar_tool2=="language_tool"):
    import language_tool_python
    language_tool_object = language_tool_python.LanguageTool('en-US')
    ignore_rules = ['UPPERCASE_SENTENCE_START','I_LOWERCASE'] #'EN_COMPOUNDS','CD_NN']


#-----------------------------------------------------------------------------                                              
# Functions                                                                                                  
#-----------------------------------------------------------------------------                                              
def check_grammar(input_sentence, grammar_tool="caribe", cap_and_punc=True, verbose=False):
    '''
    Check whether an input sentence has correct grammar according to a given grammar tool.
    
    >>> input_sentence = "Language continues to evolve."
    >>> check_grammar(input_sentence, grammar_tool="caribe", cap_and_punc=True, verbose=False)
    True    
    '''
    is_correct = False

    # Capitalize the first word and add a period if no punctuation at the end of the input text string.
    if cap_and_punc:
        input_sentence = input_sentence.capitalize()
        if input_sentence[-1] not in string.punctuation: 
            input_sentence += '.'
        

    # Check grammar with ChatGPT
    if grammar_tool == "chatgpt":
        prompt = "Return just the number 1 if the following sentence is grammatically correct, or just the number 0 if it is not: '{0}'".format(input_sentence)
        response = get_gpt_response(prompt)
        if response == '1':
            is_correct = True
            if verbose:
                print("CORRECT (ChatGPT): {0}".format(input_sentence))
        elif verbose:
            print("      X (ChatGPT): {0}".format(input_sentence))

    # Check grammar with Caribe
    elif grammar_tool == "caribe":
        output_sentence = cb.caribe_corrector(input_sentence)
        if cap_and_punc:
            output_sentence = output_sentence.capitalize()
            if output_sentence[-1] not in string.punctuation: 
                output_sentence += '.'
        if output_sentence == input_sentence:
            is_correct = True
            if verbose:
                print("CORRECT (Caribe): {0}".format(input_sentence))
        elif verbose:
            print("      X (Caribe): {0}".format(input_sentence))

    # Check grammar with LanguageTool
    elif grammar_tool == "language_tool":
        is_correct = True
        for rule in language_tool_object.check(input_sentence):
            if rule.ruleId not in ignore_rules:
                is_correct = False
                if verbose:
                    print(rule, end='\n\n')
        if is_correct:
            if verbose:
                print("CORRECT (LanguageTool): {0}".format(input_sentence))
            elif verbose:
                print("      X (LanguageTool): {0}".format(input_sentence))

    return is_correct


def check_grammar_twice(list_of_sentences, grammar_tool1="caribe", grammar_tool2="chatgpt", 
                        cap_and_punc=True, do_check_grammar_again=False, verbose=False):
    '''
    Check whether each input sentence in a list of sentences has correct grammar,
    according to one or two grammar tools.
    
    >>> list_of_sentences = ['language continue toys evolve', 'languages continue to evolve']
    >>> check_grammar_twice(list_of_sentences, "caribe", "chatgpt", True, True, True)
          X (Caribe): Language continue toys evolve.
    CORRECT (Caribe): Languages continue to evolve.
    CORRECT (ChatGPT): Languages continue to evolve.
    ['languages continue to evolve']    
    '''
    is_correct = False

    new_list = []
    for sentence in list_of_sentences:
        #if verbose:
        #    print("     Input sentence: {0}".format(sentence))
        is_correct = check_grammar(sentence, grammar_tool1, cap_and_punc, verbose)
        if is_correct and do_check_grammar_again:
            is_correct = check_grammar(sentence, grammar_tool2, cap_and_punc, verbose)
        if is_correct:
            new_list.append(sentence)

    return new_list