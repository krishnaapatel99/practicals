import nltk
from nltk import word_tokenize, pos_tag, ne_chunk
from nltk.chunk import RegexpParser

text = "Barack Obama visited Google in California."

# Tokenization
words = word_tokenize(text)

# POS tagging
tagged_words = pos_tag(words)

print("POS Tagged Words:")
print(tagged_words)

# Named Entity Recognition
print("\nNamed Entities:")
named_entities = ne_chunk(tagged_words)
print(named_entities)

# Noun phrase chunking
grammar = r"""
    NP: {<DT>?<JJ>*<NN.*>+}
"""

parser = RegexpParser(grammar)
noun_phrases = parser.parse(tagged_words)

print("\nNoun Phrase Chunks:")
print(noun_phrases)

print("\nExtracted Noun Phrases:")
for subtree in noun_phrases.subtrees(
    filter=lambda t: t.label() == "NP"
):
    print(" ".join(word for word, tag in subtree.leaves()))