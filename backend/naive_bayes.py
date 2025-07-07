# naive_bayes.py
import pandas as pd
import math
from collections import defaultdict

class NaiveBayesClassifier:
    def __init__(self):
        self.class_word_counts = defaultdict(lambda: defaultdict(int))
        self.class_counts = defaultdict(int)
        self.class_doc_counts = defaultdict(int)
        self.vocab = set()
        self.total_docs = 0

    def tokenize(self, text):
        return text.lower().split()

    def train(self, data):
        for text, label in data:
            self.total_docs += 1
            self.class_doc_counts[label] += 1
            words = self.tokenize(text)
            for word in words:
                self.vocab.add(word)
                self.class_word_counts[label][word] += 1
                self.class_counts[label] += 1

    def predict(self, text):
        words = self.tokenize(text)
        scores = {}
        for label in self.class_doc_counts:
            log_prob = math.log(self.class_doc_counts[label] / self.total_docs)
            for word in words:
                word_count = self.class_word_counts[label][word] + 1
                total = self.class_counts[label] + len(self.vocab)
                log_prob += math.log(word_count / total)
            scores[label] = log_prob
        return max(scores, key=scores.get)


# ✅ Create a function to initialize and train the model
def load_naive_bayes_model():
    csv_path = "all-items.csv"
    df = pd.read_csv(csv_path)
    df["category"] = df["category"].str.lower()
    training_data = list(zip(df["item"], df["category"]))

    model = NaiveBayesClassifier()
    model.train(training_data)
    return model
