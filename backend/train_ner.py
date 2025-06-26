import spacy
import random
import json
from spacy.training.example import Example

# Load training data
with open("training_data.json", "r", encoding="utf8") as f:
    TRAIN_DATA = json.load(f)

# Blank English pipeline
nlp = spacy.blank("en")

# Add NER pipe
ner = nlp.add_pipe("ner")
for text, annotations in TRAIN_DATA:
    for start, end, label in annotations["entities"]:
        ner.add_label(label)

# Disable other pipes during training
other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]
with nlp.disable_pipes(*other_pipes):
    optimizer = nlp.begin_training()
    for itn in range(30):  # epochs
        random.shuffle(TRAIN_DATA)
        losses = {}
        for text, annotations in TRAIN_DATA:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], drop=0.3, losses=losses)
        print(f"Iteration {itn+1}, Loss: {losses['ner']}")

# Save model
nlp.to_disk("custom_receipt_ner")
print("✅ Model training complete and saved to 'custom_receipt_ner'")
