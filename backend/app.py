import os
from flask import Flask, request, abort, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from config import ApplicationConfig
from models import db, User, UploadedImage
from preprocessing import preprocess_image_cv2
from ocr import extract_text_from_image

app = Flask(__name__)
CORS(app,
    resources={r"/*": {"origins": ["http://localhost:5173"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "OPTIONS"]
)

app.config.from_object(ApplicationConfig)

app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"




bcrypt = Bcrypt(app)
db.init_app(app)

jwt = JWTManager(app)

with app.app_context():
    db.create_all()
    
@app.route("/")
def home():
    return "Backend server is running!"

@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        abort(400, description="Missing required fields")

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        abort(409, description="User with this email already exists")

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
    }), 201

@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        abort(400, description="Missing email or password")

    user = User.query.filter_by(email=email).first()
    

    if user is None or not bcrypt.check_password_hash(user.password, password):
        abort(401, description="Invalid credentials")
    
    # Create JWT token
    access_token = create_access_token(identity=str(user.id))



    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200

@app.route('/api/user', methods=['GET'])
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


        

@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight OK'}), 200

    current_user_id = get_jwt_identity()

    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Save original info in DB first
        image = UploadedImage(
            filename=filename,
            filepath=filepath,
            user_id=current_user_id
        )
        db.session.add(image)
        db.session.commit()

        # Preprocess original image and save processed separately
        processed_filepath = preprocess_image_cv2(filepath)

         # Extract text from processed image using OCR
        extracted_text = extract_text_from_image(processed_filepath)


        # Update DB with processed image path
        image.processed_filepath = processed_filepath
        db.session.commit()

        return jsonify({
            'message': 'Image uploaded and preprocessed successfully',
            'id': image.id,
            'original_path': filepath,
            'processed_path': processed_filepath,
            'extracted_text': extracted_text

        }), 201

    return jsonify({'error': 'File type not allowed'}), 400
    
# @app.route('/reset-db', methods=['POST'])
# def reset_db():
#     db.drop_all()
#     db.create_all()
#     return jsonify({"message": "Database reset successfully!"})




if __name__ == '__main__':
    app.run(debug=True)
