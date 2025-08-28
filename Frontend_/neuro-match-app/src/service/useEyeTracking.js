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



// from worker cal
// import { useEffect, useState, useRef } from "react";

// export const useEyeTracking = (isEnabled = true) => {
//   const [eyeDetected, setEyeDetected] = useState(false);
//   const [trackingActive, setTrackingActive] = useState(false);
//   const lastDetectionTimeRef = useRef(Date.now());
//   const workerRef = useRef(null);

//   useEffect(() => {
//     if (!isEnabled || !window.webgazer) return;

//     workerRef.current = new Worker(
//       new URL("./../workers/eyeTrackingWorker.js", import.meta.url)
//     );

//     workerRef.current.onmessage = (event) => {
//       const { eyeDetected, lastDetectionTime } = event.data;
//       setEyeDetected(eyeDetected);
//       lastDetectionTimeRef.current = lastDetectionTime;
//     };

//     const webgazer = window.webgazer;
//     webgazer
//       .setRegression("ridge")
//       .setGazeListener((data) => {
//         if (!trackingActive && data !== null) {
//           setTrackingActive(true);
//         }
//         workerRef.current.postMessage(data);
//       })
//       .begin()
//       .then(() => {
//         webgazer.showVideoPreview(false);
//         webgazer.showPredictionPoints(false);
//       });

//     return () => {
//       if (workerRef.current) {
//         workerRef.current.terminate();
//       }
//       webgazer.end();
//     };
//   }, [isEnabled, trackingActive]);

//   return { eyeDetected, trackingActive, lastDetectionTimeRef };
// };
// end
// import { useEffect, useState, useRef, useCallback } from "react";

// export const useEyeTracking = (
//   isEnabled = true,
//   wsUrl = "ws://localhost:8765"
// ) => {
//   const [eyeDetected, setEyeDetected] = useState(false);
//   const [trackingActive, setTrackingActive] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected");
//   const lastDetectionTimeRef = useRef(Date.now());
//   const videoRef = useRef(null);
//   const wsRef = useRef(null);
//   const streamRef = useRef(null);

//   // Cleanup function
//   const cleanup = useCallback(() => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//       if (videoRef.current.parentNode) {
//         videoRef.current.parentNode.removeChild(videoRef.current);
//       }
//     }

//     if (wsRef.current) {
//       wsRef.current.close();
//       wsRef.current = null;
//     }

//     setTrackingActive(false);
//     setEyeDetected(false);
//     setConnectionStatus("disconnected");
//   }, []);

//   useEffect(() => {
//     if (!isEnabled) {
//       cleanup();
//       return;
//     }

//     let interval;
//     let canvas;

//     const initializeCamera = async () => {
//       try {
//         // Create video element if it doesn't exist
//         if (!videoRef.current) {
//           videoRef.current = document.createElement("video");
//           videoRef.current.autoplay = true;
//           videoRef.current.muted = true;
//           videoRef.current.playsInline = true;
//           videoRef.current.width = 320;
//           videoRef.current.height = 240;
//           videoRef.current.style.display = "none";
//           document.body.appendChild(videoRef.current);
//         }

//         // Start camera
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: {
//             width: { ideal: 640 },
//             height: { ideal: 480 },
//             facingMode: "user",
//           },
//         });

//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;

//         // Wait for video to be ready
//         await new Promise((resolve) => {
//           videoRef.current.onloadedmetadata = resolve;
//         });

//         // Play the video
//         await videoRef.current.play();

//         // Setup WebSocket connection
//         wsRef.current = new WebSocket(wsUrl);

//         wsRef.current.onopen = () => {
//           setConnectionStatus("connected");
//           console.log("WebSocket connected");
//         };

//         wsRef.current.onclose = () => {
//           setConnectionStatus("disconnected");
//           console.log("WebSocket disconnected");
//         };

//         wsRef.current.onerror = (error) => {
//           setConnectionStatus("error");
//           console.error("WebSocket error:", error);
//         };

//         wsRef.current.onmessage = (event) => {
//           try {
//             const data = JSON.parse(event.data);
//             setTrackingActive(true);
//             setEyeDetected(data.eyeDetected);
//             lastDetectionTimeRef.current = Date.now();
//           } catch (error) {
//             console.error("Error parsing WebSocket message:", error);
//           }
//         };

//         // Setup frame capture
//         canvas = document.createElement("canvas");
//         canvas.width = 160;
//         canvas.height = 120;
//         const ctx = canvas.getContext("2d");

//         interval = setInterval(() => {
//           if (
//             !videoRef.current ||
//             videoRef.current.readyState !== 4 || // HAVE_ENOUGH_DATA
//             !wsRef.current ||
//             wsRef.current.readyState !== WebSocket.OPEN
//           ) {
//             return;
//           }

//           try {
//             ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
//             const frameData = canvas.toDataURL("image/jpeg", 0.7); // Higher quality
//             wsRef.current.send(JSON.stringify({ frame: frameData }));
//           } catch (error) {
//             console.error("Error capturing frame:", error);
//           }
//         }, 200); // 5 FPS
//       } catch (error) {
//         console.error("Error initializing eye tracking:", error);
//         cleanup();
//       }
//     };

//     initializeCamera();

//     return cleanup;
//   }, [isEnabled, wsUrl, cleanup]);

//   // Add a check for connection timeout
//   useEffect(() => {
//     if (!isEnabled || !trackingActive) return;

//     const checkTimeout = setInterval(() => {
//       const timeSinceLastDetection = Date.now() - lastDetectionTimeRef.current;
//       if (timeSinceLastDetection > 5000) {
//         // 5 seconds timeout
//         setTrackingActive(false);
//         setEyeDetected(false);
//       }
//     }, 1000);

//     return () => clearInterval(checkTimeout);
//   }, [isEnabled, trackingActive]);

//   return {
//     eyeDetected,
//     trackingActive,
//     lastDetectionTimeRef,
//     connectionStatus,
//   };
// };