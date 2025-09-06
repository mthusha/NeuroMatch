from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from ..services.pdf_processor import PDFProcessor
from ..services.gemini_parser import GeminiParser
from ..services.cv_checker import CVChecker

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

@cv_blueprint.route('/check-cv', methods=['POST'])
def check_cv():
    if 'file' not in request.files or 'skills' not in request.form:
        return jsonify({"error": "File and skills are required"}), 400

    file = request.files['file']
    skills = request.form['skills']

    if file.filename == '' or not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Valid PDF file required"}), 400

    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    try:
        file.save(upload_path)

        cv_text = PDFProcessor.extract_text(upload_path)

        candidate_email = CVChecker.extract_email(cv_text)
        candidate_name = CVChecker.extract_name(cv_text)

        job_skills = [s.strip() for s in skills.split(",")]
        match_percentage = CVChecker.calculate_skill_match(cv_text, job_skills)

        return jsonify({
            "pdf_name": file.filename,
            "candidate_name": candidate_name,
            "email": candidate_email,
            "skills": job_skills,
            "match_percentage": match_percentage
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(upload_path):
            os.remove(upload_path)
