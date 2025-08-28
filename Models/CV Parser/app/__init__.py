from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from .api.cv_routes import cv_blueprint
from .config import CONFIG
from app.api.recommendation_routes import recommend_api
from .api.interview_routes import interview_api
# from .api.lipsync_api import lipsync_api

load_dotenv()
def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.update(
        UPLOAD_FOLDER=CONFIG["upload_folder"],
        MAX_CONTENT_LENGTH=16 * 1024 * 1024 
    )
    
    app.register_blueprint(cv_blueprint, url_prefix='/api')
    app.register_blueprint(recommend_api, url_prefix="/api/recommend")
    app.register_blueprint(interview_api, url_prefix='/api/interview') 
    # app.register_blueprint(lipsync_api, url_prefix='/api/lipsync') 
    return app