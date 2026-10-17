from nltk.stem import PorterStemmer, LancasterStemmer, SnowballStemmer
from nltk.stem import WordNetLemmatizer

words = ["playing", "studies", "running", "cars", "better"]

porter = PorterStemmer()
lancaster = LancasterStemmer()
snowball = SnowballStemmer("english")
lemmatizer = WordNetLemmatizer()

print("Original\tPorter\tLancaster\tSnowball\tLemma")

for word in words:
    print(
        word, "\t",
        porter.stem(word), "\t",
        lancaster.stem(word), "\t\t",
        snowball.stem(word), "\t\t",
        lemmatizer.lemmatize(word)
    )

print("\nVerb Lemmatization:")
for word in ["playing", "running", "studies"]:
    print(word, "->", lemmatizer.lemmatize(word, pos="v"))