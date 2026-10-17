import nltk
import re
from nltk.corpus import wordnet as wn

# Download required data
nltk.download("wordnet")
nltk.download("omw-1.4")

# 1. WordNet exploration
word = "bank"
synsets = wn.synsets(word)

print("Synsets for:", word)
for syn in synsets[:5]:
    print("-", syn.name(), ":", syn.definition())


# 2. Synonyms and antonyms
print("\nSynonyms and Antonyms of 'good':")

good = wn.synset("good.a.01")

antonyms = set()

for lemma in good.lemmas():
    for antonym in lemma.antonyms():
        antonyms.add(antonym.name())

print("Synonyms:", good.lemma_names())
print("Antonyms:", sorted(antonyms))


# 3. Hypernyms and hyponyms
dog = wn.synset("dog.n.01")

print("\nHypernyms of dog:")
for item in dog.hypernyms():
    print("-", item.name())

print("\nSome hyponyms of dog:")
for item in dog.hyponyms()[:5]:
    print("-", item.name())


# 4. Meronyms
print("\nMeronyms of car:")

car = wn.synset("car.n.01")

print("Part meronyms:",
      [x.name() for x in car.part_meronyms()])

print("Member meronyms:",
      [x.name() for x in car.member_meronyms()])

print("Substance meronyms:",
      [x.name() for x in car.substance_meronyms()])


# 5. Homonyms and polysemy
word = "bank"
senses = wn.synsets(word)

print("\nMeanings of bank:")
for sense in senses:
    print("-", sense.name(), ":", sense.definition())

print("Number of senses:", len(senses))


# 6. Simplified Lesk Algorithm for WSD
def simplified_lesk(context, target_word):
    context_words = set(
        re.findall(r"\b[a-z]+\b", context.lower())
    )

    # Remove the target word from context
    context_words.discard(target_word.lower())

    best_sense = None
    max_overlap = -1

    for sense in wn.synsets(target_word):
        # Build the meaning text
        meaning = sense.definition()

        meaning += " " + " ".join(sense.examples())
        meaning += " " + " ".join(sense.lemma_names())

        meaning_words = set(
            re.findall(r"\b[a-z]+\b", meaning.lower())
        )

        # Count common words
        overlap = len(context_words & meaning_words)

        if overlap > max_overlap:
            max_overlap = overlap
            best_sense = sense

    return best_sense, max_overlap


# Test WSD
sentence = "I deposited money in the bank"
target = "bank"

sense, score = simplified_lesk(sentence, target)

print("\nSimplified Lesk WSD")
print("Sentence:", sentence)
print("Target word:", target)

if sense:
    print("Predicted sense:", sense.name())
    print("Meaning:", sense.definition())
    print("Overlap score:", score)
else:
    print("No meaning found")