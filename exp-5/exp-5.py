from nltk.util import ngrams
from collections import Counter
import re

text = "I love natural language processing and I love machine learning"

words = re.findall(r"\b\w+\b", text.lower())

bigrams = list(ngrams(words, 2))
trigrams = list(ngrams(words, 3))

print("Original Text:", text)
print("\nWords:", words)

print("\nBigrams:")
print(bigrams)

print("\nTrigrams:")
print(trigrams)

print("\nBigram Counts:")
print(Counter(bigrams))