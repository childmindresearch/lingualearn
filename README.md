# LinguaLearn Words

LinguLearn Words software was created by Arno Klein (binarybottle.com) 
as a vocabulary building tool (under the MIT License). 
It contains three command-line tools:

  - lingualearn.py
  - simplify_text.py
  - glibgab.py 


## lingualearn.py

Main program for a user to respond to individual language tasks.

Ex: python lingualearn.py -i pair -n 3 -sel 5 -typ -imi 3 -def -syn -ant -jeo -sen -use 3

-sel [number of response options (int)]: select_text_to_match_spoken_text()
-typ: type_text_to_match_spoken_text()
Listen, then select or type matching text.
    - The app plays text-to-speech for letter(s), phoneme(s), or word(s).
    - Users either select among text response options for a match 
      with the spoken text, or users type the correct text.

-imi [recording duration in seconds (int)]: imitate_spoken_text()
Listen, then imitate.
    - The app plays a sound (letter, phoneme, word, or sentence).
    - Users repeat what they heard, imitating the sound.
    - The app transcribes what the user said and checks if it is correct.

type_word_to_match_context()
-def: definition, -syn: synonym, -ant: antonym, or -jeo: jeopardy
Type a word that matches a definition or other semantic clues
    - The app presents a definition, synonym, antonym, or Jeopardy! question. 
    - Users type the corresponding word.
    - The app uses an LLM to check the word usage.

-sen: type_word_in_a_sentence()
-use: say_word_in_a_sentence()
Use a word in a sentence.
    - The app shows or says a word.
    - Users use the word in a typed or spoken sentence.
    - The app uses an LLM to check the word usage.


## simplify_text.py

Main program to check and simplify the readability of input text.

Use ChatGPT and textstat to simplify and estimate reading level in a loop.

Ex: python simplify_text.py -l 5 -n 5 -i "The sartorial maestro utilizes quotidien phraseology."


## glibgab.py

Spoken and visual twist on the original Mad Lib game.

Use Google text-to-speech and speech-to-text, GPT-4, and Dall-E.

Ex: python glibgab.py -l 1 -w 5 -i "Leonardo Da Vinci's painting The Last Supper"
