import asyncio
import websockets
import json
import cv2
import numpy as np
from PIL import Image
import base64
from io import BytesIO

class EyeTrackingWSService:
    def __init__(self, host="localhost", port=8765):
        self.host = host
        self.port = port
        # Load Haar cascades
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )
        self.eye_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_eye.xml"
        )

    def detect_eyes(self, frame_b64: str) -> bool:
        try:
            header, encoded = frame_b64.split(",", 1)
            img_bytes = base64.b64decode(encoded)
            img = np.array(Image.open(BytesIO(img_bytes)))
            gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)
            for (x, y, w, h) in faces:
                roi_gray = gray[y:y+h, x:x+w]
                eyes = self.eye_cascade.detectMultiScale(roi_gray)
                if len(eyes) > 0:
                    return True
        except Exception as e:
            print("EyeTrackingWSService error:", e)
        return False

    async def handler(self, websocket):
        async for message in websocket:
            try:
               data = json.loads(message)
               frame_b64 = data.get("frame")
               detected = self.detect_eyes(frame_b64) if frame_b64 else False
               await websocket.send(json.dumps({"eyeDetected": detected}))
            except Exception as e:
               print("WebSocket message error:", e)


    def run(self):
        print(f"Eye tracking WS server running at ws://{self.host}:{self.port}")

        async def main():
            async with websockets.serve(self.handler, self.host, self.port):
                await asyncio.Future()  

        asyncio.run(main())

