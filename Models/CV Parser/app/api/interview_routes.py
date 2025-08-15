from flask import Blueprint, request, jsonify
from app.services.interview_service import InterviewService
import uuid

interview_api = Blueprint('interview_api', __name__)

@interview_api.route("/general", methods=["POST"])
def start_general_interview():
    request_data = request.get_json()
    result = InterviewService.start_general_interview(request_data)
    return jsonify(result)

@interview_api.route("/job-specific", methods=["POST"])
def start_job_specific_interview():
    data = request.get_json()
    result = InterviewService.start_job_specific_interview(data)
    return jsonify(result)

@interview_api.route("/answer", methods=["POST"])
def continue_interview():
    data = request.get_json()
    session_id = data.get("session_id")
    answer = data.get("answer")

    response = InterviewService.continue_interview(session_id, answer)
    return jsonify({"response": response})
