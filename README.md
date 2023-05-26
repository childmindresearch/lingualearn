# LINGUAMORPH

The Linguamorph software was created by Arno Klein (binarybottle.com) 
and is intended to process/morph language, including variations in sound and stress.

Potential applications include:

  - homophone phrases (variations that sound the same or similar)
  - extreme alliteration
  - spoonerism-style scrambles
  - homophone anagrams
  - homophone loops
  - shrinking and expanding text
  - two different stories that sound the same
  - text that morphs to text with meaningful intermediates
  - stress-rhythm-seeded text
  - faux/foe translations
  - rhyming/rapping


## Phonemes and Carnegie Mellon Pronouncing Dictionary

http://www.speech.cs.cmu.edu/cgi-bin/cmudict

https://github.com/cmusphinx/cmudict/tree/4c6a365cea2c34340ffc218d5af7a38920fa7e37

https://www.internationalphoneticalphabet.org/ipa-sounds/ipa-chart-with-sounds/

From https://www.nltk.org/_modules/nltk/corpus/reader/cmudict.html:

The Carnegie Mellon Pronouncing Dictionary [cmudict.0.6]
Copyright 1998 Carnegie Mellon University

File Format: Each line consists of an uppercased word, a counter
(for alternative pronunciations), and a transcription.  Vowels are
marked for stress (1=primary, 2=secondary, 0=no stress).  E.g.:
NATURAL 1 N AE1 CH ER0 AH0 L

The dictionary contains 127069 entries.  Of these, 119400 words are assigned
a unique pronunciation, 6830 words have two pronunciations, and 839 words have
three or more pronunciations.  Many of these are fast-speech variants.

Phonemes: There are 39 phonemes (more at https://en.wikipedia.org/wiki/ARPABET):

    Phoneme Example Translation    Phoneme Example Translation
    ------- ------- -----------    ------- ------- -----------
    AA      odd     AA D           AE      at      AE T
    AH      hut     HH AH T        AO      ought   AO T
    AW      cow     K AW           AY      hide    HH AY D
    B       be      B IY           CH      cheese  CH IY Z
    D       dee     D IY           DH      thee    DH IY
    EH      Ed      EH D           ER      hurt    HH ER T  -- CHANGE:    ER      hurt    HH ER R T
    EY      ate     EY T           F       fee     F IY
    G       green   G R IY N       HH      he      HH IY
    IH      it      IH T           IY      eat     IY T
    JH      gee     JH IY          K       key     K IY
    L       lee     L IY           M       me      M IY
    N       knee    N IY           NG      ping    P IH NG
    OW      oat     OW T           OY      toy     T OY
    P       pee     P IY           R       read    R IY D
    S       sea     S IY           SH      she     SH IY
    T       tea     T IY           TH      theta   TH EY T AH
    UH      hood    HH UH D        UW      two     T UW
    V       vee     V IY           W       we      W IY
    Y       yield   Y IY L D       Z       zee     Z IY
    ZH      seizure S IY ZH ER
    
From https://www.pythonstudio.us/language-processing/a-pronouncing-dictionary.html:

For each word, this lexicon provides a list of phonetic codes—distinct labels for each contrastive sound—known as phones. Observe that fire has two pronunciations (in U.S. English): the one-syllable F AY1 R, and the two-syllable F AY1 ER0. The symbols in the CMU Pronouncing Dictionary are from the Arpabet, described in more detail at http://en.wikipedia.org/wiki/Arpabet.