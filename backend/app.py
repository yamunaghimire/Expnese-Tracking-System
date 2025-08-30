from flask import Flask, request, abort, jsonify, send_from_directory
import os
import pandas as pd
import re
import json
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from config import ApplicationConfig
from models import db, User, Receipt, Budget, Item, Category
# from preprocessing import preprocess_image_cv2
# from ocr import extract_text_from_image
from ocr.ocr import preprocess_image_cv2, extract_text_from_image
from ocr.llm import clean_receipt_text, extract_structured_json
from utils import clean_and_convert_bill_date
from naive_bayes import load_naive_bayes_model
from services.category_service import categorize_items_for_receipt

from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature

import cv2


app = Flask(__name__)
CORS(app,
    resources={r"/*": {"origins": ["http://localhost:5173"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "DELETE", "OPTIONS"]
)

app.config.from_object(ApplicationConfig)

app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"
# Ensure upload folders exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['PREPROCESSED_FOLDER'], exist_ok=True)





bcrypt = Bcrypt(app)
db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()
    
@app.route("/")
def home():
    return "Backend server is running!"

# Initialize the classifier when the app starts
classifier = load_naive_bayes_model()

mail = Mail(app)
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])


@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User with this email already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
    }), 201

@app.route("/api/login", methods=["POST"])
def login_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    

    if user is None:
        return jsonify({"error": "User not registered"}), 404
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid password"}), 401
    
    # Create JWT token
    access_token = create_access_token(identity=str(user.id))



    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200

@app.route('/api/getuser', methods=['GET'])
@jwt_required()
def get_user():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"name": user.username}), 200

    except Exception as e:
        return jsonify({"error": "Something went wrong", "details": str(e)}), 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']




@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight OK'}), 200

    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

        # OCR Processing
        gray = preprocess_image_cv2(image_path)
        # Save preprocessed image in a separate folder
        preprocessed_filename = "preprocessed_" + filename
        preprocessed_path = os.path.join(app.config['PREPROCESSED_FOLDER'], preprocessed_filename)
        cv2.imwrite(preprocessed_path, gray)

        extracted_text = extract_text_from_image(gray)
        print("Extracted Text:")
        print("-" * 50)
        print(extracted_text)
        print("-" * 50)
        cleaned_text = clean_receipt_text(extracted_text)
        structured_json = extract_structured_json(cleaned_text)
        print(structured_json)

        try:
            data = json.loads(structured_json)
        except json.JSONDecodeError:
            data = {}

       
        return jsonify({
            'message': 'Image processed successfully.',
            'image_path': image_path,
            'preprocessed_path': preprocessed_path,
            'data': data
        }), 200

    return jsonify({'error': 'File type not allowed'}), 400


@app.route('/api/save-receipt', methods=['POST'])
@jwt_required()
def save_receipt():
    from datetime import datetime
    current_user_id = get_jwt_identity()
    data = request.get_json()

    image_path = data.get('image_path')
    # bill_date_obj = clean_and_convert_bill_date(data.get("billDate"))
    bill_date_obj = clean_and_convert_bill_date(data.get("billDate")) or datetime.utcnow()

    # Save receipt
    receipt = Receipt(
        user_id=current_user_id,
        image_path=image_path,
        merchant_name=data.get("merchantName"),
        address=data.get("address"),
        bill_date=bill_date_obj,
        bill_number=data.get("billNumber"),
        total_amount=data.get("totalAmount")
    )
    db.session.add(receipt)
    db.session.flush()

    # Save items
    for item in data.get("items", []):
        db.session.add(Item(
            receipt_id=receipt.id,
            name=item.get("name"),
            quantity=item.get("quantity"),
            rate=item.get("rate"),
            amount=item.get("amount")
        ))

    db.session.commit()

    # Categorize items after saving
    predicted_results = categorize_items_for_receipt(receipt.id)

    return jsonify({
    'message': 'Receipt and categories saved successfully.',
    'predictions': predicted_results
     }), 201


@app.route('/api/categories', methods=['GET'])
@jwt_required()
def get_categories():
    categories = Category.query.order_by(Category.name).all()
    result = [{"id": c.id, "name": c.name} for c in categories]
    return jsonify(result), 200



@app.route('/api/budget', methods=['POST'])
@jwt_required()
def create_or_update_budgets():
    user_id = get_jwt_identity()
    data = request.get_json()
    month = data.get("month")
    budget_list = data.get("budgets", [])

    if not month or not isinstance(budget_list, list):
        return jsonify({"error": "Month and budgets list required"}), 400

    for item in budget_list:
        category_name = item.get("category")
        amount = item.get("amount")

        if not category_name or amount is None:
            continue

        category = Category.query.filter_by(name=category_name).first()
        if not category:
            continue  # or optionally create the category here

        existing_budget = Budget.query.filter_by(
            user_id=user_id,
            category_id=category.id,
            month=month
        ).first()

        if existing_budget:
            existing_budget.amount = amount
        else:
            new_budget = Budget(
                user_id=user_id,
                category_id=category.id,
                month=month,
                amount=amount
            )
            db.session.add(new_budget)

    db.session.commit()
    return jsonify({"message": "Budgets saved successfully"}), 200


