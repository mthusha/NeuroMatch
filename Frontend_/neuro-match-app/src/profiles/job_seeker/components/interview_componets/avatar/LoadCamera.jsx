import React, { useEffect, useRef, useState } from 'react';
import { FaVideoSlash } from 'react-icons/fa';
import { uploadInterviewVideo } from './../../../../../api/Interview';

const LoadCamera = ({ show, jobId, onFinish }) => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [cameraError, setCameraError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0); 

  const timerRef = useRef(null);

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
        else if (jobId) startRecording(videoElement.srcObject);
      }
      attempts++;
    }, 300);
    return () => clearInterval(interval);
  }, [show, jobId]);

  const startRecording = (stream) => {
    if (!stream) return;
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);

    setRecordTime(0);
    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    if (!onFinish || !jobId) return;

    const stopAndUpload = async () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        await new Promise((resolve) => {
          mediaRecorderRef.current.onstop = resolve;
        });
        setIsRecording(false);
        clearInterval(timerRef.current);
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        try {
          await uploadInterviewVideo(blob, jobId);
        } catch (err) {
          console.error('Failed to upload interview video:', err);
        }
      }
    };

    onFinish.current.push(stopAndUpload);
  }, [onFinish, jobId]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="absolute bottom-4 right-4">
      <div className="relative group">
        <div
          className={`w-24 h-24 rounded-lg overflow-hidden  transform transition-all duration-300 hover:shadow-xl 
            ${isRecording ? 'border-red-500 shadow-[0_0_10px_red]' : 'border-white'}`}
        >
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

        {isRecording && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-md shadow-md">
            {formatTime(recordTime)}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadCamera;
