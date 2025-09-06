import { useEffect, useState, useRef } from "react";

export const useEyeTracking = (isEnabled = true) => {
  const [eyeDetected, setEyeDetected] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const lastDetectionTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!isEnabled || !window.webgazer) return;

    const webgazer = window.webgazer;

    webgazer
      .setRegression("ridge")
      .setGazeListener((data) => {
        if (!trackingActive && data !== null) {
          setTrackingActive(true);
        }

        if (data && data.x !== null && data.y !== null) {
          setEyeDetected(true);
          lastDetectionTimeRef.current = Date.now();
        } else {
          setEyeDetected(false); 
        }
      })
      // .begin()
      // .then(() => {
      //       webgazer.showVideoPreview(false);
      //       webgazer.showPredictionPoints(false);
      // });

    return () => {
      webgazer.end();
    };
  }, [isEnabled, trackingActive]); 

  return { eyeDetected, trackingActive, lastDetectionTimeRef };
};

