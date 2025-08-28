from app.services.eye_tracking_ws_service import EyeTrackingWSService

if __name__ == "__main__":
    service = EyeTrackingWSService(host="localhost", port=8765)
    service.run()
