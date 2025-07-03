from flask import Blueprint, request, jsonify
from app.services.recommender_service import predict_recommendation

recommend_api = Blueprint("recommend_api", __name__)

@recommend_api.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    user_skills = data.get("user_skills", [])
    job_skills = data.get("job_skills", [])

    result = predict_recommendation(user_skills, job_skills)

    if "error" in result:
        return jsonify(result), 400
    return jsonify(result)
