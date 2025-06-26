import spacy

# Load your trained model
nlp = spacy.load("custom_receipt_ner")

# Replace this with OCR text
ocr_text = """
Mega Mart Pvt. Ltd.
Lalitpur
Bill Date: 25/May/2025
Bill No: 268/CM/00180948/May/25
Dettol Liquid Handwash 1.35L (IC-219) 2   353    706
Grand Total: 3297
Customer Paid: 3297
"""

# Run NER
doc = nlp(ocr_text)
print("Extracted entities:")
for ent in doc.ents:
    print(f"{ent.label_}: {ent.text}")


