from dotenv import load_dotenv
import os
from datetime import timedelta



load_dotenv()
BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    # SQLALCHEMY_DATABASE_URI = r"sqlite:///.db.sqlite"
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'app_db.sqlite')}"
    SQLALCHEMY_TRACK_MODIFICATIONS= False
    SQLALCHEMY_ECHO = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(weeks=1)  
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'} 
    


