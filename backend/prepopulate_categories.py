# prepopulate_categories.py
from app import app, db
from models import Category

with app.app_context():
    categories = [
        "Food and Beverages",
        "Personal Care",
        "Household Supplies",
        "Health and Pharmacy",
        "Apparel and Accessories",
        "Miscellaneous"
    ]

    for category_name in categories:
        existing = Category.query.filter_by(name=category_name).first()
        if not existing:
            db.session.add(Category(name=category_name))

    db.session.commit()
    print("Categories prepopulated successfully.")
