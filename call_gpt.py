#!/usr/bin/env python                                                                                                       
'''                                                                                                                        
Function to load and call ChatGPT API

Copyright 2023, Arno Klein, MIT License

'''
import os
import openai

#-----------------------------------------------------------------------------                                              
# Load GPT                                                                                     
#-----------------------------------------------------------------------------                                              
gpt_model = "gpt-4"  #"gpt-3.5-turbo" #"text-davinci-003"
if gpt_model == "gpt-4":
    openai.api_key = os.getenv("OPENAI4_API_KEY")
elif gpt_model == "gpt-3.5-turbo":  #"text-davinci-003"
    openai.api_key = os.getenv("OPENAI3_API_KEY")


#-----------------------------------------------------------------------------                                              
# Functions                                                                                                  
#-----------------------------------------------------------------------------                                              
def generate_chatgpt_response(prompt, model=gpt_model):
    completion = openai.ChatCompletion.create(model=model, messages=[{"role": "user", "content": prompt}])
    response = completion.choices[0].message.content

    return response
