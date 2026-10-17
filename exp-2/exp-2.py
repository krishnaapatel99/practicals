

import nltk
print(nltk.__version__)


# Experiment No. 1
# Aim: Perform Tokenization using NLTK

# Step 1: Import NLTK
import nltk

# Step 2: Download required tokenizer (Run only once)
nltk.download('punkt')
nltk.download('punkt_tab')

# Step 3: Import tokenizers
from nltk.tokenize import sent_tokenize, word_tokenize

# Step 4: Input text
text = """
Natural Language Processing (NLP) is a branch of Artificial Intelligence.
It enables computers to understand human language.
Python provides many libraries for NLP such as NLTK and spaCy.
"""

# Step 5: Sentence Tokenization
sentences = sent_tokenize(text)

print("----- Sentence Tokenization -----")
for i, sentence in enumerate(sentences, start=1):
    print(f"Sentence {i}: {sentence}")

# Step 6: Word Tokenization
words = word_tokenize(text)

print("\n----- Word Tokenization -----")
print(words)

# Step 7: Total Counts
print("\nTotal Number of Sentences:", len(sentences))
print("Total Number of Words:", len(words))

# Experiment No. 1
# Aim: Perform Script Validation using Python

# Function to identify script
def validate_script(text):

    if text.isascii():
        print("\nScript Detected : English (ASCII)")
        print("Input contains only English characters.")

    elif all('\u0900' <= ch <= '\u097F' or ch.isspace() for ch in text):
        print("\nScript Detected : Devanagari")
        print("Input is written in Hindi/Marathi.")

    elif text.isdigit():
        print("\nInput contains only digits.")

    else:
        print("\nMixed or Other Unicode Script Detected.")

# Main Program
text = input("Enter any text : ")

print("\nEntered Text :", text)

validate_script(text)

# Experiment No. 1
# Aim: Perform Stop-word Removal using NLTK

# Step 1: Import NLTK
import nltk

# Step 2: Download required datasets (Run only once)
nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')

# Step 3: Import required modules
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

# Step 4: Input text
text = """
Natural Language Processing is a branch of Artificial Intelligence.
It enables computers to understand, analyze, and generate human language.
NLTK provides many useful tools for text preprocessing.
"""

# Step 5: Convert text into words (Tokenization)
tokens = word_tokenize(text)

print("Original Tokens:")
print(tokens)

# Step 6: Load English stop words
stop_words = set(stopwords.words('english'))

# Step 7: Remove stop words
filtered_words = []

for word in tokens:
    if word.lower() not in stop_words:
        filtered_words.append(word)

# Step 8: Display stop words
print("\nEnglish Stop Words:")
print(stop_words)

# Step 9: Display filtered words
print("\nTokens after Stop-word Removal:")
print(filtered_words)

# Step 10: Join filtered words into a sentence
filtered_text = " ".join(filtered_words)

print("\nFiltered Text:")
print(filtered_text)

# Step 11: Display statistics
print("\nStatistics")
print("Total Words Before Removal :", len(tokens))
print("Total Words After Removal  :", len(filtered_words))
print("Stop Words Removed         :", len(tokens) - len(filtered_words))

import nltk
nltk.download('stopwords')

from nltk.corpus import stopwords

stop_words = stopwords.words('english')

print("Total English Stop Words:", len(stop_words))
print(stop_words)