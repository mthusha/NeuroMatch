from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from ..services.pdf_processor import PDFProcessor
from ..services.gemini_parser import GeminiParser
import os

cv_blueprint = Blueprint('cv', __name__)

@cv_blueprint.route('/upload-cv', methods=['POST'])
def upload_cv():
    upload_path = None
    
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    
    if not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are allowed"}), 400
    
    try:
        filename = secure_filename(file.filename)
        upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(upload_path)
        
        pdf_text = PDFProcessor.extract_text(upload_path)
        if not pdf_text:
            return jsonify({"error": "Failed to extract text from PDF"}), 500
        
        parser = GeminiParser()
        json_result = parser.parse_cv(pdf_text)
        
        if json_result:
            return jsonify({"data": json_result}), 200
        else:
            return jsonify({"error": "Failed to process CV with Gemini"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if upload_path and os.path.exists(upload_path):
            try:
                os.remove(upload_path)
            except Exception as e:
                print(f"Failed to delete temporary file {upload_path}: {str(e)}")