# services/category_service.py
from models import Item, Category, db
from naive_bayes import load_naive_bayes_model

# Load the classifier when this file is imported
classifier = load_naive_bayes_model()

def categorize_items_for_receipt(receipt_id):
    saved_items = Item.query.filter_by(receipt_id=receipt_id).all()
    categories = {c.name.lower(): c for c in Category.query.all()}

    print("Loaded categories from DB (lowercase key -> DB name):")
    for key, cat in categories.items():
        print(f"  '{key}' -> '{cat.name}'")

    predictions = []

    for item in saved_items:
        item_name = item.name
        predicted_category_name = classifier.predict(item_name).lower()

        print(f"Item '{item_name}' predicted category key: '{predicted_category_name}'")

        category = categories.get(predicted_category_name)
        if not category:
            category = categories.get("miscellaneous")
            print(f"Category not found for '{predicted_category_name}', defaulting to 'Miscellaneous'")

        print(f"Assigning item '{item_name}' to category '{category.name}'")

        item.category_id = category.id

        predictions.append({
            'item': item_name,
            'predicted_category': category.name
        })

    db.session.commit()
    return predictions