@app.route('/api/budget/<month>', methods=['GET'])
@jwt_required()
def get_budgets_for_month(month):
    user_id = get_jwt_identity()
    budgets = Budget.query.filter_by(user_id=user_id, month=month).all()

    result = [
        {
            "category": budget.category.name if budget.category else None,
            "amount": budget.amount
        } for budget in budgets
    ]
    return jsonify(result), 200



@app.route('/api/budget/months', methods=['GET'])
@jwt_required()
def get_all_budgeted_months():
    user_id = get_jwt_identity()
    months = (
        db.session.query(Budget.month)
        .filter_by(user_id=user_id)
        .distinct()
        .all()
    )
    unique_months = [m[0] for m in months]
    return jsonify(unique_months), 200

@app.route('/api/expenses/<month>', methods=['GET'])
@jwt_required()
def get_expenses_for_month(month):
    user_id = get_jwt_identity()

    receipts = Receipt.query.filter_by(user_id=user_id).all()
    category_totals = {}

    for receipt in receipts:
        
        if not receipt.created_at or receipt.created_at.strftime("%B") != month:
            continue

        for item in receipt.items:
            if item.category:
                cat_name = item.category.name
                category_totals[cat_name] = category_totals.get(cat_name, 0) + (item.amount or 0)

    result = [{"category": name, "amount": round(amount, 2)} for name, amount in category_totals.items()]
    return jsonify(result), 200

@app.route('/api/expenses/monthly', methods=['GET'])
@jwt_required()
def get_monthly_expenses():
    user_id = get_jwt_identity()

    all_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    month_totals = {month: 0 for month in all_months}

    receipts = Receipt.query.filter_by(user_id=user_id).all()

    for receipt in receipts:
        if not receipt.created_at:
            continue
        month_abbr = receipt.created_at.strftime("%b")  
        if month_abbr in month_totals:
            for item in receipt.items:
                month_totals[month_abbr] += item.amount or 0

    # Return in correct month order
    result = [{"month": month, "amount": round(month_totals[month], 2)} for month in all_months]
    return jsonify(result), 200


@app.route('/api/expenses/total', methods=['GET'])
@jwt_required()
def get_total_expenses():
    user_id = get_jwt_identity()

    receipts = Receipt.query.filter_by(user_id=user_id).all()
    total = 0.0

    for receipt in receipts:
        for item in receipt.items:
            total += item.amount or 0

    return jsonify({"amount": round(total, 2)}), 200


@app.route('/api/get-receipts', methods=['GET'])
@jwt_required()
def get_receipts():
    current_user_id = get_jwt_identity()

    receipts = Receipt.query.filter_by(user_id=current_user_id).order_by(Receipt.created_at.desc()).all()

    result = []
    for r in receipts:
        item_data = [
            {
                "name": item.name,
                "quantity": item.quantity,
                "rate": item.rate,
                "amount": item.amount
            }
            for item in r.items  
        ]
        receipt_date = r.bill_date or r.created_at

        result.append({
            "id": r.id,
            "merchant_name": r.merchant_name,
            "address": r.address,
            "bill_number": r.bill_number,
            # "bill_date": r.bill_date.isoformat() if r.bill_date else None,
            "bill_date": receipt_date.isoformat() if receipt_date else None,
            "total_amount": r.total_amount,
            "image_path": r.image_path,
            "items": item_data
        })

    return jsonify({"receipts": result}), 200

@app.route('/api/receipts/<int:receipt_id>', methods=['DELETE'])
@jwt_required()
def delete_receipt(receipt_id):
    user_id = get_jwt_identity()
    receipt = Receipt.query.filter_by(id=receipt_id, user_id=user_id).first()
    if not receipt:
        return jsonify({"error": "Receipt not found"}), 404

    db.session.delete(receipt)
    db.session.commit()
    return jsonify({"message": "Receipt deleted successfully"}), 200


@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get("email")

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not registered"}), 400

    # generate token
    token = serializer.dumps(user.email, salt='password-reset-salt')
    reset_link = f"http://localhost:5173/reset-password/{token}"  

    # send mail
    msg = Message("Password Reset Request", recipients=[user.email])
    msg.body = f"Click the link to reset your password: {reset_link}\n\nThis link will expire in 1 hour."
    mail.send(msg)

    return jsonify({"message": "Password reset email sent"}), 200


@app.route('/api/reset-password/<token>', methods=['POST'])
def reset_password(token):
    try:
        email = serializer.loads(token, salt='password-reset-salt', max_age=3600)  
    except SignatureExpired:
        return jsonify({"error": "Token expired"}), 400
    except BadSignature:
        return jsonify({"error": "Invalid token"}), 400

    data = request.get_json()
    new_password = data.get("password")

    if not new_password:
        return jsonify({"error": "Password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200


    



if __name__ == '__main__':
    app.run(debug=True)
