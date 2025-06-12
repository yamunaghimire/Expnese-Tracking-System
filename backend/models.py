from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
from datetime import datetime



class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

class UploadedImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120), nullable=False)
    filepath = db.Column(db.String(300), nullable=False)
    processed_filepath = db.Column(db.String(255), nullable=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)  # Date and time of upload
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)