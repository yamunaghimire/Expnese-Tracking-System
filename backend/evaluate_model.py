# import pandas as pd
# from sklearn.model_selection import train_test_split
# from naive_bayes import NaiveBayesClassifier
# from sklearn.metrics import confusion_matrix
# import matplotlib.pyplot as plt
# import seaborn as sns

# # Load your dataset
# df = pd.read_csv("all-items.csv")
# df["category"] = df["category"].str.lower()

# # Split data: 80% train, 20% test
# train_data, test_data = train_test_split(df, test_size=0.2, random_state=42)
# train_pairs = list(zip(train_data["item"], train_data["category"]))
# test_pairs = list(zip(test_data["item"], test_data["category"]))

# # Train the Naive Bayes classifier
# classifier = NaiveBayesClassifier()
# classifier.train(train_pairs)

# # Predict on test data and calculate accuracy
# correct = 0
# true_labels = []
# predicted_labels = []

# print("\nPrediction results:")
# for item, actual_category in test_pairs:
#     predicted = classifier.predict(item)
#     print(f"Item: '{item}' | Actual: '{actual_category}' | Predicted: '{predicted}'")
#     true_labels.append(actual_category)
#     predicted_labels.append(predicted)
#     if predicted == actual_category:
#         correct += 1

# total = len(test_pairs)
# accuracy = correct / total
# print(f"\n Model Accuracy: {accuracy:.2%} ({correct} out of {total})")

# # Generate and save confusion matrix heatmap
# labels = sorted(list(set(true_labels)))

# cm = confusion_matrix(true_labels, predicted_labels, labels=labels)

# plt.figure(figsize=(10,7))
# sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
#             xticklabels=labels, yticklabels=labels)
# plt.xlabel('Predicted Category')
# plt.ylabel('Actual Category')
# plt.title('Confusion Matrix Heatmap')
# plt.tight_layout()
# plt.savefig('confusion_matrix.png')

# print("\nConfusion matrix saved as confusion_matrix.png")



import pandas as pd
from sklearn.model_selection import train_test_split
from naive_bayes import NaiveBayesClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report
)
import matplotlib.pyplot as plt
import seaborn as sns
import re

# ---------------- Helpers ----------------
def clean_label(x: str) -> str:
    x = str(x).lower()
    # Replace multiple spaces, tabs, non-breaking spaces, etc. with a single space
    x = re.sub(r"\s+", " ", x, flags=re.UNICODE)
    return x.strip()

# ---------------- Load & prep ----------------
df = pd.read_csv("all-items.csv", skipinitialspace=True)

print("\n🔍 Unique categories BEFORE cleaning:")
print(df["category"].unique())

# Normalize categories
df["category"] = df["category"].apply(clean_label)

print("\n✅ Unique categories AFTER cleaning:")
print(df["category"].unique())

# Stratified split so each class appears in train/test
train_data, test_data = train_test_split(
    df, test_size=0.2, random_state=42, stratify=df["category"]
)
train_pairs = list(zip(train_data["item"], train_data["category"]))
test_pairs  = list(zip(test_data["item"],  test_data["category"]))

# ---------------- Train ----------------
classifier = NaiveBayesClassifier()
classifier.train(train_pairs)

# ---------------- Predict ----------------
true_labels, predicted_labels = [], []
for item, actual_category in test_pairs:
    pred = classifier.predict(item)
    true_labels.append(clean_label(actual_category))
    predicted_labels.append(clean_label(pred))

# ---------------- Sanity checks ----------------
print("\n📌 Unique TRUE labels :", sorted(set(true_labels)))
print("📌 Unique PRED labels :", sorted(set(predicted_labels)))
print("📌 Pred-only classes  :", set(predicted_labels) - set(true_labels))
print("📌 True-only classes  :", set(true_labels) - set(predicted_labels))

# ---------------- Metrics ----------------
accuracy  = accuracy_score(true_labels, predicted_labels)
precision = precision_score(true_labels, predicted_labels, average="macro", zero_division=0)
recall    = recall_score(true_labels, predicted_labels, average="macro", zero_division=0)
f1        = f1_score(true_labels, predicted_labels, average="macro", zero_division=0)

metrics_table = pd.DataFrame({
    "Metric": ["Accuracy", "Precision", "Recall", "F1 Score"],
    "Score":  [accuracy, precision, recall, f1]
})

print("\n📊 Model Evaluation Metrics (Macro Avg):\n")
print(metrics_table.to_string(index=False, float_format="%.3f"))

report_df = pd.DataFrame(classification_report(
    true_labels, predicted_labels, output_dict=True, zero_division=0
)).transpose()
print("\n📊 Classification Report (Per Class):\n")
print(report_df.round(3))

# ---------------- Confusion Matrix ----------------
labels = sorted(set(true_labels) | set(predicted_labels))
cm = confusion_matrix(true_labels, predicted_labels, labels=labels)

# Scale figure size to number of classes for readability
n = len(labels)
plt.figure(figsize=(max(8, 0.55*n), max(6, 0.55*n)))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=labels, yticklabels=labels)
plt.xlabel('Predicted Category')
plt.ylabel('Actual Category')
plt.title('Confusion Matrix Heatmap')
plt.xticks(rotation=90)
plt.yticks(rotation=0)
plt.tight_layout()
plt.savefig('confusion_matrix.png', dpi=200)
print("\n✅ Confusion matrix saved as confusion_matrix.png")
