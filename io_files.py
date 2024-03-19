#!/usr/bin/env python                                                                                                       
'''
File input/output functions

Copyright 2021-2023, Arno Klein, MIT License

'''
import os
import pickle
import json
from base64 import b64decode
from pathlib import Path
#from PIL import Image

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


def display_header(input_text):
    '''
    Display text header.
    '''
    print('\n==============================================================================================')
    print('{0}'.format(input_text), end='\n')
    print('==============================================================================================')


def display_save_output(input_list, input_name, input_text, 
                        do_save_files=False, filename_base=None, verbose=True):
    '''
    Display output and/or write to text file.
    '''

    # Write output to a text file
    if input_list:
        if verbose:
            display_header(input_name)
            for line in input_list:
               print('    {0}'.format(line), end='\n')
            print('\n{0}: {1} for "{2}"\n'.format(input_name, len(input_list), input_text), end='\n')
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
                print('\n{0}: {1} written to {2}\n'.format(input_name, len(input_list), outfile), end='\n')
    else:
        if verbose:
            print('\n0 {0} for "{1}"\n'.format(input_name, input_text), end='\n')


def json2png(json_file, output_dir="tmp"):

    with open(json_file, mode="r", encoding="utf-8") as file:
        response = json.load(file)

    for index, image_dict in enumerate(response["data"]):
        image_data = b64decode(image_dict["b64_json"])
        image_file = os.path.join(output_dir, f"{Path(json_file).stem}-{index}.png")
        with open(image_file, mode="wb") as png:
            png.write(image_data)

    return image_file


#def display_image(image_file):
#    '''
#    Display image.
#    '''
#    im = Image.open(image_file)
#    im.show()