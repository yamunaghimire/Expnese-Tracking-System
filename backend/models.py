from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
from datetime import datetime



class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    receipts = db.relationship("Receipt", backref="user", lazy=True)
    budgets = db.relationship("Budget", backref="user", lazy=True)

class Receipt(db.Model):
    __tablename__ = "receipts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image_path = db.Column(db.String(255)) 
    merchant_name = db.Column(db.String(150))
    address = db.Column(db.String(255))
    bill_number = db.Column(db.String(100))
    bill_date = db.Column(db.Date)
    total_amount = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=db.func.now())

    items = db.relationship("Item", backref="receipt", lazy=True, cascade="all, delete")

class Budget(db.Model):
    __tablename__ = "budgets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)  # FK to Category
    month = db.Column(db.String(7), nullable=False)  # e.g., "2025-06"
    amount = db.Column(db.Float, nullable=False)
   # Prevent duplicate budget entries for the same user, category, and month
    __table_args__ = (
        db.UniqueConstraint('user_id', 'category_id', 'month', name='unique_user_category_month'),
    )

    
class Item(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    receipt_id = db.Column(db.Integer, db.ForeignKey("receipts.id"), nullable=False)

    name = db.Column(db.String(150))
    quantity = db.Column(db.Float)
    rate = db.Column(db.Float)
    amount = db.Column(db.Float)

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))  # FK to Category

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    items = db.relationship("Item", backref="category", lazy=True)
    budgets = db.relationship("Budget", backref="category", lazy=True)