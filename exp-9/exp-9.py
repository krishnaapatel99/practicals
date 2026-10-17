from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score

# Sample dataset
texts = [
    "I love this movie",
    "This movie is excellent",
    "The film was amazing",
    "I really enjoyed the movie",
    "The story is wonderful",
    "This is a great film",
    "I like this movie",
    "The acting was fantastic",
    "The movie was enjoyable",
    "I am happy with this film",

    "I hate this movie",
    "This movie is terrible",
    "The film was boring",
    "I disliked the movie",
    "The story is awful",
    "This is a bad film",
    "I regret watching this movie",
    "The acting was horrible",
    "The movie was disappointing",
    "I am unhappy with this film"
]

labels = ["Positive"] * 10 + ["Negative"] * 10

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(
    texts,
    labels,
    test_size=0.3,
    random_state=42,
    stratify=labels
)

# Convert text into numerical features
vectorizer = CountVectorizer()

X_train_vector = vectorizer.fit_transform(X_train)
X_test_vector = vectorizer.transform(X_test)

# Naive Bayes model
nb = MultinomialNB()
nb.fit(X_train_vector, y_train)

nb_predictions = nb.predict(X_test_vector)

# SVM model
svm = LinearSVC(random_state=42)
svm.fit(X_train_vector, y_train)

svm_predictions = svm.predict(X_test_vector)

# Evaluate models
print("Naive Bayes Accuracy:",
      round(accuracy_score(y_test, nb_predictions) * 100, 2), "%")

print("SVM Accuracy:",
      round(accuracy_score(y_test, svm_predictions) * 100, 2), "%")

# Test a new sentence
new_text = ["This movie is amazing"]
new_vector = vectorizer.transform(new_text)

print("\nNew sentence:", new_text[0])
print("Naive Bayes Prediction:", nb.predict(new_vector)[0])
print("SVM Prediction:", svm.predict(new_vector)[0])