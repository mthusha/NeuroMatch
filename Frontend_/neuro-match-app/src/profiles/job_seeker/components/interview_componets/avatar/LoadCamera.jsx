import React, { useEffect, useRef, useState } from 'react';
import { FaVideoSlash } from 'react-icons/fa';

const LoadCamera = ({ show }) => {
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    if (!show) return; 

    const videoElement = videoRef.current;

    const tryAttachWebgazerStream = () => {
      const webgazerVideo = document.getElementById('webgazerVideoFeed');
      if (webgazerVideo && webgazerVideo.srcObject) {
        videoElement.srcObject = webgazerVideo.srcObject;
        return true;
      }
      return false;
    };

    let attempts = 0;
    const interval = setInterval(() => {
      if (tryAttachWebgazerStream() || attempts > 20) {
        clearInterval(interval);
        if (attempts > 20) setCameraError(true);
      }
      attempts++;
    }, 300);

    return () => clearInterval(interval);
  }, [show]);

  return (
    <div className="absolute bottom-4 right-4">
      <div className="relative group">
        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white transform transition-all duration-300 hover:shadow-xl">
          {!cameraError ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <FaVideoSlash className="text-red-400 text-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadCamera;
