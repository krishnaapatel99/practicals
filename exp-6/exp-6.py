import nltk
from nltk.corpus import treebank
from nltk.tag import RegexpTagger, UnigramTagger, DefaultTagger

# Load corpus
sentences = treebank.tagged_sents()

# Split into training and testing data
split = int(len(sentences) * 0.9)
train_data = sentences[:split]
test_data = sentences[split:]

# Rule-based tagger
patterns = [
    (r".*ing$", "VBG"),
    (r".*ed$", "VBD"),
    (r".*ly$", "RB"),
    (r".*s$", "NNS"),
    (r".*", "NN")
]

rule_tagger = RegexpTagger(patterns)

# Probabilistic tagger
default_tagger = DefaultTagger("NN")
prob_tagger = UnigramTagger(
    train_data,
    backoff=default_tagger
)

# Evaluate accuracy
rule_accuracy = rule_tagger.accuracy(test_data)
prob_accuracy = prob_tagger.accuracy(test_data)

print("Rule-based accuracy:",
      round(rule_accuracy * 100, 2), "%")

print("Probabilistic accuracy:",
      round(prob_accuracy * 100, 2), "%")

# Test a sentence
sentence = ["The", "quick", "fox", "jumps", "quickly"]

print("\nRule-based tagging:")
print(rule_tagger.tag(sentence))

print("\nProbabilistic tagging:")
print(prob_tagger.tag(sentence))