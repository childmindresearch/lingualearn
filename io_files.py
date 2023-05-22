#!/usr/bin/env python                                                                                                       
'''
File input/output functions

Copyright 2021-2023, Arno Klein, MIT License

'''
import pickle


#-----------------------------------------------------------------------------                                              
# Functions                                                                                                
#-----------------------------------------------------------------------------                                              
def save_object(obj, pickle_file):
    try:
        with open(pickle_file, "wb") as f:
            pickle.dump(obj, f, protocol=pickle.HIGHEST_PROTOCOL)
    except Exception as ex:
        print("Error during pickling object:", ex)

        
def load_object(pickle_file):
    try:
        with open(pickle_file, "rb") as f:
            return pickle.load(f)
    except Exception as ex:
        print("Error during unpickling object:", ex)


def remove_duplicate_lines(infile, outfile):
    '''
    Remove duplicate lines in a file.
    '''
    unique_lines = set(open(infile).readlines())
    out = open(outfile, 'w').writelines(unique_lines)


def display_save_output(input_list, input_name, input_text, 
                        do_save_files=False, filename_base=None, verbose=True):
    '''
    Display output and/or write to text file.
    '''

    # Write output to a text file
    if input_list and len(input_list) > 1:
        if verbose:
            print('')
            print('==============================================================================================')
            print('{0} {1} for "{2}"'.format(len(input_list), input_name, input_text), end='\n')
            print('==============================================================================================')
            for line in input_list:
               print('    {0}'.format(line), end='\n')
        if do_save_files:
            if not filename_base.endswith("."):
                filename_base += "."
            outfile = filename_base + input_name + '.txt'
            fwrite = open(outfile, "w")
            fwrite.write('')
            fwrite.close()
            fwrite = open(outfile, "a")
            for new_line in input_list:
                fwrite.write(new_line + '\n')
            fwrite.close()
            if verbose:
                print('\n{0} {1} written to {2}'.format(len(input_list), input_name, outfile), end='\n')
    else:
        if verbose:
            print('\n0 {0} for "{1}"'.format(input_name, input_text), end='\n')
