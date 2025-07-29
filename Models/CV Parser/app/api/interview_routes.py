from flask import Blueprint, request, jsonify
from app.services.interview_service import InterviewService
import uuid

interview_api = Blueprint('interview_api', __name__)

@interview_api.route("/start_interview", methods=["POST"])
def start_interview():
    data = request.get_json()
    cv_data = data.get("cv_data")
    session_id = data.get("session_id") or str(uuid.uuid4())

    question = InterviewService.start_interview(cv_data, session_id)
    return jsonify({"session_id": session_id, "question": question})


@interview_api.route("/answer", methods=["POST"])
def continue_interview():
    data = request.get_json()
    session_id = data.get("session_id")
    answer = data.get("answer")

    response = InterviewService.continue_interview(session_id, answer)
    return jsonify({"response": response})
