from flask import Flask
from flask_cors import CORS
from .api.cv_routes import cv_blueprint
from .config import CONFIG
from app.api.recommendation_routes import recommend_api
def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.update(
        UPLOAD_FOLDER=CONFIG["upload_folder"],
        MAX_CONTENT_LENGTH=16 * 1024 * 1024 
    )
    
    app.register_blueprint(cv_blueprint, url_prefix='/api')
    app.register_blueprint(recommend_api, url_prefix="/api/recommend")
    return app