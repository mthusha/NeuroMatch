from flask import Blueprint, request, jsonify
from app.services.eye_tracking_ws_service import EyeTrackingService

eye_api = Blueprint("eye_api", __name__)
eye_service = EyeTrackingService()

@eye_api.route("/track", methods=["POST"])
def track_eye():
    """
    Expects JSON: { "frame": "data:image/jpeg;base64,..." }
    Returns: { "eyeDetected": true/false }
    """
    data = request.get_json()
    frame_b64 = data.get("frame")
    if not frame_b64:
        return jsonify({"error": "No frame provided"}), 400

    detected = eye_service.process_frame_base64(frame_b64)
    return jsonify({"eyeDetected": detected})
